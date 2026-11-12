/**
 * Core components: each built-in component is backed by a real native view.
 * <View> → UIView / android.view, <Text> → UITextView / TextView,
 * <Image> → UIImageView / ImageView, <ScrollView> → UIScrollView / ScrollView,
 * <TextInput> → UITextField / EditText. A bare string inside a <View> throws:
 * text only renders inside <Text>.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  pathOf,
  planOutline,
  sideSeam,
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

const COMPONENTS = [
  { android: 'android.view', ios: 'UIView', name: 'View' },
  { android: 'TextView', ios: 'UITextView', name: 'Text' },
  { android: 'ImageView', ios: 'UIImageView', name: 'Image' },
  { android: 'ScrollView', ios: 'UIScrollView', name: 'ScrollView' },
  { android: 'EditText', ios: 'UITextField', name: 'TextInput' },
] as const;

const WIDTH = 640;
const HEIGHT = 380;
const BASE: Plan = { d: 104, r: 10, w: 262, x: -150, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 80, x: 0, y: -46 }, 0, 66),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 52, pad: 18 },
);
const solid = (plan: Plan, z: number, h: number, steps = 3, bevel = 0.4) =>
  slabOf(plan, z, h, P, steps, bevel);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 64, y: 24 },
  ruler: { d: 5, r: 1, w: 130, x: -136, y: 30 },
});

const TRAY: Plan = { d: 60, r: 2.5, w: 40, x: -140, y: -50 };
const SLOT_Y = (i: number) => TRAY.y + 4 + i * 11;
const BLOCK = (i: number): Plan => ({
  d: 9,
  r: 1,
  w: 32,
  x: TRAY.x + 4,
  y: SLOT_Y(i),
});
const TRAY_ART = {
  body: solid(TRAY, 0, 4, 4, 0.8),
  seam: sideSeam(TRAY, 1.6, P, 4),
  slots: COMPONENTS.map((_, i) =>
    planOutline(
      { ...BLOCK(i), d: 10, w: 34, x: BLOCK(i).x - 1, y: BLOCK(i).y - 0.5 },
      4,
      P,
      2,
    ),
  ).join(''),
};
const BLOCKS = COMPONENTS.map((_, i) => ({
  body: solid(BLOCK(i), 4, 4, 3, 0.5),
  face: topMatrix([BLOCK(i).x + 2.4, BLOCK(i).y + 6], 8, P, 'x'),
}));

const PHONES = [
  phoneOf(P, { margin: 6, sh: 46, sw: 24, x: 0, y: -46 }),
  phoneOf(P, { margin: 6, sh: 46, sw: 24, x: 48, y: -46 }),
];
const SOCKETS = [PHONES[0].socketAt(8), PHONES[1].socketAt(56)];
const LABELS = [
  topMatrix([-4, -18], 8, P, 'x'),
  topMatrix([44, -18], 8, P, 'x'),
];
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 4));
const CABLES = [
  route([
    [TRAY.x + TRAY.w, -24, 2],
    [TRAY.x + TRAY.w + 6, -24, 1.3],
    [-60, -24, 1.3],
    [-60, 2, 1.3],
    [8, 2, 1.3],
    SOCKETS[0].end,
  ]),
  route([
    [TRAY.x + TRAY.w, -18, 2],
    [TRAY.x + TRAY.w + 6, -18, 1.3],
    [-66, -18, 1.3],
    [-66, 10, 1.3],
    [56, 10, 1.3],
    SOCKETS[1].end,
  ]),
];
const SW = 24;
const SH = 46;

function Widget({ broken, index }: { index: number; broken: boolean }) {
  if (broken)
    return (
      <>
        <rect className="af-red" width={SW} height={SH} />
        <text className="af-error-text" x={2} y={8} fontSize={2.2}>
          Text strings must
        </text>
        <text className="af-error-text" x={2} y={11} fontSize={2.2}>
          be rendered within
        </text>
        <text className="af-error-text" x={2} y={14} fontSize={2.2}>
          a {'<Text>'}
        </text>
      </>
    );
  return (
    <>
      {index === 0 ? (
        <rect
          className="jx-view"
          x={3}
          y={6}
          width={SW - 6}
          height={22}
          rx={1.6}
        />
      ) : null}
      {index === 1 ? (
        <>
          <text className="af-mono" x={3} y={10} fontSize={3.6}>
            Hello
          </text>
          <path
            className="af-ui-line"
            d={`M3 15H${SW - 4}M3 18.6H${SW - 7}M3 22.2H${SW - 9}`}
          />
        </>
      ) : null}
      {index === 2 ? (
        <>
          <rect
            className="af-ui-line"
            x={3}
            y={6}
            width={SW - 6}
            height={18}
            rx={1}
          />
          <path
            className="af-ui-line"
            d={`M4.4 22L10 13 14 18 16.6 15.4 20 22`}
          />
          <circle className="af-head" cx={17} cy={10} r={1.6} />
        </>
      ) : null}
      {index === 3 ? (
        <>
          {[0, 1, 2, 3, 4].map((r) => (
            <rect
              key={r}
              className="af-ui-line"
              x={3}
              y={5 + r * 6}
              width={SW - 9}
              height={4.4}
              rx={0.8}
            />
          ))}
          <rect
            className="af-ui"
            x={SW - 4}
            y={8}
            width={1.2}
            height={10}
            rx={0.6}
          />
        </>
      ) : null}
      {index === 4 ? (
        <>
          <rect
            className="af-ui-lit"
            x={3}
            y={8}
            width={SW - 6}
            height={6}
            rx={1}
          />
          <path className="af-ui-line" d="M5 11H11" />
          <path className="af-ui-lit" d="M11.6 9.4V12.6" />
          <rect
            className="rn-header"
            x={0}
            y={SH - 16}
            width={SW}
            height={16}
          />
          {[0, 1, 2].map((r) => (
            <path
              key={r}
              className="af-ui-line"
              d={`M2 ${SH - 13 + r * 4.4}H${SW - 2}`}
              strokeDasharray="1.6 0.8"
            />
          ))}
        </>
      ) : null}
      <text
        className="af-mono er-url"
        x={SW / 2}
        y={SH - 2}
        fontSize={2.4}
        textAnchor="middle"
      />
    </>
  );
}

type Action = number | 'bare';
const TOUR: Action[] = [1, 2, 3, 4, 'bare', 0];

const LABEL =
  'Core components drawn as a type tray of five blocks, View, Text, Image, ScrollView and TextInput, cabled to an iOS phone and an Android phone. Choosing a block lifts it, sends a pulse down both cables, and each phone renders the real native widget for it, named on its dock: UIView and android.view, UITextView and TextView, UIImageView and ImageView, UIScrollView and ScrollView, UITextField and EditText. Putting a bare string inside a View turns both screens red: text only renders inside Text.';

export function CoreComponentsBench() {
  const sim = React.useRef({
    broken: false,
    lift: COMPONENTS.map(() => 0),
    pulse: -1,
    selected: 0,
    shown: 0,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const blockRefs = React.useRef<Array<SVGGElement | null>>([]);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);

  const choose = (action: Action) => {
    const s = sim.current;
    s.selected = action === 'bare' ? 0 : action;
    s.pulse = 0;
    rerender();
    sch.later(0.75, () => {
      s.shown = s.selected;
      s.broken = action === 'bare';
      rerender();
      const c = COMPONENTS[s.selected];
      say(
        action === 'bare'
          ? `<View>Hello</View> · Text strings must be rendered within a <Text>`
          : `<${c.name}> → ${c.ios} on iOS, ${c.android} on Android`,
      );
    });
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.lift = s.lift.map((v, i) => {
      const goal = i === s.selected ? 1 : 0;
      const next = follow(v, goal, dt, 0.08, calm);
      moving ||= next !== goal;
      blockRefs.current[i]?.setAttribute(
        'transform',
        translateAlong(P, [0, 0, 5 * next]),
      );
      return next;
    });
    if (s.pulse >= 0) {
      s.pulse = calm ? -1 : s.pulse + dt / 0.75;
      if (s.pulse >= 1) s.pulse = -1;
    }
    [0, 1].forEach((i) => {
      if (s.pulse >= 0 && runRefs.current[i])
        runAlong(runRefs.current[i]!, headRefs.current[i], s.pulse, 1);
      else hideRun(runRefs.current[i], headRefs.current[i]);
    });
    moving ||= s.pulse >= 0;
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.5, (i) =>
      choose(TOUR[i % TOUR.length]),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = (action: Action) => {
    sch.touch();
    if (sch.pending) return;
    choose(action);
    kick();
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
        aria-label="Render the next core component. Press 1 to 5 to pick one, B for a bare string in a View."
        onClick={() => act((s.selected + 1) % COMPONENTS.length)}
        onKeyDown={(event) => {
          const n = Number(event.key);
          if (n >= 1 && n <= 5) act(n - 1);
          else if (event.key === 'b') act('bare');
          else if (event.key === ' ' || event.key === 'Enter')
            act((s.selected + 1) % COMPONENTS.length);
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
            paths={TRAY_ART.body}
            tone="mid"
            crease="faint"
            inner={<Line d={TRAY_ART.seam} tone="faint" />}
          />
          <Line d={TRAY_ART.slots} tone="lo" />
          {BLOCKS.map((block, i) => (
            <g key={i} ref={(node) => void (blockRefs.current[i] = node)}>
              <Solid
                paths={block.body}
                tone="hi"
                crease="lo"
                lit={i === s.selected}
              />
              <FaceText
                transform={block.face}
                size={3}
                tone="mid"
              >{`<${COMPONENTS[i].name}>`}</FaceText>
            </g>
          ))}
          {CABLES.map((d, i) => (
            <g key={i}>
              <Cable d={d} />
              <Runner
                d={d}
                runRef={(node) => void (runRefs.current[i] = node)}
                headRef={(node) => void (headRefs.current[i] = node)}
              />
            </g>
          ))}
          {PHONES.map((phone, p) => (
            <g key={p}>
              <PhoneBack phone={phone} />
              <PhoneScreen phone={phone} id={`cc-${p}`}>
                <Widget index={s.shown} broken={s.broken} />
              </PhoneScreen>
              <PhoneFront phone={phone} />
              <Socket socket={SOCKETS[p]} />
              <FaceText
                transform={LABELS[p]}
                size={3}
                tone={s.broken ? 'lo' : 'hi'}
              >
                {s.broken
                  ? p
                    ? 'Android'
                    : 'iOS'
                  : p
                    ? COMPONENTS[s.shown].android
                    : COMPONENTS[s.shown].ios}
              </FaceText>
            </g>
          ))}
        </svg>
      </div>
      <Controls>
        {COMPONENTS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onClick={() => act(i)}
            disabled={locked}
            aria-pressed={s.selected === i && !s.broken}
          >
            {c.name}
          </button>
        ))}
        <button type="button" onClick={() => act('bare')} disabled={locked}>
          String in a View
        </button>
      </Controls>
    </div>
  );
}

export function CoreComponentsAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="What core components become"
        hint="Tap for the next component · B bare string"
        readout="<View> → UIView on iOS, android.view on Android"
        keys={[
          { label: 'Chosen component', mark: 'lit' },
          { label: 'Core component', mark: 'raised' },
          { label: 'Render error', mark: 'red' },
        ]}
        caption="Core components are the building blocks React Native ships with, and each one is backed by a real platform widget, not a web element: View is a UIView or an android.view, Text a UITextView or TextView, Image, ScrollView and TextInput map the same way. Text only renders inside Text, so a bare string in a View throws. ScrollView mounts all its children at once; long lists want FlatList."
      >
        <CoreComponentsBench />
      </Plate>
    </div>
  );
}
