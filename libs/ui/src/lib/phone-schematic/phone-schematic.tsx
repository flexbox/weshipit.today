import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Blueprint-style phone, drawn stroke by stroke.
 *
 * Geometry lives in a 570x650 sheet. The screen is a slot rather than something
 * painted into the SVG: `children` render in an HTML layer pinned to the same
 * rectangle, so real content (a video, a list) stays interactive and selectable
 * instead of being trapped in a foreignObject.
 *
 * Every stroke is `currentColor`, so the colour comes from the consumer's text
 * class and both themes work without a second asset.
 */

export const SHEET_WIDTH = 570;
export const SHEET_HEIGHT = 650;

// One source of truth for the screen rectangle: the SVG draws it and the HTML
// layer is positioned from it.
const SCREEN = { x: 181, y: 94, width: 208, height: 462, radius: 21 };
const CHASSIS = { x: 165, y: 78, width: 240, height: 494 };

const pctX = (value: number) => `${(value / SHEET_WIDTH) * 100}%`;
const pctY = (value: number) => `${(value / SHEET_HEIGHT) * 100}%`;

// Leader line, label and arrowhead for each annotated part.
const CALLOUTS = [
  {
    label: 'CHÂSSIS',
    d: 'M148 92 L180 84',
    textX: 140,
    textY: 96,
    anchor: 'end' as const,
    delay: 1350,
  },
  {
    label: 'VOLUME',
    d: 'M144 191 L154 191',
    textX: 136,
    textY: 195,
    anchor: 'end' as const,
    delay: 1450,
  },
  {
    label: 'BOUTON',
    d: 'M434 217 L416 217',
    textX: 440,
    textY: 221,
    anchor: 'start' as const,
    delay: 1550,
  },
  {
    label: 'ÉCRAN OLED',
    d: 'M434 320 L393 320',
    textX: 440,
    textY: 324,
    anchor: 'start' as const,
    delay: 1650,
  },
];

// useLayoutEffect warns during SSR, where there is no layout to read anyway.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface PhoneSchematicProps {
  /** Rendered inside the screen. */
  children?: React.ReactNode;
  /** Plate number in the margin, in the manner of a technical figure. */
  figure?: string;
  className?: string;
  /** Accessible description of the whole figure. */
  title?: string;
}

