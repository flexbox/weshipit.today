import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import {
  BENCH,
  CLIPS,
  DOCK_ART,
  KEYPAD_ART,
  PHONE_ART,
  SCREEN_H,
  SCREEN_W,
  SERVER_ART,
  SHAKER_ART,
  SWITCH_HUB,
  cablePath,
  springsOf,
  switchOf,
  type Cable,
} from './geometry';
import { PORT, ROW, ROWS, STEP, readouts, type Trigger } from './model';
import { HEIGHT, KEY_DIP, P, WIDTH } from './view';

/* ---------- Static art ---------- */

const BENCH_ART = (
  <g key="bench">
    <path className="iso-halo" d={BENCH.halo} />
    {BENCH.feet.map((parts, index) => (
      <g key={index}>
        {parts.map((paths, part) => (
          <Solid
            key={part}
            paths={paths}
            tone={part ? 'mid' : 'lo'}
            crease="faint"
          />
        ))}
      </g>
    ))}
    <Solid paths={BENCH.slab} tone="mid" crease="faint" />
    <Line d={BENCH.groove} tone="lo" />
    <Line d={BENCH.screwRings} tone="lo" />
    <Dots points={BENCH.screws} size={0.5} tone="mid" />
    <Solid paths={BENCH.ruler} tone="lo" crease="none" />
    <Line d={BENCH.ticksMinor} tone="lo" />
    <Line d={BENCH.ticksMajor} tone="mid" />
    <Solid paths={BENCH.label} tone="lo" crease="none" />
    <Line d={BENCH.labelLine} tone="faint" />
    {BENCH.labelRules.map((d, index) => (
      <Line key={index} d={d} tone="lo" free />
    ))}
    <Dots points={BENCH.labelScrews} size={0.45} tone="mid" />
  </g>
);

