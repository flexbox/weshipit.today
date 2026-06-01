interface SourceBannerProps {
  width: number;
  height: number;
  headline?: string;
  url?: string;
}

const DEFAULTS = {
  headline: "REACT NATIVE POUR LES CTO'S",
  url: 'weshipit.today',
};

// Smallest rectangle visible across LinkedIn 1584×396, YouTube mobile-safe 1546×423,
// and X 1500×500. Anything inside this band is guaranteed visible on every platform.
export const SAFE_BAND = { width: 1500, height: 396 };

const COLORS = {
  bgDeep: '#0A0F1E',
  bgMid: '#142036',
  foreground: '#FFFFFF',
  muted: '#9BA8C2',
  cyan: '#61DAFB',
  cyanGlow: 'rgba(97, 218, 251, 0.35)',
  hot: '#FF6A2E',
  hotGlow: 'rgba(255, 106, 46, 0.55)',
};

function ReactAtom({
  size,
  opacity = 0.18,
}: {
  size: number;
  opacity?: number;
}) {
  const stroke = size * 0.025;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      style={{ display: 'flex' }}
    >
      <circle r="6" fill={COLORS.cyan} opacity={opacity * 2.5} />
      <g
        fill="none"
        stroke={COLORS.cyan}
        strokeWidth={stroke}
        opacity={opacity}
      >
        <ellipse rx="42" ry="16" />
        <ellipse rx="42" ry="16" transform="rotate(60)" />
        <ellipse rx="42" ry="16" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function SourceBanner({
  width,
  height,
  headline = DEFAULTS.headline,
  url = DEFAULTS.url,
}: SourceBannerProps) {
  const safeWidth = Math.min(SAFE_BAND.width, width);
  const safeHeight = Math.min(SAFE_BAND.height, height);

  // Scale typography to the safe band so all three platforms read consistently.
  const headlineSize = Math.round(safeHeight * 0.18);
  const eyebrowSize = Math.round(safeHeight * 0.07);
  const subSize = Math.round(safeHeight * 0.065);
  const urlSize = Math.round(safeHeight * 0.055);

  const atomSize = Math.round(height * 0.95);

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bgDeep,
        backgroundImage: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgMid} 0%, ${COLORS.bgDeep} 65%)`,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic spotlight glow */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${width * 0.9}px`,
          height: `${height * 1.6}px`,
          transform: 'translate(-50%, -50%)',
          backgroundImage: `radial-gradient(ellipse at center, ${COLORS.cyanGlow} 0%, rgba(10, 15, 30, 0) 60%)`,
        }}
      />

      {/* Decorative React atom — right side, behind type */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '50%',
          right: `-${atomSize * 0.18}px`,
          transform: 'translateY(-50%)',
        }}
      >
        <ReactAtom size={atomSize} opacity={0.16} />
      </div>

      {/* Decorative React atom — left side, smaller */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '50%',
          left: `-${atomSize * 0.25}px`,
          transform: 'translateY(-50%)',
        }}
      >
        <ReactAtom size={atomSize * 0.7} opacity={0.1} />
      </div>

      {/* Centered safe band */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${safeWidth}px`,
          height: `${safeHeight}px`,
          gap: `${Math.round(safeHeight * 0.04)}px`,
          position: 'relative',
          paddingLeft: `${Math.round(safeWidth * 0.06)}px`,
          paddingRight: `${Math.round(safeWidth * 0.06)}px`,
        }}
      >
        {/* Eyebrow: LE PODCAST #1 with hot-orange punctuation pop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: `${Math.round(eyebrowSize * 0.35)}px`,
            fontSize: `${eyebrowSize}px`,
            fontWeight: 800,
            color: COLORS.cyan,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ display: 'flex' }}>LE PODCAST</span>
          <span
            style={{
              display: 'flex',
              color: COLORS.hot,
              textShadow: `0 0 24px ${COLORS.hotGlow}, 0 0 8px ${COLORS.hotGlow}`,
            }}
          >
            #1
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            fontSize: `${headlineSize}px`,
            fontWeight: 800,
            color: COLORS.foreground,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          {headline}
        </div>

        {/* Sub-line: identity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${Math.round(subSize * 0.6)}px`,
            fontSize: `${subSize}px`,
            fontWeight: 500,
            color: COLORS.muted,
          }}
        >
          <span style={{ display: 'flex' }}>David Leuliette</span>
          <span style={{ display: 'flex', color: COLORS.cyan }}>·</span>
          <span style={{ display: 'flex' }}>@flexbox_</span>
        </div>

        {/* weshipit lockup — anchored inside the safe band's top-right
            so it stays visible above the X follow button and clear of
            the lower-left avatar overlap on every platform. */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: `${Math.round(safeHeight * 0.08)}px`,
            right: `${Math.round(safeWidth * 0.06)}px`,
            alignItems: 'center',
            paddingLeft: `${Math.round(urlSize * 0.8)}px`,
            paddingRight: `${Math.round(urlSize * 0.8)}px`,
            paddingTop: `${Math.round(urlSize * 0.4)}px`,
            paddingBottom: `${Math.round(urlSize * 0.4)}px`,
            fontSize: `${urlSize}px`,
            fontWeight: 800,
            color: COLORS.foreground,
            letterSpacing: '0.04em',
            border: `2px solid ${COLORS.cyan}`,
            borderRadius: `${Math.round(urlSize * 0.6)}px`,
            backgroundColor: 'rgba(10, 15, 30, 0.55)',
          }}
        >
          {url}
        </div>
      </div>
    </div>
  );
}
