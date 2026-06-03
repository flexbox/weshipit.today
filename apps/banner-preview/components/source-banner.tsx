import { CONFIG } from '../config/config';

const BANNER = CONFIG.banner;

interface SourceBannerProps {
  width: number;
  height: number;
  status?: string;
  handle?: string;
  headline?: string;
  tagline?: string;
  url?: string;
}

// Smallest rectangle visible across LinkedIn 1584×396, YouTube mobile-safe
// 1546×423, and X 1500×500. Anything inside this band is guaranteed visible.
export const SAFE_BAND = { width: 1500, height: 396 };

// Blueprint palette — mirrors libs/ui/src/lib/hero/phone-animation.tsx and the
// website hero (slate-100 canvas, sky-500 blueprint lines, slate-900 type).
const COLORS = {
  canvas: '#F1F5F9', // slate-100
  ink: '#0F172A', // slate-900
  muted: '#64748B', // slate-500
  blueprint: '#0EA5E9', // sky-500
  blueprintFaint: 'rgba(14, 165, 233, 0.10)',
  blueprintInk: 'rgba(14, 165, 233, 0.65)',
  pill: '#FFFFFF',
  pillBorder: '#E2E8F0', // slate-200
  status: '#F97316', // orange-500
};

// Phone blueprint geometry, lifted straight from phone-animation.tsx
// (180×360 in CSS pixels at 1x, scaled here to safe-band height).
const PHONE = {
  width: 180,
  height: 360,
  radius: 30,
  screenInset: 10,
  screenInsetY: 30,
  innerRadius: 20,
};

export function SourceBanner({
  width,
  height,
  status = BANNER.status,
  handle = BANNER.handle,
  headline = BANNER.headline,
  tagline = BANNER.tagline,
  url = BANNER.url,
}: SourceBannerProps) {
  const safeWidth = Math.min(SAFE_BAND.width, width);
  const safeHeight = Math.min(SAFE_BAND.height, height);

  // Type scale — anchored on safe-band height so all three platforms read
  // consistently regardless of the surrounding canvas.
  const headlineSize = Math.round(safeHeight * 0.135);
  const taglineSize = Math.round(safeHeight * 0.05);
  const pillSize = Math.round(safeHeight * 0.045);
  const chipSize = Math.round(safeHeight * 0.045);

  // Phone illustration sized to fill the safe-band height (minus padding).
  const phoneScale = (safeHeight * 0.85) / PHONE.height;
  const phoneW = PHONE.width * phoneScale;
  const phoneH = PHONE.height * phoneScale;

  // Layout: left column takes ~62% of safe-band width, phone takes the rest.
  const padX = Math.round(safeWidth * 0.04);
  const padY = Math.round(safeHeight * 0.08);
  const leftColWidth = Math.round(safeWidth * 0.62);
  const headlineWidth = leftColWidth - padX;

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

      {/* Safe-band content container, centered in the canvas */}
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: `${safeWidth}px`,
          height: `${safeHeight}px`,
          margin: 'auto',
        }}
      >
        {/* LEFT — type stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: `${leftColWidth}px`,
            paddingTop: `${padY}px`,
            paddingLeft: `${padX}px`,
            paddingBottom: `${padY}px`,
          }}
        >
          {/* Status pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
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
              marginBottom: `${Math.round(safeHeight * 0.04)}px`,
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
              marginTop: `${Math.round(safeHeight * 0.05)}px`,
              fontSize: `${taglineSize}px`,
              fontWeight: 500,
              color: COLORS.muted,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>

          {/* Handle + URL chip row (bottom of left column) */}
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              gap: `${Math.round(chipSize * 0.6)}px`,
              fontSize: `${chipSize}px`,
              fontFamily: '"JetBrains Mono", monospace',
              color: COLORS.blueprint,
              fontWeight: 400,
            }}
          >
            <span style={{ display: 'flex' }}>{handle}</span>
            <span style={{ display: 'flex', color: COLORS.muted }}>·</span>
            <span style={{ display: 'flex' }}>{url}</span>
          </div>
        </div>

        {/* RIGHT — phone blueprint */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PhoneBlueprint
            width={phoneW}
            height={phoneH}
            labelSize={Math.round(safeHeight * 0.04)}
            originalW={PHONE.width}
            originalH={PHONE.height}
          />
        </div>
      </div>
    </div>
  );
}

// Static SVG version of the animated phone blueprint. Same proportions,
// same stroke weight feel, same dimension annotations.
function PhoneBlueprint({
  width,
  height,
  labelSize,
  originalW,
  originalH,
}: {
  width: number;
  height: number;
  labelSize: number;
  originalW: number;
  originalH: number;
}) {
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
        position: 'relative',
        width: `${width + labelSize * 4}px`,
        height: `${height + labelSize * 3}px`,
        alignItems: 'center',
        justifyContent: 'center',
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
        <circle cx={cx} cy={cy} r={5} fill="rgba(14, 165, 233, 0.5)" />
        {/* Corner dots */}
        <circle cx={0} cy={0} r={2} fill={COLORS.blueprint} />
        <circle cx={w} cy={0} r={2} fill={COLORS.blueprint} />
        <circle cx={0} cy={h} r={2} fill={COLORS.blueprint} />
        <circle cx={w} cy={h} r={2} fill={COLORS.blueprint} />
      </svg>

      {/* Width label (top) */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          width: `${width}px`,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: `${labelSize}px`,
          color: COLORS.blueprintInk,
          justifyContent: 'center',
        }}
      >
        {originalW}px
      </div>

      {/* Height label (right side) */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: `${labelSize}px`,
          color: COLORS.blueprintInk,
        }}
      >
        {originalH}px
      </div>
    </div>
  );
}
