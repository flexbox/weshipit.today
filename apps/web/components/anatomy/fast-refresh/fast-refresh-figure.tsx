import * as React from 'react';
import { translateAlong } from '../kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Cable, Controls, Runner } from '../bench';
import { hideRun, runAlong } from '../parts';
import { pathOf } from '../kit/iso-kit';
import {
  ABACUS_ART,
  BEAD,
  BENCH,
  CABLE,
  CARD_LIFT,
  HEIGHT,
  P,
  PHONE_ART,
  RACK_ART,
  SCREEN_H,
  SCREEN_W,
  WIDTH,
  beadX,
  cardArt,
} from './geometry';
import { COUNTER, FIRST_COUNT, HOOK, MODULES, MOST, readouts } from './model';

/* ---------- Static art ---------- */

const CABLE_D = pathOf(CABLE);

const RACK = (
  <g>
    <Solid paths={RACK_ART.plinth} tone="lo" crease="faint" />
    <Solid
      paths={RACK_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={RACK_ART.seam} tone="faint" />}
    />
    <Line d={RACK_ART.groove} tone="faint" />
    <Line d={RACK_ART.slots} tone="lo" />
    <Dots points={RACK_ART.screws} size={0.5} tone="mid" />
    <Line d={RACK_ART.vents} tone="lo" />
    <Line d={RACK_ART.lampRings} tone="lo" />
    <Solid paths={RACK_ART.socket} tone="mid" crease="none" />
    <Line d={RACK_ART.socketMouth} tone="lo" />
  </g>
);

const CARDS = MODULES.map((_, index) => cardArt(index));

function Card({ index, lit }: { index: number; lit: boolean }) {
  const card = CARDS[index];
  return (
    <>
      <Solid
        paths={card.body}
        tone="hi"
        crease="lo"
        lit={lit}
        inner={<Line d={card.grip} tone="faint" />}
      />
      <Line d={card.chip} tone="lo" />
      <Line d={card.tag} tone="mid" />
      <Dots points={card.contacts} size={0.45} tone="mid" />
      <FaceText transform={card.label} size={3.6} tone="mid">
        {MODULES[index].tag}
      </FaceText>
    </>
  );
}

const DOCK = (
  <g>
    <Solid
      paths={PHONE_ART.dock}
      tone="mid"
      crease="faint"
      inner={<Line d={PHONE_ART.dockSeam} tone="faint" />}
    />
    <Line d={PHONE_ART.dockGroove} tone="faint" />
    <Dots points={PHONE_ART.dockScrews} size={0.5} tone="mid" />
    <Solid paths={PHONE_ART.rest} tone="lo" crease="faint" />
    <Solid paths={PHONE_ART.body} tone="hi" crease="lo" />
    <Solid paths={PHONE_ART.sideButton} tone="mid" crease="none" />
    <path className="af-glass" d={PHONE_ART.bezel} />
    <Line d={PHONE_ART.speaker} tone="lo" />
    <Dots points={[PHONE_ART.camera]} size={0.6} tone="lo" />
  </g>
);

const DOCK_FRONT = (
  <g>
    <Solid paths={PHONE_ART.lip} tone="mid" crease="faint" />
    <Dots points={PHONE_ART.lipScrews} size={0.45} tone="mid" />
    <Line d={PHONE_ART.lampRing} tone="lo" />
  </g>
);

const SOCKET = (
  <g>
    <Solid paths={PHONE_ART.socket} tone="mid" crease="none" />
    <Line d={PHONE_ART.socketMouth} tone="lo" />
  </g>
);

const ABACUS_BACK = (
  <g>
    <Solid
      paths={ABACUS_ART.base}
      tone="mid"
      crease="faint"
      inner={<Line d={ABACUS_ART.seam} tone="faint" />}
    />
    <Dots points={ABACUS_ART.screws} size={0.4} tone="mid" />
    <Line d={ABACUS_ART.ticks} tone="lo" />
    <Line d={ABACUS_ART.zero} tone="hi" />
    <Solid paths={ABACUS_ART.postLeft} tone="mid" crease="faint" />
    <Dots points={[ABACUS_ART.postScrews[0]]} size={0.45} tone="mid" />
    <Line d={ABACUS_ART.rod} tone="mid" />
  </g>
);

