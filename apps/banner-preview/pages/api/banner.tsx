import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { SourceBanner } from '../../components/source-banner';

export const config = {
  runtime: 'edge',
};

const interMedium = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-500-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const interExtraBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-800-normal.woff',
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
  linkedin: { width: 1584, height: 396 },
  youtube: { width: 2560, height: 1440 },
  x: { width: 1500, height: 500 },
  og: { width: 1200, height: 630 },
} as const;

type Platform = keyof typeof PLATFORM_SIZES;

function isPlatform(value: string | null): value is Platform {
  return value !== null && value in PLATFORM_SIZES;
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const platformParam = searchParams.get('platform');

    if (!isPlatform(platformParam)) {
      return new Response(
        'Missing or invalid "platform" query param. Use linkedin, youtube, x, or og.',
        { status: 400 },
      );
    }

    const { width, height } = PLATFORM_SIZES[platformParam];

    const headline = searchParams.get('headline') ?? undefined;
    const tagline = searchParams.get('tagline') ?? undefined;
    const status = searchParams.get('status') ?? undefined;
    const url = searchParams.get('url') ?? undefined;

    const [mediumData, extraBoldData, monoRegularData] = await Promise.all([
      interMedium,
      interExtraBold,
      jetbrainsMonoRegular,
    ]);

    return new ImageResponse(
      (
        <SourceBanner
          width={width}
          height={height}
          platform={platformParam}
          status={status}
          headline={headline}
          tagline={tagline}
          url={url}
        />
      ),
      {
        width,
        height,
        emoji: 'twemoji',
        fonts: [
          {
            name: 'Inter',
            data: mediumData,
            style: 'normal',
            weight: 500,
          },
          {
            name: 'Inter',
            data: extraBoldData,
            style: 'normal',
            weight: 800,
          },
          {
            name: 'JetBrains Mono',
            data: monoRegularData,
            style: 'normal',
            weight: 400,
          },
        ],
      },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error(message);
    return new Response('Failed to generate banner', { status: 500 });
  }
}
