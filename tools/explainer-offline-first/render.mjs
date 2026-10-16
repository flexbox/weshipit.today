// Render engine for the offline-first explainer.
// Headless Chromium steps t = n / fps through window.seek(t) and pipes PNG frames to ffmpeg
// (libx264, crf 16, yuv420p). Audio is rendered in-page with Web Audio, then normalised to -16 LUFS / -1.5 dBTP.
//
//   node render.mjs video   --fmt 16x9|9x16|1x1 [--reduced] [--fps 60] [--scale 1]   → out/*.mp4
//   node render.mjs audio   [--vo path/to/voice.wav]                                → out/score.wav
//   node render.mjs stills  --fmt 16x9 --t 1.25,7.5 [--reduced] [--width 390]       → out/stills/
//   node render.mjs contact [--fmt 16x9]                                            → contact.png
//   node render.mjs srt                                                             → captions.srt
//   node render.mjs determinism --t 23.4                                            → diff of two renders
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = (...p) => resolve(here, 'out', ...p);
mkdirSync(out('stills'), { recursive: true });

const argv = process.argv.slice(2);
const cmd = argv[0];
const arg = (name, def) => { const i = argv.indexOf(`--${name}`); return i > -1 ? argv[i + 1] : def; };
const flag = (name) => argv.includes(`--${name}`);
const FMT = arg('fmt', '16x9');
const REDUCED = flag('reduced');
const SIZE = { '16x9': [1920, 1080], '9x16': [1080, 1920], '1x1': [1080, 1080] };
const NAMES = { '16x9': 'master_16x9', '9x16': 'cut_9x16', '1x1': 'cut_1x1' };

function run(bin, args, { stdin = 'ignore', capture = false } = {}) {
  const proc = spawn(bin, args, { stdio: [stdin, capture ? 'pipe' : 'inherit', capture ? 'pipe' : 'inherit'] });
  let text = '';
  if (capture) { proc.stdout.on('data', (d) => (text += d)); proc.stderr.on('data', (d) => (text += d)); }
  const done = new Promise((ok, fail) => proc.on('close', (c) => (c === 0 ? ok(text) : fail(new Error(`${bin} exited ${c}\n${text}`)))));
  return { proc, done };
}
const ffmpeg = (args, opts) => run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], opts);

async function open(fmt = FMT, reduced = REDUCED, scale = 1) {
  const [w, h] = SIZE[fmt];
  const browser = await chromium.launch({ executablePath: chromium.executablePath(), args: ['--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb', '--disable-gpu', '--disable-gpu-compositing', '--disable-partial-raster', '--num-raster-threads=1', '--disable-skia-runtime-opts', '--run-all-compositor-stages-before-draw'] });
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  page.on('pageerror', (e) => { console.error(e); process.exit(1); });
  await page.goto(`${pathToFileURL(resolve(here, 'film.html')).href}?fmt=${fmt}${reduced ? '&reduced=1' : ''}`);
  await page.evaluate(() => window.ready);
  const shot = async (t) => { await page.evaluate((t) => window.seek(t), t); return page.screenshot({ type: 'png' }); };
  return { browser, page, shot };
}

