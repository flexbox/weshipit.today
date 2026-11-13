/**
 * The JavaScript runtime is the engine embedded in the app binary. Hermes,
 * the default since React Native 0.70, runs bytecode compiled ahead of time,
 * so launch skips parsing; JavaScriptCore parses the bundle's source at
 * launch. There is no browser and no Node.js: fs and Buffer do not exist
 * unless polyfilled. The startup scale here is illustrative.
 */
import * as React from 'react';
import {
  boxCorners,
  cylinder,
  fitProjection,
  pathOf,
  ring,
  sideMatrix,
  slabOf,
  topMatrix,
  translateAlong,
  type Plan,
  type Point3,
} from '../kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
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
} from '../bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  hideRun,
  housingOf,
  phoneOf,
  routeOf,
  runAlong,
} from '../parts';
import { useScheduler } from '../sim';

const ENGINES = {
  hermes: { card: 'bytecode (.hbc)', name: 'Hermes', startup: 0.3 },
  jsc: { card: 'source (.js)', name: 'JavaScriptCore', startup: 0.62 },
} as const;
type Engine = keyof typeof ENGINES;

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
  { azimuth: 54, pad: 18 },
);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 56, y: 24 },
  ruler: { d: 5, r: 1, w: 110, x: -126, y: 30 },
});

const BAY: Plan = { d: 32, r: 3, w: 46, x: -60, y: -50 };
const BAY_TOP = 24;
const PUCK_AT: [number, number] = [-37, -34];
const CARD: Plan = { d: 20, r: 1.2, w: 44, x: -132, y: -40 };
const PHONE = phoneOf(P, { sh: 54, sw: 28, x: 52, y: -48 });
const SOCKET = PHONE.socketAt(60);
const ART = {
  bay: housingOf(P, BAY, BAY_TOP),
  card: slabOf(CARD, 0, 2.4, P, 3, 0.4),
  cardFace: topMatrix([CARD.x + 2.4, CARD.y + 6], 2.4, P, 'x'),
  dial: sideMatrix([BAY.x + BAY.w - 12, BAY.y + BAY.d], 11, P, 'left'),
  dialCap: sideMatrix([BAY.x + BAY.w - 20, BAY.y + BAY.d], 3, P, 'left'),
  label: sideMatrix([BAY.x + 3, BAY.y + BAY.d], BAY_TOP - 3, P, 'left'),
  puck: cylinder(PUCK_AT[0], PUCK_AT[1], 10, BAY_TOP, 6, P, 40, 0.8),
  puckFace: topMatrix(PUCK_AT, BAY_TOP + 6, P, 'x'),
  puckRing: ring(PUCK_AT[0], PUCK_AT[1], 7.6, BAY_TOP + 6, P, 32),
  socket: ring(PUCK_AT[0], PUCK_AT[1], 11.4, BAY_TOP, P, 36),
};
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 4));
const FEED = route([
  [CARD.x + CARD.w, CARD.y + 10, 1.6],
  [BAY.x - 6, CARD.y + 10, 1.3],
  [BAY.x - 2, CARD.y + 10, 3],
]);
const OUT = route([
  [BAY.x + BAY.w - 6, BAY.y + BAY.d + 1, 2],
  [BAY.x + BAY.w - 6, -6, 1.3],
  [60, -6, 1.3],
  SOCKET.end,
]);

type Action = 'launch' | 'swap' | 'fs';
const TOUR: Action[] = ['launch', 'swap', 'launch', 'fs', 'swap'];

const LABEL =
  'The JavaScript runtime drawn as an engine bay with a swappable engine puck on top, Hermes or JavaScriptCore, beside a phone. A card on the left is the bundle: for Hermes it is bytecode compiled ahead of time, for JavaScriptCore it is source. Launching sends the card into the bay and a pulse to the phone, and the startup gauge on the bay climbs: less for Hermes, which skips parsing, more for JavaScriptCore. Calling fs.readFile turns the phone red: there is no Node.js on the device.';

