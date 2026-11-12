/**
 * A React element is a plain object description: a type, props and
 * children. Each render builds a fresh tree of them; React diffs it against
 * the previous tree and turns only the differences into native operations.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  lineOnTop,
  pathOf,
  sideMatrix,
  slabOf,
  topMatrix,
  translateAlong,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import {
  BenchArt,
  Cable,
  Controls,
  PhoneBack,
  PhoneFront,
  PhoneScreen,
  Runner,
  Socket,
} from '../anatomy/bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  hideRun,
  phoneOf,
  routeOf,
  runAlong,
} from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

type El = { type: string; text: string };
const FIRST: El[] = [
  { text: '', type: 'View' },
  { text: "'Hello'", type: 'Text' },
  { text: 'logo', type: 'Image' },
  { text: "'Save'", type: 'Button' },
];
type Action = 'same' | 'text' | 'add';
const NEXT: Record<Action, (prev: El[]) => El[]> = {
  add: (prev) =>
    prev.length < 5
      ? [...prev, { text: "'New'", type: 'Text' }]
      : prev.slice(0, 4),
  same: (prev) => prev.map((e) => ({ ...e })),
  text: (prev) =>
    prev.map((e, i) =>
      i === 1 ? { ...e, text: e.text === "'Hello'" ? "'Hi'" : "'Hello'" } : e,
    ),
};

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 104, r: 10, w: 250, x: -140, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 52, y: -48 }, 0, 72),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 54, elevation: 36, pad: 18 },
);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 58, y: 24 },
  ruler: { d: 5, r: 1, w: 110, x: -126, y: 32 },
});
const PHONE = phoneOf(P, { sh: 54, sw: 28, x: 52, y: -48 });
const SOCKET = PHONE.socketAt(60);

const TRAYS = [-130, -74];
const TRAY_W = 50;
const ROW = 10;
const ROW_Y = (i: number) => -52 + i * ROW;
const tray = (x: number): Plan => ({
  d: 5 * ROW + 6,
  r: 2,
  w: TRAY_W,
  x,
  y: -55,
});
const ART = {
  bar: slabOf(
    {
      d: 2,
      r: 0.6,
      w: TRAYS[1] + TRAY_W - TRAYS[0] + 6,
      x: TRAYS[0] - 3,
      y: -1,
    },
    7,
    2,
    P,
    2,
    0.3,
  ),
  card: (x: number, i: number) =>
    slabOf(
      { d: ROW - 2, r: 1, w: TRAY_W - 6, x: x + 3, y: ROW_Y(i) },
      3,
      1.6,
      P,
      3,
      0.3,
    ),
  face: (x: number, i: number) =>
    topMatrix([x + 5, ROW_Y(i) + 5.4], 4.6, P, 'x'),
  labels: TRAYS.map((x) =>
    sideMatrix([x + 2, -55 + 5 * ROW + 6], 0.6, P, 'left'),
  ),
  marks: (i: number) =>
    lineOnTop(
      [TRAYS[1] + TRAY_W - 6, ROW_Y(i) + 2],
      [TRAYS[1] + TRAY_W - 3, ROW_Y(i) + 6],
      4.65,
      P,
    ),
  rails: [TRAYS[0] - 4, TRAYS[1] + TRAY_W + 1].map((x) =>
    slabOf({ d: 5 * ROW + 6, r: 0.6, w: 3, x, y: -55 }, 0, 7, P, 2, 0.3),
  ),
  trays: TRAYS.map((x) => slabOf(tray(x), 0, 3, P, 3, 0.5)),
};
const CABLE = pathOf(
  routeOf(
    P,
    [
      [TRAYS[1] + TRAY_W, -26, 2],
      [TRAYS[1] + TRAY_W + 6, -26, 1.3],
      [20, -26, 1.3],
      [20, -6, 1.3],
      [60, -6, 1.3],
      SOCKET.end,
    ] as Point3[],
    4,
  ),
);
const SW = PHONE.sw;

const LABEL =
  'React elements drawn as two trays of cards side by side, the previous render on the left and the next render on the right, one card per element: a View, a Text, an Image and a Button. A comparator bar sweeps down both trays together. Rows that match stay plain; a row that differs lights up and becomes one native operation, sent as a pulse down a cable to a phone, where only that row changes. A re-render with the same output sends nothing; adding an element sends one insert.';

export function ElementsBench() {
  const sim = React.useRef({
    bar: -1,
    barTarget: -1,
    changed: [] as number[],
    flash: 0,
    next: FIRST,
    prev: FIRST,
    pulse: -1,
    shown: FIRST,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const barRef = React.useRef<SVGGElement>(null);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);

  const render = (action: Action) => {
    const s = sim.current;
    s.prev = s.shown;
    s.next = NEXT[action](s.shown);
    s.changed = [];
    s.bar = -0.5;
    s.barTarget = 4.6;
    rerender();
    const rows = Math.max(s.prev.length, s.next.length);
    for (let i = 0; i < rows; i++) {
      sch.later(0.25 + i * 0.32, () => {
        const a = s.prev[i];
        const b = s.next[i];
        if (!a || !b || a.type !== b.type || a.text !== b.text) {
          s.changed = [...s.changed, i];
          rerender();
        }
      });
    }
    sch.later(0.4 + rows * 0.32, () => {
      const ops = s.changed.length;
      if (ops) {
        s.pulse = 0;
        sch.later(0.7, () => {
          s.shown = s.next;
          s.flash = 1;
          rerender();
          say(
            `${ops} element${ops > 1 ? 's' : ''} changed · ${ops} native operation${ops > 1 ? 's' : ''} · the rest untouched`,
          );
        });
      } else {
        s.shown = s.next;
        rerender();
        say(`re-rendered · same elements · 0 native operations`);
      }
    });
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    s.bar = calm ? s.barTarget : Math.min(s.barTarget, s.bar + dt / 0.32);
    barRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, ROW_Y(0) + 4 + s.bar * ROW + 1, 0]),
    );
    barRef.current?.setAttribute('opacity', s.bar < s.barTarget ? '1' : '0');
    let moving = s.bar < s.barTarget;
    if (s.pulse >= 0) {
      s.pulse = calm ? -1 : s.pulse + dt / 0.7;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current)
      runAlong(runRef.current, headRef.current, s.pulse, 1);
    else hideRun(runRef.current, headRef.current);
    s.flash = follow(s.flash, 0, dt, 0.4, calm);
    moving ||= s.pulse >= 0 || s.flash > 0.01;
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.5, (i) =>
      render((['text', 'same', 'add', 'text', 'add'] as Action[])[i % 5]),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = (action: Action) => {
    sch.touch();
    if (sch.pending) return;
    render(action);
    kick();
  };
  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);
  const s = sim.current;
  const locked = sch.busy && sch.touched;

  const cards = (list: El[], x: number, side: number) =>
    list.map((el, i) => (
      <g key={`${side}-${i}`}>
        <Solid
          paths={ART.card(x, i)}
          tone="hi"
          crease="lo"
          lit={side === 1 && s.changed.includes(i)}
        />
        <FaceText
          transform={ART.face(x, i)}
          size={2.6}
          tone="mid"
        >{`${'  '.repeat(i ? 1 : 0)}${el.type}${el.text ? ' · ' + el.text : ''}`}</FaceText>
      </g>
    ));

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Change a Text's content and re-render. Press S to re-render with the same output, A to add an element."
        onClick={() => act('text')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'text',
            a: 'add',
            Enter: 'text',
            s: 'same',
            t: 'text',
          };
          const action = map[event.key];
          if (!action) return;
          event.preventDefault();
          act(action);
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
          {ART.rails.slice(0, 1).map((paths, i) => (
            <Solid key={i} paths={paths} tone="mid" crease="faint" />
          ))}
          {ART.trays.map((paths, i) => (
            <g key={i}>
              <Solid paths={paths} tone="lo" crease="faint" />
              <FaceText transform={ART.labels[i]} size={2.6} tone="mid">
                {i ? 'next render' : 'previous render'}
              </FaceText>
            </g>
          ))}
          {cards(s.prev, TRAYS[0], 0)}
          {cards(s.next, TRAYS[1], 1)}
          {s.changed.map((i) => (
            <Line key={i} d={ART.marks(i)} tone="lit" />
          ))}
          <g ref={barRef} opacity={0}>
            <Solid paths={ART.bar} tone="mid" crease="faint" />
          </g>
          <Solid paths={ART.rails[1]} tone="mid" crease="faint" />
          <Cable d={CABLE} />
          <Runner
            d={CABLE}
            runRef={(node) => void (runRef.current = node)}
            headRef={(node) => void (headRef.current = node)}
          />
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="re-screen">
            {s.shown.slice(1).map((el, i) => (
              <g key={i}>
                <rect
                  className={
                    s.flash > 0.05 && s.changed.includes(i + 1)
                      ? 'af-ui-lit'
                      : 'af-ui-line'
                  }
                  x={3}
                  y={6 + i * 10}
                  width={SW - 6}
                  height={8}
                  rx={1}
                />
                <text
                  className="af-mono"
                  x={5}
                  y={11.4 + i * 10}
                  fontSize={2.6}
                >{`${el.type} ${el.text}`}</text>
              </g>
            ))}
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
          <Socket socket={SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('text')} disabled={locked}>
          Change the Text
        </button>
        <button type="button" onClick={() => act('same')} disabled={locked}>
          Re-render, same output
        </button>
        <button type="button" onClick={() => act('add')} disabled={locked}>
          {s.shown.length < 5 ? 'Add an element' : 'Remove it'}
        </button>
      </Controls>
    </div>
  );
}

export function ElementsAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Descriptions, then a diff"
        hint="Tap to change a Text · S same · A add"
        readout="each render builds new element objects · React diffs them"
        keys={[
          { label: 'Element that changed', mark: 'lit' },
          { label: 'React element', mark: 'raised' },
          { label: 'Native operation', mark: 'edge' },
        ]}
        caption="A React element is a plain object, a type, props and children, describing what should be on screen; creating one touches no native view. Each render builds a fresh tree of them, and React diffs it against the previous tree so only the differences become native operations. That is why re-rendering a component is cheap and recreating a UIView is not. A component is the function you write, an element is what it returns, and an instance is the native view Fabric mounts."
      >
        <ElementsBench />
      </Plate>
    </div>
  );
}
