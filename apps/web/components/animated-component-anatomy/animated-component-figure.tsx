/**
 * An animated component's style is driven frame by frame by an animation
 * library instead of by re-renders. Animating with useState re-renders the
 * tree on every frame and stalls when JavaScript is busy; Animated.View with
 * useNativeDriver (or Reanimated) updates the native view directly, so the
 * tree does not re-render and the motion survives a busy JS thread.
 */
import * as React from 'react';
import {
  boxCorners,
  cylinder,
  fitProjection,
  lineOnTop,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  translateAlong,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import { BenchArt, Controls, HousingArt } from '../anatomy/bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  housingOf,
  knurlOf,
} from '../anatomy/parts';

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 104, r: 10, w: 250, x: -140, y: -62 };
const P = fitProjection(
  [...boxCorners(BASE, -BASE_H - FOOT_H, 0)],
  WIDTH,
  HEIGHT,
  { azimuth: 50, elevation: 34, pad: 22 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 64, y: 24 },
  ruler: { d: 5, r: 1, w: 120, x: -126, y: 30 },
});

const BOARD: Plan = { d: 50, r: 3, w: 70, x: -132, y: -54 };
const BOARD_TOP = 4;
const NODES: Array<[number, number]> = [
  [-97, -46],
  [-117, -32],
  [-97, -32],
  [-77, -32],
  [-122, -16],
  [-108, -16],
  [-86, -16],
];
const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [1, 5],
  [3, 6],
];
const ANIMATED = 6;
const RAIL: Plan = { d: 14, r: 1.5, w: 114, x: -30, y: -30 };
const RAIL_TOP = 4;
const CAR: Plan = { d: 12, r: 1.4, w: 16, x: -8, y: -29 };
const MOTOR: Plan = { d: 18, r: 2.5, w: 22, x: 85, y: -32 };
const X0 = -12;
const X1 = 64;
const ART = {
  board: slabOf(BOARD, 0, BOARD_TOP, P, 4, 0.8),
  boardLabel: topMatrix(
    [BOARD.x + 3, BOARD.y + BOARD.d - 3],
    BOARD_TOP,
    P,
    'x',
  ),
  boardSeam: sideSeam(BOARD, 1.6, P, 4),
  car: slabOf(CAR, RAIL_TOP, 12, P, 4, 0.8),
  carFace: topMatrix([CAR.x + 1.6, CAR.y + 7], RAIL_TOP + 12, P, 'x'),
  carSeam: sideSeam(CAR, RAIL_TOP + 3, P, 4),
  counter: sideMatrix([BOARD.x + 30, BOARD.y + BOARD.d], 2.6, P, 'left'),
  edges: EDGES.map(([a, b]) =>
    lineOnTop(NODES[a], NODES[b], BOARD_TOP, P),
  ).join(''),
  flywheel: cylinder(MOTOR.x + 11, MOTOR.y + 9, 6, 18, 3, P, 32, 0.4),
  lamps: NODES.map(([x, y]) => F.at([x, y, BOARD_TOP + 3])),
  motor: housingOf(P, MOTOR, 18),
  motorLabel: sideMatrix([MOTOR.x + 2, MOTOR.y + MOTOR.d], 6, P, 'left'),
  nodes: NODES.map(([x, y]) =>
    slabOf({ d: 6, r: 1, w: 6, x: x - 3, y: y - 3 }, BOARD_TOP, 3, P, 3, 0.4),
  ),
  rail: slabOf(RAIL, 0, RAIL_TOP, P, 3, 0.6),
  railSeam: sideSeam(RAIL, 1.6, P, 3),
  slot: lineOnTop(
    [RAIL.x + 3, RAIL.y + 7],
    [RAIL.x + RAIL.w - 3, RAIL.y + 7],
    RAIL_TOP,
    P,
  ),
  /** A wire from the animated node on the board to the carriage. */
  tie: lineOnTop(NODES[ANIMATED], [RAIL.x + 2, RAIL.y + 7], 0.8, P),
};
const BUSY_FRAME = 0.45;

type Mode = 'state' | 'native';
const LABEL =
  'Animated components drawn as a component tree on a pegboard, seven nodes with a re-render lamp each, beside a rail where a carriage, the animated view, slides back and forth. Driven by useState, every frame re-renders the tree: all seven lamps blink and a counter on the board climbs, and when JavaScript is busy the carriage stalls and jumps. Driven as an Animated.View with the native driver, a native motor at the end of the rail moves the carriage directly: the lamps stay dark, the counter stops, and a busy JavaScript thread does not touch the motion.';

