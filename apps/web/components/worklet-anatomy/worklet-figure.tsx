/**
 * A worklet is a function marked 'worklet' (the Reanimated Babel plugin adds
 * it inside hooks like useAnimatedStyle). It is copied into a separate UI
 * runtime and runs there every frame, reading shared values, so it keeps
 * going while the JavaScript thread is busy. It can only use captured values
 * and shared values; calling back into normal JS needs runOnJS, which waits
 * for the JS thread.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
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

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 104, r: 10, w: 260, x: -146, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 56, y: -48 }, 0, 72),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 56, pad: 18 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 60, y: 24 },
  ruler: { d: 5, r: 1, w: 110, x: -132, y: 30 },
});

const JS: Plan = { d: 30, r: 3, w: 46, x: -136, y: -50 };
const UI: Plan = { d: 30, r: 3, w: 46, x: -40, y: -50 };
const TOP = 22;
const PHONE = phoneOf(P, { sh: 54, sw: 28, x: 56, y: -48 });
const SOCKET = PHONE.socketAt(64);
const CARD: Plan = { d: 18, r: 1.2, w: 40, x: -133, y: -47 };
const ART = {
  card: slabOf(CARD, TOP, 1.6, P, 3, 0.3),
  cardFace: topMatrix([CARD.x + 2, CARD.y + 4.4], TOP + 1.6, P, 'x'),
  dial: sideMatrix([UI.x + UI.w - 12, UI.y + UI.d], 10, P, 'left'),
  dialCap: sideMatrix([UI.x + 3, UI.y + UI.d], 5, P, 'left'),
  js: housingOf(P, JS, TOP),
  jsLabel: sideMatrix([JS.x + 3, JS.y + JS.d], TOP - 3.4, P, 'left'),
  jsLamp: F.at([JS.x + JS.w - 5, JS.y + JS.d, 8]),
  jsLampRing: F.circleOnY(JS.x + JS.w - 5, JS.y + JS.d, 8, 1.5, 12),
  queueLamp: F.at([JS.x + JS.w - 11, JS.y + JS.d, 8]),
  queueRing: F.circleOnY(JS.x + JS.w - 11, JS.y + JS.d, 8, 1.5, 12),
  ui: housingOf(P, UI, TOP),
  uiLabel: sideMatrix([UI.x + 3, UI.y + UI.d], TOP - 3.4, P, 'left'),
};
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 4));
const BRIDGE = route([
  [JS.x + JS.w, -36, 4],
  [JS.x + JS.w + 6, -36, 1.3],
  [UI.x - 6, -36, 1.3],
  [UI.x, -36, 4],
]);
const OUT = route([
  [UI.x + UI.w - 8, UI.y + UI.d + 1, 2],
  [UI.x + UI.w - 8, -6, 1.3],
  [64, -6, 1.3],
  SOCKET.end,
]);
const CARD_COPY_DX = UI.x - JS.x;
const SOURCE = [
  `useAnimatedStyle(() => {`,
  `  'worklet';`,
  `  return { opacity:`,
  `    progress.value }`,
  `})`,
];

const LABEL =
  'Worklets drawn as two runtime housings, JavaScript and UI, joined by a cable, with a phone cabled to the UI one. A card on the JavaScript housing holds a useAnimatedStyle function marked worklet; a copy of it sits on the UI housing, which runs it every frame. A dial on the UI housing turns with the shared value progress, and the box on the phone fades in and out with it. Making JavaScript busy turns its lamp red but the box keeps fading. A runOnJS call sends a pulse back to the JavaScript housing, where it waits in a queue lamp until JavaScript is free.';

export function WorkletBench() {
  const sim = React.useRef({
    back: false,
    busy: 0,
    clock: 0,
    idle: 0,
    pulses: [-1, -1],
    queued: false,
    touched: false,
    tour: 0,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const [busyUi, setBusyUi] = React.useState(false);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const needleRef = React.useRef<SVGPathElement>(null);
  const boxRef = React.useRef<SVGRectElement>(null);
  const jsLampRef = React.useRef<SVGCircleElement>(null);
  const queueRef = React.useRef<SVGCircleElement>(null);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);

  const busy = () => {
    const s = sim.current;
    s.busy = 3;
    setBusyUi(true);
    say(`JS thread busy · the worklet keeps animating on the UI thread`);
  };
  const callBack = () => {
    const s = sim.current;
    s.back = true;
    s.pulses[0] = 0;
    say(`runOnJS(onDone) · goes back to the JS thread`);
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    if (calm) return false;
    s.clock += dt;
    const progress = 0.5 + 0.5 * Math.sin(s.clock * 2.4);
    needleRef.current?.setAttribute('transform', dialRotate(progress));
    boxRef.current?.setAttribute(
      'opacity',
      (0.15 + 0.85 * progress).toFixed(3),
    );
    if (s.busy > 0) {
      s.busy -= dt;
      if (s.busy <= 0) {
        s.busy = 0;
        setBusyUi(false);
        if (s.queued) {
          s.queued = false;
          say(`JS free · the queued runOnJS callback runs now`);
        } else say(`JS thread free`);
      }
    }
    if (jsLampRef.current) {
      jsLampRef.current.setAttribute('class', s.busy ? 'af-red' : 'af-head');
      jsLampRef.current.setAttribute('opacity', s.busy ? '1' : '0.4');
    }
    queueRef.current?.setAttribute('opacity', s.queued ? '1' : '0.12');
    // pulse 0 runs back along the JS–UI cable; pulse 1 runs from UI to the phone each beat.
    s.pulses = s.pulses.map((t, i) => {
      if (t < 0) {
        hideRun(runRefs.current[i], headRefs.current[i]);
        return t;
      }
      const next = t + dt / 0.7;
      if (runRefs.current[i])
        runAlong(
          runRefs.current[i]!,
          headRefs.current[i],
          Math.min(1, next),
          i === 0 ? -1 : 1,
          0.15,
        );
      if (next >= 1 && i === 0) {
        if (s.busy) {
          s.queued = true;
          say(`runOnJS waits · the JS thread is busy`);
        } else say(`runOnJS(onDone) ran on the JS thread`);
      }
      return next >= 1 ? -1 : next;
    });
    if (s.pulses[1] < 0 && Math.sin(s.clock * 2.4) > 0.99) s.pulses[1] = 0;

    if (!s.touched) {
      s.idle += dt;
      if (s.idle > 3) {
        s.idle = 0;
        (s.tour % 2 ? callBack : busy)();
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
    rerender();
    kick();
  };
  const SW = PHONE.sw;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Make the JavaScript thread busy. Press R to call runOnJS."
        onClick={() => act(busy)}
        onKeyDown={(event) => {
          if (event.key === 'r') act(callBack);
          else if (
            event.key === ' ' ||
            event.key === 'Enter' ||
            event.key === 'b'
          )
            act(busy);
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
          <HousingArt art={ART.js}>
            <Line d={ART.jsLampRing} tone="lo" />
            <Line d={ART.queueRing} tone="lo" />
          </HousingArt>
          <FaceText transform={ART.jsLabel} size={3} tone="mid">
            JS runtime
          </FaceText>
          <Solid paths={ART.card} tone="hi" crease="lo" />
          <g transform={ART.cardFace}>
            {SOURCE.map((line, i) => (
              <text
                key={i}
                className="af-mono"
                y={i * 2.9}
                fontSize={2.2}
                xmlSpace="preserve"
              >
                {line}
              </text>
            ))}
          </g>
          <circle
            ref={jsLampRef}
            className="af-head"
            cx={ART.jsLamp[0].toFixed(2)}
            cy={ART.jsLamp[1].toFixed(2)}
            r={0.9}
          />
          <circle
            ref={queueRef}
            className="af-head"
            cx={ART.queueLamp[0].toFixed(2)}
            cy={ART.queueLamp[1].toFixed(2)}
            r={0.9}
            opacity={0.12}
          />
          <Cable d={BRIDGE} />
          <Runner
            d={BRIDGE}
            runRef={(node) => void (runRefs.current[0] = node)}
            headRef={(node) => void (headRefs.current[0] = node)}
          />
          <HousingArt art={ART.ui} />
          <FaceText transform={ART.uiLabel} size={3} tone="mid">
            UI runtime
          </FaceText>
          <FaceText transform={ART.dialCap} size={2.4} tone="lo">
            progress.value
          </FaceText>
          <FaceDial
            transform={ART.dial}
            needleRef={needleRef}
            r={6.4}
            ticks={10}
          />
          <g transform={translateAlong(P, [CARD_COPY_DX, 0, 0])}>
            <Solid paths={ART.card} tone="hi" crease="lo" lit />
            <g transform={ART.cardFace}>
              {SOURCE.map((line, i) => (
                <text
                  key={i}
                  className="af-mono"
                  y={i * 2.9}
                  fontSize={2.2}
                  xmlSpace="preserve"
                >
                  {line}
                </text>
              ))}
            </g>
          </g>
          <Cable d={OUT} />
          <Runner
            d={OUT}
            runRef={(node) => void (runRefs.current[1] = node)}
            headRef={(node) => void (headRefs.current[1] = node)}
          />
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="wk-screen">
            <rect className="rn-header" width={SW} height={8} />
            <rect
              ref={boxRef}
              className="sa-button"
              x={5}
              y={18}
              width={SW - 10}
              height={18}
              rx={2}
            />
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
          <Socket socket={SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act(busy)} disabled={busyUi}>
          Make JS busy
        </button>
        <button type="button" onClick={() => act(callBack)}>
          runOnJS(onDone)
        </button>
      </Controls>
    </div>
  );
}

export function WorkletAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="A function that runs on the UI thread"
        hint="Tap to busy JS · R runOnJS"
        readout="the worklet runs every frame on the UI thread"
        keys={[
          { label: 'The worklet, on the UI runtime', mark: 'lit' },
          { label: 'Runtime', mark: 'raised' },
          { label: 'JS thread busy', mark: 'red' },
        ]}
        caption="A worklet is a small JavaScript function marked 'worklet' (inside useAnimatedStyle the Reanimated Babel plugin adds it for you). It is copied into a separate UI runtime and runs there every frame, reading shared values, so the animation keeps going while the JavaScript thread is busy. The trade-off is isolation: it can only use values captured from its scope and shared values, and calling back into normal JavaScript goes through runOnJS, which waits for the JS thread."
      >
        <WorkletBench />
      </Plate>
    </div>
  );
}
