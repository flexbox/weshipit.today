import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import { BenchArt, Controls } from '../anatomy/bench';
import { useScheduler } from '../anatomy/sim';
import {
  BEAM_ART,
  BEAM_REST_Y,
  BED_ART,
  BENCH,
  HEAD_ART,
  HEIGHT,
  P,
  PITCH,
  PLATE_ART,
  PLATE_ORIGIN,
  WIDTH,
} from './geometry';
import { FORGOTTEN, PLATES, VERSIONS, readouts } from './model';

type Pt = readonly [number, number];
const pathD = (points: readonly Pt[]) =>
  points.map(([u, v], i) => `${i ? 'L' : 'M'}${u} ${v}`).join('');

function pointAt(points: readonly Pt[], t: number): Pt {
  const lengths = points
    .slice(1)
    .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  let left = t * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i]) {
      const k = left / lengths[i];
      return [
        points[i][0] + (points[i + 1][0] - points[i][0]) * k,
        points[i][1] + (points[i + 1][1] - points[i][1]) * k,
      ];
    }
    left -= lengths[i];
  }
  return points[points.length - 1];
}

const STATIC = (
  <g>
    <Solid
      paths={BED_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={BED_ART.seam} tone="faint" />}
    />
    <Line d={BED_ART.ticksMinor} tone="lo" />
    <Line d={BED_ART.ticksMajor} tone="mid" />
    {BED_ART.rails.map((rail, index) => (
      <g key={index}>
        <Solid paths={rail.post} tone="mid" crease="faint" />
      </g>
    ))}
  </g>
);

/* ---------- Simulation ---------- */

interface Sim {
  head: Pt;
  t: number;
  cut: number[];
  hand: boolean;
  crash: number;
  target: number;
  lift: number[];
  passing: boolean;
}

type Action = 'codegen' | 'hand' | 'run';
const TOUR: Action[] = ['codegen', 'run', 'hand', 'run', 'codegen', 'run'];
const PASS = 2.2;

const LABEL =
  'Codegen drawn as a four-head engraver on a gantry over four plates: spec.ts, then the C++, Java and Objective-C bindings. Each plate carries the method’s signature as an engraved path and its name. Editing the spec runs one pass: all four heads move together and cut the same new signature into every plate, so the bindings match the spec. Renaming by hand, the way legacy native modules were maintained, cuts the spec, C++ and Objective-C plates but leaves the Java head raised, so the Java plate keeps the old name. Running the app then lights the Java lamp red: the method is not a function on Android.';

