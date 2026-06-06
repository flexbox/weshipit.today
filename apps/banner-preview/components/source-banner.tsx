import { CONFIG } from '../config/config';

const BANNER = CONFIG.banner;

interface SourceBannerProps {
  width: number;
  height: number;
  platform?: 'linkedin' | 'youtube' | 'x' | 'og';
  status?: string;
  headline?: string;
  tagline?: string;
  url?: string;
  // Absolute URLs to the interview logos. Rendered as a centered row at the
  // bottom of the safe band. Edge runtime can't read /public from arbitrary
  // paths, so the caller builds these from req.url.
  logos?: string[];
  logoLabel?: string;
}

// Cross-platform intersection: LinkedIn 1584×396 ∩ YouTube mobile-safe
// 1546×423 ∩ X 1500×500. Used as the default layout basis for any platform
// that doesn't override (LinkedIn, OG).
export const SAFE_BAND = { width: 1500, height: 396 };

// YouTube's own mobile-safe area, per the official channel-art template.
// Wider AND taller than the cross-platform intersection, so YouTube banners
// get more breathing room when targeted explicitly.
const YOUTUBE_MOBILE_SAFE = { width: 1546, height: 423 };

// Blueprint palette — mirrors libs/ui/src/lib/hero/phone-animation.tsx and the
// website hero (slate-100 canvas, sky-500 blueprint lines, slate-900 type).
const COLORS = {
  canvas: '#F1F5F9', // slate-100
  ink: '#0F172A', // slate-900
  muted: '#64748B', // slate-500
  blueprint: '#2b7fff', // sky-500
  blueprintFaint: 'rgba(14, 165, 233, 0.10)',
  blueprintInk: 'rgba(14, 165, 233, 0.65)',
  pill: '#FFFFFF',
  pillBorder: '#E2E8F0', // slate-200
  status: '#F97316', // orange-500
};

// Phone blueprint geometry, lifted straight from phone-animation.tsx
// (180×360 in CSS pixels at 1x, scaled here to safe-band height).
const PHONE = {
  width: 200,
  height: 380,
  radius: 30,
  screenInset: 10,
  screenInsetY: 30,
  innerRadius: 20,
};

