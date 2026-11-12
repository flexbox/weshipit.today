import * as React from 'react';
import { pathOf } from '../anatomy/kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import {
  BenchArt,
  Cable,
  Controls,
  FaceDial,
  HousingArt,
  PhoneBack,
  PhoneFront,
  PhoneScreen,
  Runner,
  Socket,
  dialRotate,
} from '../anatomy/bench';
import { runAlong } from '../anatomy/parts';
import {
  BENCH,
  CABLE,
  DOCK_SOCKET,
  HEIGHT,
  JS_ART,
  JS_SOCKET_MOUTH,
  PHONE_ART,
  UI_ART,
  WIDTH,
  pendulumOf,
} from './geometry';
import { BUDGET, DESCRIBE, PAINT, readouts, type Hz } from './model';

const CABLE_D = pathOf(CABLE);
const SW = PHONE_ART.sw;
const SH = PHONE_ART.sh;
const ROW = 9;
/** Figure seconds per frame at 60 Hz: slowed down so each frame is visible. */
const FRAME = 0.2;
const SCROLL = 2.4;
/** The dial reads 0–20 ms. */
const DIAL_MS = 20;

interface Sim {
  hz: Hz;
  idle: number;
  tour: number;
  busy: boolean;
  clock: number;
  since: number;
  frame: number;
  pulse: number;
  heavy: boolean;
  scroll: number;
  touched: boolean;
  described: number;
  history: boolean[];
}

const LABEL =
  'The UI thread drawn as a bench in slow motion. A JavaScript housing on the left is cabled to a phone whose list scrolls frame by frame; a pulse runs down the cable each time JavaScript describes new rows. On the right, a UI-thread housing has a metronome beating the frames, a dial reading how long each frame takes to draw against the budget, 16.7 milliseconds at 60 Hz or 8.3 at 120 Hz, and a strip of frame lamps. With JavaScript busy, the list keeps scrolling but new rows arrive blank. With heavy views, drawing overruns the budget, frames are dropped, the list stutters and the lamps turn red: at 12 milliseconds that happens at 120 Hz but not at 60.';