async function audio() {
  const { browser, page } = await open('16x9', false);
  const raw = out('score-raw.wav');
  writeFileSync(raw, Buffer.from(await page.evaluate(() => window.renderAudio()), 'base64'));
  writeFileSync(out('captions.json'), JSON.stringify(await page.evaluate(() => TIMELINE.captions)));
  await browser.close();
  let src = raw;
  const vo = arg('vo');
  if (vo) {
    // Duck the bed under the voice. The voice reads the captions, so TIMELINE.captions are the
    // voice windows: -8 dB inside each one, 150 ms in, 300 ms out. Deterministic and frame-exact.
    const caps = JSON.parse(readFileSync(out('captions.json'), 'utf8'));
    const win = caps.map((c) => `clip((t-${c.t0}+0.15)/0.15,0,1)*clip((${c.t1}+0.3-t)/0.3,0,1)`).join('+');
    const mixed = out('score-vo.wav');
    await ffmpeg(['-i', raw, '-i', vo, '-filter_complex',
      `[0:a]volume=eval=frame:volume='1-0.6*min(1,${win})'[bed];[1:a]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur=45,atrim=0:45[vo];[bed][vo]amix=inputs=2:duration=first:normalize=0[m]`,
      '-map', '[m]', '-c:a', 'pcm_f32le', mixed]).done;
    src = mixed;
  }
  // Two-pass loudnorm: measure, then apply linearly to -16 LUFS integrated, -1.5 dBTP.
  const target = 'I=-16:TP=-2.0:LRA=11';
  const m = await ffmpeg(['-loglevel', 'info', '-i', src, '-af', `loudnorm=${target}:print_format=json`, '-f', 'null', '-'], { capture: true }).done;
  const j = JSON.parse(m.slice(m.lastIndexOf('{'), m.lastIndexOf('}') + 1));
  await ffmpeg(['-i', src, '-af',
    `loudnorm=${target}:linear=true:measured_I=${j.input_i}:measured_TP=${j.input_tp}:measured_LRA=${j.input_lra}:measured_thresh=${j.input_thresh}:offset=${j.target_offset},alimiter=limit=0.82:level=false:attack=1:release=50`,
    '-ar', '48000', '-c:a', 'pcm_s24le', out('score.wav')]).done;
  console.log(`audio → out/score.wav (input ${j.input_i} LUFS → -16)`);
}

