/**
 * A native module is platform code exposed to JavaScript, the way an app
 * reaches APIs React Native does not wrap (Bluetooth, biometrics, payments).
 * Installing one adds native code: it needs a native rebuild (autolinking
 * wires it in) and cannot ship as an over-the-air update.
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
  translateAlong,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
import { FaceText, Plate, Solid } from '../anatomy/kit/draw';
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
  hideRun,
  housingOf,
  phoneOf,
  routeOf,
  runAlong,
} from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

const WIDTH = 640;
const HEIGHT = 380;
const BASE: Plan = { d: 104, r: 10, w: 260, x: -140, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: -10, y: -48 }, 0, 72),
    ...boxCorners({ d: 20, r: 0, w: 20, x: 70, y: -40 }, 0, 46),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 54, pad: 18 },
);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 64, y: 24 },
  ruler: { d: 5, r: 1, w: 110, x: -126, y: 30 },
});

const JS: Plan = { d: 26, r: 3, w: 40, x: -132, y: -46 };
const PHONE = phoneOf(P, { ledge: 26, sh: 54, sw: 28, x: -10, y: -48 });
const SOCKET = PHONE.socketAt(-4);
const SLOT: Plan = { d: 7, r: 0.8, w: 12, x: 6, y: -36 };
const RADIO: Plan = { d: 20, r: 3, w: 20, x: 70, y: -40 };
const RADIO_TOP = 14;
const ANT: [number, number] = [80, -30];
const ART = {
  cartFace: sideMatrix(
    [SLOT.x + 1, SLOT.y + SLOT.d],
    PHONE.dockTop + 2.6,
    P,
    'left',
  ),
  cartridge: slabOf(SLOT, PHONE.dockTop + 0.6, 5, P, 3, 0.4),
  js: housingOf(P, JS, 22),
  jsLabel: sideMatrix([JS.x + 3, JS.y + JS.d], 18, P, 'left'),
  jsSocket: slabOf(
    { d: 7, r: 0.6, w: 3, x: JS.x + JS.w, y: JS.y + 8 },
    2,
    5,
    P,
    3,
    0.3,
  ),
  mast: cylinder(ANT[0], ANT[1], 0.9, RADIO_TOP, 26, P, 12),
  radio: housingOf(P, RADIO, RADIO_TOP),
  radioLabel: sideMatrix([RADIO.x + 2, RADIO.y + RADIO.d], 4, P, 'left'),
  slot: slabOf(
    { ...SLOT, d: SLOT.d + 2, w: SLOT.w + 2, x: SLOT.x - 1, y: SLOT.y - 1 },
    PHONE.dockTop,
    0.6,
    P,
    2,
    0.2,
  ),
  socket: slabOf(
    { d: 7, r: 0.6, w: 3, x: RADIO.x - 3, y: RADIO.y + 6 },
    2,
    5,
    P,
    3,
    0.3,
  ),
  tip: cylinder(ANT[0], ANT[1], 1.8, RADIO_TOP + 26, 2, P, 16, 0.4),
  waves: [6, 10, 14].map((r) => ring(ANT[0], ANT[1], r, RADIO_TOP + 27, P, 40)),
};
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 4));
const CABLES = [
  route([
    [JS.x + JS.w + 3, JS.y + 11.5, 4.5],
    [JS.x + JS.w + 8, JS.y + 11.5, 1.3],
    [JS.x + JS.w + 8, -6, 1.3],
    [-4, -6, 1.3],
    SOCKET.end,
  ]),
  route([
    [PHONE.dockFront > 0 ? 0 : 26, PHONE.dockFront - 6, 2.4],
    [40, PHONE.dockFront - 6, 1.3],
    [62, RADIO.y + 9.5, 1.3],
    [RADIO.x - 3, RADIO.y + 9.5, 4.5],
  ]),
];

type Action = 'call' | 'install' | 'ota' | 'rebuild' | 'reset';
const TOUR: Action[] = ['call', 'install', 'ota', 'rebuild', 'call', 'reset'];
const SW = PHONE.sw;

const LABEL =
  'Native modules drawn as a JavaScript housing cabled to a phone in a dock, with a Bluetooth radio, the platform API, standing beside it and cabled to the dock. Calling scan with no native module sends a pulse that stops at the dock: the phone shows an error. Installing react-native-ble-plx adds native code, so shipping it over the air is refused. Rebuilding the app autolinks a module cartridge into the dock’s slot; after that the call runs through the cartridge to the radio, its antenna sends out rings, and the phone lists the devices it found.';

export function NativeModuleBench() {
  const sim = React.useRef({
    drop: 1,
    dropTarget: 1,
    error: '',
    found: false,
    installed: false,
    linked: false,
    pulses: [-1, -1],
    scanning: 0,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const cartRef = React.useRef<SVGGElement>(null);
  const waveRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);

  const actions: Record<Action, () => void> = {
    call: () => {
      const s = sim.current;
      s.pulses[0] = 0;
      s.error = '';
      rerender();
      sch.later(0.7, () => {
        if (!s.linked) {
          s.error = 'Native module not found';
          rerender();
          say(
            `BleManager.scan() · no native module in this build · nothing reaches the radio`,
          );
          return;
        }
        s.pulses[1] = 0;
        sch.later(0.6, () => {
          s.scanning = 1;
          sch.later(1, () => {
            s.found = true;
            rerender();
            say(`scan() → native module → Bluetooth radio · 3 devices found`);
          });
        });
      });
    },
    install: () => {
      const s = sim.current;
      s.installed = true;
      rerender();
      say(`npm install react-native-ble-plx · adds native code to the project`);
      sch.later(0.4, () => undefined);
    },
    ota: () => {
      const s = sim.current;
      s.error = 'Needs a native rebuild';
      rerender();
      say(
        `over-the-air update refused · native modules can't ship in the JS bundle`,
      );
      sch.later(0.6, () => undefined);
    },
    rebuild: () => {
      const s = sim.current;
      s.error = '';
      s.dropTarget = 0;
      sch.later(0.8, () => {
        s.linked = true;
        rerender();
        say(
          `native rebuild · autolinking wires the module in · no Xcode or Gradle edits`,
        );
      });
    },
    reset: () => {
      const s = sim.current;
      Object.assign(s, {
        dropTarget: 1,
        error: '',
        found: false,
        installed: false,
        linked: false,
      });
      rerender();
      say(`back to a build without the module`);
      sch.later(0.5, () => undefined);
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    s.drop = follow(s.drop, s.dropTarget, dt, 0.1, calm);
    cartRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, 22 * s.drop]),
    );
    cartRef.current?.setAttribute(
      'opacity',
      s.installed || s.linked ? (1 - 0.7 * s.drop).toFixed(3) : '0',
    );
    let moving = s.drop !== s.dropTarget;
    s.pulses = s.pulses.map((t, i) => {
      if (t < 0) {
        hideRun(runRefs.current[i], headRefs.current[i]);
        return t;
      }
      const next = calm ? 1 : t + dt / (i ? 0.6 : 0.7);
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
    if (s.scanning > 0) {
      s.scanning = Math.max(0, s.scanning - dt * 0.6);
      moving = true;
    }
    waveRefs.current.forEach((node, i) => {
      const phase = ((1 - s.scanning) * 3 - i + 3) % 1;
      node?.setAttribute(
        'opacity',
        s.scanning > 0 ? (Math.sin(phase * Math.PI) * 0.9).toFixed(3) : '0',
      );
    });
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.6, (i) =>
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
        aria-label="Call scan. Press I to install the package, O to try an over-the-air update, B to rebuild, R to reset."
        onClick={() => act('call')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'call',
            b: 'rebuild',
            c: 'call',
            Enter: 'call',
            i: 'install',
            o: 'ota',
            r: 'reset',
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
          <HousingArt art={ART.js}>
            <Solid paths={ART.jsSocket} tone="mid" crease="none" />
          </HousingArt>
          <FaceText transform={ART.jsLabel} size={3} tone="mid">
            JS
          </FaceText>
          <Cable d={CABLES[0]} />
          <Runner
            d={CABLES[0]}
            runRef={(node) => void (runRefs.current[0] = node)}
            headRef={(node) => void (headRefs.current[0] = node)}
          />
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="nm-screen">
            {s.error ? (
              <>
                <rect className="af-red" width={SW} height={PHONE.sh} />
                <text className="af-error-text" x={2} y={8} fontSize={2.3}>
                  {s.error}
                </text>
              </>
            ) : (
              <>
                <rect className="rn-header" width={SW} height={8} />
                <text
                  className="af-mono"
                  x={SW / 2}
                  y={5.6}
                  fontSize={2.6}
                  textAnchor="middle"
                >
                  Devices
                </text>
                {s.found
                  ? ['Watch', 'Speaker', 'Sensor'].map((n, i) => (
                      <g key={n}>
                        <rect
                          className="af-ui-line"
                          x={2.4}
                          y={11 + i * 9}
                          width={SW - 4.8}
                          height={7}
                          rx={1}
                        />
                        <text
                          className="af-mono"
                          x={4.6}
                          y={15.6 + i * 9}
                          fontSize={2.6}
                        >
                          {n}
                        </text>
                      </g>
                    ))
                  : null}
              </>
            )}
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
          <Socket socket={SOCKET} />
          <Solid paths={ART.slot} tone="lo" crease="none" />
          <g ref={cartRef} opacity={0}>
            <Solid paths={ART.cartridge} tone="hi" crease="lo" lit />
            <FaceText transform={ART.cartFace} size={1.8} tone="mid">
              ble-plx
            </FaceText>
          </g>
          <Cable d={CABLES[1]} />
          <Runner
            d={CABLES[1]}
            runRef={(node) => void (runRefs.current[1] = node)}
            headRef={(node) => void (headRefs.current[1] = node)}
          />
          <HousingArt art={ART.radio}>
            <Solid paths={ART.socket} tone="mid" crease="none" />
          </HousingArt>
          <FaceText transform={ART.radioLabel} size={2.4} tone="mid">
            Bluetooth
          </FaceText>
          <Solid paths={ART.mast} tone="mid" crease="none" />
          <Solid paths={ART.tip} tone="hi" crease="none" />
          {ART.waves.map((d, i) => (
            <path
              key={i}
              ref={(node) => void (waveRefs.current[i] = node)}
              className="iso-line"
              data-tone="lit"
              d={d}
              opacity={0}
            />
          ))}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('call')} disabled={locked}>
          Call scan()
        </button>
        <button
          type="button"
          onClick={() => act('install')}
          disabled={locked || s.installed}
        >
          npm install ble-plx
        </button>
        <button
          type="button"
          onClick={() => act('ota')}
          disabled={locked || !s.installed || s.linked}
        >
          Ship over the air
        </button>
        <button
          type="button"
          onClick={() => act('rebuild')}
          disabled={locked || !s.installed || s.linked}
        >
          Rebuild
        </button>
        <button type="button" onClick={() => act('reset')} disabled={locked}>
          Reset
        </button>
      </Controls>
    </div>
  );
}

export function NativeModuleAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Reaching the platform"
        hint="Tap to call scan · I install · B rebuild"
        readout="BleManager.scan() needs native code"
        keys={[
          { label: 'Native module', mark: 'lit' },
          { label: 'Platform API', mark: 'raised' },
          { label: 'Missing or refused', mark: 'red' },
        ]}
        caption="A native module is platform code, in Swift, Kotlin, Objective-C, Java or C++, exposed to JavaScript. It is how an app reaches what React Native does not wrap: Bluetooth, biometrics, a payment SDK. Installing one adds native code, so it needs a native rebuild, where autolinking wires it in with no manual Xcode or Gradle steps, and it can never arrive in an over-the-air update. Under the New Architecture, the modern form is a TurboModule; in Expo projects, config plugins handle any permissions it needs."
      >
        <NativeModuleBench />
      </Plate>
    </div>
  );
}