export function CodegenBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      crash: 0,
      cut: [0, 0, 0, 0],
      hand: false,
      head: [3, 12],
      lift: [1, 1, 1, 1],
      passing: false,
      t: 0,
      target: 0,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);
  const beamRef = React.useRef<SVGGElement>(null);
  const carRefs = React.useRef<Array<SVGGElement | null>>([]);
  const cutRefs = React.useRef<Array<SVGPathElement | null>>([]);

  const pass = (hand: boolean) => {
    const s = sim.current;
    s.target = (Math.max(...s.cut) + 1) % VERSIONS.length;
    if (s.target === s.cut[0] && !hand)
      s.target = (s.target + 1) % VERSIONS.length;
    s.hand = hand;
    s.t = 0;
    s.passing = true;
    s.crash = 0;
    rerender();
    sch.later(PASS + 0.3, () => {
      s.passing = false;
      s.cut = s.cut.map((v, i) => (hand && i === FORGOTTEN ? v : s.target));
      rerender();
      const name = VERSIONS[s.target].name;
      say(hand ? readouts.hand(name) : readouts.codegen(name));
    });
  };

  const actions: Record<Action, () => void> = {
    codegen: () => pass(false),
    hand: () => pass(true),
    run: () => {
      const s = sim.current;
      const bad = s.cut.some((v) => v !== s.cut[0]);
      s.crash = bad ? 1 : 0;
      rerender();
      say(bad ? readouts.crash(VERSIONS[s.cut[0]].name) : readouts.same());
      sch.later(0.6, () => undefined);
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    if (s.passing) {
      s.t = calm ? 1 : Math.min(1, s.t + dt / PASS);
      s.head = pointAt(VERSIONS[s.target].path, s.t);
      cutRefs.current.forEach((node, i) => {
        if (!node) return;
        const engraving = !(s.hand && i === FORGOTTEN);
        node.style.strokeDashoffset = engraving ? (1 - s.t).toFixed(4) : '1';
      });
      moving = true;
    }
    s.lift = s.lift.map((value, i) => {
      const goal =
        s.passing && !(s.hand && i === FORGOTTEN) && s.t > 0.02 ? 0 : 1;
      const next = follow(value, goal, dt, 0.06, calm);
      moving ||= next !== goal;
      return next;
    });
    const [u, v] = s.head;
    beamRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, PLATE_ORIGIN.y + v - BEAM_REST_Y, 0]),
    );
    headRefs.current.forEach((node, i) =>
      node?.setAttribute(
        'transform',
        translateAlong(P, [
          PLATE_ORIGIN.x + i * PITCH + u,
          PLATE_ORIGIN.y + v,
          4 * s.lift[i],
        ]),
      ),
    );
    carRefs.current.forEach((node, i) =>
      node?.setAttribute(
        'transform',
        translateAlong(P, [
          PLATE_ORIGIN.x + i * PITCH + u,
          PLATE_ORIGIN.y + v,
          0,
        ]),
      ),
    );
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.5, (i) =>
      actions[TOUR[i % TOUR.length]](),
    );
    return moving || pending || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (action: Action) => {
    sch.touch();
    if (sch.pending) return;
    actions[action]();
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'codegen',
      c: 'codegen',
      Enter: 'codegen',
      h: 'hand',
      r: 'run',
    };
    const action = map[event.key];
    if (!action) return;
    event.preventDefault();
    act(action);
  };

  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);

  const s = sim.current;
  const locked = sch.busy && sch.touched;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Edit the spec and run Codegen. Press H to rename by hand, R to run on Android."
        onClick={() => act('codegen')}
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
          {STATIC}
          {PLATE_ART.map((plate, i) => {
            const version = VERSIONS[s.cut[i]];
            const wrong = s.crash > 0 && s.cut[i] !== s.cut[0];
            return (
              <g key={i}>
                <Solid
                  paths={plate.body}
                  tone={i === 0 ? 'hi' : 'mid'}
                  crease="lo"
                  lit={i === 0}
                />
                <Line d={plate.border} tone="faint" />
                <g transform={plate.face}>
                  <path
                    className={wrong ? 'af-red-line' : 'cg-cut'}
                    d={pathD(version.path)}
                  />
                  {s.passing ? (
                    <path
                      ref={(node) => void (cutRefs.current[i] = node)}
                      className="cg-new"
                      d={pathD(VERSIONS[s.target].path)}
                      pathLength={1}
                      strokeDasharray="1 1"
                      strokeDashoffset={1}
                    />
                  ) : null}
                  <text
                    className={wrong ? 'af-mono cg-wrong' : 'af-mono'}
                    x={2.2}
                    y={16.4}
                    fontSize={2.4}
                  >
                    {version.name}
                  </text>
                </g>
                <FaceText transform={plate.label} size={2.6} tone="mid">
                  {PLATES[i]}
                </FaceText>
                <Line d={plate.lampRing} tone="lo" />
                <circle
                  className={wrong ? 'af-red' : 'af-head'}
                  cx={plate.lamp[0].toFixed(2)}
                  cy={plate.lamp[1].toFixed(2)}
                  r={0.75}
                  opacity={wrong ? 1 : 0.35}
                />
              </g>
            );
          })}
          {PLATE_ART.map((_, i) => (
            <g key={i} ref={(node) => void (headRefs.current[i] = node)}>
              <Solid paths={HEAD_ART.spindle} tone="mid" crease="none" />
              <circle
                className="af-head"
                cx={HEAD_ART.tip[0].toFixed(2)}
                cy={HEAD_ART.tip[1].toFixed(2)}
                r={0.7}
              />
            </g>
          ))}
          <g ref={beamRef}>
            <Solid paths={BEAM_ART.beam} tone="mid" crease="faint" />
            <Line d={BEAM_ART.slot} tone="lo" />
          </g>
          {PLATE_ART.map((_, i) => (
            <g key={i} ref={(node) => void (carRefs.current[i] = node)}>
              <Solid paths={HEAD_ART.carriage} tone="hi" crease="lo" />
            </g>
          ))}
          {BED_ART.rails.map((rail, index) => (
            <g key={index}>
              <Solid paths={rail.rail} tone="mid" crease="faint" />
              <Solid paths={rail.postFront} tone="mid" crease="faint" />
            </g>
          ))}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('codegen')} disabled={locked}>
          Edit spec, run Codegen
        </button>
        <button type="button" onClick={() => act('hand')} disabled={locked}>
          Rename by hand
        </button>
        <button type="button" onClick={() => act('run')} disabled={locked}>
          Run on Android
        </button>
      </Controls>
    </div>
  );
}

export function CodegenAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="One spec, every binding"
        hint="Tap to run Codegen · H by hand · R run"
        readout={readouts.rest()}
        keys={[
          { label: 'The TypeScript spec', mark: 'lit' },
          { label: 'Generated binding', mark: 'raised' },
          { label: 'Binding out of date', mark: 'red' },
        ]}
        caption="Codegen turns one TypeScript spec into the C++, Java and Objective-C bindings a TurboModule or Fabric component must implement, at build time, so every side always matches the spec and a mismatch is a compile error. Under the legacy architecture those bindings were written by hand; a rename that missed one side still built, and crashed on device with undefined is not a function. Codegen runs during the native build, which is why adding a New Architecture library needs a rebuild, not a reload."
      >
        <CodegenBench />
      </Plate>
    </div>
  );
}
