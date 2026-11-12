/**
 * The JavaScript thread runs renders, hooks, event handlers and network
 * callbacks one at a time. A long task (parsing a large JSON payload) blocks
 * everything queued behind it, so a tap's onPress runs late, while the UI
 * thread keeps scrolling natively. Times here are figure seconds.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  lineOnTop,
  sideMatrix,
  sideSeam,
  slabOf,
  solidSvg,
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
import {
  BenchArt,
  Controls,
  HousingArt,
  PhoneBack,
  PhoneFront,
  PhoneScreen,
} from '../anatomy/bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  housingOf,
  phoneOf,
} from '../anatomy/parts';

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 100, r: 10, w: 270, x: -150, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 60, y: -48 }, 0, 70),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 52, pad: 18 },
);
const F = facesOf(P);
const solid = (plan: Plan, z: number, h: number, steps = 3, bevel = 0.4) =>
  slabOf(plan, z, h, P, steps, bevel);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 64, y: 20 },
  ruler: { d: 5, r: 1, w: 150, x: -136, y: 28 },
});

const BELT_X0 = -136;
const BELT_X1 = -12;
const BELT_Y = -24;
const BELT: Plan = {
  d: 16,
  r: 1.5,
  w: BELT_X1 - BELT_X0,
  x: BELT_X0,
  y: BELT_Y - 8,
};
const BELT_TOP = 5;
const PRESS: Plan = { d: 26, r: 3, w: 34, x: -12, y: -40 };
const PRESS_TOP = 30;
const PHONE = phoneOf(P, { sh: 54, sw: 28, x: 60, y: -48 });
const ART = {
  belt: solid(BELT, 0, BELT_TOP, 3, 0.6),
  beltSeam: sideSeam(BELT, 2, P, 3),
  lamp: F.at([PRESS.x + PRESS.w - 5, PRESS.y + PRESS.d, 8]),
  lampRing: F.circleOnY(PRESS.x + PRESS.w - 5, PRESS.y + PRESS.d, 8, 1.5, 12),
  mouth: F.rectOnX(PRESS.x, BELT_Y - 6, BELT_Y + 6, BELT_TOP, BELT_TOP + 8),
  press: housingOf(P, PRESS, PRESS_TOP),
  pressLabel: sideMatrix(
    [PRESS.x + 3, PRESS.y + PRESS.d],
    PRESS_TOP - 4,
    P,
    'left',
  ),
  rails: [BELT.y + 0.8, BELT.y + BELT.d - 0.8]
    .map((y) => lineOnTop([BELT_X0 + 2, y], [BELT_X1 - 1, y], BELT_TOP, P))
    .join(''),
};

type Kind = 'render' | 'net' | 'press' | 'json';
const COST: Record<Kind, number> = {
  json: 2.6,
  net: 0.25,
  press: 0.2,
  render: 0.3,
};
const WIDE: Record<Kind, number> = { json: 34, net: 6, press: 7, render: 7 };
const NAMES: Record<Kind, string> = {
  json: 'JSON.parse',
  net: 'fetch cb',
  press: 'onPress',
  render: 'render',
};
const SPEED = 40;

const taskOf = (kind: Kind) => {
  const w = WIDE[kind];
  const plan: Plan = { d: 11, r: 1, w, x: -w, y: BELT_Y - 5.5 };
  return {
    body: solidSvg(slabOf(plan, BELT_TOP, kind === 'json' ? 6 : 4, P, 3, 0.4), {
      crease: 'lo',
      lit: kind === 'press',
      tone: kind === 'json' ? 'mid' : 'hi',
    }),
    face: topMatrix(
      [-w + 1.4, BELT_Y + 1],
      BELT_TOP + (kind === 'json' ? 6 : 4),
      P,
      'x',
    ),
  };
};
const TASKS = {
  json: taskOf('json'),
  net: taskOf('net'),
  press: taskOf('press'),
  render: taskOf('render'),
};

interface Task {
  x: number;
  id: number;
  kind: Kind;
  born: number;
}

interface Sim {
  busy: number;
  idle: number;
  tour: number;
  clock: number;
  tasks: Task[];
  spawn: number;
  tapAt: number;
  nextId: number;
  scroll: number;
  pressed: number;
  touched: boolean;
  head: Task | null;
}

const LABEL =
  'The JavaScript thread drawn as one belt feeding one press. Task blocks ride the belt, render passes and network callbacks, each as wide as the work it carries, and the press handles them one at a time. Tapping the button puts a lit onPress block on the belt; it is handled when it reaches the press and the button on the phone lights up. Parsing a large JSON payload puts one very wide block on the belt: while the press works through it, everything behind it waits, so the tap is handled late. The phone’s list keeps scrolling the whole time, because scrolling runs on the UI thread.';

export function JsThreadBench() {
  const sim = React.useRef<Sim>({
    busy: 0,
    clock: 0,
    head: null,
    idle: 0,
    nextId: 1,
    pressed: 0,
    scroll: 0,
    spawn: 0,
    tapAt: -1,
    tasks: [],
    touched: false,
    tour: 0,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const taskRefs = React.useRef(new Map<number, SVGGElement>());
  const lampRef = React.useRef<SVGCircleElement>(null);
  const listRef = React.useRef<SVGGElement>(null);
  const buttonRef = React.useRef<SVGRectElement>(null);

  const add = (kind: Kind) => {
    const s = sim.current;
    s.tasks.push({
      born: s.clock,
      id: s.nextId++,
      kind,
      x: BELT_X0 + WIDE[kind] + 1,
    });
    if (kind === 'press') s.tapAt = s.clock;
    if (kind === 'json')
      say(`JSON.parse on the JS thread · everything behind it waits`);
    rerender();
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    if (calm) return false;
    s.clock += dt;
    // Background work: renders and network callbacks keep arriving.
    s.spawn -= dt;
    if (s.spawn <= 0) {
      s.spawn = 0.9;
      add(s.nextId % 3 ? 'render' : 'net');
    }
    // The press works on the head task; the rest queue behind it.
    if (s.head) {
      s.busy -= dt;
      if (s.busy <= 0) {
        if (s.head.kind === 'press') {
          s.pressed = 1;
          const wait = s.clock - s.tapAt;
          say(
            wait > 1.2
              ? `onPress ran ${wait.toFixed(1)} s after the tap · stuck behind JSON.parse`
              : `onPress ran ${wait.toFixed(1)} s after the tap`,
          );
        }
        s.tasks = s.tasks.filter((t) => t !== s.head);
        s.head = null;
        rerender();
      }
    }
    let ahead = BELT_X1;
    for (const task of s.tasks) {
      const limit = task === s.head ? BELT_X1 + 2 : Math.min(ahead, BELT_X1);
      task.x = Math.min(limit, task.x + SPEED * dt);
      if (!s.head && task.x >= BELT_X1 - 0.01) {
        s.head = task;
        s.busy = COST[task.kind];
      }
      ahead = task.x - WIDE[task.kind] - 1.2;
      const node = taskRefs.current.get(task.id);
      node?.setAttribute('transform', translateAlong(P, [task.x, 0, 0]));
    }
    if (lampRef.current) {
      const blocked = s.head?.kind === 'json';
      lampRef.current.setAttribute('class', blocked ? 'af-red' : 'af-head');
      lampRef.current.setAttribute('opacity', s.head ? '1' : '0.15');
    }
    s.scroll += dt * 9;
    listRef.current?.setAttribute(
      'transform',
      `translate(0 ${(-(s.scroll % 9)).toFixed(2)})`,
    );
    s.pressed = Math.max(0, s.pressed - dt * 1.2);
    buttonRef.current?.setAttribute('opacity', s.pressed.toFixed(3));

    if (!s.touched) {
      s.idle += dt;
      if (s.idle > 2.6) {
        s.idle = 0;
        add((['press', 'json', 'press'] as Kind[])[s.tour % 3]);
        s.tour += 1;
      }
    }
    return true;
  };
  const kick = useLoop(tick, inView);
  const act = (kind: Kind) => {
    sim.current.touched = true;
    add(kind);
    kick();
  };
  React.useEffect(() => {
    if (asksForStillness()) sim.current.touched = true;
  }, []);
  const s = sim.current;
  const SW = PHONE.sw;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Tap the button. Press J to parse a large JSON payload."
        onClick={() => act('press')}
        onKeyDown={(event) => {
          if (event.key === 'j') act('json');
          else if (
            event.key === ' ' ||
            event.key === 'Enter' ||
            event.key === 't'
          )
            act('press');
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
            paths={ART.belt}
            tone="mid"
            crease="faint"
            inner={<Line d={ART.beltSeam} tone="faint" />}
          />
          <Line d={ART.rails} tone="lo" />
          {s.tasks.map((task) => (
            <g
              key={task.id}
              ref={(node) => {
                if (node) taskRefs.current.set(task.id, node);
                else taskRefs.current.delete(task.id);
              }}
              transform={translateAlong(P, [task.x, 0, 0])}
            >
              <g dangerouslySetInnerHTML={{ __html: TASKS[task.kind].body }} />
              <FaceText transform={TASKS[task.kind].face} size={2.4} tone="mid">
                {NAMES[task.kind]}
              </FaceText>
            </g>
          ))}
          <HousingArt art={ART.press}>
            <Line d={ART.lampRing} tone="lo" />
          </HousingArt>
          <FaceText transform={ART.pressLabel} size={3} tone="mid">
            JS thread
          </FaceText>
          <circle
            ref={lampRef}
            className="af-head"
            cx={ART.lamp[0].toFixed(2)}
            cy={ART.lamp[1].toFixed(2)}
            r={0.9}
            opacity={0.15}
          />
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="jt-screen">
            <g ref={listRef}>
              {Array.from({ length: 8 }, (_, r) => (
                <rect
                  key={r}
                  className="af-ui-line"
                  x={2.4}
                  y={2 + r * 9}
                  width={SW - 4.8}
                  height={7}
                  rx={1}
                />
              ))}
            </g>
            <rect
              className="af-screen"
              x={0}
              y={PHONE.sh - 12}
              width={SW}
              height={12}
            />
            <rect
              className="af-ui-line"
              x={5}
              y={PHONE.sh - 10}
              width={SW - 10}
              height={7}
              rx={3.5}
            />
            <rect
              ref={buttonRef}
              className="af-flash"
              x={5}
              y={PHONE.sh - 10}
              width={SW - 10}
              height={7}
              rx={3.5}
              opacity={0}
            />
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('press')}>
          Tap the button
        </button>
        <button type="button" onClick={() => act('json')}>
          Parse a large JSON
        </button>
      </Controls>
    </div>
  );
}

export function JsThreadAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="One thread, one task at a time"
        hint="Tap to press the button · J parse JSON"
        readout="renders and callbacks queue on the JS thread"
        keys={[
          { label: 'Your tap’s onPress', mark: 'lit' },
          { label: 'Queued task', mark: 'raised' },
          { label: 'Thread blocked', mark: 'red' },
        ]}
        caption="Renders, hooks, event handlers and network callbacks all run on the single JavaScript thread, one after another. A long task, like parsing a large JSON payload or mapping thousands of records on every render, blocks everything behind it: the button responds late even though scrolling, which the UI thread handles, keeps moving. Move the work off the render path, paginate it, or take animations off this thread with worklets. Times in the figure are not real milliseconds."
      >
        <JsThreadBench />
      </Plate>
    </div>
  );
}
