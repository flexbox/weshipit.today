import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { fromSearchParams, type Slot } from '../../../lib/grid-state';
import { gridHeading, type TileView, toTileView } from '../../../lib/tile-view';

const FORMATS = {
  og: { height: 630, width: 1200 },
  square: { height: 1080, width: 1080 },
} as const;

const PAGE = '#09090b';
const TILE = '#121215';
const ACCENT = '#bef264';

function loadFont(file: string) {
  return fetch(`https://cdn.jsdelivr.net/npm/@fontsource/${file}.woff`).then(
    (res) => res.arrayBuffer(),
  );
}

// Module-level promises: fonts are fetched once per server instance.
const fonts = Promise.all([
  loadFont('inter/files/inter-latin-500-normal'),
  loadFont('inter/files/inter-latin-800-normal'),
  loadFont('jetbrains-mono/files/jetbrains-mono-latin-400-normal'),
  loadFont('jetbrains-mono/files/jetbrains-mono-latin-700-normal'),
]);

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const state = fromSearchParams(params);
  const format = params.format === 'square' ? 'square' : 'og';
  const { height, width } = FORMATS[format];
  const heading =
    params.variant === 'home'
      ? 'Which 9 frameworks shaped you?'
      : gridHeading(state.title);

  const [interMedium, interExtraBold, monoRegular, monoBold] = await fonts;

  const image = new ImageResponse(
    format === 'square' ? (
      <SquareLayout heading={heading} slots={state.slots} />
    ) : (
      <OgLayout heading={heading} slots={state.slots} />
    ),
    {
      fonts: [
        { data: interMedium, name: 'Inter', style: 'normal', weight: 500 },
        { data: interExtraBold, name: 'Inter', style: 'normal', weight: 800 },
        { data: monoRegular, name: 'Mono', style: 'normal', weight: 400 },
        { data: monoBold, name: 'Mono', style: 'normal', weight: 700 },
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      height,
      width,
    },
  );
  return image;
}

function OgLayout({ heading, slots }: { heading: string; slots: Slot[] }) {
  return (
    <div
      style={{
        background: PAGE,
        display: 'flex',
        fontFamily: 'Inter',
        height: '100%',
        padding: 56,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingRight: 48,
        }}
      >
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#fafafa',
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {heading}
          </div>
          <div style={{ color: '#71717a', fontSize: 28, marginTop: 20 }}>
            The tools that shaped the developer I am.
          </div>
        </div>
        <div style={{ color: '#52525b', fontFamily: 'Mono', fontSize: 20 }}>
          Build yours → 9frameworks
        </div>
      </div>
      <Grid gap={12} size={518} slots={slots} />
    </div>
  );
}

function SquareLayout({ heading, slots }: { heading: string; slots: Slot[] }) {
  return (
    <div
      style={{
        alignItems: 'center',
        background: PAGE,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter',
        height: '100%',
        padding: 64,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Brand />
        <div style={{ color: '#52525b', fontFamily: 'Mono', fontSize: 20 }}>
          oldest → newest
        </div>
      </div>
      <div
        style={{
          color: '#fafafa',
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: -1.5,
          marginBottom: 36,
          marginTop: 28,
          textAlign: 'center',
        }}
      >
        {heading}
      </div>
      <Grid gap={14} size={760} slots={slots} />
    </div>
  );
}

function Brand() {
  return (
    <div
      style={{
        alignItems: 'center',
        color: '#e4e4e7',
        display: 'flex',
        fontFamily: 'Mono',
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      <svg
        height="28"
        style={{ marginRight: 12 }}
        viewBox="0 0 20 20"
        width="28"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            fill={i === 4 ? ACCENT : '#e4e4e7'}
            height="5"
            key={i}
            opacity={i === 4 ? 1 : 0.35}
            rx="1.2"
            width="5"
            x={(i % 3) * 7 + 0.5}
            y={Math.floor(i / 3) * 7 + 0.5}
          />
        ))}
      </svg>
      9frameworks
    </div>
  );
}

function Grid({
  gap,
  size,
  slots,
}: {
  gap: number;
  size: number;
  slots: Slot[];
}) {
  const tileSize = Math.floor((size - gap * 2) / 3);
  // Explicit rows: flex-wrap drops to two columns on sub-pixel rounding.
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, gap }}
    >
      {[0, 3, 6].map((start) => (
        <div key={start} style={{ display: 'flex', gap }}>
          {slots.slice(start, start + 3).map((slot, offset) => (
            <Tile
              index={start + offset}
              key={start + offset}
              size={tileSize}
              tile={toTileView(slot)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Tile({
  index,
  size,
  tile,
}: {
  index: number;
  size: number;
  tile: TileView | null;
}) {
  const label = String(index + 1).padStart(2, '0');
  const indexStyle = {
    color: '#52525b',
    fontFamily: 'Mono',
    fontSize: size * 0.075,
    left: size * 0.08,
    position: 'absolute' as const,
    top: size * 0.06,
  };

  if (!tile) {
    return (
      <div
        style={{
          border: '2px dashed #27272a',
          borderRadius: size * 0.12,
          display: 'flex',
          height: size,
          position: 'relative',
          width: size,
        }}
      >
        <div style={indexStyle}>{label}</div>
      </div>
    );
  }

  const glyphSize = size * 0.38;
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: TILE,
        backgroundImage: `radial-gradient(circle at 50% 38%, ${tile.color}2e 0%, transparent 62%)`,
        border: '1px solid #1f1f23',
        borderRadius: size * 0.12,
        display: 'flex',
        flexDirection: 'column',
        height: size,
        justifyContent: 'center',
        position: 'relative',
        width: size,
      }}
    >
      <div style={indexStyle}>{label}</div>
      {tile.path ? (
        <svg
          fill={tile.color}
          height={glyphSize}
          viewBox="0 0 24 24"
          width={glyphSize}
        >
          <path d={tile.path} />
        </svg>
      ) : (
        <div
          style={{
            alignItems: 'center',
            border: `${size * 0.012}px solid ${tile.color}`,
            borderRadius: glyphSize * 0.22,
            color: tile.color,
            display: 'flex',
            fontFamily: 'Mono',
            fontSize: glyphSize * 0.38,
            fontWeight: 700,
            height: glyphSize,
            justifyContent: 'center',
            width: glyphSize,
          }}
        >
          {tile.mark}
        </div>
      )}
      <div
        style={{
          color: '#f4f4f5',
          fontSize: size * 0.1,
          fontWeight: 500,
          marginTop: size * 0.07,
          maxWidth: size * 0.88,
          textAlign: 'center',
        }}
      >
        {tile.name}
      </div>
      {tile.year ? (
        <div
          style={{
            color: '#71717a',
            fontFamily: 'Mono',
            fontSize: size * 0.065,
            marginTop: size * 0.02,
          }}
        >
          {`since ${tile.year}`}
        </div>
      ) : null}
    </div>
  );
}