export function SourceBanner({
  width,
  height,
  platform,
  status = BANNER.status,
  headline = BANNER.headline,
  tagline = BANNER.tagline,
  url = BANNER.url,
  logos,
  logoLabel = 'Interview de',
}: SourceBannerProps) {
  // Per-platform layout basis:
  // - YouTube uses its own mobile-safe area (1546×423) so the layout fills
  //   the strip that actually shows on phones, with extra breathing room
  //   compared to the cross-platform intersection.
  // - X uses the full canvas (no safe-area concept; just clear the avatar).
  // - LinkedIn / OG fall back to the cross-platform 1500×396 intersection.
  const isYouTube = platform === 'youtube';
  const isX = platform === 'x';
  const isLinkedIn = platform === 'linkedin';

  const safeWidth = isYouTube
    ? Math.min(YOUTUBE_MOBILE_SAFE.width, width)
    : Math.min(SAFE_BAND.width, width);
  const safeHeight = isYouTube
    ? Math.min(YOUTUBE_MOBILE_SAFE.height, height)
    : isX
      ? height
      : Math.min(SAFE_BAND.height, height);

  // Reserve a horizontal strip at the bottom of the safe band for the
  // interview-logo row. Everything else scales against the remaining height so
  // the headline / tagline / phone keep their original proportions.
  const hasLogos = !!logos && logos.length > 0;
  const footerH = hasLogos ? Math.round(safeHeight * 0.22) : 0;
  const mainH = safeHeight - footerH;

  const headlineSize = Math.round(mainH * 0.16);
  // Tagline stays compact on X so all three metrics fit on one line.
  const taglineSize = Math.round(mainH * (isX ? 0.05 : 0.065));
  const pillSize = Math.round(mainH * 0.055);
  const chipSize = Math.round(mainH * 0.055);

  // Phone sized to fit fully inside the safe band, with a touch of padding.
  const phoneH = Math.round(mainH * 0.95);
  const phoneW = Math.round((PHONE.width / PHONE.height) * phoneH);

  // Layout: phone on the left, content stack on the right. On X, push the
  // content further right so the bottom-left avatar overlap on mobile doesn't
  // clip the start of the headline.
  const padX = Math.round(safeWidth * 0.04);
  const padY = Math.round(mainH * 0.08);
  const contentLeftShift = isX
    ? Math.round(safeWidth * 0.06)
    : isLinkedIn
      ? 100
      : 0;
  const phoneColWidth = phoneW + Math.round(mainH * 0.08) + contentLeftShift;
  const contentColWidth = safeWidth - phoneColWidth - padX;
  const headlineWidth = contentColWidth - padX;

  // Logo footer geometry — square logos with consistent gaps.
  const logoH = Math.round(footerH * 0.82);
  const logoGap = Math.round(safeWidth * 0.012);
  const logoLabelSize = Math.round(footerH * 0.22);

  // Single vertical-rhythm value applied between every row in the type stack
  // (top row → headline → tagline → footer). Keeps the layout breathing
  // consistently regardless of platform aspect ratio.
  const rowGap = Math.round(mainH * 0.07);

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: COLORS.canvas,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Graph-paper grid background (10px lines, like the phone animation) */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `repeating-linear-gradient(to right, ${COLORS.blueprintFaint} 0 1px, transparent 1px 20px), repeating-linear-gradient(to bottom, ${COLORS.blueprintFaint} 0 1px, transparent 1px 20px)`,
        }}
      />

      {/* Safe-band content container, centered in the canvas. Column flex so
          the main row (phone + type stack) sits on top and the interview-logo
          strip sits at the bottom. */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: `${safeWidth}px`,
          height: `${safeHeight}px`,
          margin: 'auto',
        }}
      >
        {/* MAIN ROW — phone + content */}
        <div
          style={{
            display: 'flex',
            width: `${safeWidth}px`,
            height: `${mainH}px`,
          }}
        >
          {/* LEFT — phone blueprint, bottom-aligned with cut */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: `${phoneColWidth}px`,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingLeft: `${padX}px`,
            }}
          >
            {/* Width label above the phone */}
            <div
              style={{
                display: 'flex',
                marginBottom: `${Math.round(safeHeight * 0.02)}px`,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: `${Math.round(safeHeight * 0.04)}px`,
                color: COLORS.blueprintInk,
              }}
            >
              {PHONE.width}px
            </div>
            <PhoneBlueprint width={phoneW} height={phoneH} />
          </div>

          {/* RIGHT — type stack. All rows share a single vertical gap and
              hang from the same left edge. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: `${contentColWidth}px`,
              paddingTop: `${padY}px`,
              paddingLeft: `${padX}px`,
              paddingBottom: '0px',
              gap: `${rowGap}px`,
            }}
          >
            {/* Top row — status pill + URL chip, both left-aligned. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: `${Math.round(padX * 0.6)}px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${Math.round(pillSize * 0.5)}px`,
                  paddingLeft: `${Math.round(pillSize * 0.75)}px`,
                  paddingRight: `${Math.round(pillSize * 0.95)}px`,
                  paddingTop: `${Math.round(pillSize * 0.35)}px`,
                  paddingBottom: `${Math.round(pillSize * 0.35)}px`,
                  fontSize: `${pillSize}px`,
                  fontWeight: 500,
                  color: COLORS.ink,
                  backgroundColor: COLORS.pill,
                  border: `1px solid ${COLORS.pillBorder}`,
                  borderRadius: `${pillSize * 2}px`,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    width: `${Math.round(pillSize * 0.55)}px`,
                    height: `${Math.round(pillSize * 0.55)}px`,
                    backgroundColor: COLORS.status,
                    borderRadius: '999px',
                  }}
                />
                <span style={{ display: 'flex' }}>{status}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  fontSize: `${chipSize}px`,
                  fontFamily: '"JetBrains Mono", monospace',
                  color: COLORS.blueprint,
                  fontWeight: 400,
                }}
              >
                {url}
              </div>
            </div>

            {/* Headline — bold, near-black, mirrors the website hero */}
            <div
              style={{
                display: 'flex',
                width: `${headlineWidth}px`,
                fontSize: `${headlineSize}px`,
                fontWeight: 800,
                color: COLORS.ink,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              {headline}
            </div>

            {/* Tagline — metrics with emoji */}
            <div
              style={{
                display: 'flex',
                width: `${headlineWidth}px`,
                fontSize: `${taglineSize}px`,
                fontWeight: 500,
                color: COLORS.muted,
                lineHeight: 1.4,
              }}
            >
              {tagline}
            </div>
          </div>
        </div>

        {/* FOOTER — interview-logo row. Left-aligned to the same edge as the
            type stack above. */}
        {hasLogos && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: `${safeWidth}px`,
              height: `${footerH}px`,
              gap: `${logoGap}px`,
              paddingLeft: `${phoneColWidth + padX}px`,
              paddingRight: `${padX}px`,
            }}
          >
            <span
              style={{
                display: 'flex',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: `${logoLabelSize}px`,
                color: COLORS.blueprint,
                marginRight: `${logoGap}px`,
                whiteSpace: 'nowrap',
              }}
            >
              {logoLabel}
            </span>
            {logos!.map((src) => (
              <img
                key={src}
                src={src}
                width={logoH}
                height={logoH}
                style={{
                  display: 'flex',
                  width: `${logoH}px`,
                  height: `${logoH}px`,
                  objectFit: 'contain',
                  borderRadius: `${Math.round(logoH * 0.18)}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Static SVG version of the animated phone blueprint. The parent decides how
// much of the phone is visible — this component just renders the full thing.
function PhoneBlueprint({ width, height }: { width: number; height: number }) {
  // Drawing in PhoneBlueprint's own viewBox (PHONE coordinate space) for
  // pixel-perfect parity with phone-animation.tsx; we scale via width/height.
  const w = PHONE.width;
  const h = PHONE.height;
  const cx = w / 2;
  const cy = h / 2;
  const screenW = w - PHONE.screenInset * 2;
  const screenH = h - PHONE.screenInsetY * 2;
  const atomR = 30;

  return (
    <div
      style={{
        display: 'flex',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${w} ${h}`}
        style={{ display: 'flex' }}
      >
        {/* Phone body */}
        <rect
          x={0.75}
          y={0.75}
          width={w - 1.5}
          height={h - 1.5}
          rx={PHONE.radius}
          ry={PHONE.radius}
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
        />
        {/* Screen */}
        <rect
          x={PHONE.screenInset}
          y={PHONE.screenInsetY}
          width={screenW}
          height={screenH}
          rx={PHONE.innerRadius}
          ry={PHONE.innerRadius}
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
        />
        {/* Camera notch */}
        <rect
          x={cx - 30}
          y={PHONE.screenInsetY + 5}
          width={60}
          height={15}
          rx={10}
          ry={10}
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
        />
        {/* Home indicator */}
        <line
          x1={cx - 30}
          y1={h - PHONE.screenInsetY - 15}
          x2={cx + 30}
          y2={h - PHONE.screenInsetY - 15}
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
        />
        {/* React atom */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={atomR}
          ry={atomR / 3}
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={atomR}
          ry={atomR / 3}
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
          transform={`rotate(60 ${cx} ${cy})`}
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={atomR}
          ry={atomR / 3}
          fill="none"
          stroke={COLORS.blueprint}
          strokeWidth={1.5}
          transform={`rotate(-60 ${cx} ${cy})`}
        />
        <circle cx={cx} cy={cy} r={5} fill={COLORS.blueprint} />
        {/* Corner dots */}
        <circle cx={0} cy={0} r={2} fill={COLORS.blueprint} />
        <circle cx={w} cy={0} r={2} fill={COLORS.blueprint} />
        <circle cx={0} cy={h} r={2} fill={COLORS.blueprint} />
        <circle cx={w} cy={h} r={2} fill={COLORS.blueprint} />
      </svg>
    </div>
  );
}
