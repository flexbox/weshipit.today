import * as React from 'react';
import { Dots, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Controls } from '../bench';
import { BENCH, DOCK_ART, HEIGHT, PHONE_ART, PT, WIDTH } from './geometry';
import {
  DEVICES,
  MODES,
  padOf,
  readouts,
  type Device,
  type Mode,
} from './model';

/* ---------- Static art ---------- */

const DOCK = (
  <g>
    <Solid
      paths={DOCK_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={DOCK_ART.seam} tone="faint" />}
    />
    <Line d={DOCK_ART.groove} tone="faint" />
    <Dots points={DOCK_ART.screws} size={0.5} tone="mid" />
    <Line d={DOCK_ART.lampRings} tone="lo" />
    {PHONE_ART.map((art, index) => (
      <Solid key={index} paths={art.rest} tone="lo" crease="faint" />
    ))}
    <Solid paths={DOCK_ART.scale} tone="lo" crease="none" />
    <Line d={DOCK_ART.scaleTicks} tone="mid" />
  </g>
);

const HEADER = 44;
const ROW = 64;
const BUTTON = 50;
const MARGIN = 16;

interface Refs {
  button: SVGGElement | null;
  gap: SVGRectElement | null;
  content: SVGGElement | null;
  topRed: SVGRectElement | null;
  bottomRed: SVGRectElement | null;
}

/** The app as drawn on one screen, in points. */
function Screen({ device, refs }: { device: Device; refs: Refs }) {
  const { h, w } = device;
  const id = `sa-clip-${device.h}`;
  return (
    <g transform={`scale(${PT})`} className="sa-screen">
      <defs>
        <clipPath id={id}>
          <rect width={w} height={h} rx={device.corner} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect className="af-screen" width={w} height={h} />
        <g ref={(node) => void (refs.content = node)}>
          <rect className="sa-header" width={w} height={HEADER} />
          <path
            className="sa-ink"
            d={`M${MARGIN} ${HEADER / 2}H${MARGIN + 120}`}
          />
          {[0, 1, 2, 3].map((row) => {
            const y = HEADER + 12 + row * ROW;
            return (
              <g key={row}>
                <rect
                  className="sa-line"
                  x={MARGIN}
                  y={y}
                  width={44}
                  height={44}
                  rx={10}
                />
                <path
                  className="sa-line"
                  d={`M${MARGIN + 60} ${y + 14}H${w - MARGIN - 30}M${MARGIN + 60} ${y + 32}H${w - MARGIN - 110}`}
                />
              </g>
            );
          })}
        </g>
        <g ref={(node) => void (refs.button = node)}>
          <rect
            className="sa-button"
            x={MARGIN}
            y={h - MARGIN - BUTTON}
            width={w - MARGIN * 2}
            height={BUTTON}
            rx={14}
          />
          <path
            className="sa-ink"
            d={`M${w / 2 - 50} ${h - MARGIN - BUTTON / 2}H${w / 2 + 50}`}
          />
        </g>
        {/* Safe-area guides at the device's real insets. */}
        <path className="sa-guide" d={`M0 ${device.top}H${w}`} />
        {device.bottom ? (
          <path className="sa-guide" d={`M0 ${h - device.bottom}H${w}`} />
        ) : null}
        <rect
          ref={(node) => void (refs.topRed = node)}
          className="sa-red"
          width={w}
          height={0}
        />
        <rect
          ref={(node) => void (refs.bottomRed = node)}
          className="sa-red"
          width={w}
          height={0}
        />
        <rect
          ref={(node) => void (refs.gap = node)}
          className="sa-gap"
          x={4}
          width={w - 8}
          height={0}
        />
        {/* System UI on top of the app. */}
        {device.island ? (
          <>
            <rect
              className="sa-island"
              x={w / 2 - 62}
              y={11}
              width={124}
              height={37}
              rx={18.5}
            />
            <text
              className="sa-clock"
              x={56}
              y={37}
              fontSize={17}
              textAnchor="middle"
            >
              9:41
            </text>
            <rect
              className="sa-ink-fill"
              x={w - 78}
              y={26}
              width={26}
              height={12}
              rx={3}
            />
            <rect
              className="sa-home"
              x={w / 2 - 67}
              y={h - 13}
              width={134}
              height={5}
              rx={2.5}
            />
          </>
        ) : (
          <>
            <text
              className="sa-clock"
              x={w / 2}
              y={15}
              fontSize={12}
              textAnchor="middle"
            >
              9:41
            </text>
            <rect
              className="sa-ink-fill"
              x={w - 36}
              y={6}
              width={22}
              height={10}
              rx={2.5}
            />
          </>
        )}
      </g>
    </g>
  );
}

/* ---------- Live figure ---------- */

interface Sim {
  mode: Mode;
  idle: number;
  tour: number;
  touched: boolean;
  pads: Array<{ top: number; bottom: number }>;
}