export function RuntimeBench() {
  const sim = React.useRef({
    engine: 'hermes' as Engine,
    fs: false,
    gauge: 0,
    gaugeTarget: 0,
    lift: 0,
    liftTarget: 0,
    pulses: [-1, -1],
    ready: true,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const puckRef = React.useRef<SVGGElement>(null);
  const needleRef = React.useRef<SVGPathElement>(null);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);

  const actions: Record<Action, () => void> = {
    fs: () => {
      const s = sim.current;
      s.fs = true;
      rerender();
      say(`require('fs') · Node.js APIs don't exist in the app's runtime`);
      sch.later(1.4, () => {
        s.fs = false;
        rerender();
      });
    },
    launch: () => {
      const s = sim.current;
      s.gaugeTarget = 0;
      s.ready = false;
      s.pulses[0] = 0;
      rerender();
      sch.later(0.6, () => {
        s.gaugeTarget = ENGINES[s.engine].startup;
        sch.later(0.4 + ENGINES[s.engine].startup * 1.6, () => {
          s.pulses[1] = 0;
          sch.later(0.6, () => {
            s.ready = true;
            rerender();
            say(
              s.engine === 'hermes'
                ? `Hermes runs precompiled bytecode · no parse at launch`
                : `JavaScriptCore parses the source at launch · slower start`,
            );
          });
        });
      });
    },
    swap: () => {
      const s = sim.current;
      s.liftTarget = 1;
      sch.later(0.45, () => {
        s.engine = s.engine === 'hermes' ? 'jsc' : 'hermes';
        s.gaugeTarget = 0;
        s.liftTarget = 0;
        rerender();
        say(
          `engine → ${ENGINES[s.engine].name} · the bundle is now ${ENGINES[s.engine].card}`,
        );
      });
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    s.lift = follow(s.lift, s.liftTarget, dt, 0.1, calm);
    puckRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, 20 * s.lift]),
    );
    puckRef.current?.setAttribute('opacity', (1 - 0.9 * s.lift).toFixed(3));
    s.gauge = follow(s.gauge, s.gaugeTarget, dt, 0.4, calm);
    needleRef.current?.setAttribute('transform', dialRotate(s.gauge));
    let moving = s.lift !== s.liftTarget || s.gauge !== s.gaugeTarget;
    s.pulses = s.pulses.map((t, i) => {
      if (t < 0) {
        hideRun(runRefs.current[i], headRefs.current[i]);
        return t;
      }
      const next = calm ? 1 : t + dt / 0.6;
      if (runRefs.current[i])
        runAlong(
          runRefs.current[i]!,
          headRefs.current[i],
          Math.min(1, next),
          1,
        );
      moving = true;
      return next >= 1 ? -1 : next;
    });
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
  const SW = PHONE.sw;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Launch the app. Press E to swap the engine, F to call fs.readFile."
        onClick={() => act('launch')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'launch',
            e: 'swap',
            Enter: 'launch',
            f: 'fs',
            l: 'launch',
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
          <Solid paths={ART.card} tone="hi" crease="lo" lit />
          <FaceText
            transform={ART.cardFace}
            size={2.4}
            tone="mid"
          >{`bundle · ${ENGINES[s.engine].card}`}</FaceText>
          <Cable d={FEED} />
          <Runner
            d={FEED}
            runRef={(node) => void (runRefs.current[0] = node)}
            headRef={(node) => void (headRefs.current[0] = node)}
          />
          <HousingArt art={ART.bay}>
            <Line d={ART.socket} tone="lo" />
          </HousingArt>
          <FaceText transform={ART.label} size={3} tone="mid">
            engine bay
          </FaceText>
          <FaceDial
            transform={ART.dial}
            needleRef={needleRef}
            r={6.4}
            ticks={10}
          />
          <FaceText transform={ART.dialCap} size={2.2} tone="lo">
            startup
          </FaceText>
          <g ref={puckRef}>
            <Solid paths={ART.puck} tone="hi" crease="lo" />
            <Line d={ART.puckRing} tone="faint" />
            <FaceText
              transform={ART.puckFace}
              size={s.engine === 'hermes' ? 3.4 : 2.4}
              tone="mid"
              anchor="middle"
            >
              <tspan dy={1.2}>{s.engine === 'hermes' ? 'Hermes' : 'JSC'}</tspan>
            </FaceText>
          </g>
          <Cable d={OUT} />
          <Runner
            d={OUT}
            runRef={(node) => void (runRefs.current[1] = node)}
            headRef={(node) => void (headRefs.current[1] = node)}
          />
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="rt-screen">
            {s.fs ? (
              <>
                <rect className="af-red" width={SW} height={PHONE.sh} />
                <text className="af-error-text" x={2} y={8} fontSize={2.4}>
                  Unable to resolve
                </text>
                <text className="af-error-text" x={2} y={11.4} fontSize={2.4}>
                  {"module 'fs'"}
                </text>
              </>
            ) : s.ready ? (
              <>
                <rect className="rn-header" width={SW} height={8} />
                {[0, 1, 2, 3].map((r) => (
                  <rect
                    key={r}
                    className="af-ui-line"
                    x={2.4}
                    y={11 + r * 9}
                    width={SW - 4.8}
                    height={7}
                    rx={1}
                  />
                ))}
              </>
            ) : (
              <circle
                className="af-ui-line"
                cx={SW / 2}
                cy={PHONE.sh / 2}
                r={3}
                strokeDasharray="4 2"
              />
            )}
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
          <Socket socket={SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('launch')} disabled={locked}>
          Launch app
        </button>
        <button type="button" onClick={() => act('swap')} disabled={locked}>
          Swap to {s.engine === 'hermes' ? 'JavaScriptCore' : 'Hermes'}
        </button>
        <button type="button" onClick={() => act('fs')} disabled={locked}>
          {"require('fs')"}
        </button>
      </Controls>
    </div>
  );
}

export function RuntimeAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="The engine inside the app"
        hint="Tap to launch · E engine · F require fs"
        readout="Hermes · bundle compiled to bytecode at build time"
        keys={[
          { label: 'The JavaScript bundle', mark: 'lit' },
          { label: 'Engine', mark: 'raised' },
          { label: 'No Node.js on device', mark: 'red' },
        ]}
        caption="React Native embeds a JavaScript engine in the app binary; there is no browser. Hermes, built by Meta and the default since React Native 0.70, compiles your bundle to bytecode ahead of time, which cuts startup time and memory on low-end phones. JavaScriptCore, Apple's engine, parses source at launch and is still selectable. Node.js APIs such as fs and Buffer do not exist here, and engine differences are real: a regex or Intl feature that works in Chrome may be missing on device. The startup scale is illustrative."
      >
        <RuntimeBench />
      </Plate>
    </div>
  );
}
