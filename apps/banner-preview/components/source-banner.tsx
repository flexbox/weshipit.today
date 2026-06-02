import { CONFIG } from '../config/config';

const BANNER = CONFIG.banner;

interface SourceBannerProps {
  width: number;
  height: number;
  name?: string;
  handle?: string;
  eyebrowLabel?: string;
  eyebrowAccent?: string;
  headline?: string;
  tagline?: string;
  url?: string;
}

// Smallest rectangle visible across LinkedIn 1584×396, YouTube mobile-safe 1546×423,
// and X 1500×500. Anything inside this band is guaranteed visible on every platform.
export const SAFE_BAND = { width: 1500, height: 396 };

// iTerm2 Snazzy palette — github.com/sindresorhus/iterm2-snazzy
const COLORS = {
  bg: '#282A36',
  phosphor: '#57C7FF', // ANSI 4 blue — headline, border, prompt, corner tags
  phosphorDim: '#686868',
  cyberWash: '#EFF0EB',
  magenta: '#FF6AC1',
  magentaGlow: 'rgba(255, 106, 193, 0.55)',
  greenGlow: 'rgba(87, 199, 255, 0.55)',
  scanline: 'rgba(87, 199, 255, 0.06)',
};

// Block-glyph wall: pre-baked pseudo-random rows of demo-scene characters.
const BLOCK_WALL_ROWS = [
  '█▓▒░ ▓██▒ ░▒▓█ ▓▒░█',
  '▒▓██ ░░▓▒ ██▓░ ▒▓█▓',
  '░▓█▓ ▒██░ ▓▒█▓ █▓▒░',
  '▓██▒ ▓░▒▓ ░█▓▒ ▒▓█░',
  '█▓▒░ ▒▓█▓ ▓░▒█ ░█▓▒',
  '░▓█▒ ▓█▒░ ▒░▓█ █▓▒░',
];