const LABEL =
  'Safe areas drawn as two phones on one dock, running the same app: an iPhone 15 with a Dynamic Island, rounded corners and a home indicator, and an iPhone SE with a status bar and a home button. A point scale stands between them, and dashed guides on each screen mark the real insets: 59 and 34 points on the iPhone 15, 20 and 0 on the SE. With safe area insets, each header starts below its guide and the button sits above the home indicator. With no insets, the header slides under the clock and island and the button under the home indicator, marked red. With a hardcoded paddingTop of 44, the iPhone 15 header is still 15 points under the island while the SE gets a 24 point gap.';

export function SafeAreaBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      idle: 0,
      mode: 'insets',
      pads: DEVICES.map((device) => padOf('insets', device)),
      touched: false,
      tour: 0,
    };
  const [mode, setMode] = React.useState<Mode>('insets');
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const refs = React.useRef<Refs[]>(
    DEVICES.map(() => ({
      bottomRed: null,
      button: null,
      content: null,
      gap: null,
      topRed: null,
    })),
  );

  const choose = (next: Mode) => {
    sim.current.mode = next;
    setMode(next);
    say(readouts[next]);
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    let moving = false;
    DEVICES.forEach((device, index) => {
      const goal = padOf(s.mode, device);
      const pad = s.pads[index];
      pad.top = follow(pad.top, goal.top, dt, 0.14, calm);
      pad.bottom = follow(pad.bottom, goal.bottom, dt, 0.14, calm);
      moving ||= pad.top !== goal.top || pad.bottom !== goal.bottom;
      const r = refs.current[index];
      r.content?.setAttribute(
        'transform',
        `translate(0 ${pad.top.toFixed(2)})`,
      );
      r.button?.setAttribute(
        'transform',
        `translate(0 ${(-pad.bottom).toFixed(2)})`,
      );
      // Red where the app runs into system UI; a dashed box where it leaves a gap.
      const under = Math.max(0, device.top - pad.top);
      r.topRed?.setAttribute('y', pad.top.toFixed(2));
      r.topRed?.setAttribute('height', Math.min(HEADER, under).toFixed(2));
      const buttonBottom = device.h - MARGIN - pad.bottom;
      const intrude = Math.max(0, buttonBottom - (device.h - device.bottom));
      r.bottomRed?.setAttribute('y', (device.h - device.bottom).toFixed(2));
      r.bottomRed?.setAttribute(
        'height',
        device.bottom ? intrude.toFixed(2) : '0',
      );
      const gap = Math.max(0, pad.top - device.top);
      r.gap?.setAttribute('y', device.top.toFixed(2));
      r.gap?.setAttribute('height', gap > 1 ? gap.toFixed(2) : '0');
    });

    const touring = !s.touched && !calm;
    if (touring && !moving) {
      s.idle += dt;
      if (s.idle > 2.2) {
        s.idle = 0;
        s.tour += 1;
        choose(MODES[s.tour % MODES.length]);
      }
    }
    return moving || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (next: Mode) => {
    sim.current.touched = true;
    choose(next);
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      act(MODES[(MODES.indexOf(sim.current.mode) + 1) % MODES.length]);
    }
  };

  React.useEffect(() => {
    if (asksForStillness()) sim.current.touched = true;
  }, []);

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Switch between safe area insets, no insets and a hardcoded paddingTop of 44."
        onClick={() =>
          act(MODES[(MODES.indexOf(sim.current.mode) + 1) % MODES.length])
        }
        onKeyDown={onKey}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <BenchArt bench={BENCH} />
          {DOCK}
          {PHONE_ART.map((art, index) => (
            <g key={index}>
              <Solid paths={art.body} tone="hi" crease="lo" />
              <Solid paths={art.sideButton} tone="mid" crease="none" />
              <path className="af-glass" d={art.screenFrame} />
              {art.homeButton ? <Line d={art.homeButton} tone="mid" /> : null}
              {art.speaker ? <Line d={art.speaker} tone="lo" /> : null}
              <g transform={art.screen}>
                <Screen device={DEVICES[index]} refs={refs.current[index]} />
              </g>
              <Solid paths={DOCK_ART.feet[index]} tone="mid" crease="faint" />
            </g>
          ))}
        </svg>
      </div>
      <Controls>
        <div
          className="af-segmented"
          role="radiogroup"
          aria-label="Top padding"
        >
          {MODES.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => act(value)}
            >
              {value === 'insets'
                ? 'Insets'
                : value === 'none'
                  ? 'None'
                  : 'Top: 44'}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function SafeAreaAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Why content needs insets"
        hint="Tap to switch padding"
        readout={readouts.insets}
        keys={[
          { label: 'Content under system UI', mark: 'red' },
          { label: 'Real inset', mark: 'dashed' },
          { label: 'App content', mark: 'raised' },
        ]}
        caption="The safe area is the part of the screen system UI leaves clear. Insets differ per device, 59 and 34 points on an iPhone 15 against 20 and 0 on an iPhone SE, and they change on rotation, so read them with useSafeAreaInsets from react-native-safe-area-context rather than hardcoding paddingTop: 44, which is wrong on both. React Navigation insets its headers and tab bars for you; custom full-screen layouts are where this bites."
      >
        <SafeAreaBench />
      </Plate>
    </div>
  );
}
