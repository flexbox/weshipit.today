import * as React from 'react';
import { solidSvg, translateAlong } from '../kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Controls, FaceDial, HousingArt, dialRotate } from '../bench';
import {
  BENCH,
  CAR_ART,
  GAUGE_ART,
  HEIGHT,
  MODULE_ART,
  MOD_XS,
  P,
  PLANE_ART,
  PLUNGER_REACH,
  RAIL_ART,
  WIDTH,
  plungerOf,
} from './geometry';
import { CALLED, MODULES, readouts, type Mode } from './model';

/* ---------- Static art ---------- */

const PLANE = (
  <g>
    <Solid
      paths={PLANE_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={PLANE_ART.seam} tone="faint" />}
    />
    <Line d={PLANE_ART.traces} tone="faint" />
    <Dots points={PLANE_ART.screws} size={0.45} tone="mid" />
  </g>
);

const Module = React.memo(function Module({
  index,
  loaded,
}: {
  index: number;
  loaded: boolean;
}) {
  const art = MODULE_ART[index];
  return (
    <>
      <Solid
        paths={art.body}
        tone={loaded ? 'hi' : 'mid'}
        crease={loaded ? 'lo' : 'faint'}
        inner={<Line d={art.seam} tone="faint" />}
      />
      <Line d={art.lid} tone="faint" />
      <Line d={art.socket} tone="lo" />
      <Line d={art.fins} tone="faint" />
      <Line d={art.lampRing} tone="lo" />
      <FaceText transform={art.label} size={2.6} tone={loaded ? 'hi' : 'lo'}>
        {MODULES[index]}
      </FaceText>
    </>
  );
});

const RAIL = (
  <g>
    <Solid
      paths={RAIL_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={RAIL_ART.seam} tone="faint" />}
    />
    <Line d={RAIL_ART.slot} tone="lo" />
    <Line d={RAIL_ART.marks} tone="mid" />
  </g>
);

const CARRIAGE = (
  <>
    <Solid
      paths={CAR_ART.body}
      tone="hi"
      crease="lo"
      lit
      inner={<Line d={CAR_ART.seam} tone="faint" />}
    />
    <FaceText transform={CAR_ART.face} size={4} tone="mid" anchor="middle">
      <tspan dy={1.4}>JS</tspan>
    </FaceText>
    <Dots points={CAR_ART.screws} size={0.4} tone="mid" />
  </>
);

/* ---------- Simulation ---------- */

interface Sim {
  mode: Mode;
  car: number;
  dial: number;
  idle: number;
  tour: number;
  reach: number;
  clock: number;
  lamps: number[];
  touched: boolean;
  loaded: boolean[];
  carTarget: number;
  dialTarget: number;
  launchLamp: number;
  reachTarget: number;
  plan: Array<{ at: number; run: () => void }>;
}

type Action = 'launch' | 'call0' | 'call1' | 'call2' | 'legacy' | 'turbo';
const TOUR: Action[] = [
  'launch',
  'call0',
  'call1',
  'call0',
  'call2',
  'legacy',
  'call1',
  'turbo',
];
const SETTLED = 0.01;

const LABEL =
  'TurboModules drawn as a rack of eight native module boxes on a backplane, Camera to Maps, with a JavaScript carriage on a rail in front and a startup gauge to the right. In legacy mode, launching the app powers up every module, used or not, and the startup gauge climbs to eight of eight. In TurboModules mode, launch powers nothing: a module lights up only the first time the carriage travels to it and plugs its plunger into the socket, and later calls to it are direct.';

