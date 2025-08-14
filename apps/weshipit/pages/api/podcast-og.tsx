import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';

export const config = {
  runtime: 'edge',
};

const interBold = fetch(
  new URL(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'Le Cross Platform Show';
    const guest = searchParams.get('guest') || '';
    const episodeNumber = searchParams.get('episode') || '';
    const slug = searchParams.get('slug') || '';

    const currentEpisode = (() => {
      if (slug) {
        return podcastEpisodes.find(
          (episode) => episode.slug.toLowerCase() === slug.toLowerCase(),
        );
      }
      if (episodeNumber) {
        const num = Number(episodeNumber);
        if (!Number.isNaN(num)) {
          return podcastEpisodes.find((episode) => episode.number === num);
        }
      }
      return undefined;
    })();

    const toSupportedImageType = (url?: string): string | undefined => {
      if (!url) return undefined;
      return url.replace(/\.webp(\?.*)?$/i, '.png$1');
    };

    const currentEpisodeLogo = toSupportedImageType(
      currentEpisode?.companyLogo,
    );

    const allOtherLogos = podcastEpisodes
      .filter((e) => (currentEpisode ? e.slug !== currentEpisode.slug : true))
      .map((e) => e.companyLogo)
      .filter(Boolean);

    const shuffled = allOtherLogos
      .map((logo) => ({ logo, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ logo }) => logo);

    const TARGET_COUNT = 15;
    const randomLogos = Array.from(new Set(shuffled))
      .map((u) => toSupportedImageType(u))
      .filter(Boolean)
      .slice(0, TARGET_COUNT) as string[];

    const FALLBACK_LOGO = 'https://weshipit.today/images/podcast.jpeg';
    while (randomLogos.length < TARGET_COUNT) {
      randomLogos.push(FALLBACK_LOGO);
    }

    const PADDING = 32;
    const CONTAINER_WIDTH = 1200;
    const CONTAINER_HEIGHT = 630;
    const EDGE_PADDING = 12;
    const PLACEMENT_WIDTH = CONTAINER_WIDTH;
    const PLACEMENT_HEIGHT = CONTAINER_HEIGHT;
    const AREA_X0 = Math.floor(PLACEMENT_WIDTH * 0.4);
    const AREA_Y0 = Math.floor(PLACEMENT_HEIGHT * 0.4);
    const placements: Array<{
      url: string;
      x: number;
      y: number;
      size: number;
    }> = [];
    const MIN_SIZE = 64;
    const MAX_SIZE = 164;
    const MAX_ATTEMPTS = 220;
    const overlapPadding = 2;

    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (const url of randomLogos) {
      let placed = false;
      for (let attempt = 0; attempt < MAX_ATTEMPTS && !placed; attempt++) {
        const decreasingMax = Math.max(
          MIN_SIZE,
          Math.floor(
            MAX_SIZE - (attempt / MAX_ATTEMPTS) * (MAX_SIZE - MIN_SIZE),
          ),
        );
        const size = randomInt(MIN_SIZE, decreasingMax);
        const maxX = PLACEMENT_WIDTH - size - EDGE_PADDING;
        const maxY = PLACEMENT_HEIGHT - size - EDGE_PADDING;
        const rx = 1 - Math.random() ** 4;
        const ry = 1 - Math.random() ** 4;
        const x = Math.floor(
          AREA_X0 + (Math.max(AREA_X0, maxX) - AREA_X0) * rx,
        );
        const y = Math.floor(
          AREA_Y0 + (Math.max(AREA_Y0, maxY) - AREA_Y0) * ry,
        );
        let ok = true;
        for (const p of placements) {
          const dx = p.x + p.size / 2 - (x + size / 2);
          const dy = p.y + p.size / 2 - (y + size / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < p.size / 2 + size / 2 + overlapPadding) {
            ok = false;
            break;
          }
        }
        if (ok) {
          placements.push({ url, x, y, size });
          placed = true;
        }
      }
    }

    const [interBoldData] = await Promise.all([interBold]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '32px',
            position: 'relative',
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \n  \tNoto Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 32,
              left: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                fontWeight: 700,
                color: '#374151',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Le Cross Platform Show
            </div>

            <div
              style={{
                fontSize: title && title.length > 50 ? '48px' : '56px',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#6b7280',
                marginTop: '18px',
              }}
            >
              {episodeNumber && guest
                ? `Épisode ${episodeNumber} avec ${guest}`
                : episodeNumber
                  ? `Épisode ${episodeNumber}`
                  : guest
                    ? `avec ${guest}`
                    : ''}
            </div>
          </div>

          {currentEpisodeLogo ? (
            <img
              src={currentEpisodeLogo}
              alt="Episode logo"
              style={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                borderRadius: '12px',
                objectFit: 'cover',
                background: 'white',
              }}
              width={200}
              height={200}
            />
          ) : null}

          {placements.map((p, idx) => (
            <img
              key={`${p.url}-${idx}`}
              src={p.url}
              alt="logo"
              style={{
                position: 'absolute',
                left: `${p.x}px`,
                top: `${p.y}px`,
                borderRadius: '9999px',
                objectFit: 'cover',
              }}
              width={p.size}
              height={p.size}
            />
          ))}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interBoldData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBoldData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the podcast og image`, {
      status: 500,
    });
  }
}
