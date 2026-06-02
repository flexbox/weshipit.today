import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { SourceBanner } from '../../components/source-banner';
import { SpotifyCover } from '../../components/spotify-cover';

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

const jetbrainsMonoBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const PLATFORM_SIZES = {
  linkedin: { width: 1584, height: 396 },
  youtube: { width: 2560, height: 1440 },
  x: { width: 1500, height: 500 },
  spotify: { width: 3000, height: 3000 },
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
        'Missing or invalid "platform" query param. Use linkedin, youtube, x, or spotify.',
        { status: 400 },
      );
    }

    const { width, height } = PLATFORM_SIZES[platformParam];

    const headline = searchParams.get('headline') ?? undefined;
    const url = searchParams.get('url') ?? undefined;
    const name = searchParams.get('name') ?? undefined;
    const handle = searchParams.get('handle') ?? undefined;
    const eyebrowLabel = searchParams.get('eyebrowLabel') ?? undefined;
    const eyebrowAccent = searchParams.get('eyebrowAccent') ?? undefined;

    const [mediumData, extraBoldData, monoRegularData, monoBoldData] =
      await Promise.all([
        interMedium,
        interExtraBold,
        jetbrainsMonoRegular,
        jetbrainsMonoBold,
      ]);

    const element =
      platformParam === 'spotify' ? (
        <SpotifyCover width={width} height={height} />
      ) : (
        <SourceBanner
          width={width}
          height={height}
          name={name}
          handle={handle}
          eyebrowLabel={eyebrowLabel}
          eyebrowAccent={eyebrowAccent}
          headline={headline}
          url={url}
        />
      );

    return new ImageResponse(element, {
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
        {
          name: 'JetBrains Mono',
          data: monoRegularData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'JetBrains Mono',
          data: monoBoldData,
          style: 'normal',
          weight: 700,
        },
      ],
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error(message);
    return new Response('Failed to generate banner', { status: 500 });
  }
}
