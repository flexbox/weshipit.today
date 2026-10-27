import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from 'next/og';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import {
  clampParam,
  loadFont,
  ogLogoFileFor,
  sendImage,
} from '../../utils/og/og-server';

const MAX_TITLE_LEN = 200;
const MAX_GUEST_LEN = 200;
const MAX_SLUG_LEN = 100;

const OG_LOGO_DIR = join(process.cwd(), 'public/images/podcast-logos/og');

const logoCache = new Map<string, Promise<string | undefined>>();

function loadLogo(companyLogo: string): Promise<string | undefined> {
  let logo = logoCache.get(companyLogo);
  if (!logo) {
    logo = readFile(join(OG_LOGO_DIR, ogLogoFileFor(companyLogo)))
      .then((data) => `data:image/png;base64,${data.toString('base64')}`)
      .catch(() => undefined);
    logoCache.set(companyLogo, logo);
  }
  return logo;
}

// Seeded PRNG (FNV-1a hash + mulberry32): the same episode always gets the
// same logo cloud, so every crawler sees the same image.
function seededRandom(seed: string): () => number {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    state = Math.imul(state ^ seed.charCodeAt(i), 16777619);
  }
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const title =
      clampParam(req.query.title, MAX_TITLE_LEN) || 'Le Cross Platform Show';
    const guest = clampParam(req.query.guest, MAX_GUEST_LEN);
    const episodeNumber = clampParam(req.query.episode, 6);
    const slug = clampParam(req.query.slug, MAX_SLUG_LEN);
    const isTranscript = clampParam(req.query.type, 20) === 'transcript';

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

    const random = seededRandom(
      currentEpisode?.slug ?? `${episodeNumber}-${title}`,
    );

    const otherLogos = Array.from(
      new Set(
        podcastEpisodes
          .filter((episode) =>
            currentEpisode ? episode.slug !== currentEpisode.slug : true,
          )
          .map((episode) => episode.company_logo)
          .filter(Boolean),
      ),
    )
      .map((logo) => ({ logo, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ logo }) => logo);

    const TARGET_COUNT = 8;
    const [currentEpisodeLogo, ...loadedLogos] = await Promise.all([
      currentEpisode?.company_logo
        ? loadLogo(currentEpisode.company_logo)
        : undefined,
      ...otherLogos.slice(0, TARGET_COUNT).map(loadLogo),
    ]);
    const randomLogos = loadedLogos.filter(Boolean) as string[];

    const CONTAINER_WIDTH = 1200;
    const CONTAINER_HEIGHT = 630;
    const EDGE_PADDING = 12;
    const AREA_X0 = Math.floor(CONTAINER_WIDTH * 0.4);
    const AREA_Y0 = Math.floor(CONTAINER_HEIGHT * 0.4);
    const placements: Array<{
      url: string;
      x: number;
      y: number;
      size: number;
    }> = [];
    const MIN_SIZE = 72;
    const MAX_SIZE = 164;
    const MAX_ATTEMPTS = 220;
    const overlapPadding = 2;

    const randomInt = (min: number, max: number) =>
      Math.floor(random() * (max - min + 1)) + min;

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
        const maxX = CONTAINER_WIDTH - size - EDGE_PADDING;
        const maxY = CONTAINER_HEIGHT - size - EDGE_PADDING;
        const rx = 1 - random() ** 4;
        const ry = 1 - random() ** 4;
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
          placements.push({ size, url, x, y });
          placed = true;
        }
      }
    }

    const episodeLine =
      episodeNumber && guest
        ? `Épisode ${episodeNumber} avec ${guest}`
        : episodeNumber
          ? `Épisode ${episodeNumber}`
          : guest
            ? `avec ${guest}`
            : '';

    const interBoldData = await loadFont('inter-latin-700-normal.woff');

    const image = new ImageResponse(
      (
        <div
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            display: 'flex',
            fontFamily: 'Inter',
            height: '100%',
            justifyContent: 'center',
            padding: '32px',
            position: 'relative',
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              left: 32,
              position: 'absolute',
              textAlign: 'left',
              top: 32,
            }}
          >
            <div
              style={{
                color: '#374151',
                fontSize: '64px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}
            >
              Le Cross Platform Show
            </div>

            <div
              style={{
                color: '#111827',
                fontSize: title && title.length > 50 ? '48px' : '56px',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                alignItems: 'center',
                color: '#6b7280',
                display: 'flex',
                fontSize: '22px',
                fontWeight: 700,
                marginTop: '18px',
              }}
            >
              {isTranscript ? (
                <div
                  style={{
                    backgroundColor: '#111827',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '18px',
                    letterSpacing: '0.06em',
                    marginRight: '14px',
                    padding: '6px 12px',
                    textTransform: 'uppercase',
                  }}
                >
                  Transcription
                </div>
              ) : null}
              {episodeLine}
            </div>
          </div>

          {currentEpisodeLogo ? (
            <img
              src={currentEpisodeLogo}
              alt="Episode logo"
              style={{
                background: 'white',
                borderRadius: '12px',
                bottom: 32,
                left: 32,
                objectFit: 'cover',
                position: 'absolute',
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
                borderRadius: '9999px',
                left: `${p.x}px`,
                objectFit: 'cover',
                position: 'absolute',
                top: `${p.y}px`,
              }}
              width={p.size}
              height={p.size}
            />
          ))}
        </div>
      ),
      {
        fonts: [
          {
            data: interBoldData,
            name: 'Inter',
            style: 'normal',
            weight: 700,
          },
        ],
        height: 630,
        width: 1200,
      },
    );

    await sendImage(res, image);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to generate the podcast og image');
  }
}