export function PhoneSchematic({
  children,
  figure = 'FIG.001',
  className = '',
  title = 'Schéma technique d’un téléphone mobile',
}: PhoneSchematicProps) {
  // Rendered drawn by default: the server, a reader without JS and every
  // pre-hydration paint get a finished figure instead of an empty frame. The
  // layout effect below arms the animation only once JS is actually running.
  const [state, setState] = useState<'true' | 'false'>('true');
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    setState('false');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setState('true');
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`ps-figure relative w-full ${className}`}
      data-play={state}
      // containerType lets the screen layer size its radius and type in cqw,
      // so the mockup stays proportional at any width.
      style={{
        aspectRatio: `${SHEET_WIDTH} / ${SHEET_HEIGHT}`,
        containerType: 'inline-size',
      }}
    >
      <svg
        viewBox={`0 0 ${SHEET_WIDTH} ${SHEET_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={title}
      >
        {/*
          Keyframes travel with the component. The app and Storybook each keep
          their own Tailwind theme block and have already drifted apart, so a
          shared `--animate-*` token would render in one and not the other.
        */}
        <style>{`
          /*
            Paper and ink change with the theme. Light mode is graph paper
            with blue ink, so the grid can sit fairly high. Dark mode is a
            lit drafting table: the same grid at the same opacity becomes a
            dense mesh, so it drops back and the phone gets a glow instead.
          */
          .ps-figure {
            --ps-grid: 0.18;
            --ps-frame: 0.25;
            --ps-glow: 0;
            --ps-screen-ring: rgb(0 0 0 / 0.12);
          }
          @media (prefers-color-scheme: dark) {
            .ps-figure {
              --ps-grid: 0.09;
              --ps-frame: 0.16;
              --ps-glow: 0.35;
              --ps-screen-ring: rgb(255 255 255 / 0.1);
            }
          }
          .ps-figure [data-draw] {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
          }
          .ps-figure [data-fade] { opacity: 0; }
          .ps-figure [data-glow] { opacity: 0; }
          .ps-figure [data-screen] {
            opacity: 0;
            transform: scale(0.97);
          }
          .ps-figure[data-play='true'] [data-draw] {
            animation: ps-draw 900ms cubic-bezier(0.2, 0, 0, 1) forwards;
          }
          .ps-figure[data-play='true'] [data-fade] {
            animation: ps-fade 500ms cubic-bezier(0.2, 0, 0, 1) forwards;
          }
          .ps-figure[data-play='true'] [data-glow] {
            animation: ps-glow 1400ms cubic-bezier(0.2, 0, 0, 1) forwards;
          }
          .ps-figure[data-play='true'] [data-screen] {
            animation: ps-screen-on 700ms cubic-bezier(0.2, 0, 0, 1) forwards;
          }
          @keyframes ps-draw { to { stroke-dashoffset: 0; } }
          /* Faded elements land on --ps-to (default 1) so a dimmed part of
             the drawing keeps its weight instead of snapping to full ink. */
          @keyframes ps-fade { to { opacity: var(--ps-to, 1); } }
          @keyframes ps-glow { to { opacity: var(--ps-glow); } }
          /* An OLED panel waking: a brief overshoot in brightness, then it
             settles. The scale is small enough to read as a bloom, not a pop. */
          @keyframes ps-screen-on {
            0% { opacity: 0; transform: scale(0.97); filter: brightness(1.6); }
            45% { opacity: 1; transform: scale(1.005); filter: brightness(1.25); }
            100% { opacity: 1; transform: scale(1); filter: brightness(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .ps-figure [data-draw],
            .ps-figure[data-play='true'] [data-draw] {
              stroke-dashoffset: 0;
              animation: none;
            }
            .ps-figure [data-fade],
            .ps-figure[data-play='true'] [data-fade] {
              opacity: var(--ps-to, 1);
              animation: none;
            }
            .ps-figure [data-glow],
            .ps-figure[data-play='true'] [data-glow] {
              opacity: var(--ps-glow);
              animation: none;
            }
            .ps-figure [data-screen],
            .ps-figure[data-play='true'] [data-screen] {
              opacity: 1;
              transform: none;
              animation: none;
            }
          }
        `}</style>

        <defs>
          <pattern
            id="ps-grid"
            width="13"
            height="13"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M13 0H0V13"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              style={{ opacity: 'var(--ps-grid)' }}
            />
          </pattern>
          {/* Backlight behind the handset. Its opacity is themed: nothing on
              paper, a soft halo on the dark sheet so the black screen does
              not vanish into the black page. */}
          <radialGradient id="ps-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <marker
            id="ps-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 1 L7 4 L0 7 Z" fill="currentColor" />
          </marker>
        </defs>

        {/* Graph paper, the same faint grid the homepage uses behind its hero card. */}
        <rect
          width={SHEET_WIDTH}
          height={SHEET_HEIGHT}
          fill="url(#ps-grid)"
          data-fade
          style={{ animationDelay: '0ms' }}
        />
        {/* Plate frame, so the grid reads as a drawing sheet rather than
            stopping mid-air where the viewBox happens to end. */}
        <rect
          x="1"
          y="1"
          width={SHEET_WIDTH - 2}
          height={SHEET_HEIGHT - 2}
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          data-fade
          style={
            {
              animationDelay: '0ms',
              '--ps-to': 'var(--ps-frame)',
            } as React.CSSProperties
          }
        />

        {/* Halo lands with the screen, so the phone lights the sheet as it
            wakes rather than glowing before it exists. */}
        <ellipse
          cx={CHASSIS.x + CHASSIS.width / 2}
          cy={CHASSIS.y + CHASSIS.height / 2}
          rx={CHASSIS.width * 1.1}
          ry={CHASSIS.height * 0.72}
          fill="url(#ps-halo)"
          data-glow
          style={{ animationDelay: '1900ms' }}
        />

        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Chassis */}
          <rect
            x={CHASSIS.x}
            y={CHASSIS.y}
            width={CHASSIS.width}
            height={CHASSIS.height}
            rx="36"
            pathLength={1}
            data-draw
            style={{ animationDelay: '150ms' }}
          />
          {/* Bezel */}
          <rect
            x="175"
            y="88"
            width="220"
            height="474"
            rx="27"
            strokeWidth="1.4"
            opacity="0.8"
            pathLength={1}
            data-draw
            style={{ animationDelay: '420ms' }}
          />
          {/* Screen aperture - the HTML layer below sits exactly here. */}
          <rect
            x={SCREEN.x}
            y={SCREEN.y}
            width={SCREEN.width}
            height={SCREEN.height}
            rx={SCREEN.radius}
            strokeWidth="1.4"
            opacity="0.8"
            pathLength={1}
            data-draw
            style={{ animationDelay: '620ms' }}
          />

          {/* Side and volume buttons */}
          <rect
            x="405"
            y="190"
            width="7"
            height="54"
            rx="3.5"
            strokeWidth="1.4"
            opacity="0.8"
            pathLength={1}
            data-draw
            style={{ animationDelay: '900ms' }}
          />
          <rect
            x="158"
            y="140"
            width="7"
            height="20"
            rx="3.5"
            strokeWidth="1.4"
            opacity="0.8"
            pathLength={1}
            data-draw
            style={{ animationDelay: '960ms' }}
          />
          <rect
            x="158"
            y="174"
            width="7"
            height="34"
            rx="3.5"
            strokeWidth="1.4"
            opacity="0.8"
            pathLength={1}
            data-draw
            style={{ animationDelay: '1010ms' }}
          />
          <rect
            x="158"
            y="216"
            width="7"
            height="34"
            rx="3.5"
            strokeWidth="1.4"
            opacity="0.8"
            pathLength={1}
            data-draw
            style={{ animationDelay: '1060ms' }}
          />

          {/* Dimension line for the chassis height */}
          <path
            d={`M70 ${CHASSIS.y} L70 ${CHASSIS.y + CHASSIS.height}`}
            strokeWidth="1"
            opacity="0.6"
            pathLength={1}
            data-draw
            style={{ animationDelay: '1150ms' }}
          />
          <path
            d={`M63 ${CHASSIS.y} L77 ${CHASSIS.y} M63 ${
              CHASSIS.y + CHASSIS.height
            } L77 ${CHASSIS.y + CHASSIS.height}`}
            strokeWidth="1"
            opacity="0.6"
            pathLength={1}
            data-draw
            style={{ animationDelay: '1300ms' }}
          />

          {/* Callout leaders. An SVG marker paints regardless of
              stroke-dasharray, so each leader sits in a fade group timed to
              land as its line arrives - otherwise the arrowhead shows first. */}
          {CALLOUTS.map((callout) => (
            <g
              key={callout.label}
              data-fade
              style={{ animationDelay: `${callout.delay + 600}ms` }}
            >
              <path
                d={callout.d}
                strokeWidth="1"
                opacity="0.7"
                markerEnd="url(#ps-arrow)"
                pathLength={1}
                data-draw
                style={{ animationDelay: `${callout.delay}ms` }}
              />
            </g>
          ))}
        </g>

        {/* Monospace annotation, the way a parts drawing labels its callouts. */}
        <g
          fill="currentColor"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="12"
          letterSpacing="0.8"
        >
          <text
            x="70"
            y="325"
            textAnchor="middle"
            transform="rotate(-90 70 325)"
            dy="-6"
            data-fade
            style={
              {
                animationDelay: '1400ms',
                '--ps-to': 0.75,
              } as React.CSSProperties
            }
          >
            147,6 MM
          </text>
          <text
            x="26"
            y="325"
            textAnchor="middle"
            transform="rotate(-90 26 325)"
            data-fade
            style={
              {
                animationDelay: '200ms',
                '--ps-to': 0.55,
              } as React.CSSProperties
            }
          >
            {figure}
          </text>
          {CALLOUTS.map((callout) => (
            <text
              key={callout.label}
              x={callout.textX}
              y={callout.textY}
              textAnchor={callout.anchor}
              data-fade
              style={
                {
                  animationDelay: `${callout.delay + 600}ms`,
                  '--ps-to': 0.9,
                } as React.CSSProperties
              }
            >
              {callout.label}
            </text>
          ))}
        </g>
      </svg>

      {/* The screen itself: real HTML, pinned to the aperture drawn above. */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: pctX(SCREEN.x),
          top: pctY(SCREEN.y),
          width: pctX(SCREEN.width),
          height: pctY(SCREEN.height),
          // cqw resolves against the figure, so the radius tracks the SVG's
          // rounded aperture at every size instead of drifting from it.
          borderRadius: `${(SCREEN.radius / SHEET_WIDTH) * 100}cqw`,
          animationDelay: '1900ms',
        }}
        data-screen
      >
        {children}
        {/* Hairline at the glass edge. On the dark sheet the black panel and
            the black page otherwise meet with nothing between them. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: 'inherit',
            boxShadow: 'inset 0 0 0 1px var(--ps-screen-ring)',
          }}
        />
      </div>
    </div>
  );
}

export default PhoneSchematic;
