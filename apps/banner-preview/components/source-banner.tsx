interface SourceBannerProps {
  width: number;
  height: number;
  headline?: string;
  url?: string;
}

const DEFAULTS = {
  headline: 'Podcast #1 sur React Native',
  url: 'weshipit.today/podcast',
};

// Smallest rectangle visible across LinkedIn 1584×396, YouTube mobile-safe 1546×423,
// and X 1500×500. Anything inside this band is guaranteed visible on every platform.
export const SAFE_BAND = { width: 1500, height: 396 };

const COLORS = {
  background: 'hsl(210, 40%, 96.1%)',
  foreground: 'hsl(0, 0%, 3.9%)',
  muted: 'hsl(215, 16%, 47%)',
};

export function SourceBanner({
  width,
  height,
  headline = DEFAULTS.headline,
  url = DEFAULTS.url,
}: SourceBannerProps) {
  const safeWidth = Math.min(SAFE_BAND.width, width);
  const safeHeight = Math.min(SAFE_BAND.height, height);

  return (
    <div
      style={{
        display: 'flex',
        width: `${width}px`,
        height: `${height}px`,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${safeWidth}px`,
          height: `${safeHeight}px`,
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '90px',
            fontWeight: 800,
            color: COLORS.foreground,
            letterSpacing: '-0.025em',
            whiteSpace: 'nowrap',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '36px',
            fontWeight: 500,
            color: COLORS.muted,
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </div>
      </div>
    </div>
  );
}
