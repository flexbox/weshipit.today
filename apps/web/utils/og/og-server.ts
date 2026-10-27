import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { NextApiResponse } from 'next';
import type { ImageResponse } from 'next/og';

// Fonts are read from disk rather than fetched, so a cold start has no CDN
// round-trip. next.config.js traces public/fonts into the OG functions.
const FONT_DIR = join(process.cwd(), 'public/fonts');

// Satori can't decode webp, so podcast OG images read 256px PNG copies of
// every logo from public/images/podcast-logos/og/ (same name, .png).
export const ogLogoFileFor = (companyLogo: string): string =>
  `${companyLogo
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '')}.png`;

const fontCache = new Map<string, Promise<ArrayBuffer>>();

export function loadFont(file: string): Promise<ArrayBuffer> {
  let font = fontCache.get(file);
  if (!font) {
    font = readFile(join(FONT_DIR, file)).then(
      (data) => new Uint8Array(data).buffer as ArrayBuffer,
    );
    fontCache.set(file, font);
  }
  return font;
}

export function clampParam(
  value: string | string[] | undefined,
  max: number,
): string {
  const first = Array.isArray(value) ? value[0] : value;
  return (first ?? '').slice(0, max);
}

export async function sendImage(
  res: NextApiResponse,
  image: ImageResponse,
): Promise<void> {
  const png = Buffer.from(await image.arrayBuffer());
  res.setHeader('Content-Type', 'image/png');
  // Every OG URL carries a `v` param (see og-image-path.ts), so caching
  // forever is safe: a template change ships new URLs.
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, max-age=31536000, s-maxage=31536000',
  );
  res.status(200).send(png);
}
