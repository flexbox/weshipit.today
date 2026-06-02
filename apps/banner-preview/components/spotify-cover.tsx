import { CONFIG } from '../config/config';

const SPOTIFY = CONFIG.spotify;
const BANNER = CONFIG.banner;

interface SpotifyCoverProps {
  width: number;
  height: number;
  title?: string;
  author?: string;
  about?: string;
}

// iTerm2 Snazzy palette — github.com/sindresorhus/iterm2-snazzy
const COLORS = {
  bg: '#282A36',
  phosphor: '#57C7FF',
  phosphorDim: '#686868',
  cyberWash: '#EFF0EB',
  magenta: '#FF6AC1',
  magentaGlow: 'rgba(255, 106, 193, 0.55)',
  greenGlow: 'rgba(87, 199, 255, 0.55)',
  scanline: 'rgba(87, 199, 255, 0.06)',
};

const BLOCK_WALL_ROWS = [
  '█▓▒░ ▓██▒ ░▒▓█ ▓▒░█ █▓▒░',
  '▒▓██ ░░▓▒ ██▓░ ▒▓█▓ ▓▒░█',
  '░▓█▓ ▒██░ ▓▒█▓ █▓▒░ ▒▓██',
  '▓██▒ ▓░▒▓ ░█▓▒ ▒▓█░ █▓▒░',
];

export function SpotifyCover({
  width,
  height,
  title = SPOTIFY.title,
  author = SPOTIFY.author,
  about = SPOTIFY.about,
}: SpotifyCoverProps) {
  // Split the title into stacked uppercase lines (CROSS / PLATFORM / SHOW)
  const titleLines = title.toUpperCase().split(' ');

  const titleSize = Math.round(width * 0.105);
  const tagSize = Math.round(width * 0.022);
  const infoSize = Math.round(width * 0.022);
  const aboutSize = Math.round(width * 0.022);

  const padX = Math.round(width * 0.06);
  const padY = Math.round(height * 0.06);

  // Inner frame paddings + outer margin determine how much horizontal room is
  // left for value text once the label column is subtracted.
  const innerPadX = Math.round(width * 0.06);
  const frameContentWidth = width - padX * 2 - innerPadX * 2;
  const labelWidth = infoSize * 9;
  const valueWidth = frameContentWidth - labelWidth;

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: COLORS.bg,
        fontFamily: '"JetBrains Mono", monospace',
        overflow: 'hidden',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `repeating-linear-gradient(to bottom, ${COLORS.scanline} 0px, ${COLORS.scanline} 2px, transparent 2px, transparent 6px)`,
        }}
      />

      {/* Soft radial spotlight */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: `${width}px`,
          height: `${height}px`,
          transform: 'translate(-50%, -50%)',
          backgroundImage: `radial-gradient(ellipse at center, rgba(87, 199, 255, 0.10) 0%, rgba(40, 42, 54, 0) 60%)`,
        }}
      />

      {/* Block-glyph wall — bottom decoration */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          bottom: `${Math.round(height * 0.04)}px`,
          left: `${Math.round(width * 0.06)}px`,
          color: COLORS.phosphorDim,
          fontSize: `${Math.round(width * 0.03)}px`,
          lineHeight: 1.1,
          letterSpacing: '0.05em',
          fontWeight: 700,
          opacity: 0.35,
        }}
      >
        {BLOCK_WALL_ROWS.map((row) => (
          <div key={row} style={{ display: 'flex' }}>
            {row}
          </div>
        ))}
      </div>

      {/* Frame with stacked outer border (Satori 0.12.2 chokes on
          border-style: double, so we fake it with box-shadow). */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: `${width - padX * 2}px`,
          height: `${height - padY * 2}px`,
          margin: `${padY}px ${padX}px`,
          border: `4px solid ${COLORS.phosphor}`,
          backgroundColor: 'rgba(40, 42, 54, 0.55)',
          paddingTop: `${Math.round(height * 0.08)}px`,
          paddingBottom: `${Math.round(height * 0.08)}px`,
          paddingLeft: `${Math.round(width * 0.06)}px`,
          paddingRight: `${Math.round(width * 0.06)}px`,
          boxShadow: `0 0 0 8px ${COLORS.bg}, 0 0 0 12px ${COLORS.phosphor}, 0 0 64px ${COLORS.greenGlow}`,
        }}
      >
        {/* Top-left corner tag */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: `-${Math.round(tagSize * 0.7)}px`,
            left: `${Math.round(width * 0.04)}px`,
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
          [ {BANNER.handle} ]
        </div>

        {/* Top-right corner tag */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: `-${Math.round(tagSize * 0.7)}px`,
            right: `${Math.round(width * 0.04)}px`,
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
          [ {BANNER.url} ]
        </div>

        {/* Stacked title block: "CROSS / PLATFORM / SHOW [#1]" */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: `${titleSize}px`,
            fontWeight: 700,
            color: COLORS.phosphor,
            letterSpacing: '0.02em',
            lineHeight: 1,
            textShadow: `0 0 24px ${COLORS.greenGlow}, 0 0 64px rgba(87, 199, 255, 0.3)`,
          }}
        >
          {titleLines.map((line, i) => (
            <div
              key={line}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: `${Math.round(titleSize * 0.25)}px`,
              }}
            >
              {i === 0 && (
                <span style={{ display: 'flex', color: COLORS.phosphorDim }}>
                  &gt;
                </span>
              )}
              <span style={{ display: 'flex' }}>{line}</span>
              {i === titleLines.length - 1 && (
                <span
                  style={{
                    display: 'flex',
                    color: COLORS.magenta,
                    textShadow: `0 0 18px ${COLORS.magentaGlow}, 0 0 6px ${COLORS.magentaGlow}`,
                  }}
                >
                  [{BANNER.eyebrow.accent}]
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div
          style={{
            display: 'flex',
            marginTop: `${Math.round(height * 0.05)}px`,
            marginBottom: `${Math.round(height * 0.03)}px`,
            color: COLORS.phosphorDim,
            fontSize: `${infoSize}px`,
            fontWeight: 400,
          }}
        >
          =====================================
        </div>

        {/* Info block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: `${infoSize}px`,
            fontWeight: 400,
            color: COLORS.cyberWash,
            lineHeight: 1.5,
            letterSpacing: '0.02em',
          }}
        >
          <div style={{ display: 'flex' }}>
            <span
              style={{
                display: 'flex',
                color: COLORS.phosphorDim,
                width: `${labelWidth}px`,
                flexShrink: 0,
              }}
            >
              author&nbsp;:
            </span>
            <span style={{ display: 'flex', width: `${valueWidth}px` }}>
              {author}
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <span
              style={{
                display: 'flex',
                color: COLORS.phosphorDim,
                width: `${labelWidth}px`,
                flexShrink: 0,
              }}
            >
              topic&nbsp;&nbsp;:
            </span>
            <span style={{ display: 'flex', width: `${valueWidth}px` }}>
              {BANNER.tagline}
            </span>
          </div>
        </div>

        {/* About block — wraps */}
        <div
          style={{
            display: 'flex',
            marginTop: `${Math.round(height * 0.03)}px`,
            fontSize: `${aboutSize}px`,
            fontWeight: 400,
            color: COLORS.cyberWash,
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          }}
        >
          <span
            style={{
              display: 'flex',
              color: COLORS.phosphorDim,
              width: `${labelWidth}px`,
              flexShrink: 0,
            }}
          >
            about&nbsp;&nbsp;:
          </span>
          <span style={{ display: 'flex', width: `${valueWidth}px` }}>
            {about}
          </span>
        </div>
      </div>
    </div>
  );
}