export function AnimatedBench() {
  const sim = React.useRef({
    busy: 0,
    clock: 0,
    idle: 0,
    lastFrame: 0,
    mode: 'state' as Mode,
    renders: 0,
    since: 0,
    touched: false,
    tour: 0,
    x: X0,
  });
  const [mode, setMode] = React.useState<Mode>('state');
  const [busyUi, setBusyUi] = React.useState(false);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const carRef = React.useRef<SVGGElement>(null);
  const lampRefs = React.useRef<Array<SVGCircleElement | null>>([]);
  const countRef = React.useRef<SVGTextElement>(null);
  const knurlRef = React.useRef<SVGPathElement>(null);
  const flash = React.useRef(0);

  const choose = (next: Mode) => {
    sim.current.mode = next;
    setMode(next);
    say(
      next === 'state'
        ? `setState every frame · the whole tree re-renders`
        : `Animated.View · useNativeDriver: true · no re-renders`,
    );
  };
  const busy = () => {
    sim.current.busy = 2.6;
    setBusyUi(true);
    say(
      sim.current.mode === 'state'
        ? `JS busy · the setState animation stalls`
        : `JS busy · the native driver keeps it moving`,
    );
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    if (calm) return false;
    s.clock += dt;
    const goal = X0 + (X1 - X0) * (0.5 - 0.5 * Math.cos(s.clock * 1.8));
    if (s.busy > 0) {
      s.busy -= dt;
      if (s.busy <= 0) {
        s.busy = 0;
        setBusyUi(false);
      }
    }
    if (s.mode === 'native') {
      s.x = goal;
    } else {
      // Each JS frame re-renders the tree; a busy thread gets a frame out rarely.
      s.since += dt;
      const frame = s.busy ? BUSY_FRAME : 1 / 15;
      if (s.since >= frame) {
        s.since = 0;
        s.x = goal;
        s.renders += NODES.length;
        flash.current = 1;
      }
    }
    flash.current = Math.max(0, flash.current - dt * 8);
    carRef.current?.setAttribute('transform', translateAlong(P, [s.x, 0, 0]));
    lampRefs.current.forEach((node) =>
      node?.setAttribute(
        'opacity',
        (s.mode === 'state' ? 0.15 + 0.85 * flash.current : 0.1).toFixed(3),
      ),
    );
    if (countRef.current) countRef.current.textContent = `renders ${s.renders}`;
    if (knurlRef.current)
      knurlRef.current.setAttribute(
        'd',
        knurlOf(
          P,
          MOTOR.x + 11,
          MOTOR.y + 9,
          6,
          18,
          21,
          24,
          s.mode === 'native' ? s.clock * 3 : 0,
        ),
      );
    if (!s.touched) {
      s.idle += dt;
      if (s.idle > 3.2) {
        s.idle = 0;
        [busy, () => choose('native'), busy, () => choose('state')][
          s.tour % 4
        ]();
        s.tour += 1;
      }
    }
    return true;
  };
  const kick = useLoop(tick, inView);
  React.useEffect(() => {
    if (asksForStillness()) sim.current.touched = true;
  }, []);
  const act = (run: () => void) => {
    sim.current.touched = true;
    run();
    kick();
  };

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Make JavaScript busy. Press M to switch between setState and the native driver."
        onClick={() => act(busy)}
        onKeyDown={(event) => {
          if (event.key === 'm')
            act(() =>
              choose(sim.current.mode === 'state' ? 'native' : 'state'),
            );
          else if (event.key === ' ' || event.key === 'Enter') act(busy);
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
          <Solid
            paths={ART.board}
            tone="mid"
            crease="faint"
            inner={<Line d={ART.boardSeam} tone="faint" />}
          />
          <Line d={ART.edges} tone="mid" />
          <FaceText transform={ART.boardLabel} size={2.6} tone="lo">
            component tree
          </FaceText>
          <g transform={ART.counter}>
            <text ref={countRef} className="af-mono" fontSize={3} y={0}>
              renders 0
            </text>
          </g>
          {ART.nodes.map((paths, i) => (
            <g key={i}>
              <Solid paths={paths} tone="hi" crease="lo" lit={i === ANIMATED} />
              <circle
                ref={(node) => void (lampRefs.current[i] = node)}
                className="af-head"
                cx={ART.lamps[i][0].toFixed(2)}
                cy={ART.lamps[i][1].toFixed(2)}
                r={1}
                opacity={0.15}
              />
            </g>
          ))}
          <Line d={ART.tie} tone="faint" dashed />
          <Solid
            paths={ART.rail}
            tone="mid"
            crease="faint"
            inner={<Line d={ART.railSeam} tone="faint" />}
          />
          <Line d={ART.slot} tone="lo" />
          <g ref={carRef}>
            <Solid
              paths={ART.car}
              tone="hi"
              crease="lo"
              lit
              inner={<Line d={ART.carSeam} tone="faint" />}
            />
            <FaceText transform={ART.carFace} size={1.9} tone="mid">
              Animated.View
            </FaceText>
          </g>
          <HousingArt art={ART.motor}>
            <Solid
              paths={ART.flywheel}
              tone={mode === 'native' ? 'hi' : 'mid'}
              crease="none"
              lit={mode === 'native'}
            />
          </HousingArt>
          <path ref={knurlRef} className="iso-line" data-tone="faint" />
          <FaceText transform={ART.motorLabel} size={2.4} tone="mid">
            native driver
          </FaceText>
        </svg>
      </div>
      <Controls>
        <div className="af-segmented" role="radiogroup" aria-label="Driver">
          {(['state', 'native'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => act(() => choose(m))}
            >
              {m === 'state' ? 'setState per frame' : 'Animated.View, native'}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => act(busy)} disabled={busyUi}>
          Make JS busy
        </button>
      </Controls>
    </div>
  );
}

export function AnimatedAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Animating without re-rendering"
        hint="Tap to busy JS · M switch driver"
        readout="setState every frame · the whole tree re-renders"
        keys={[
          { label: 'The animated view', mark: 'lit' },
          { label: 'Component that re-renders', mark: 'raised' },
          { label: 'Bound to the animated value', mark: 'dashed' },
        ]}
        caption="An animated component is a view whose style an animation library drives frame by frame, instead of state. Animating with useState re-renders the tree on every frame and stalls whenever JavaScript is busy. The built-in Animated API renders Animated.View and, with useNativeDriver: true, hands the animation to the native side; Reanimated runs it as a worklet on the UI thread. Either way the tree does not re-render and the motion survives a busy JavaScript thread."
      >
        <AnimatedBench />
      </Plate>
    </div>
  );
}
