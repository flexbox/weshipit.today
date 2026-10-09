import { useId } from 'react';

/**
 * Blueprint sheet for the /audit hero: the 2-week audit drawn as a route
 * through its four stops (scan, backlog, upgrade, release), with a tech-debt
 * curve falling underneath as the route advances.
 *
 * Same visual language as the canvas figures in `@weshipit/ui` (graph paper,
 * blue ink, mono sheet markings), but plain SVG so the paths can be traced
 * with the `glyph-draw` keyframes: every path has `pathLength={1}` and a dash
 * of length 1, and the dash offset slides from 1 to 0. The route is split into
 * one path per leg so each leg eases on its own and the next stop pops in
 * exactly when the pen reaches it. Reduced-motion users get the finished sheet.
 */

const W = 700;
const H = 800;
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DRAW =
  'animate-glyph-draw [stroke-dasharray:1] [stroke-dashoffset:0] motion-reduce:animate-none';
const POP =
  'animate-route-node [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none';
const FADE = 'animate-route-label motion-reduce:animate-none';

const ROUTE =
  'M120 170H480C590 170 590 350 480 350H220C110 350 110 530 220 530H580';

/** One path per leg, drawn back to back. Delays and durations in ms. */
const LEGS = [
  { d: 'M120 170H400', delay: 500, duration: 900 },
  {
    d: 'M400 170H480C590 170 590 350 480 350H300',
    delay: 1500,
    duration: 1400,
  },
  {
    d: 'M300 350H220C110 350 110 530 220 530H580',
    delay: 3000,
    duration: 1400,
  },
];

const STOPS = [
  {
    x: 120,
    y: 170,
    at: 200,
    step: '01',
    title: 'SCAN',
    note: 'DAY 1 · code + deps',
    anchor: 'start',
  },
  {
    x: 400,
    y: 170,
    at: 1400,
    step: '02',
    title: 'BACKLOG',
    note: 'DAY 3 · ranked by ROI',
    anchor: 'middle',
  },
  {
    x: 300,
    y: 350,
    at: 2900,
    step: '03',
    title: 'UPGRADE',
    note: 'RN + Expo SDK',
    anchor: 'middle',
  },
  {
    x: 580,
    y: 530,
    at: 4400,
    step: '04',
    title: 'RELEASE',
    note: 'DAY 14 · stores',
    anchor: 'end',
  },
] as const;

// Tech debt over the two weeks: noisy while we scan, falling once upgrades land.
const DEBT =
  'M120 664L160 672L200 660L240 676L280 690L330 698L380 716L440 722L510 730L580 733';

const ms = (value: number) => ({ animationDelay: `${value}ms` });

export function AuditRouteAnimation() {
  const id = useId().replace(/:/g, '');
  const grid = `${id}-grid`;
  const gridMajor = `${id}-grid-major`;

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-[rgba(47,95,224,0.55)] bg-[#eef1fa] dark:border-[rgba(122,158,255,0.3)] dark:bg-[#0b0f1a]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Blueprint of the 2-week React Native audit: a route from codebase scan to backlog, dependency upgrade and store release, above a tech-debt curve that drops as the route advances"
        className="block h-auto w-full text-[rgb(47,95,224)] dark:text-[rgb(122,158,255)]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily={MONO}
      >
        <defs>
          <pattern
            id={grid}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path d="M20 0H0V20" strokeWidth="1" />
          </pattern>
          <pattern
            id={gridMajor}
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 0H0V100" strokeWidth="1" />
          </pattern>
        </defs>

        {/* graph paper */}
        <rect
          width={W}
          height={H}
          fill={`url(#${grid})`}
          stroke="none"
          className="opacity-[0.09] dark:opacity-[0.06]"
        />
        <rect
          width={W}
          height={H}
          fill={`url(#${gridMajor})`}
          stroke="none"
          className="opacity-[0.16] dark:opacity-[0.11]"
        />

        {/* sheet markings */}
        <g
          fill="currentColor"
          stroke="none"
          fontSize="13"
          fontWeight="600"
          className={FADE}
        >
          <text x="36" y="56">
            FIG-016
          </text>
          <text x={W - 36} y={H - 32} textAnchor="end">
            2026
          </text>
          <text transform={`translate(${W - 30} 110) rotate(90)`}>
            [ CODEBASE AUDIT ]
          </text>
        </g>

        {/* the planned route, faint and dashed, before the pen goes over it */}
        <g className={FADE} style={ms(100)}>
          <path
            d={ROUTE}
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="opacity-40"
          />
        </g>

        {/* the route, one leg at a time */}
        {LEGS.map((leg) => (
          <path
            key={leg.d}
            d={leg.d}
            pathLength={1}
            strokeWidth="3"
            className={DRAW}
            style={{ ...ms(leg.delay), animationDuration: `${leg.duration}ms` }}
          />
        ))}

        {/* a short comet that keeps running the route once it is drawn */}
        <path
          d={ROUTE}
          pathLength={1}
          strokeWidth="6"
          strokeDasharray="0.05 2"
          className="animate-route-comet opacity-0 motion-reduce:hidden"
          style={ms(4800)}
        />

        {/* stops */}
        {STOPS.map((stop, index) => {
          const last = index === STOPS.length - 1;
          const textX =
            stop.anchor === 'start'
              ? stop.x - 14
              : stop.anchor === 'end'
                ? stop.x + 14
                : stop.x;

          return (
            <g key={stop.step}>
              <g className={POP} style={ms(stop.at)}>
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="14"
                  strokeWidth="2.5"
                  className={
                    last ? 'fill-current' : 'fill-[#eef1fa] dark:fill-[#0b0f1a]'
                  }
                />
                {last ? (
                  <path
                    d={`M${stop.x - 6} ${stop.y}l4 4.5 8-9`}
                    strokeWidth="2.5"
                    className="stroke-[#eef1fa] dark:stroke-[#0b0f1a]"
                  />
                ) : (
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="4.5"
                    fill="currentColor"
                    stroke="none"
                  />
                )}
              </g>
              <g
                fill="currentColor"
                stroke="none"
                textAnchor={stop.anchor}
                className={FADE}
                style={ms(stop.at + 120)}
              >
                <text x={textX} y={stop.y + 46} fontSize="17" fontWeight="700">
                  <tspan className="opacity-60">{stop.step}</tspan> {stop.title}
                </text>
                <text
                  x={textX}
                  y={stop.y + 68}
                  fontSize="13"
                  fontWeight="500"
                  className="opacity-70"
                >
                  {stop.note}
                </text>
              </g>
            </g>
          );
        })}

        {/* tech debt, falling while the route advances */}
        <g className={FADE} style={ms(400)}>
          <text
            x="120"
            y="636"
            fill="currentColor"
            stroke="none"
            fontSize="13"
            fontWeight="600"
          >
            TECH DEBT
          </text>
          <path d="M120 648V740H580" strokeWidth="1.5" className="opacity-55" />
          <g
            fill="currentColor"
            stroke="none"
            fontSize="12"
            fontWeight="500"
            className="opacity-70"
          >
            <text x="120" y="762" textAnchor="middle">
              D0
            </text>
            <text x="580" y="762" textAnchor="middle">
              D14
            </text>
          </g>
        </g>
        <path
          d={DEBT}
          pathLength={1}
          strokeWidth="2.5"
          className={DRAW}
          style={{ ...ms(500), animationDuration: '3900ms' }}
        />
        <circle
          cx="580"
          cy="733"
          r="5"
          fill="currentColor"
          stroke="none"
          className={POP}
          style={ms(4400)}
        />
      </svg>
    </div>
  );
}
