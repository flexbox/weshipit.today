import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from 'next/og';

import { SourceBanner } from '../../components/source-banner';

const interRegular = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const interMedium = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-500-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

// Headlines mirror the website's `font-display` token (Space Grotesk 700).
// Satori can't decode woff2, so pull the .woff build.
const spaceGroteskBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const jetbrainsMonoRegular = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

// Generator handles social banner sizes + a 1200×630 og:image variant.
// The Spotify cover is served as a static image from public/.
const PLATFORM_SIZES = {
  linkedin: { height: 396, width: 1584 },
  og: { height: 630, width: 1200 },
  x: { height: 500, width: 1500 },
  youtube: { height: 1440, width: 2560 },
} as const;

type Platform = keyof typeof PLATFORM_SIZES;

function isPlatform(value: string | null): value is Platform {
  return value !== null && value in PLATFORM_SIZES;
}

// Interview logos rendered in the banner footer, ordered by episode number
// (oldest interview first). Files live under /public/images/podcast-logos/
// and are read from disk; next.config.js traces them into the function.
// Stored as PNG because Satori's webp decoder silently drops images, and
// odisei-music originally came in as JPG.
const INTERVIEW_LOGOS: ReadonlyArray<{ slug: string; ext: 'png' | 'jpg' }> = [
  { ext: 'png', slug: 'cdiscount' }, // #1
  { ext: 'png', slug: 'alan' }, // #2
  { ext: 'png', slug: 'karnott' }, // #4
  { ext: 'png', slug: 'swan' }, // #5
  { ext: 'png', slug: 'ekklo' }, // #6
  { ext: 'png', slug: 'ornikar' }, // #11
  { ext: 'png', slug: 'shine' }, // #14
  { ext: 'png', slug: 'rosk' }, // #15
  { ext: 'jpg', slug: 'odisei-music' }, // #16
  { ext: 'png', slug: 'this-week-in-react' }, // #23
  { ext: 'png', slug: 'skia' }, // #24
];

const LOGO_DIR = join(process.cwd(), 'public/images/podcast-logos');

const logos = Promise.all(
  INTERVIEW_LOGOS.map(async ({ ext, slug }) => {
    const data = await readFile(join(LOGO_DIR, `${slug}.${ext}`));
    const mime = ext === 'jpg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${data.toString('base64')}`;
  }),
);

const queryParam = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const platformParam = queryParam(req.query.platform);

    if (!isPlatform(platformParam)) {
      res
        .status(400)
        .send(
          'Missing or invalid "platform" query param. Use linkedin, youtube, x, or og.',
        );
      return;
    }

    const { height, width } = PLATFORM_SIZES[platformParam];

    const headline = queryParam(req.query.headline) ?? undefined;
    const tagline = queryParam(req.query.tagline) ?? undefined;
    const status = queryParam(req.query.status) ?? undefined;
    const url = queryParam(req.query.url) ?? undefined;

    const [regularData, mediumData, displayData, monoRegularData, logoData] =
      await Promise.all([
        interRegular,
        interMedium,
        spaceGroteskBold,
        jetbrainsMonoRegular,
        logos,
      ]);

    const image = new ImageResponse(
      (
        <SourceBanner
          width={width}
          height={height}
          platform={platformParam}
          status={status}
          headline={headline}
          tagline={tagline}
          url={url}
          logos={logoData}
        />
      ),
      {
        emoji: 'twemoji',
        fonts: [
          {
            data: regularData,
            name: 'Inter',
            style: 'normal',
            weight: 400,
          },
          {
            data: mediumData,
            name: 'Inter',
            style: 'normal',
            weight: 500,
          },
          {
            data: displayData,
            name: 'Space Grotesk',
            style: 'normal',
            weight: 700,
          },
          {
            data: monoRegularData,
            name: 'JetBrains Mono',
            style: 'normal',
            weight: 400,
          },
        ],
        height,
        width,
      },
    );

    const png = Buffer.from(await image.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    // Same header @vercel/og's ImageResponse sent before the migration.
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, max-age=31536000',
    );
    res.status(200).send(png);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error(message);
    res.status(500).send('Failed to generate banner');
  }
}
