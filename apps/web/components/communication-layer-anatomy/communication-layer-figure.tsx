/**
 * The communication layer carries calls between JavaScript and native code.
 * Legacy: the bridge, async JSON messages, no synchronous reads. Today: JSI
 * for direct calls, TurboModules for lazily loaded modules on top of it,
 * Codegen for typed glue. An EventEmitter carries events the other way.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  pathOf,
  sideMatrix,
  slabOf,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
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
  HousingArt,
  Runner,
} from '../anatomy/bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  hideRun,
  housingOf,
  routeOf,
  runAlong,
} from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 104, r: 10, w: 260, x: -140, y: -62 };
const P = fitProjection(
  [...boxCorners(BASE, -BASE_H - FOOT_H, 0)],
  WIDTH,
  HEIGHT,
  { azimuth: 54, elevation: 32, pad: 24 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 64, y: 26 },
  ruler: { d: 5, r: 1, w: 110, x: -126, y: 32 },
});

const JS: Plan = { d: 32, r: 3, w: 40, x: -132, y: -52 };
const NATIVE: Plan = { d: 32, r: 3, w: 40, x: 72, y: -52 };
const TOP = 28;
const PIECES = ['Bridge', 'JSI', 'TurboModules', 'Codegen'] as const;
const RACK: Plan = { d: 10, r: 1.5, w: 120, x: -60, y: -6 };
const ART = {
  js: housingOf(P, JS, TOP),
  jsLabel: sideMatrix([JS.x + 3, JS.y + JS.d], TOP - 3, P, 'left'),
  lamps: [JS, NATIVE].map((b) => F.at([b.x + b.w - 5, b.y + b.d, 8])),
  native: housingOf(P, NATIVE, TOP),
  nativeLabel: sideMatrix(
    [NATIVE.x + 3, NATIVE.y + NATIVE.d],
    TOP - 3,
    P,
    'left',
  ),
  pieceFaces: PIECES.map((_, i) =>
    sideMatrix([RACK.x + 4.4 + i * 29, RACK.y + 8], 3.6, P, 'left'),
  ),
  pieces: PIECES.map((_, i) =>
    slabOf(
      { d: 6, r: 1, w: 26, x: RACK.x + 3 + i * 29, y: RACK.y + 2 },
      3,
      2.4,
      P,
      3,
      0.3,
    ),
  ),
  rack: slabOf(RACK, 0, 3, P, 3, 0.5),
  /** Two posts hold the call cable up between the housings. */
  posts: [-40, 30].map((x) =>
    slabOf({ d: 4, r: 0.8, w: 4, x: x - 2, y: -42 }, 0, 8.6, P, 3, 0.3),
  ),
  rings: [JS, NATIVE]
    .map((b) => F.circleOnY(b.x + b.w - 5, b.y + b.d, 8, 1.5, 12))
    .join(''),
  saddles: [-40, 30].map((x) =>
    slabOf({ d: 6, r: 0.8, w: 6, x: x - 3, y: -43 }, 8.6, 1.6, P, 3, 0.3),
  ),
};
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 6));
const CALL = route([
  [JS.x + JS.w, -40, 10],
  [JS.x + JS.w + 6, -40, 10],
  [NATIVE.x - 6, -40, 10],
  [NATIVE.x, -40, 10],
]);
const EVENT = route([
  [NATIVE.x + 8, NATIVE.y + NATIVE.d, 3],
  [NATIVE.x + 8, -12, 1.3],
  [JS.x + JS.w - 8, -12, 1.3],
  [JS.x + JS.w - 8, JS.y + JS.d, 3],
]);

type Mode = 'legacy' | 'new';
const ACTIVE: Record<Mode, string[]> = {
  legacy: ['Bridge'],
  new: ['JSI', 'TurboModules', 'Codegen'],
};

const LABEL =
  'The communication layer drawn as a JavaScript housing and a native housing joined by a call cable, with a second cable, the EventEmitter, running back the other way, and a rack of four plates in front: Bridge, JSI, TurboModules and Codegen. In legacy mode only the Bridge plate is lit: a call crawls across as a JSON message and its reply comes back later, so nothing can be read synchronously. In New Architecture mode JSI, TurboModules and Codegen are lit: the call reaches native code at once and returns a value in the same call. In both modes, native code pushes events up to JavaScript along the EventEmitter cable.';