async function video() {
  const fps = +arg('fps', 60), scale = +arg('scale', 1);
  const { browser, page, shot } = await open(FMT, REDUCED, scale);
  const { DURATION } = await page.evaluate(() => window.META);
  const name = arg('name', `${NAMES[FMT]}${REDUCED ? '_reduced-motion' : ''}`);
  const silent = out(`${name}-silent.mp4`);
  const enc = ffmpeg(['-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
    '-pix_fmt', 'yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', silent], { stdin: 'pipe' });
  const total = Math.round(fps * DURATION);
  const t0 = Date.now();
  for (let n = 0; n < total; n++) {
    const png = await shot(n / fps);
    if (!enc.proc.stdin.write(png)) await new Promise((r) => enc.proc.stdin.once('drain', r));
    if (n % 300 === 0) console.log(`${name}: frame ${n}/${total} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  enc.proc.stdin.end();
  await enc.done;
  await browser.close();
  if (!existsSync(out('score.wav'))) await audio();
  await ffmpeg(['-i', silent, '-i', out('score.wav'), '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-ar', '48000',
    '-shortest', '-movflags', '+faststart', out(`${name}.mp4`)]).done;
  rmSync(silent);
  console.log(`video → out/${name}.mp4`);
}

async function stills() {
  const ts = arg('t').split(',').map(Number);
  const width = +arg('width', 0);
  const { browser, shot } = await open();
  const files = [];
  for (const t of ts) {
    const f = out('stills', `${FMT}${REDUCED ? '-rm' : ''}-${t.toFixed(3)}${width ? `-w${width}` : ''}.png`);
    writeFileSync(f, await shot(t));
    if (width) await ffmpeg(['-i', f, '-vf', `scale=${width}:-1:flags=lanczos`, `${f}.tmp.png`]).done.then(() => writeFileSync(f, readFileSync(`${f}.tmp.png`))).then(() => rmSync(`${f}.tmp.png`));
    files.push(f);
  }
  await browser.close();
  console.log(files.join('\n'));
}

// Contact sheet: one still at every beat that teaches something, labelled with scene ID and time.
async function contact() {
  const { browser, page, shot } = await open();
  const beats = await page.evaluate(() => {
    const E = TIMELINE.ev, B = TIMELINE.beat;
    return [
      ['S1', 0.3], ['S1', E.tapOpen + 1.0], ['S1', E.errOpen + 0.4],
      ['S2', 6.0], ['S2', E.hitGap + 0.3],
      ['S3', E.tapPhone + 0.3], ['S3', E.savePhone + 0.8],
      ['S4', E.copies[0] + B / 2], ['S4', 16.5],
      ['S5', E.tap2 + 0.3], ['S5', 23.5],
      ['S6', E.online + 0.6], ['S6', E.flush[1] + B / 2], ['S6', 31.3],
      ['S7', E.turnReset + 0.4], ['S7', E.turnTaps[1] + 0.5], ['S7', 38.0],
      ['S8', E.annotate + 0.8], ['S8', E.nextStep + 1.0], ['S8', 44.5],
    ];
  });
  const shots = [];
  for (const [id, t] of beats) shots.push({ id, t, src: `data:image/png;base64,${(await shot(t)).toString('base64')}` });
  await browser.close();
  // Lay the stills out in a browser page so each one carries its scene ID and time.
  const [w, h] = SIZE[FMT];
  const cols = FMT === '9x16' ? 10 : 5, tw = FMT === '9x16' ? 270 : 480, th = Math.round((tw * h) / w);
  const sheet = await chromium.launch({ executablePath: chromium.executablePath() });
  const p = await sheet.newPage({ viewport: { width: cols * (tw + 12) + 12, height: 100 } });
  await p.setContent(`<style>@font-face{font-family:M;src:url(${pathToFileURL(resolve(here, 'fonts/jetbrains-mono-latin-500-normal.woff2')).href})}
    body{margin:0;padding:12px;background:#E3DED3;display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:12px;font:500 14px M,monospace;color:#0A1E3C}
    figure{margin:0}img{width:${tw}px;height:${th}px;display:block}figcaption{padding:5px 2px 0;letter-spacing:.06em}</style>
    ${shots.map((s) => `<figure><img src="${s.src}"><figcaption>${s.id} · ${s.t.toFixed(2)} s</figcaption></figure>`).join('')}`);
  await p.evaluate(() => document.fonts.ready);
  const name = `${FMT === '16x9' ? 'contact' : `contact_${FMT}`}${REDUCED ? '_reduced-motion' : ''}.png`;
  await p.screenshot({ path: resolve(here, name), fullPage: true });
  await sheet.close();
  console.log(`contact sheet → ${name}`);
}

async function srt() {
  const { browser, page } = await open();
  const caps = await page.evaluate(() => TIMELINE.captions);
  await browser.close();
  const ts = (s) => {
    const ms = Math.round(s * 1000);
    const p = (n, l = 2) => String(n).padStart(l, '0');
    return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
  };
  const lines = (text) => {
    const ok = (l) => l.length <= 42 && l.split(' ').length <= 8;
    if (ok(text)) return text;
    const w = text.split(' ');
    let best = null;
    for (let k = 1; k < w.length; k++) {
      const x = w.slice(0, k).join(' '), y = w.slice(k).join(' ');
      if (ok(x) && ok(y) && (!best || Math.abs(x.length - y.length) < best[0])) best = [Math.abs(x.length - y.length), `${x}\n${y}`];
    }
    if (!best) throw new Error(`caption too long for two SRT lines: ${text}`);
    return best[1];
  };
  writeFileSync(resolve(here, 'captions.srt'), caps.map((c, i) => `${i + 1}\n${ts(c.t0)} --> ${ts(c.t1)}\n${lines(c.text)}\n`).join('\n'));
  console.log(`captions.srt: ${caps.length} cues`);
}

// Render the same t twice, with other frames painted in between, and compare pixels.
async function determinism() {
  const t = +arg('t', 23.4);
  const a = await open();
  const first = await a.shot(t);
  await a.shot(3.3); await a.shot(40.9);
  const second = await a.shot(t);
  await a.browser.close();
  const b = await open(); // fresh browser, cold start
  await b.shot(12.0);
  const third = await b.shot(t);
  await b.browser.close();
  writeFileSync(out('stills', `determinism-a-${t}.png`), first);
  writeFileSync(out('stills', `determinism-b-${t}.png`), third);
  const same = (x, y) => x.length === y.length && x.equals(y);
  console.log(`t=${t} ${FMT}: same page ${same(first, second) ? 'IDENTICAL' : 'DIFFERENT'}, fresh browser ${same(first, third) ? 'IDENTICAL' : 'DIFFERENT'} (${first.length} bytes)`);
  if (!same(first, second) || !same(first, third)) process.exit(2);
}

const CMDS = { audio, video, stills, contact, srt, determinism };
if (!CMDS[cmd]) { console.error(`usage: node render.mjs ${Object.keys(CMDS).join('|')} [...]`); process.exit(1); }
await CMDS[cmd]();
