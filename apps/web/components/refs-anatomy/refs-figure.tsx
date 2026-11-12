/**
 * Refs: useRef holds a value that survives re-renders without causing one,
 * and a ref attached to a core component lets you call its imperative
 * methods, like TextInput.focus(). State, by contrast, re-renders.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  pathOf,
  sideMatrix,
  slabOf,
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
  HousingArt,
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
  facesOf,
  hideRun,
  housingOf,
  phoneOf,
  routeOf,
  runAlong,
} from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 100, r: 10, w: 240, x: -136, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 30, y: -48 }, 0, 72),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 60, pad: 18 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 50, y: 22 },
  ruler: { d: 5, r: 1, w: 110, x: -122, y: 28 },
});

const BOX: Plan = { d: 30, r: 3, w: 70, x: -116, y: -46 };
const TOP = 26;
const FRONT = BOX.y + BOX.d;
const PHONE = phoneOf(P, { sh: 56, sw: 28, x: 30, y: -48 });
const SOCKET = PHONE.socketAt(38);
const DRAWER: Plan = { d: 14, r: 0.8, w: 22, x: BOX.x + 42, y: FRONT - 12 };
const ART = {
  box: housingOf(P, BOX, TOP),
  drawer: slabOf(DRAWER, 8, 8, P, 3, 0.4),
  drawerFace: F.rectOnY(
    FRONT + 2,
    DRAWER.x + 3,
    DRAWER.x + DRAWER.w - 3,
    10,
    14,
  ),
  drawerText: sideMatrix([DRAWER.x + 4, FRONT + 2], 11, P, 'left'),
  label: sideMatrix([BOX.x + 4, FRONT], TOP - 3, P, 'left'),
  lamp: F.at([BOX.x + BOX.w - 5, FRONT, TOP - 5]),
  lampRing: F.circleOnY(BOX.x + BOX.w - 5, FRONT, TOP - 5, 1.5, 12),
  refCap: sideMatrix([DRAWER.x, FRONT], 19, P, 'left'),
  slot: F.rectOnY(FRONT, DRAWER.x - 0.6, DRAWER.x + DRAWER.w + 0.6, 7.4, 16.6),
  socket: slabOf(
    { d: 7, r: 0.6, w: 3, x: BOX.x + BOX.w, y: BOX.y + 10 },
    2,
    5,
    P,
    3,
    0.3,
  ),
  stateCap: sideMatrix([BOX.x + 6, FRONT], 19, P, 'left'),
  stateText: sideMatrix([BOX.x + 8, FRONT], 11, P, 'left'),
  stateWin: F.rectOnY(FRONT, BOX.x + 6, BOX.x + 32, 8, 16),
};
const CABLE = pathOf(
  routeOf(
    P,
    [
      [BOX.x + BOX.w + 3, BOX.y + 13.5, 4.5],
      [BOX.x + BOX.w + 8, BOX.y + 13.5, 1.3],
      [BOX.x + BOX.w + 8, -6, 1.3],
      [38, -6, 1.3],
      SOCKET.end,
    ] as Point3[],
    4,
  ),
);
const SW = PHONE.sw;
const SH = PHONE.sh;

type Action = 'state' | 'ref' | 'focus';
const TOUR: Action[] = ['state', 'ref', 'ref', 'focus', 'state'];

const LABEL =
  'Refs drawn as a component housing beside a phone. Its front has a window for count, a piece of state, a drawer holding ref.current, and a re-render lamp. A cable runs from it to a TextInput on the phone: inputRef. Calling setCount changes the window, flashes the lamp and the phone redraws. Writing ref.current slides the drawer out and changes its number, but the lamp stays dark and nothing re-renders. Calling inputRef.current.focus() sends a pulse down the cable and the phone’s text field takes focus, with the keyboard sliding up.';

export function RefsBench() {
  const sim = React.useRef({
    count: 0,
    drawer: 0,
    drawerTarget: 0,
    focus: 0,
    focusTarget: 0,
    lamp: 0,
    pulse: -1,
    ref: 0,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const drawerRef = React.useRef<SVGGElement>(null);
  const lampRef = React.useRef<SVGGElement>(null);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);
  const kbRef = React.useRef<SVGGElement>(null);
  const flashRef = React.useRef<SVGRectElement>(null);
  const flash = React.useRef(0);

  const actions: Record<Action, () => void> = {
    focus: () => {
      const s = sim.current;
      s.pulse = 0;
      sch.later(0.7, () => {
        s.focusTarget = s.focusTarget ? 0 : 1;
        say(
          s.focusTarget
            ? 'inputRef.current.focus() · the field takes focus · no re-render'
            : 'inputRef.current.blur() · keyboard down',
        );
        rerender();
      });
    },
    ref: () => {
      const s = sim.current;
      s.drawerTarget = 1;
      sch.later(0.35, () => {
        s.ref += 1;
        rerender();
        say(`ref.current = ${s.ref} · stored, nothing re-renders`);
        sch.later(0.5, () => (s.drawerTarget = 0));
      });
    },
    state: () => {
      const s = sim.current;
      s.count += 1;
      s.lamp = 1;
      flash.current = 1;
      rerender();
      say(`setCount(${s.count}) · the component re-renders`);
      sch.later(0.5, () => undefined);
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    s.drawer = follow(s.drawer, s.drawerTarget, dt, 0.08, calm);
    drawerRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 8 * s.drawer, 0]),
    );
    s.focus = follow(s.focus, s.focusTarget, dt, 0.1, calm);
    kbRef.current?.setAttribute(
      'transform',
      `translate(0 ${(20 * (1 - s.focus)).toFixed(2)})`,
    );
    s.lamp = follow(s.lamp, 0, dt, 0.35, calm);
    lampRef.current?.setAttribute('opacity', (0.12 + 0.88 * s.lamp).toFixed(3));
    flash.current = follow(flash.current, 0, dt, 0.25, calm);
    flashRef.current?.setAttribute('opacity', (0.4 * flash.current).toFixed(3));
    if (s.pulse >= 0) {
      s.pulse = calm ? -1 : s.pulse + dt / 0.7;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current)
      runAlong(runRef.current, headRef.current, s.pulse, 1);
    else hideRun(runRef.current, headRef.current);
    const moving =
      s.drawer !== s.drawerTarget ||
      s.focus !== s.focusTarget ||
      s.lamp > 0.01 ||
      flash.current > 0.01 ||
      s.pulse >= 0;
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
        aria-label="Call setCount. Press R to write ref.current, F to focus the text input."
        onClick={() => act('state')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'state',
            Enter: 'state',
            f: 'focus',
            r: 'ref',
            s: 'state',
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
          <HousingArt art={ART.box}>
            <Line d={ART.lampRing} tone="lo" />
            <Solid paths={ART.socket} tone="mid" crease="none" />
          </HousingArt>
          <FaceText transform={ART.label} size={3} tone="mid">
            Form
          </FaceText>
          <path className="ps-window" d={ART.stateWin} />
          <g transform={ART.stateText}>
            <text className="af-mono" fontSize={3.4} y={1}>
              count {s.count}
            </text>
          </g>
          <FaceText transform={ART.stateCap} size={2.4} tone="lo">
            useState
          </FaceText>
          <FaceText transform={ART.refCap} size={2.4} tone="lo">
            useRef
          </FaceText>
          <path className="ps-window" d={ART.slot} />
          <g ref={drawerRef}>
            <Solid paths={ART.drawer} tone="hi" crease="lo" lit />
            <path className="ps-window" d={ART.drawerFace} />
            <g transform={ART.drawerText}>
              <text
                className="af-mono"
                fontSize={3}
                y={0.6}
              >{`current ${s.ref}`}</text>
            </g>
          </g>
          <g ref={lampRef} opacity={0.12}>
            <circle
              className="af-head"
              cx={ART.lamp[0].toFixed(2)}
              cy={ART.lamp[1].toFixed(2)}
              r={0.9}
            />
          </g>
          <Cable d={CABLE} />
          <Runner
            d={CABLE}
            runRef={(node) => void (runRef.current = node)}
            headRef={(node) => void (headRef.current = node)}
          />
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="rf-screen">
            <rect className="rn-header" width={SW} height={8} />
            <text
              className="af-mono"
              x={SW / 2}
              y={5.6}
              fontSize={2.6}
              textAnchor="middle"
            >
              count {s.count}
            </text>
            <rect
              className={s.focusTarget ? 'af-ui-lit' : 'af-ui-line'}
              x={3}
              y={14}
              width={SW - 6}
              height={6}
              rx={1}
            />
            {s.focusTarget ? (
              <path className="af-ui-lit" d="M5.2 15.4V18.6" />
            ) : (
              <path className="af-ui-line" d="M5 17H13" />
            )}
            <g ref={kbRef}>
              <rect
                className="rn-header"
                x={0}
                y={SH - 20}
                width={SW}
                height={20}
              />
              {[0, 1, 2, 3].map((r) => (
                <path
                  key={r}
                  className="af-ui-line"
                  d={`M2 ${SH - 17 + r * 4.4}H${SW - 2}`}
                  strokeDasharray="1.8 0.8"
                />
              ))}
            </g>
            <rect
              ref={flashRef}
              className="af-flash"
              width={SW}
              height={SH}
              opacity={0}
            />
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
          <Socket socket={SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('state')} disabled={locked}>
          setCount(+1)
        </button>
        <button type="button" onClick={() => act('ref')} disabled={locked}>
          ref.current += 1
        </button>
        <button type="button" onClick={() => act('focus')} disabled={locked}>
          {s.focusTarget ? 'blur()' : 'focus()'}
        </button>
      </Controls>
    </div>
  );
}

export function RefsAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Values that don’t re-render"
        hint="Tap for setCount · R ref.current · F focus"
        readout="state re-renders · a ref does not"
        keys={[
          { label: 'The ref', mark: 'lit' },
          { label: 'Component', mark: 'raised' },
          { label: 'Call through the ref', mark: 'edge' },
        ]}
        caption="A ref holds a value that survives re-renders but never causes one: a timer id, a previous value, a has-fired flag. Attached to a core component, it is also how you call imperative methods, such as focusing a TextInput, scrolling a list or measuring a view, that have no declarative equivalent. Reach for it sparingly: if a value changes what the user sees, it belongs in state."
      >
        <RefsBench />
      </Plate>
    </div>
  );
}