const ABACUS_FRONT = (
  <g>
    <Solid paths={ABACUS_ART.postRight} tone="mid" crease="faint" />
    <Dots points={[ABACUS_ART.postScrews[1]]} size={0.45} tone="mid" />
  </g>
);

function Bead({ counted }: { counted: boolean }) {
  return (
    <Solid
      paths={BEAD.body}
      tone={counted ? 'hi' : 'mid'}
      crease={counted ? 'lo' : 'faint'}
      inner={<Line d={BEAD.seam} tone="faint" />}
    />
  );
}

/* ---------- Simulation ---------- */

interface Sim {
  lit: number;
  idle: number;
  tour: number;
  clock: number;
  count: number;
  pulse: number;
  error: number;
  lift: number[];
  beads: number[];
  lamps: number[];
  broken: boolean;
  touched: boolean;
  errorTarget: number;
  liftTarget: number[];
  /** The Counter cartridge carries a red flag while its file has an error. */
  flash: number;
  press: number;
  flagged: boolean;
  dockLamp: number;
  plan: Array<{ at: number; run: () => void }>;
}

const counted = (index: number, count: number) => index >= MOST - count;

const initial = (): Sim => ({
  beads: Array.from({ length: MOST }, (_, index) =>
    beadX(index, counted(index, FIRST_COUNT)),
  ),
  broken: false,
  clock: 0,
  count: FIRST_COUNT,
  dockLamp: 0,
  error: 0,
  errorTarget: 0,
  flagged: false,
  flash: 0,
  idle: 0,
  lamps: MODULES.map(() => 0),
  lift: MODULES.map(() => 0),
  liftTarget: MODULES.map(() => 0),
  lit: -1,
  plan: [],
  press: 0,
  pulse: -1,
  touched: false,
  tour: 0,
});

const TOUR = [
  'tap',
  'counter',
  'tap',
  'hook',
  'tap',
  'tap',
  'tap',
  'break',
  'fix',
] as const;
type Action = (typeof TOUR)[number];

const SEND = 0.8;
const SETTLED = 0.01;

const LABEL =
  'A Fast Refresh bench. Three module cartridges stand in a rack, standing for files in the bundle Metro serves: App, Counter (components, square tag) and useCount (a hook, round tag). A cable runs from the rack to a phone in a dock running the app, which shows a counter. In front, an abacus holds the counter’s state: one bead pushed right per count. Saving a file lifts its cartridge and sends one pulse down the cable. A component swap leaves the beads where they are; a hook swap re-runs the module and the beads slide back to zero. Saving with a syntax error turns the screen red until the fixed file is saved.';