export function TurboModulesBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      car: MOD_XS[0],
      carTarget: MOD_XS[0],
      clock: 0,
      dial: 0,
      dialTarget: 0,
      idle: 0,
      lamps: MODULES.map(() => 0),
      launchLamp: 0,
      loaded: MODULES.map(() => false),
      mode: 'turbo',
      plan: [],
      reach: 0,
      reachTarget: 0,
      touched: false,
      tour: 0,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const [mode, setMode] = React.useState<Mode>('turbo');
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const carRef = React.useRef<SVGGElement>(null);
  const plungerRef = React.useRef<SVGGElement>(null);
  const needleRef = React.useRef<SVGPathElement>(null);
  const lampRefs = React.useRef<Array<SVGCircleElement | null>>([]);
  const launchRef = React.useRef<SVGGElement>(null);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const load = (index: number) => {
    const s = sim.current;
    s.loaded[index] = true;
    s.lamps[index] = 1;
    rerender();
  };

  const launch = (next: Mode) => {
    const s = sim.current;
    s.mode = next;
    setMode(next);
    s.loaded = MODULES.map(() => false);
    s.dialTarget = 0;
    s.launchLamp = 1;
    s.reachTarget = 0;
    rerender();
    if (next === 'legacy') {
      MODULES.forEach((_, index) =>
        later(0.2 + index * 0.16, () => {
          load(index);
          s.dialTarget = (index + 1) / MODULES.length;
        }),
      );
      later(0.2 + MODULES.length * 0.16, () => say(readouts.launchLegacy()));
    } else {
      later(0.3, () => say(readouts.launchTurbo()));
    }
  };

  const call = (index: number) => {
    const s = sim.current;
    s.reachTarget = 0;
    later(0.2, () => {
      s.carTarget = MOD_XS[index];
      later(0.7, () => {
        s.reachTarget = 1;
        later(0.35, () => {
          const name = MODULES[index];
          if (s.mode === 'legacy') say(readouts.legacyCall(name));
          else if (!s.loaded[index]) {
            load(index);
            say(readouts.first(name, s.loaded.filter(Boolean).length));
          } else {
            s.lamps[index] = 1;
            say(readouts.again(name));
          }
          later(0.6, () => {
            s.reachTarget = 0;
          });
        });
      });
    });
  };

  const actions: Record<Action, () => void> = {
    call0: () => call(CALLED[0]),
    call1: () => call(CALLED[1]),
    call2: () => call(CALLED[2]),
    launch: () => launch(sim.current.mode),
    legacy: () => launch('legacy'),
    turbo: () => launch('turbo'),
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

    s.car = follow(s.car, s.carTarget, dt, 0.16, calm);
    s.reach = follow(s.reach, s.reachTarget, dt, 0.07, calm);
    moving ||= s.car !== s.carTarget || s.reach !== s.reachTarget;
    const move = translateAlong(P, [s.car, 0, 0]);
    carRef.current?.setAttribute('transform', move);
    if (plungerRef.current) {
      plungerRef.current.setAttribute('transform', move);
      plungerRef.current.innerHTML = solidSvg(
        plungerOf(2 + (PLUNGER_REACH - 2) * s.reach),
        {
          crease: 'none',
          lit: true,
          tone: 'hi',
        },
      );
    }

    s.dial = follow(s.dial, s.dialTarget, dt, 0.12, calm);
    needleRef.current?.setAttribute('transform', dialRotate(s.dial));
    moving ||= s.dial !== s.dialTarget;

    s.lamps.forEach((value, index) => {
      // A loaded module keeps a steady glow; a call or a load flashes it.
      const rest = s.loaded[index] ? 0.55 : 0;
      s.lamps[index] = follow(value, rest, dt, 0.4, calm);
      moving ||= Math.abs(s.lamps[index] - rest) > SETTLED;
      lampRefs.current[index]?.setAttribute(
        'opacity',
        (0.1 + 0.9 * s.lamps[index]).toFixed(3),
      );
    });
    s.launchLamp = follow(s.launchLamp, 0, dt, 0.5, calm);
    launchRef.current?.setAttribute(
      'opacity',
      (0.12 + 0.88 * s.launchLamp).toFixed(3),
    );
    moving ||= s.launchLamp > SETTLED;

    const pending = s.plan.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    const touring = !s.touched && !calm;
    if (touring && !moving && !pending) {
      s.idle += dt;
      if (s.idle > 1.3) {
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
      ' ': 'launch',
      '1': 'call0',
      '2': 'call1',
      '3': 'call2',
      Enter: 'launch',
      l: 'launch',
      m: sim.current.mode === 'turbo' ? 'legacy' : 'turbo',
    };
    const action = map[event.key];
    if (!action) return;
    event.preventDefault();
    act(action);
  };

  React.useEffect(() => {
    if (asksForStillness()) sim.current.touched = true;
  }, []);

  const s = sim.current;
  const locked = busy && s.touched;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Launch the app. Press 1, 2 or 3 to call Camera, Location or Haptics, M to switch between TurboModules and legacy modules."
        onClick={() => act('launch')}
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
          {PLANE}
          {MODULES.map((_, index) => (
            <g key={index}>
              <Module index={index} loaded={s.loaded[index]} />
              <circle
                ref={(node) => {
                  lampRefs.current[index] = node;
                }}
                className="af-head"
                cx={MODULE_ART[index].lamp[0]}
                cy={MODULE_ART[index].lamp[1]}
                r={0.85}
                opacity={0.1}
              />
            </g>
          ))}
          {RAIL}
          <g ref={plungerRef} />
          <g ref={carRef} transform={translateAlong(P, [s.car, 0, 0])}>
            {CARRIAGE}
          </g>
          <HousingArt art={GAUGE_ART}>
            <Line d={GAUGE_ART.vents} tone="lo" />
            <Line d={GAUGE_ART.lampRing} tone="lo" />
          </HousingArt>
          <g ref={launchRef} opacity={0.12}>
            <Dots points={[GAUGE_ART.lamp]} size={0.85} tone="hi" />
          </g>
          <FaceDial
            transform={GAUGE_ART.dial}
            needleRef={needleRef}
            r={8}
            ticks={8}
          />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('launch')} disabled={locked}>
          Launch app
        </button>
        {CALLED.map((index, k) => (
          <button
            key={index}
            type="button"
            onClick={() => act(`call${k}` as Action)}
            disabled={locked}
          >
            Call {MODULES[index]}
          </button>
        ))}
        <div
          className="af-segmented"
          role="radiogroup"
          aria-label="Module system"
        >
          {(['turbo', 'legacy'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => act(value)}
              disabled={locked}
            >
              {value === 'turbo' ? 'TurboModules' : 'Legacy'}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function TurboModulesAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How TurboModules load"
        hint="Tap to launch · 1–3 call · M mode"
        readout={readouts.rest()}
        keys={[
          { label: 'JavaScript, calling over JSI', mark: 'lit' },
          { label: 'Initialised module', mark: 'raised' },
          { label: 'Not loaded yet', mark: 'dim' },
        ]}
        caption="Legacy native modules were all initialised when the app launched, used or not, so the startup gauge climbs to eight of eight. A TurboModule is created the first time JavaScript touches it: launch pays for nothing, and an app with forty dependencies only pays for the few it calls. Calls go straight over JSI, with no JSON, and Codegen generates the C++, Java and Objective-C bindings from one TypeScript spec, so a signature mismatch is a build error."
      >
        <TurboModulesBench />
      </Plate>
    </div>
  );
}
