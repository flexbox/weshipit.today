// Renders a composition frame by frame with Playwright, then encodes to MP4 with ffmpeg.
// Usage: node tools/podcast-motion/render.mjs [index|showreel] [--stills 1,4,9,13,18] [--audio-only]
//
// A composition is an HTML file exposing window.ready, window.render(t) and window.META.
// META.SAMPLES > 1 renders sub-frames and blends them (motion blur).
// If it also exposes window.renderAudio(), the soundtrack is muxed in and a
// silent copy is kept next to it. --audio-only re-muxes the soundtrack onto
// that silent copy without re-rendering the frames.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '../../dist/videos');
mkdirSync(outDir, { recursive: true });

const comp = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'index';
const stillsArg = process.argv.indexOf('--stills');
const stills = stillsArg > -1 ? process.argv[stillsArg + 1].split(',').map(Number) : null;
const audioOnly = process.argv.includes('--audio-only');

const browser = await chromium.launch({ executablePath: chromium.executablePath() });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(resolve(here, `${comp}.html`)).href);
await page.evaluate(() => window.ready);
const { FPS, DURATION, NAME = 'podcast-motion-16x9', SAMPLES = 1, SHUTTER = 0.5 } = await page.evaluate(() => window.META);

if (stills) {
  for (const t of stills) {
    await page.evaluate((t) => window.render(t), t);
    await page.screenshot({ path: resolve(outDir, `${NAME}-still-${t}s.png`) });
  }
  console.log(`stills written to ${outDir}`);
  await browser.close();
  process.exit(0);
}

function ffmpeg(args, stdin = 'ignore') {
  const proc = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: [stdin, 'inherit', 'inherit'] });
  const done = new Promise((ok, fail) => proc.on('close', (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg exited with ${code}`)))));
  return { proc, done };
}

const hasAudio = await page.evaluate(() => typeof window.renderAudio === 'function');
const output = resolve(outDir, `${NAME}.mp4`);
const videoOnly = hasAudio ? resolve(outDir, `${NAME}-silent.mp4`) : output;

// Sub-frames are spread over the shutter interval and averaged by tmix.
const blur = SAMPLES > 1 ? ['-vf', `tmix=frames=${SAMPLES},select='not(mod(n+1\\,${SAMPLES}))',setpts=N/(${FPS}*TB)`] : [];
const encoder = audioOnly ? null : ffmpeg(
  ['-f', 'image2pipe', '-framerate', String(FPS * SAMPLES), '-i', '-', ...blur, '-r', String(FPS),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', videoOnly],
  'pipe'
);

const total = audioOnly ? 0 : Math.round(FPS * DURATION);
for (let f = 0; f < total; f++) {
  for (let k = 0; k < SAMPLES; k++) {
    const offset = SAMPLES > 1 ? SHUTTER * (k / (SAMPLES - 1) - 0.5) : 0;
    await page.evaluate((t) => window.render(t), Math.max(0, (f + offset) / FPS));
    const png = await page.screenshot({ type: 'png' });
    if (!encoder.proc.stdin.write(png)) await new Promise((r) => encoder.proc.stdin.once('drain', r));
  }
  if (f % 60 === 0) process.stdout.write(`frame ${f}/${total}\n`);
}
if (encoder) {
  encoder.proc.stdin.end();
  await encoder.done;
}

if (hasAudio) {
  const wav = resolve(outDir, `${NAME}.wav`);
  writeFileSync(wav, Buffer.from(await page.evaluate(() => window.renderAudio()), 'base64'));
  await ffmpeg(['-i', videoOnly, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.8:level=false', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-shortest', '-movflags', '+faststart', output]).done;
  rmSync(wav);
}
await browser.close();
console.log(`video written to ${output}`);