export function CommunicationBench() {
  const sim = React.useRef({
    dirs: [1, -1, 1] as Array<1 | -1>,
    durs: [1.4, 1.4, 0.9],
    lamps: [0, 0],
    mode: 'legacy' as Mode,
    pulses: [-1, -1, -1],
  });
  const [mode, setMode] = React.useState<Mode>('legacy');
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);
  const lampRefs = React.useRef<Array<SVGCircleElement | null>>([]);

  const call = () => {
    const s = sim.current;
    if (s.mode === 'legacy') {
      s.durs[0] = 1.4;
      s.pulses[0] = 0;
      say(`call → JSON.stringify → queued on the bridge · async`);
      sch.later(1.4, () => {
        s.lamps[1] = 1;
        s.durs[1] = 1.4;
        s.pulses[1] = 0;
        sch.later(1.4, () => {
          s.lamps[0] = 1;
          say(`reply arrives later as another JSON message · no sync reads`);
        });
      });
    } else {
      s.durs[0] = 0.18;
      s.pulses[0] = 0;
      sch.later(0.18, () => {
        s.lamps = [1, 1];
        say(
          `JSI call into a TurboModule · direct, typed by Codegen · value returned in the same call`,
        );
        sch.later(0.4, () => undefined);
      });
    }
  };
  const event = () => {
    const s = sim.current;
    s.lamps[1] = 1;
    s.pulses[2] = 0;
    say(`native event → EventEmitter → JavaScript listener`);
    sch.later(0.9, () => (s.lamps[0] = 1));
  };
  const choose = (next: Mode) => {
    sim.current.mode = next;
    setMode(next);
    say(
      next === 'legacy'
        ? `legacy: the bridge`
        : `New Architecture: JSI, TurboModules, Codegen`,
    );
  };
  const TOUR = [
    call,
    event,
    () => choose('new'),
    call,
    event,
    () => choose('legacy'),
  ];

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.pulses = s.pulses.map((t, i) => {
      const path = i === 2 ? 2 : 0;
      if (t < 0) {
        if (!(i === 1 && s.pulses[0] >= 0))
          hideRun(runRefs.current[path], headRefs.current[path]);
        return t;
      }
      const next = calm ? 1 : t + dt / s.durs[i];
      if (runRefs.current[path])
        runAlong(
          runRefs.current[path]!,
          headRefs.current[path],
          Math.min(1, next),
          s.dirs[i],
          s.mode === 'new' && i === 0 ? 1 : 0.18,
        );
      moving = true;
      return next >= 1 ? -1 : next;
    });
    s.lamps = s.lamps.map((v, i) => {
      const next = Math.max(0, v - dt * 1.6);
      lampRefs.current[i]?.setAttribute(
        'opacity',
        (0.12 + 0.88 * next).toFixed(3),
      );
      moving ||= next > 0.01;
      return next;
    });
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.4, (i) =>
      TOUR[i % TOUR.length](),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = (run: () => void) => {
    sch.touch();
    if (sch.pending) return;
    run();
    kick();
  };
  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);
  const locked = sch.busy && sch.touched;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Call native code. Press E for a native event, M to switch architecture."
        onClick={() => act(call)}
        onKeyDown={(event) => {
          if (event.key === 'e') act(() => TOUR[1]());
          else if (event.key === 'm')
            act(() => choose(sim.current.mode === 'legacy' ? 'new' : 'legacy'));
          else if (event.key === ' ' || event.key === 'Enter') act(call);
          else return;
          event.preventDefault();
        }}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <BenchArt bench={BENCH} />
          <HousingArt art={ART.js} />
          <FaceText transform={ART.jsLabel} size={3} tone="mid">
            JavaScript
          </FaceText>
          {ART.posts.map((paths, i) => (
            <Solid key={`p${i}`} paths={paths} tone="mid" crease="faint" />
          ))}
          <Cable d={CALL} />
          <Runner
            d={CALL}
            runRef={(node) => void (runRefs.current[0] = node)}
            headRef={(node) => void (headRefs.current[0] = node)}
          />
          {ART.saddles.map((paths, i) => (
            <Solid key={`s${i}`} paths={paths} tone="mid" crease="faint" />
          ))}
          <HousingArt art={ART.native} />
          <FaceText transform={ART.nativeLabel} size={3} tone="mid">
            Native
          </FaceText>
          <Line d={ART.rings} tone="lo" />
          {ART.lamps.map(([x, y], i) => (
            <circle
              key={i}
              ref={(node) => void (lampRefs.current[i] = node)}
              className="af-head"
              cx={x}
              cy={y}
              r={0.9}
              opacity={0.12}
            />
          ))}
          <Cable d={EVENT} />
          <Runner
            d={EVENT}
            runRef={(node) => void (runRefs.current[2] = node)}
            headRef={(node) => void (headRefs.current[2] = node)}
          />
          <Solid paths={ART.rack} tone="mid" crease="faint" />
          {PIECES.map((name, i) => (
            <g key={name}>
              <Solid
                paths={ART.pieces[i]}
                tone={ACTIVE[mode].includes(name) ? 'hi' : 'mid'}
                crease="lo"
                lit={ACTIVE[mode].includes(name)}
              />
              <FaceText
                transform={ART.pieceFaces[i]}
                size={2.2}
                tone={ACTIVE[mode].includes(name) ? 'hi' : 'lo'}
              >
                {name}
              </FaceText>
            </g>
          ))}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act(call)} disabled={locked}>
          Call native
        </button>
        <button type="button" onClick={() => act(event)} disabled={locked}>
          Native event
        </button>
        <div
          className="af-segmented"
          role="radiogroup"
          aria-label="Architecture"
        >
          {(['legacy', 'new'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => act(() => choose(m))}
              disabled={locked}
            >
              {m === 'legacy' ? 'Bridge' : 'JSI + TurboModules'}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function CommunicationAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How JS talks to native"
        hint="Tap to call · E event · M architecture"
        readout="legacy: the bridge"
        keys={[
          { label: 'Piece in use', mark: 'lit' },
          { label: 'Runtime', mark: 'raised' },
          { label: 'Message on its way', mark: 'edge' },
        ]}
        caption="The communication layer carries calls between your JavaScript and the platform: reading a file, opening the camera, pushing a layout update. It began as the bridge, which serialised every call to JSON and queued it, so nothing could be read back synchronously. JSI replaced it with direct references, TurboModules load native modules on demand on top of JSI, and Codegen generates the typed glue from TypeScript specs. An EventEmitter carries events the other way, from native code up to JavaScript."
      >
        <CommunicationBench />
      </Plate>
    </div>
  );
}
