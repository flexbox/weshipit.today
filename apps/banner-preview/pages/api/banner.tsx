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

const PLATFORM_SIZES = {
  linkedin: { width: 1584, height: 396 },
  youtube: { width: 2560, height: 1440 },
  x: { width: 1500, height: 500 },
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
        'Missing or invalid "platform" query param. Use linkedin, youtube, or x.',
        { status: 400 },
      );
    }

    const { width, height } = PLATFORM_SIZES[platformParam];

    const headline = searchParams.get('headline') ?? undefined;
    const url = searchParams.get('url') ?? undefined;

    const [mediumData, extraBoldData] = await Promise.all([
      interMedium,
      interExtraBold,
    ]);

    return new ImageResponse(
      (
        <SourceBanner
          width={width}
          height={height}
          headline={headline}
          url={url}
        />
      ),
      {
        width,
        height,
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
        ],
      },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error(message);
    return new Response('Failed to generate banner', { status: 500 });
  }
}