const DOCK_BACK = (
  <g key="dock">
    <Solid
      paths={DOCK_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={DOCK_ART.seam} tone="faint" />}
    />
    <Line d={DOCK_ART.groove} tone="faint" />
    <Line d={DOCK_ART.footGroove} tone="lo" />
    <Dots points={DOCK_ART.screws} size={0.5} tone="mid" />
    <Solid paths={DOCK_ART.rest} tone="lo" crease="faint" />
    <Solid paths={PHONE_ART.body} tone="hi" crease="lo" />
    {PHONE_ART.sideButtons.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <path className="dm-glass" d={PHONE_ART.bezel} />
    <Line d={PHONE_ART.speaker} tone="lo" />
    <Dots points={[PHONE_ART.camera]} size={0.6} tone="lo" />
  </g>
);

const DOCK_FRONT_ART = (
  <g key="dock-front">
    <Solid paths={PHONE_ART.lip} tone="mid" crease="faint" />
    <Dots points={PHONE_ART.lipScrews} size={0.45} tone="mid" />
    <Solid paths={DOCK_ART.lampBezel} tone="mid" crease="none" />
    <Line d={DOCK_ART.lampRing} tone="lo" />
    <Solid paths={DOCK_ART.switchPuck} tone="mid" crease="none" />
    <Line d={DOCK_ART.switchKnurl} tone="faint" />
    <Line d={DOCK_ART.switchRing} tone="lo" />
    <Line d={DOCK_ART.detents} tone="mid" />
  </g>
);

const SERVER = (
  <g key="server">
    <Solid paths={SERVER_ART.plinth} tone="lo" crease="faint" />
    <Solid
      paths={SERVER_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={SERVER_ART.seam} tone="faint" />}
    />
    <Line d={SERVER_ART.topGroove} tone="faint" />
    <Dots points={SERVER_ART.screws} size={0.5} tone="mid" />
    <Line d={SERVER_ART.vents} tone="lo" />
    <Line d={SERVER_ART.bays} tone="lo" />
    <Line d={SERVER_ART.bayRules} tone="faint" free />
    <Line d={SERVER_ART.power} tone="lo" />
    <FaceText transform={SERVER_ART.label} size={4.4} tone="lo">
      {PORT}
    </FaceText>
    <Line d={SERVER_ART.lampRing} tone="lo" />
    <Solid paths={SERVER_ART.socket} tone="mid" crease="none" />
    <Line d={SERVER_ART.socketMouth} tone="lo" />
  </g>
);

const CABLE_ORDER: Cable[] = ['metro', 'keys', 'shake'];

const CABLES_ART = (
  <g key="cables">
    {CABLE_ORDER.map((cable) => (
      <g key={cable}>
        <path className="dm-cable" d={cablePath(cable)} />
        <path className="dm-cable-core" d={cablePath(cable)} />
      </g>
    ))}
  </g>
);

const SOCKETS_ART = (
  <g key="sockets">
    {DOCK_ART.sockets.map((socket, index) => (
      <g key={index}>
        <Solid paths={socket.shell} tone="mid" crease="none" />
        <Line d={socket.mouth} tone="lo" />
        <Dots points={socket.screws} size={0.4} tone="mid" />
      </g>
    ))}
    {CLIPS.map((clip, index) => (
      <g key={`clip-${index}`}>
        <Solid paths={clip.body} tone="mid" crease="none" />
        <Dots points={clip.screws} size={0.4} tone="mid" />
      </g>
    ))}
  </g>
);

const KEYPAD_BODY = (
  <g key="keypad">
    <Solid
      paths={KEYPAD_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={KEYPAD_ART.seam} tone="faint" />}
    />
    <Line d={KEYPAD_ART.wells} tone="lo" />
    <Dots points={KEYPAD_ART.screws} size={0.45} tone="mid" />
    <Line d={KEYPAD_ART.ledRing} tone="lo" />
  </g>
);

const LEGENDS = ['⌘', 'D'];

const KEY_ART = KEYPAD_ART.keys.map((key, index) => (
  <g key={index}>
    <Solid paths={key.cap} tone="hi" crease="lo" />
    <Line d={key.dish} tone="faint" />
    <FaceText transform={key.face} size={7} tone="mid" anchor="middle">
      <tspan dy={2.4}>{LEGENDS[index]}</tspan>
    </FaceText>
  </g>
));

const SHAKER_BASE = (
  <g key="shaker">
    <Solid
      paths={SHAKER_ART.base}
      tone="mid"
      crease="faint"
      inner={<Line d={SHAKER_ART.seam} tone="faint" />}
    />
    <Line d={SHAKER_ART.rail} tone="faint" />
    <Dots points={SHAKER_ART.screws} size={0.4} tone="mid" />
    <Solid paths={SHAKER_ART.posts[0]} tone="mid" crease="faint" />
    <Line d={SHAKER_ART.rodEnds[0]} tone="lo" />
    <Dots points={[SHAKER_ART.postScrews[0]]} size={0.45} tone="mid" />
  </g>
);

const SLED_ART = (
  <>
    <Solid
      paths={SHAKER_ART.sled}
      tone="mid"
      crease="faint"
      inner={<Line d={SHAKER_ART.sledSeam} tone="faint" />}
    />
    <Line d={SHAKER_ART.bushing} tone="lo" />
    <Solid paths={SHAKER_ART.handset} tone="hi" crease="none" />
    <Line d={SHAKER_ART.handsetGlass} tone="lo" />
  </>
);

const SHAKER_FRONT = (
  <g key="shaker-front">
    <Solid paths={SHAKER_ART.posts[1]} tone="mid" crease="faint" />
    <Dots points={[SHAKER_ART.postScrews[1]]} size={0.45} tone="mid" />
  </g>
);

/* ---------- Screen content (in the plane of the glass) ---------- */

const SHEET_H = 44;
const ROW_H = 7;
const RULE_LENGTHS = ROWS.map((label) => Math.min(17, 3 + label.length * 0.8));

const APP_UI = (
  <>
    <path className="dm-ui-line" d="M2.4 2.4H6.4" />
    <circle className="dm-ui" cx={25.4} cy={2.4} r={0.55} />
    <circle className="dm-ui" cx={27.4} cy={2.4} r={0.55} />
    <rect className="dm-ui" x={2.4} y={6} width={13} height={2.4} rx={0.6} />
    {[13, 30, 47].map((y) => (
      <g key={y}>
        <rect
          className="dm-ui-line"
          x={2.4}
          y={y}
          width={SCREEN_W - 4.8}
          height={14}
          rx={1.4}
        />
        <rect
          className="dm-ui"
          x={4.6}
          y={y + 2.4}
          width={7}
          height={7}
          rx={1}
        />
        <path
          className="dm-ui-line"
          d={`M14 ${y + 3.8}H${SCREEN_W - 5}M14 ${y + 6.6}H${SCREEN_W - 9}M4.6 ${y + 11.4}H${SCREEN_W - 12}`}
        />
      </g>
    ))}
    <rect
      className="dm-ui"
      x={SCREEN_W / 2 - 5}
      y={SCREEN_H - 2.4}
      width={10}
      height={0.8}
      rx={0.4}
    />
  </>
);

/* ---------- Simulation ---------- */

interface Pulse {
  t: number;
  dir: 1 | -1;
  dur: number;
  bundle: boolean;
}

interface Sim {
  led: number;
  sel: number;
  app: number;
  idle: number;
  tour: number;
  menu: number;
  perf: number;
  clock: number;
  shake: number;
  flash: number;
  debug: boolean;
  keyDip: number;
  switchV: number;
  devLamp: number;
  touched: boolean;
  selFlash: number;
  progress: number;
  keyTarget: number;
  appTarget: number;
  menuTarget: number;
  perfTarget: number;
  serverLamp: number;
  pulses: Partial<Record<Cable, Pulse>>;
  plan: Array<{ at: number; run: () => void }>;
}

const initial = (): Sim => ({
  app: 1,
  appTarget: 1,
  clock: 0,
  debug: true,
  devLamp: 1,
  flash: 0,
  idle: 0,
  keyDip: 0,
  keyTarget: 0,
  led: 0,
  menu: 0,
  menuTarget: 0,
  perf: 0,
  perfTarget: 0,
  plan: [],
  progress: 0,
  pulses: {},
  sel: -1,
  selFlash: 0,
  serverLamp: 0,
  shake: -1,
  switchV: -1,
  touched: false,
  tour: 0,
});

const TOUR = [
  'keys',
  'reload',
  'shake',
  'perf',
  'build',
  'keys',
  'build',
  'perf',
] as const;
type Action = (typeof TOUR)[number];

/** Sled displacement for a shake that started `t` seconds ago. */
const sledOf = (t: number) =>
  t < 0 ? 0 : 5.5 * Math.exp(-t / 0.42) * Math.sin(t * Math.PI * 2 * 3.6);

const SETTLED = 0.01;
const REST_READOUT = readouts.rest();

/* ---------- Live figure ---------- */

const LABEL =
  'A dev menu test bench. A phone stands in a dock at the back: the app in a development build. Three cables run across the bench into sockets on the dock. One comes from a two-key keypad, ⌘ and D, the simulator shortcut. One comes from a sled on springs, a physical device being shaken. The third comes from the Metro dev server on port 8081. Pressing the keys or shaking the sled sends a pulse down its cable, and the phone opens the dev menu. Choosing Reload sends a request up the Metro cable and the bundle comes back down it. A switch on the dock picks a debug or release build: in release the pulse still arrives, but the menu has been stripped out and nothing opens.';

export function DevMenuBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const runRefs = React.useRef<Partial<Record<Cable, SVGPathElement | null>>>(
    {},
  );
  const headRefs = React.useRef<Partial<Record<Cable, SVGGElement | null>>>({});
  const keyRefs = React.useRef<Array<SVGGElement | null>>([]);
  const sledRef = React.useRef<SVGGElement>(null);
  const springRefs = React.useRef<Record<string, SVGPathElement | null>>({});
  const switchRef = React.useRef<SVGPathElement>(null);
  const devLampRef = React.useRef<SVGGElement>(null);
  const serverLampRef = React.useRef<SVGGElement>(null);
  const ledRef = React.useRef<SVGGElement>(null);
  const appRef = React.useRef<SVGGElement>(null);
  const loadRef = React.useRef<SVGGElement>(null);
  const barRef = React.useRef<SVGRectElement>(null);
  const dimRef = React.useRef<SVGRectElement>(null);
  const sheetRef = React.useRef<SVGGElement>(null);
  const selRef = React.useRef<SVGRectElement>(null);
  const perfRef = React.useRef<SVGGElement>(null);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const send = (cable: Cable, dir: 1 | -1, dur: number, bundle = false) => {
    sim.current.pulses[cable] = { bundle, dir, dur, t: 0 };
  };

  const signal = (trigger: Trigger) => {
    const s = sim.current;
    if (trigger === 'keys') {
      s.keyTarget = 1;
      s.led = 1;
      later(0.2, () => {
        s.keyTarget = 0;
      });
    } else {
      s.shake = 0;
    }
    send(trigger, 1, STEP.signal);
    later(STEP.signal, () => {
      s.flash = 1;
      if (s.debug) {
        s.menuTarget = 1;
        s.sel = -1;
        say(readouts.opened(trigger));
      } else {
        say(readouts.stripped(trigger));
      }
    });
  };

  /** Open the menu with ⌘D if it is closed, then pick a row. */
  const choose = (row: number, then: () => void) => {
    const s = sim.current;
    const pick = () => {
      s.sel = row;
      s.selFlash = 1;
      later(0.5, () => {
        s.menuTarget = 0;
        then();
      });
    };
    if (s.menuTarget === 1) pick();
    else {
      signal('keys');
      later(STEP.signal + 0.7, pick);
    }
  };

  const actions: Record<Action, () => void> = {
    build: () => {
      const s = sim.current;
      s.debug = !s.debug;
      if (!s.debug) {
        s.menuTarget = 0;
        s.perfTarget = 0;
      }
      say(s.debug ? readouts.debug() : readouts.release());
      rerender();
      later(0.4, () => undefined);
    },
    keys: () => signal('keys'),
    perf: () => {
      const s = sim.current;
      if (!s.debug) return;
      choose(ROW.perf, () => {
        s.perfTarget = s.perfTarget ? 0 : 1;
        say(s.perfTarget ? readouts.perfOn() : readouts.perfOff());
        later(0.4, () => undefined);
      });
    },
    reload: () => {
      const s = sim.current;
      if (!s.debug) return;
      choose(ROW.reload, () => {
        s.appTarget = 0;
        s.progress = 0;
        send('metro', -1, STEP.request);
        say(readouts.asking());
        later(STEP.request, () => {
          s.serverLamp = 1;
          send('metro', 1, STEP.bundle, true);
          later(STEP.bundle, () => {
            s.appTarget = 1;
            s.flash = 1;
            say(readouts.reloaded());
          });
        });
      });
    },
    shake: () => signal('shake'),
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    s.clock += dt;
    const due = s.plan.filter((step) => step.at <= s.clock);
    if (due.length) {
      s.plan = s.plan.filter((step) => step.at > s.clock);
      due.forEach((step) => step.run());
    }
    let moving = false;

    // Keys dip and spring back.
    s.keyDip = follow(s.keyDip, s.keyTarget, dt, 0.05, calm);
    keyRefs.current.forEach((node) =>
      node?.setAttribute(
        'transform',
        translateAlong(P, [0, 0, -KEY_DIP * s.keyDip]),
      ),
    );
    moving ||= s.keyDip !== s.keyTarget;

    // Shake: a damped oscillation of the sled on its springs.
    if (s.shake >= 0) {
      s.shake += dt;
      if (s.shake > 2.4 || calm) s.shake = -1;
    }
    const dx = sledOf(s.shake);
    sledRef.current?.setAttribute('transform', translateAlong(P, [dx, 0, 0]));
    const springs = springsOf(dx);
    for (const [name, d] of Object.entries(springs))
      springRefs.current[name]?.setAttribute('d', d);
    moving ||= s.shake >= 0;

    // Pulses run along their cables: a lit dash with a bright head.
    for (const cable of CABLE_ORDER) {
      const pulse = s.pulses[cable];
      const run = runRefs.current[cable];
      const head = headRefs.current[cable];
      if (!run || !head) continue;
      if (!pulse) {
        run.style.opacity = '0';
        head.style.opacity = '0';
        continue;
      }
      pulse.t += calm ? 1 : dt / pulse.dur;
      if (pulse.t >= 1) {
        delete s.pulses[cable];
        run.style.opacity = '0';
        head.style.opacity = '0';
        continue;
      }
      moving = true;
      const dash = pulse.bundle ? 0.34 : 0.2;
      const along = pulse.dir === 1 ? pulse.t : 1 - pulse.t;
      const start = pulse.dir === 1 ? along - dash : along;
      run.style.strokeDasharray = `${dash} 3`;
      run.style.strokeDashoffset = (-start).toFixed(4);
      run.toggleAttribute('data-bundle', pulse.bundle);
      const fade = Math.min(1, pulse.t * 10, (1 - pulse.t) * 14);
      run.style.opacity = fade.toFixed(3);
      const point = run.getPointAtLength(run.getTotalLength() * along);
      head.setAttribute(
        'transform',
        `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`,
      );
      head.style.opacity = fade.toFixed(3);
    }

    // Switch pointer and the DEV lamp follow the build.
    const side = s.debug ? -1 : 1;
    s.switchV = follow(s.switchV, side, dt, 0.08, calm);
    switchRef.current?.setAttribute('d', switchOf(s.switchV));
    s.devLamp = follow(s.devLamp, s.debug ? 1 : 0.12, dt, 0.18, calm);
    s.flash = follow(s.flash, 0, dt, 0.4, calm);
    devLampRef.current?.setAttribute(
      'opacity',
      Math.min(1, s.devLamp * (0.75 + 0.25 * s.flash) + 0.5 * s.flash).toFixed(
        3,
      ),
    );
    s.serverLamp = follow(s.serverLamp, 0, dt, 0.5, calm);
    serverLampRef.current?.setAttribute(
      'opacity',
      (0.2 + 0.8 * s.serverLamp).toFixed(3),
    );
    s.led = follow(s.led, 0, dt, 0.35, calm);
    ledRef.current?.setAttribute('opacity', (0.15 + 0.85 * s.led).toFixed(3));
    moving ||=
      s.switchV !== side ||
      s.flash > SETTLED ||
      s.serverLamp > SETTLED ||
      s.led > SETTLED;

    // Screen: app, loading banner, menu sheet and perf overlay.
    s.app = follow(s.app, s.appTarget, dt, 0.12, calm);
    appRef.current?.setAttribute('opacity', s.app.toFixed(3));
    loadRef.current?.setAttribute('opacity', (1 - s.app).toFixed(3));
    const bundling = s.pulses.metro?.bundle ? s.pulses.metro.t : s.app;
    s.progress = s.appTarget ? 1 : bundling;
    barRef.current?.setAttribute(
      'width',
      ((SCREEN_W - 12) * s.progress).toFixed(2),
    );
    s.menu = follow(s.menu, s.menuTarget, dt, STEP.sheet / 3, calm);
    dimRef.current?.setAttribute('opacity', (0.55 * s.menu).toFixed(3));
    sheetRef.current?.setAttribute(
      'transform',
      `translate(0 ${((1 - s.menu) * (SHEET_H + 2)).toFixed(2)})`,
    );
    s.selFlash = follow(s.selFlash, s.sel >= 0 ? 0.35 : 0, dt, 0.25, calm);
    if (selRef.current) {
      selRef.current.setAttribute('opacity', s.sel >= 0 ? '1' : '0');
      selRef.current.setAttribute('y', String(7 + Math.max(0, s.sel) * ROW_H));
    }
    s.perf = follow(s.perf, s.perfTarget, dt, 0.12, calm);
    perfRef.current?.setAttribute('opacity', s.perf.toFixed(3));
    moving ||=
      s.app !== s.appTarget ||
      s.menu !== s.menuTarget ||
      s.perf !== s.perfTarget;

    const pending = s.plan.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    // Idle tour: loops until someone touches the figure.
    const touring = !s.touched && !calm;
    if (touring && !moving && !pending) {
      s.idle += dt;
      if (s.idle > 1.6) {
        s.idle = 0;
        actions[TOUR[s.tour % TOUR.length]]();
        s.tour += 1;
      }
    }
    return moving || pending || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (action: Action) => {
    const s = sim.current;
    s.touched = true;
    if (s.plan.length) return;
    actions[action]();
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'keys',
      b: 'build',
      d: 'keys',
      Enter: 'keys',
      p: 'perf',
      r: 'reload',
      s: 'shake',
    };
    const action = map[event.key];
    if (!action) return;
    event.preventDefault();
    act(action);
  };

  React.useEffect(() => {
    // Under reduced motion the tour never runs: draw the rest pose once.
    if (asksForStillness()) sim.current.touched = true;
  }, []);

  const s = sim.current;
  const springs = springsOf(0);
  const spring = (name: keyof typeof springs) => (
    <path
      ref={(node) => {
        springRefs.current[name] = node;
      }}
      className="iso-line"
      data-tone={name.startsWith('rod') ? 'mid' : 'hi'}
      d={springs[name]}
    />
  );
  const locked = busy && s.touched;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage dm"
        tabIndex={0}
        role="button"
        aria-label="Press ⌘D. Press S to shake, R to reload, P for the performance monitor, B to switch between a debug and a release build."
        onClick={() => act('keys')}
        onKeyDown={onKey}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <defs>
            <clipPath id="dm-screen-clip">
              <rect x={0} y={0} width={SCREEN_W} height={SCREEN_H} rx={1.2} />
            </clipPath>
          </defs>
          {BENCH_ART}
          {DOCK_BACK}

          {/* The phone screen, drawn in the plane of the glass. */}
          <path className="dm-glass" d={PHONE_ART.glass} />
          <g transform={PHONE_ART.screen}>
            <g clipPath="url(#dm-screen-clip)">
              <rect className="dm-screen" width={SCREEN_W} height={SCREEN_H} />
              <g ref={appRef}>{APP_UI}</g>
              <g ref={loadRef} opacity={0}>
                <rect
                  className="dm-ui"
                  x={0}
                  y={0}
                  width={SCREEN_W}
                  height={6.4}
                />
                <text className="dm-banner" x={SCREEN_W / 2} y={4.2}>
                  Bundling…
                </text>
                <rect
                  className="dm-track"
                  x={6}
                  y={SCREEN_H / 2}
                  width={SCREEN_W - 12}
                  height={1.2}
                  rx={0.6}
                />
                <rect
                  ref={barRef}
                  className="dm-bar"
                  x={6}
                  y={SCREEN_H / 2}
                  width={0}
                  height={1.2}
                  rx={0.6}
                />
              </g>
              <g ref={perfRef} opacity={0}>
                <rect
                  className="dm-perf"
                  x={2}
                  y={9.6}
                  width={15}
                  height={8.4}
                  rx={0.8}
                />
                <path className="dm-perf-line" d="M3.6 12.4H6.6M3.6 15.6H6.6" />
                <path className="dm-perf-bars" d="M8 12.4H15.4M8 15.6H14.8" />
              </g>
              <rect
                ref={dimRef}
                className="dm-dim"
                width={SCREEN_W}
                height={SCREEN_H}
                opacity={0}
              />
              <g ref={sheetRef} transform={`translate(0 ${SHEET_H + 2})`}>
                <g transform={`translate(0 ${SCREEN_H - SHEET_H})`}>
                  <rect
                    className="dm-sheet"
                    x={1.4}
                    y={0}
                    width={SCREEN_W - 2.8}
                    height={SHEET_H + 3}
                    rx={2.2}
                  />
                  <rect
                    className="dm-ui"
                    x={SCREEN_W / 2 - 3}
                    y={1.4}
                    width={6}
                    height={0.7}
                    rx={0.35}
                  />
                  <path className="dm-ui-line" d="M4 4.6H13" />
                  <rect
                    ref={selRef}
                    className="dm-sel"
                    x={2.6}
                    y={7}
                    width={SCREEN_W - 5.2}
                    height={ROW_H}
                    rx={1}
                    opacity={0}
                  />
                  {ROWS.map((label, row) => (
                    <g key={label}>
                      <rect
                        className="dm-ui-line"
                        x={4.2}
                        y={7 + row * ROW_H + 2.2}
                        width={2.6}
                        height={2.6}
                        rx={0.6}
                      />
                      <path
                        className="dm-ui-line"
                        d={`M9 ${7 + row * ROW_H + 3.5}H${9 + RULE_LENGTHS[row]}`}
                      />
                    </g>
                  ))}
                </g>
              </g>
            </g>
          </g>
          {DOCK_FRONT_ART}
          <g ref={devLampRef} opacity={1}>
            <Dots points={[DOCK_ART.lamp]} size={1.1} tone="hi" />
          </g>
          <path
            ref={switchRef}
            className="iso-line dm-pointer"
            data-tone="lit"
            d={switchOf(s.switchV)}
          />
          <Dots points={[SWITCH_HUB]} size={0.6} tone="hi" />

          {SERVER}
          <g ref={serverLampRef} opacity={0.2}>
            <Dots points={[SERVER_ART.lamp]} size={1} tone="hi" />
          </g>

          {CABLES_ART}
          {CABLE_ORDER.map((cable) => (
            <path
              key={`run-${cable}`}
              ref={(node) => {
                runRefs.current[cable] = node;
              }}
              className="dm-run"
              d={cablePath(cable)}
              pathLength={1}
              style={{ opacity: 0 }}
            />
          ))}
          {CABLE_ORDER.map((cable) => (
            <g
              key={`head-${cable}`}
              ref={(node) => {
                headRefs.current[cable] = node;
              }}
              style={{ opacity: 0 }}
            >
              <circle className="dm-head-halo" r={3.2} />
              <circle className="dm-head" r={1.5} />
            </g>
          ))}
          {SOCKETS_ART}

          {KEYPAD_BODY}
          <g ref={ledRef} opacity={0.15}>
            <Dots points={[KEYPAD_ART.led]} size={0.75} tone="hi" />
          </g>
          {KEY_ART.map((key, index) => (
            <g
              key={index}
              ref={(node) => {
                keyRefs.current[index] = node;
              }}
            >
              {key}
            </g>
          ))}

          {SHAKER_BASE}
          {spring('leftBack')}
          {spring('rodLeft')}
          {spring('leftFront')}
          <g ref={sledRef}>{SLED_ART}</g>
          {spring('rightBack')}
          {spring('rodRight')}
          {spring('rightFront')}
          <Line d={SHAKER_ART.rodEnds[1]} tone="lo" />
          {SHAKER_FRONT}
        </svg>
      </div>
      <div className="dm-controls" role="group" aria-label="Figure controls">
        <button type="button" onClick={() => act('keys')} disabled={locked}>
          ⌘D
        </button>
        <button type="button" onClick={() => act('shake')} disabled={locked}>
          Shake
        </button>
        <button
          type="button"
          onClick={() => act('reload')}
          disabled={locked || !s.debug}
        >
          Reload
        </button>
        <button
          type="button"
          onClick={() => act('perf')}
          disabled={locked || !s.debug}
        >
          Perf Monitor
        </button>
        <div className="dm-build" role="radiogroup" aria-label="Build">
          {(['debug', 'release'] as const).map((build) => (
            <button
              key={build}
              type="button"
              role="radio"
              aria-checked={(build === 'debug') === s.debug}
              onClick={() => {
                if ((build === 'debug') !== s.debug) act('build');
              }}
              disabled={locked}
            >
              {build === 'debug' ? 'Debug' : 'Release'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DevMenuAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How the dev menu opens"
        hint="Tap for ⌘D · S shake · R reload"
        readout={REST_READOUT}
        keys={[
          { label: 'Signal on its way', mark: 'lit' },
          { label: 'Cable into the app', mark: 'edge' },
          { label: 'Development build', mark: 'raised' },
        ]}
        caption="⌘D in the iOS Simulator (⌘M on Android), a shake of a physical device and adb shell input keyevent 82 all send the same signal, and a development build answers it by opening the dev menu. Reload asks Metro on port 8081 for the bundle again and runs the app from the top, which is the fix when Fast Refresh falls out of sync. The Performance Monitor overlays the JS and UI frame rates. A release build strips the menu out: the signal still arrives, and nothing opens."
      >
        <DevMenuBench />
      </Plate>
    </div>
  );
}