export function SourceBanner({
  width,
  height,
  name = BANNER.name,
  handle = BANNER.handle,
  eyebrowLabel = BANNER.eyebrow.label,
  eyebrowAccent = BANNER.eyebrow.accent,
  headline = BANNER.headline,
  tagline = BANNER.tagline,
  url = BANNER.url,
}: SourceBannerProps) {
  const safeWidth = Math.min(SAFE_BAND.width, width);
  const safeHeight = Math.min(SAFE_BAND.height, height);

  // Scale typography to the safe band so all platforms read consistently.
  const headlineSize = Math.round(safeHeight * 0.16);
  const infoSize = Math.round(safeHeight * 0.06);
  const tagSize = Math.round(safeHeight * 0.05);

  // Suppress lint warning for fields kept for runtime override surface but unused
  // at the JSX level (the eyebrowLabel is folded into the corner tag content).
  void eyebrowLabel;

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
        fontFamily: '"JetBrains Mono", monospace',
        overflow: 'hidden',
      }}
    >
      {/* Scanline overlay — fakes a CRT phosphor screen */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `repeating-linear-gradient(to bottom, ${COLORS.scanline} 0px, ${COLORS.scanline} 1px, transparent 1px, transparent 3px)`,
        }}
      />

      {/* Subtle radial glow from center */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${width}px`,
          height: `${height * 1.4}px`,
          transform: 'translate(-50%, -50%)',
          backgroundImage: `radial-gradient(ellipse at center, rgba(51, 255, 102, 0.10) 0%, rgba(0, 0, 0, 0) 60%)`,
        }}
      />

      {/* Right-side block-glyph wall (demoscene noise) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '50%',
          right: `${Math.round(width * 0.02)}px`,
          transform: 'translateY(-50%)',
          color: COLORS.phosphorDim,
          fontSize: `${Math.round(safeHeight * 0.08)}px`,
          lineHeight: 1.1,
          letterSpacing: '0.05em',
          fontWeight: 700,
          opacity: 0.45,
        }}
      >
        {BLOCK_WALL_ROWS.map((row) => (
          <div key={row} style={{ display: 'flex' }}>
            {row}
          </div>
        ))}
      </div>

      {/* Left-side block-glyph wall (mirror, even dimmer) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '50%',
          left: `${Math.round(width * 0.02)}px`,
          transform: 'translateY(-50%)',
          color: COLORS.phosphorDim,
          fontSize: `${Math.round(safeHeight * 0.08)}px`,
          lineHeight: 1.1,
          letterSpacing: '0.05em',
          fontWeight: 700,
          opacity: 0.25,
        }}
      >
        {BLOCK_WALL_ROWS.map((row) => (
          <div key={row} style={{ display: 'flex' }}>
            {row}
          </div>
        ))}
      </div>

      {/* Safe band with double-line border */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: `${safeWidth}px`,
          height: `${safeHeight}px`,
          border: `2px solid ${COLORS.phosphor}`,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          paddingTop: `${Math.round(safeHeight * 0.12)}px`,
          paddingBottom: `${Math.round(safeHeight * 0.12)}px`,
          paddingLeft: `${Math.round(safeWidth * 0.04)}px`,
          paddingRight: `${Math.round(safeWidth * 0.04)}px`,
          // Stacked outer shadow fakes the demoscene double-line border
          // (Satori 0.12.2 crashes on border-style: double).
          boxShadow: `0 0 0 4px ${COLORS.bg}, 0 0 0 6px ${COLORS.phosphor}, 0 0 32px ${COLORS.greenGlow}`,
        }}
      >
        {/* Top-left corner tag — interrupts the border */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: `-${Math.round(tagSize * 0.7)}px`,
            left: `${Math.round(safeWidth * 0.04)}px`,
            alignItems: 'center',
            paddingLeft: `${Math.round(tagSize * 0.6)}px`,
            paddingRight: `${Math.round(tagSize * 0.6)}px`,
            fontSize: `${tagSize}px`,
            fontWeight: 700,
            color: COLORS.phosphor,
            backgroundColor: COLORS.bg,
            letterSpacing: '0.1em',
            textShadow: `0 0 6px ${COLORS.greenGlow}`,
          }}
        >
          [ {handle} ]
        </div>

        {/* Top-right corner tag — interrupts the border */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: `-${Math.round(tagSize * 0.7)}px`,
            right: `${Math.round(safeWidth * 0.04)}px`,
            alignItems: 'center',
            paddingLeft: `${Math.round(tagSize * 0.6)}px`,
            paddingRight: `${Math.round(tagSize * 0.6)}px`,
            fontSize: `${tagSize}px`,
            fontWeight: 700,
            color: COLORS.phosphor,
            backgroundColor: COLORS.bg,
            letterSpacing: '0.1em',
            textShadow: `0 0 6px ${COLORS.greenGlow}`,
          }}
        >
          [ {url} ]
        </div>

        {/* Headline row — brand name + [#1] punctuation pop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: `${Math.round(headlineSize * 0.3)}px`,
            fontSize: `${headlineSize}px`,
            fontWeight: 700,
            color: COLORS.phosphor,
            letterSpacing: '0.02em',
            lineHeight: 1,
            textShadow: `0 0 12px ${COLORS.greenGlow}, 0 0 32px rgba(51, 255, 102, 0.3)`,
          }}
        >
          <span style={{ display: 'flex', color: COLORS.phosphorDim }}>
            &gt;
          </span>
          <span style={{ display: 'flex' }}>{headline}</span>
          <span
            style={{
              display: 'flex',
              color: COLORS.magenta,
              textShadow: `0 0 12px ${COLORS.magentaGlow}, 0 0 4px ${COLORS.magentaGlow}`,
            }}
          >
            [{eyebrowAccent}]
          </span>
        </div>

        {/* Separator */}
        <div
          style={{
            display: 'flex',
            marginTop: `${Math.round(safeHeight * 0.06)}px`,
            marginBottom: `${Math.round(safeHeight * 0.04)}px`,
            color: COLORS.phosphorDim,
            fontSize: `${infoSize}px`,
            letterSpacing: '0',
            fontWeight: 400,
          }}
        >
          ==============================
        </div>

        {/* Terminal info block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: `${infoSize}px`,
            fontWeight: 400,
            color: COLORS.cyberWash,
            lineHeight: 1.4,
            letterSpacing: '0.02em',
          }}
        >
          <div style={{ display: 'flex' }}>
            <span
              style={{
                display: 'flex',
                color: COLORS.phosphorDim,
                width: `${infoSize * 7}px`,
              }}
            >
              host&nbsp;&nbsp;:
            </span>
            <span style={{ display: 'flex' }}>
              {name} / {handle}
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <span
              style={{
                display: 'flex',
                color: COLORS.phosphorDim,
                width: `${infoSize * 7}px`,
              }}
            >
              topic&nbsp;:
            </span>
            <span style={{ display: 'flex' }}>{tagline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