export function UiThreadBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      busy: false,
      clock: 0,
      described: 12,
      frame: 0,
      heavy: false,
      history: Array(8).fill(true),
      hz: 60,
      idle: 0,
      pulse: -1,
      scroll: 0,
      since: 0,
      touched: false,
      tour: 0,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const [ui, setUi] = React.useState({
    busy: false,
    heavy: false,
    hz: 60 as Hz,
  });
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const needleRef = React.useRef<SVGPathElement>(null);
  const rodRef = React.useRef<SVGPathElement>(null);
  const bobRef = React.useRef<SVGCircleElement>(null);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);
  const jsLampRef = React.useRef<SVGCircleElement>(null);

  const apply = (next: Partial<Pick<Sim, 'hz' | 'heavy' | 'busy'>>) => {
    const s = sim.current;
    Object.assign(s, next);
    setUi({ busy: s.busy, heavy: s.heavy, hz: s.hz });
    say(readouts.state(s.hz, s.heavy, s.busy));
  };

  const TOUR = [
    () => apply({ busy: true }),
    () => apply({ busy: false }),
    () => apply({ heavy: true }),
    () => apply({ hz: 120 }),
    () => apply({ heavy: false }),
    () => apply({ hz: 60 }),
  ];

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    if (calm) return false;
    s.clock += dt;
    s.since += dt;
    const period = (FRAME * 60) / s.hz;
    while (s.since >= period) {
      s.since -= period;
      s.frame += 1;
      const paint = s.heavy ? PAINT.heavy : PAINT.light;
      const dropped = paint > BUDGET[s.hz];
      s.history = [...s.history.slice(1), !dropped];
      // A dropped frame never reaches the screen, so the list stands still.
      if (!dropped) s.scroll += (SCROLL * 60) / s.hz;
      const step = s.busy ? DESCRIBE.busy : DESCRIBE.idle;
      const before = Math.floor(s.described);
      s.described += step;
      if (Math.floor(s.described) !== before) s.pulse = 0;
      // JavaScript describes rows a little ahead of what is on screen.
      const visibleEnd = Math.floor((s.scroll + SH) / ROW) + 1;
      if (!s.busy) s.described = Math.max(s.described, visibleEnd + 2);
      rerender();
    }
    if (s.pulse >= 0) {
      s.pulse = Math.min(1, s.pulse + dt / 0.35);
      if (runRef.current)
        runAlong(runRef.current, headRef.current, s.pulse, 1, 0.12);
      if (s.pulse >= 1) s.pulse = -1;
    }
    const paint = s.heavy ? PAINT.heavy : PAINT.light;
    needleRef.current?.setAttribute('transform', dialRotate(paint / DIAL_MS));
    const swing = Math.sin(((s.clock / period) * Math.PI) / 1) * 0.42;
    const pendulum = pendulumOf(swing);
    rodRef.current?.setAttribute('d', pendulum.rod);
    bobRef.current?.setAttribute('cx', pendulum.bob[0].toFixed(2));
    bobRef.current?.setAttribute('cy', pendulum.bob[1].toFixed(2));
    if (jsLampRef.current) {
      jsLampRef.current.setAttribute('class', s.busy ? 'af-red' : 'af-head');
      jsLampRef.current.setAttribute('opacity', s.busy ? '1' : '0.5');
    }

    if (!s.touched) {
      s.idle += dt;
      if (s.idle > 3.4) {
        s.idle = 0;
        TOUR[s.tour % TOUR.length]();
        s.tour += 1;
      }
    }
    return true;
  };

  const kick = useLoop(tick, inView);

  const act = (next: Partial<Pick<Sim, 'hz' | 'heavy' | 'busy'>>) => {
    sim.current.touched = true;
    apply(next);
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const s = sim.current;
    const map: Record<string, () => void> = {
      ' ': () => act({ busy: !s.busy }),
      Enter: () => act({ busy: !s.busy }),
      h: () => act({ heavy: !s.heavy }),
      j: () => act({ busy: !s.busy }),
      r: () => act({ hz: s.hz === 60 ? 120 : 60 }),
    };
    const run = map[event.key];
    if (!run) return;
    event.preventDefault();
    run();
  };

  React.useEffect(() => {
    if (asksForStillness()) sim.current.touched = true;
  }, []);

  const s = sim.current;
  const first = Math.max(0, Math.floor(s.scroll / ROW) - 1);
  const rows = Array.from(
    { length: Math.ceil(SH / ROW) + 2 },
    (_, k) => first + k,
  );
  const budgetAngle = BUDGET[s.hz] / DIAL_MS;
  const pend = pendulumOf(0);

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Make the JavaScript thread busy. Press H for heavy views, R to switch between 60 and 120 Hz."
        onClick={() => act({ busy: !s.busy })}
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
          <HousingArt art={JS_ART}>
            <Line d={JS_ART.vents} tone="lo" />
            <Line d={JS_ART.lampRing} tone="lo" />
            <Solid paths={JS_ART.socket} tone="mid" crease="none" />
            <Line d={JS_SOCKET_MOUTH} tone="lo" />
          </HousingArt>
          <FaceText transform={JS_ART.label} size={3} tone="mid">
            JS thread
          </FaceText>
          <circle
            ref={jsLampRef}
            className="af-head"
            cx={JS_ART.lamp[0].toFixed(2)}
            cy={JS_ART.lamp[1].toFixed(2)}
            r={0.9}
            opacity={0.5}
          />
          <Cable d={CABLE_D} />
          <Runner
            d={CABLE_D}
            runRef={(node) => void (runRef.current = node)}
            headRef={(node) => void (headRef.current = node)}
          />

          <PhoneBack phone={PHONE_ART} />
          <PhoneScreen phone={PHONE_ART} id="ut-screen">
            {rows.map((row) => {
              const y = row * ROW - s.scroll;
              const ready = row < s.described;
              return (
                <g key={row} transform={`translate(0 ${y.toFixed(2)})`}>
                  {ready ? (
                    <>
                      <rect
                        className="af-ui-line"
                        x={2.4}
                        y={1}
                        width={SW - 4.8}
                        height={ROW - 2}
                        rx={1}
                      />
                      <rect
                        className="af-ui"
                        x={4.2}
                        y={2.6}
                        width={3.8}
                        height={3.8}
                        rx={0.6}
                      />
                      <path
                        className="af-ui-line"
                        d={`M10 3.6H${SW - 6 - (row % 3) * 4}M10 5.8H${SW - 12}`}
                      />
                    </>
                  ) : (
                    <rect
                      className="ut-blank"
                      x={2.4}
                      y={1}
                      width={SW - 4.8}
                      height={ROW - 2}
                      rx={1}
                    />
                  )}
                </g>
              );
            })}
          </PhoneScreen>
          <PhoneFront phone={PHONE_ART} />
          <Socket socket={DOCK_SOCKET} />

          <HousingArt art={UI_ART}>
            <Line d={UI_ART.frameRings} tone="lo" />
            <Solid paths={UI_ART.tower} tone="mid" crease="faint" />
          </HousingArt>
          <FaceText transform={UI_ART.label} size={3} tone="mid">
            UI thread
          </FaceText>
          <Line d={UI_ART.post} tone="mid" />
          <Line d={UI_ART.arc} tone="lo" />
          <path
            ref={rodRef}
            className="iso-line ra-rod"
            data-tone="hi"
            d={pend.rod}
          />
          <circle
            ref={bobRef}
            className="af-head"
            cx={pend.bob[0].toFixed(2)}
            cy={pend.bob[1].toFixed(2)}
            r={1.6}
          />
          <g>
            <FaceDial
              transform={UI_ART.dial}
              needleRef={needleRef}
              r={7.4}
              ticks={10}
            />
            <g transform={UI_ART.dial}>
              <path
                className="af-red-line"
                d={`M0 0L${(Math.sin(((-135 + 270 * budgetAngle) * Math.PI) / 180) * 8.4).toFixed(2)} ${(-Math.cos(((-135 + 270 * budgetAngle) * Math.PI) / 180) * 8.4).toFixed(2)}`}
                transform="scale(1)"
                opacity={0.9}
                strokeDasharray="1 1"
              />
            </g>
          </g>
          {UI_ART.frames.map(([x, y], index) => (
            <circle
              key={index}
              className={s.history[index] ? 'af-head' : 'af-red'}
              cx={x}
              cy={y}
              r={0.95}
              opacity={s.history[index] ? 0.75 : 1}
            />
          ))}
        </svg>
      </div>
      <Controls>
        <button
          type="button"
          onClick={() => act({ busy: !s.busy })}
          aria-pressed={ui.busy}
        >
          JS busy: {ui.busy ? 'on' : 'off'}
        </button>
        <button
          type="button"
          onClick={() => act({ heavy: !s.heavy })}
          aria-pressed={ui.heavy}
        >
          Heavy views: {ui.heavy ? 'on' : 'off'}
        </button>
        <div
          className="af-segmented"
          role="radiogroup"
          aria-label="Refresh rate"
        >
          {([60, 120] as const).map((hz) => (
            <button
              key={hz}
              type="button"
              role="radio"
              aria-checked={ui.hz === hz}
              onClick={() => act({ hz })}
            >
              {hz} Hz
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function UiThreadAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Two kinds of jank"
        hint="Tap for busy JS · H heavy views · R refresh rate"
        readout={readouts.state(60, false, false)}
        keys={[
          { label: 'Frame drawn on time', mark: 'lit' },
          { label: 'Frame budget / dropped frame', mark: 'red' },
          { label: 'Row not described yet', mark: 'dim' },
        ]}
        caption="Shown in slow motion. The UI thread draws every frame inside a budget of 16.7 ms at 60 Hz or 8.3 ms at 120 Hz. With JavaScript busy, it keeps scrolling but new rows were described too late and arrive blank: JS-thread jank. With a heavy view tree (big images, shadows, deep nesting), drawing overruns the budget and frames are dropped even with JavaScript idle: UI-thread jank. A 12 ms frame passes at 60 Hz and drops at 120. The fixes are opposite, so find which thread is saturated first."
      >
        <UiThreadBench />
      </Plate>
    </div>
  );
}