export function FastRefreshBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const cardRefs = React.useRef<Array<SVGGElement | null>>([]);
  const beadRefs = React.useRef<Array<SVGGElement | null>>([]);
  const lampRefs = React.useRef<Array<SVGCircleElement | null>>([]);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);
  const countRef = React.useRef<SVGTextElement>(null);
  const flashRef = React.useRef<SVGRectElement>(null);
  const pressRef = React.useRef<SVGRectElement>(null);
  const errorRef = React.useRef<SVGGElement>(null);
  const dockLampRef = React.useRef<SVGGElement>(null);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const setCount = (count: number) => {
    const s = sim.current;
    s.count = count;
    rerender();
  };

  /** Save a file: lift its cartridge, send one module down the cable. */
  const save = (index: number, arrive: () => void) => {
    const s = sim.current;
    s.liftTarget[index] = 1;
    s.lit = index;
    s.lamps[index] = 1;
    say(readouts.sending(MODULES[index].file));
    rerender();
    later(0.45, () => {
      s.liftTarget[index] = 0;
      s.pulse = 0;
      later(SEND, () => {
        s.flash = 1;
        s.dockLamp = 1;
        arrive();
      });
    });
  };

  const actions: Record<Action, () => void> = {
    break: () => {
      const s = sim.current;
      s.flagged = true;
      save(COUNTER, () => {
        s.broken = true;
        s.errorTarget = 1;
        say(readouts.broken(MODULES[COUNTER].file));
      });
    },
    counter: () => {
      const s = sim.current;
      save(COUNTER, () => say(readouts.kept(MODULES[COUNTER].file, s.count)));
    },
    fix: () => {
      const s = sim.current;
      s.flagged = false;
      save(COUNTER, () => {
        s.broken = false;
        s.errorTarget = 0;
        say(readouts.fixed(s.count));
      });
    },
    hook: () => {
      save(HOOK, () => {
        setCount(0);
        say(readouts.reset(MODULES[HOOK].file));
      });
    },
    tap: () => {
      const s = sim.current;
      if (s.broken) {
        say(readouts.broken(MODULES[COUNTER].file));
        return;
      }
      if (s.count >= MOST) {
        say(readouts.full());
        return;
      }
      s.press = 1;
      setCount(s.count + 1);
      say(readouts.tapped(s.count));
      later(0.35, () => undefined);
    },
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

    s.lift.forEach((value, index) => {
      s.lift[index] = follow(value, s.liftTarget[index], dt, 0.09, calm);
      moving ||= s.lift[index] !== s.liftTarget[index];
      cardRefs.current[index]?.setAttribute(
        'transform',
        translateAlong(P, [0, 0, CARD_LIFT * s.lift[index]]),
      );
      s.lamps[index] = follow(s.lamps[index], 0, dt, 0.6, calm);
      moving ||= s.lamps[index] > SETTLED;
      lampRefs.current[index]?.setAttribute(
        'opacity',
        (0.12 + 0.88 * s.lamps[index]).toFixed(3),
      );
    });

    s.beads.forEach((value, index) => {
      const target = beadX(index, counted(index, s.count));
      // Beads further along the rod start a little later, like a real slide.
      s.beads[index] = follow(value, target, dt, 0.12 + index * 0.012, calm);
      moving ||= s.beads[index] !== target;
      beadRefs.current[index]?.setAttribute(
        'transform',
        translateAlong(P, [s.beads[index], 0, 0]),
      );
    });

    if (s.pulse >= 0) {
      s.pulse += calm ? 1 : dt / SEND;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current) {
      runAlong(runRef.current, headRef.current, s.pulse, 1);
      moving = true;
    } else hideRun(runRef.current, headRef.current);

    if (countRef.current) countRef.current.textContent = String(s.count);
    s.flash = follow(s.flash, 0, dt, 0.25, calm);
    flashRef.current?.setAttribute('opacity', (0.5 * s.flash).toFixed(3));
    s.press = follow(s.press, 0, dt, 0.2, calm);
    pressRef.current?.setAttribute('opacity', s.press.toFixed(3));
    s.error = follow(s.error, s.errorTarget, dt, 0.1, calm);
    errorRef.current?.setAttribute('opacity', s.error.toFixed(3));
    s.dockLamp = follow(s.dockLamp, 0, dt, 0.6, calm);
    dockLampRef.current?.setAttribute(
      'opacity',
      (0.12 + 0.88 * s.dockLamp).toFixed(3),
    );
    moving ||=
      s.flash > SETTLED ||
      s.press > SETTLED ||
      s.dockLamp > SETTLED ||
      s.error !== s.errorTarget;

    const pending = s.plan.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    const touring = !s.touched && !calm;
    if (touring && !moving && !pending) {
      s.idle += dt;
      if (s.idle > 1.5) {
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
      ' ': 'tap',
      c: 'counter',
      e: sim.current.broken ? 'fix' : 'break',
      Enter: 'tap',
      h: 'hook',
      t: 'tap',
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
        aria-label="Tap the counter. Press C to save Counter.tsx, H to save the useCount hook, E to save with an error or fix it."
        onClick={() => act('tap')}
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
            <clipPath id="fr-screen-clip">
              <rect width={SCREEN_W} height={SCREEN_H} rx={1.2} />
            </clipPath>
          </defs>
          <BenchArt bench={BENCH} />
          {RACK}
          {CARDS.map((card, index) => (
            <g
              key={index}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              <Card index={index} lit={index === s.lit} />
              {index === COUNTER && s.flagged ? (
                <path className="af-red" d={card.tag} />
              ) : null}
            </g>
          ))}
          {RACK_ART.lamps.map(([x, y], index) => (
            <circle
              key={index}
              ref={(node) => {
                lampRefs.current[index] = node;
              }}
              className="af-head"
              cx={x}
              cy={y}
              r={0.9}
              opacity={0.12}
            />
          ))}

          {DOCK}
          <path className="af-glass" d={PHONE_ART.glass} />
          <g transform={PHONE_ART.screen}>
            <g clipPath="url(#fr-screen-clip)">
              <rect className="af-screen" width={SCREEN_W} height={SCREEN_H} />
              <path className="af-ui-line" d="M2.4 2.4H6.4" />
              <circle className="af-ui" cx={26.4} cy={2.4} r={0.55} />
              <circle className="af-ui" cx={28.4} cy={2.4} r={0.55} />
              <rect
                className="af-ui"
                x={2.4}
                y={6}
                width={12}
                height={2.4}
                rx={0.6}
              />
              <path className="af-ui-line" d="M2.4 12H28.6" />
              <text
                ref={countRef}
                className="af-mono"
                x={SCREEN_W / 2}
                y={36}
                fontSize={16}
                textAnchor="middle"
              >
                {s.count}
              </text>
              <path className="af-ui-line" d="M9 41H22" />
              <rect
                className="af-ui-line"
                x={7}
                y={47}
                width={SCREEN_W - 14}
                height={7}
                rx={3.5}
              />
              <path
                className="af-ui-line"
                d={`M${SCREEN_W / 2 - 1.8} 50.5H${SCREEN_W / 2 + 1.8}M${SCREEN_W / 2} 48.7V52.3`}
              />
              <rect
                ref={pressRef}
                className="af-ui-lit"
                x={7}
                y={47}
                width={SCREEN_W - 14}
                height={7}
                rx={3.5}
                opacity={0}
              />
              <rect
                className="af-ui"
                x={SCREEN_W / 2 - 5}
                y={SCREEN_H - 2.4}
                width={10}
                height={0.8}
                rx={0.4}
              />
              <g ref={errorRef} opacity={0}>
                <rect className="af-red" width={SCREEN_W} height={SCREEN_H} />
                <text className="af-error-text" x={2.6} y={10} fontSize={3}>
                  SyntaxError
                </text>
                <path
                  className="af-error-line"
                  d="M2.6 15H26M2.6 18.4H20M2.6 21.8H24M2.6 28H16M2.6 31.4H22"
                />
              </g>
              <rect
                ref={flashRef}
                className="af-flash"
                width={SCREEN_W}
                height={SCREEN_H}
                opacity={0}
              />
            </g>
          </g>
          {DOCK_FRONT}
          <g ref={dockLampRef} opacity={0.12}>
            <Dots points={[PHONE_ART.lamp]} size={0.9} tone="hi" />
          </g>

          <Cable d={CABLE_D} />
          <Runner
            d={CABLE_D}
            runRef={(node) => {
              runRef.current = node;
            }}
            headRef={(node) => {
              headRef.current = node;
            }}
          />
          {SOCKET}

          {ABACUS_BACK}
          {Array.from({ length: MOST }, (_, index) => (
            <g
              key={index}
              ref={(node) => {
                beadRefs.current[index] = node;
              }}
              transform={translateAlong(P, [s.beads[index], 0, 0])}
            >
              <Bead counted={counted(index, s.count)} />
            </g>
          ))}
          {ABACUS_FRONT}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('tap')} disabled={locked}>
          Tap +1
        </button>
        <button type="button" onClick={() => act('counter')} disabled={locked}>
          Save Counter.tsx
        </button>
        <button type="button" onClick={() => act('hook')} disabled={locked}>
          Save useCount.ts
        </button>
        <button
          type="button"
          onClick={() => act(s.broken ? 'fix' : 'break')}
          disabled={locked}
        >
          {s.broken ? 'Fix the error' : 'Save with an error'}
        </button>
      </Controls>
    </div>
  );
}

export function FastRefreshAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How Fast Refresh keeps state"
        hint="Tap +1 · C save component · H save hook"
        readout={readouts.rest(FIRST_COUNT)}
        keys={[
          { label: 'The module just saved', mark: 'lit' },
          { label: 'Counter state, one bead per count', mark: 'raised' },
          { label: 'Syntax error', mark: 'red' },
        ]}
        caption="Save a file and Metro sends just that module to the running app, which re-renders in well under a second with no rebuild. If the file only exports components, React swaps them in and their state survives: the beads stay put. If it exports a hook or anything else, the module re-runs and the state of every component using it resets. A syntax error shows a red screen, and saving the fix recovers on its own. Native changes are outside the bundle and still need a rebuild."
      >
        <FastRefreshBench />
      </Plate>
    </div>
  );
}
