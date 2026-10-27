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
  BIN_ART,
  COLUMN_ART,
  DIAL_ART,
  DIES,
  GUIDES,
  HUB_DOT,
  MAGAZINE,
  PAIR_SHADOW,
  PLATES,
  RAM_ART,
  SHIM_ART,
  TRACK,
  leverOf,
  needleOf,
} from './geometry';
import {
  FIRST_PLUGINS,
  MOST_PLUGINS,
  PLUGINS,
  SDKS,
  readouts,
  sdkOf,
} from './model';
import {
  BIN_FLOOR,
  FLOOR_Z,
  HEIGHT,
  LEVER_REST,
  LEVER_SWING,
  P,
  RAM_DOWN,
  RAM_UP,
  SLOT_X,
  WIDTH,
} from './view';

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

const COLUMN = (
  <g key="column">
    <Solid paths={COLUMN_ART.plinth} tone="lo" crease="faint" />
    <Dots points={COLUMN_ART.plinthScrews} size={0.45} tone="mid" />
    <Solid
      paths={COLUMN_ART.block}
      tone="mid"
      crease="faint"
      inner={<Line d={COLUMN_ART.seams} tone="faint" />}
    />
    <Line d={COLUMN_ART.vents} tone="lo" />
    {COLUMN_ART.gibs.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Dots points={COLUMN_ART.gibScrews} size={0.4} tone="mid" />
    <Solid paths={COLUMN_ART.cap} tone="mid" crease="faint" />
    <Dots points={COLUMN_ART.capScrews} size={0.45} tone="mid" />
    <Solid paths={DIAL_ART.puck} tone="mid" crease="faint" />
    <Line d={DIAL_ART.band} tone="faint" />
    <Line d={DIAL_ART.knurl} tone="faint" />
    <Line d={DIAL_ART.bezel} tone="lo" />
    <Line d={DIAL_ART.minor} tone="lo" />
    <Line d={DIAL_ART.major} tone="mid" />
  </g>
);

const BACK = (
  <g key="back">
    {MAGAZINE.backPosts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Solid paths={BIN_ART.floor} tone="lo" crease="faint" />
    <Solid paths={BIN_ART.back} tone="mid" crease="faint" />
    <Solid paths={BIN_ART.left} tone="mid" crease="faint" />
    <Solid paths={TRACK.back} tone="mid" crease="faint" />
    <Dots points={TRACK.backScrews} size={0.45} tone="mid" />
    <Solid paths={TRACK.floor} tone="lo" crease="faint" />
    <Line d={TRACK.grooves} tone="faint" />
    <Line d={TRACK.anvil} tone="lo" />
    <Line d={GUIDES.bores} tone="lo" />
    <Line d={TRACK.rollers} tone="faint" />
    <Dots points={TRACK.anvilScrews} size={0.45} tone="mid" />
    <Line d={TRACK.trayMarks} tone="lo" />
  </g>
);

function Magazine({ sdk }: { sdk: number }) {
  return (
    <g>
      {MAGAZINE.layers.map((pair, layer) => (
        <g key={layer}>
          {pair.map((paths, index) => (
            <Solid key={index} paths={paths} tone="mid" crease="faint" />
          ))}
        </g>
      ))}
      <Solid paths={MAGAZINE.weight} tone="mid" crease="faint" />
      {MAGAZINE.frontPosts.map((paths, index) => (
        <Solid key={index} paths={paths} tone="mid" crease="faint" />
      ))}
      <Solid paths={MAGAZINE.frame} tone="mid" crease="faint" />
      <Line d={MAGAZINE.window} tone="lo" />
      <Dots points={MAGAZINE.capScrews} size={0.45} tone="mid" />
      <FaceText
        transform={MAGAZINE.label}
        size={3.4}
        tone="mid"
        anchor="middle"
      >
        {`sdk ${sdk}`}
      </FaceText>
    </g>
  );
}

const FRONT = (
  <g key="front">
    <Solid paths={TRACK.front} tone="mid" crease="faint" />
    <Dots points={TRACK.frontScrews} size={0.45} tone="mid" />
    <Dots points={TRACK.axles} size={0.5} tone="lo" />
  </g>
);

const BIN_FRONT = (
  <g key="bin-front">
    <Solid paths={BIN_ART.right} tone="mid" crease="faint" />
    <Solid paths={BIN_ART.front} tone="mid" crease="faint" />
    <Line d={BIN_ART.handle} tone="lo" />
    <Dots points={BIN_ART.rivets} size={0.45} tone="mid" />
    <Dots points={BIN_ART.rimScrews} size={0.45} tone="mid" />
  </g>
);

const RAM_BODY = (
  <>
    <Solid paths={RAM_ART.slider} tone="mid" crease="faint" />
    <Line d={RAM_ART.rack} tone="lo" />
    <Solid paths={RAM_ART.stripper} tone="lo" crease="faint" />
    <Solid
      paths={RAM_ART.block}
      tone="mid"
      crease="faint"
      inner={<Line d={RAM_ART.seam} tone="faint" />}
    />
    <FaceText transform={RAM_ART.label} size={3.6} tone="mid" anchor="middle">
      app.json
    </FaceText>
    <Line d={RAM_ART.sockets} tone="lo" />
    <Dots points={RAM_ART.socketScrews} size={0.4} tone="mid" />
    <Dots points={RAM_ART.screws} size={0.5} tone="mid" />
    {RAM_ART.bushings.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Dots points={RAM_ART.bushingDots} size={0.6} tone="mid" />
  </>
);

const DIE_ART = DIES.map((die, index) => (
  <g key={index}>
    <Solid
      paths={die.bar}
      tone="hi"
      crease="lo"
      inner={<Line d={die.ridge} tone="faint" />}
    />
    <Solid paths={die.tab} tone="mid" crease="faint" />
    <Dots points={[die.led]} size={0.7} tone="hi" />
  </g>
));

const HUB = (
  <>
    <Solid paths={COLUMN_ART.hubBoss} tone="mid" crease="none" />
    <Solid paths={COLUMN_ART.hubCollar} tone="mid" crease="none" />
  </>
);

const PAIR_HALO = <path className="iso-halo cx-shadow" d={PAIR_SHADOW} />;

const PlatePair = React.memo(function PlatePair({
  plugins,
  sdk,
  stamped,
  lit,
  old,
  shim,
}: {
  plugins: number;
  sdk: number;
  stamped: boolean;
  lit: boolean;
  old: boolean;
  shim?: React.Ref<SVGGElement>;
}) {
  return (
    <>
      {PAIR_HALO}
      {(['ios', 'android'] as const).map((name) => {
        const plate = PLATES[name];
        return (
          <g key={name}>
            <Solid
              paths={plate.body}
              tone={old ? 'mid' : 'hi'}
              crease={old ? 'faint' : 'lo'}
              lit={lit}
            />
            <Line d={plate.groove} tone="faint" />
            <Line d={plate.holes} tone="lo" />
            <FaceText transform={plate.label} size={3.4} tone="mid">
              {name}
            </FaceText>
            <FaceText transform={plate.sdk} size={2.8} tone="lo" anchor="end">
              {sdk}
            </FaceText>
            {stamped
              ? plate.marks.slice(0, plugins).map((d, index) => (
                  <g key={index}>
                    <Line d={d} tone={old ? 'lo' : 'mid'} />
                    <Dots points={[plate.markDots[index]]} size={0.45} />
                  </g>
                ))
              : null}
          </g>
        );
      })}
      {shim ? (
        <g ref={shim} opacity={0}>
          <Solid paths={SHIM_ART.body} tone="hi" crease="lo" />
          <Dots points={SHIM_ART.screws} size={0.4} tone="hi" />
        </g>
      ) : null}
    </>
  );
});

/* ---------- Simulation ---------- */

interface Pair {
  id: number;
  plugins: number;
  sdk: number;
  stamped: boolean;
  edited: boolean;
}

interface Motion {
  x: number;
  z: number;
  a: number;
  tx: number;
  tz: number;
  ta: number;
}

interface Eased {
  v: number;
  t: number;
}

interface Sim {
  plugins: number;
  sdk: number;
  runs: number;
  nextId: number;
  tray?: Pair;
  press?: Pair;
  leaving: Pair[];
  lit: number;
  motion: Map<number, Motion>;
  dies: Array<{ z: number; a: number; tz: number; ta: number }>;
  ram: Eased;
  shim: Eased;
  needle: Eased;
  clock: number;
  plan: Array<{ at: number; run: () => void }>;
  idle: number;
  tour: number;
  touched: boolean;
}

const FIRST_RUNS = 1;
const TOUR = [
  'add',
  'prebuild',
  'edit',
  'prebuild',
  'upgrade',
  'add',
  'prebuild',
  'prebuild',
  'reset',
] as const;
type Action = (typeof TOUR)[number];

const placed = (x: number, z = 0, a = 1): Motion => ({
  x,
  z,
  a,
  tx: x,
  tz: z,
  ta: a,
});

function initial(): Sim {
  const tray: Pair = {
    id: 1,
    plugins: FIRST_PLUGINS,
    sdk: 0,
    stamped: true,
    edited: false,
  };
  return {
    plugins: FIRST_PLUGINS,
    sdk: 0,
    runs: FIRST_RUNS,
    nextId: 2,
    tray,
    leaving: [],
    lit: tray.id,
    motion: new Map([[tray.id, placed(SLOT_X.tray)]]),
    dies: PLUGINS.map((_, index) =>
      index < FIRST_PLUGINS
        ? { z: 0, a: 1, tz: 0, ta: 1 }
        : { z: 22, a: 0, tz: 22, ta: 0 },
    ),
    ram: { v: 0, t: 0 },
    shim: { v: 0, t: 0 },
    needle: { v: FIRST_RUNS, t: FIRST_RUNS },
    clock: 0,
    plan: [],
    idle: 0,
    tour: 0,
    touched: false,
  };
}

const REST_READOUT = readouts.rest(FIRST_PLUGINS, sdkOf(0).sdk);
const STROKE = RAM_UP - RAM_DOWN;

/* ---------- Live figure ---------- */

const LABEL =
  'A small stamping press on a bench, standing for Continuous Native Generation in Expo. A magazine on the left holds blank plate pairs cut from the Expo SDK native template. The press ram is app.json, and each die bar plugged into it is a config plugin. Running prebuild discards the current ios and android plates into a scrap bin, feeds a fresh blank pair under the ram and stamps one mark per plugin into both plates. A shim screwed on by hand is a hand edit to the ios folder: the next run throws it away. Upgrading the SDK swaps the blanks, and the same dies stamp the new template. A dial counts the runs.';

export function CngPress() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const pairs = React.useRef(new Map<number, SVGGElement>());
  const dieRefs = React.useRef<Array<SVGGElement | null>>([]);
  const ramRef = React.useRef<SVGGElement>(null);
  const pinRefs = React.useRef<Array<SVGGElement | null>>([]);
  const armRef = React.useRef<SVGPathElement>(null);
  const knobRef = React.useRef<SVGCircleElement>(null);
  const needleRef = React.useRef<SVGPathElement>(null);
  const shimRef = React.useRef<SVGGElement>(null);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const scrap = (pair: Pair) => {
    const s = sim.current;
    s.leaving.push(pair);
    s.motion.get(pair.id)!.tx = SLOT_X.bin;
    later(0.9, () => {
      Object.assign(s.motion.get(pair.id)!, {
        tz: BIN_FLOOR - FLOOR_Z,
        ta: 0,
      });
    });
    later(2, () => {
      s.leaving = s.leaving.filter((entry) => entry.id !== pair.id);
      s.motion.delete(pair.id);
      rerender();
    });
  };

  const actions: Record<Action, () => void> = {
    prebuild: () => {
      const s = sim.current;
      const before = s.tray;
      if (before) scrap(before);
      s.tray = undefined;
      const pair: Pair = {
        id: s.nextId++,
        plugins: s.plugins,
        sdk: s.sdk,
        stamped: false,
        edited: false,
      };
      s.press = pair;
      s.lit = pair.id;
      s.motion.set(pair.id, { ...placed(SLOT_X.magazine), tx: SLOT_X.press });
      rerender();
      later(1.3, () => {
        s.ram.t = 1;
        later(0.45, () => {
          pair.stamped = true;
          rerender();
          s.ram.t = 0;
          later(0.7, () => {
            s.motion.get(pair.id)!.tx = SLOT_X.tray;
            s.press = undefined;
            s.tray = pair;
            s.runs += 1;
            s.needle.t = s.runs;
            rerender();
            if (before?.edited) say(readouts.lost());
            else if (before && before.sdk !== pair.sdk)
              say(readouts.upgraded(sdkOf(pair.sdk).sdk, pair.plugins));
            else if (before && before.plugins === pair.plugins)
              say(readouts.same());
            else say(readouts.generated(pair.plugins));
            later(1.1, () => undefined);
          });
        });
      });
    },
    add: () => {
      const s = sim.current;
      if (s.plugins >= MOST_PLUGINS) {
        say(readouts.full());
        return;
      }
      const die = s.dies[s.plugins];
      die.tz = 0;
      die.ta = 1;
      s.plugins += 1;
      say(readouts.added(PLUGINS[s.plugins - 1]));
      later(0.9, () => undefined);
    },
    edit: () => {
      const s = sim.current;
      if (!s.tray || s.tray.edited) return;
      s.tray.edited = true;
      s.shim.v = 0;
      s.shim.t = 1;
      rerender();
      say(readouts.edited());
      later(0.8, () => undefined);
    },
    upgrade: () => {
      const s = sim.current;
      if (s.sdk >= SDKS.length - 1) {
        say(readouts.latest(sdkOf(s.sdk).sdk));
        return;
      }
      const from = sdkOf(s.sdk).sdk;
      s.sdk += 1;
      rerender();
      say(readouts.bumped(from, sdkOf(s.sdk).sdk, sdkOf(s.sdk).rn));
      later(0.9, () => undefined);
    },
    reset: () => {
      const s = sim.current;
      if (s.tray) scrap(s.tray);
      const fresh = initial();
      s.plugins = fresh.plugins;
      s.sdk = fresh.sdk;
      s.runs = fresh.runs;
      s.needle.t = fresh.runs;
      s.dies.forEach((die, index) =>
        Object.assign(die, {
          tz: fresh.dies[index].tz,
          ta: fresh.dies[index].ta,
        }),
      );
      const tray = { ...fresh.tray!, id: s.nextId++ };
      s.tray = tray;
      s.lit = tray.id;
      s.motion.set(tray.id, {
        ...placed(SLOT_X.magazine),
        tx: SLOT_X.tray,
      });
      rerender();
      say(REST_READOUT);
      later(1.6, () => undefined);
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
    for (const [id, m] of s.motion) {
      m.x = follow(m.x, m.tx, dt, 0.3, calm);
      m.z = follow(m.z, m.tz, dt, 0.16, calm);
      m.a = follow(m.a, m.ta, dt, 0.22, calm);
      moving ||= m.x !== m.tx || m.z !== m.tz || m.a !== m.ta;
      const node = pairs.current.get(id);
      if (node) {
        node.setAttribute('transform', translateAlong(P, [m.x, 0, m.z]));
        node.setAttribute('opacity', m.a.toFixed(3));
      }
    }
    s.dies.forEach((die, index) => {
      die.z = follow(die.z, die.tz, dt, 0.16, calm);
      die.a = follow(die.a, die.ta, dt, 0.14, calm);
      moving ||= die.z !== die.tz || die.a !== die.ta;
      const node = dieRefs.current[index];
      if (node) {
        node.setAttribute('transform', translateAlong(P, [0, 0, die.z]));
        node.setAttribute('opacity', die.a.toFixed(3));
      }
    });
    // The stroke goes down fast and comes back slower.
    s.ram.v = follow(s.ram.v, s.ram.t, dt, s.ram.t ? 0.08 : 0.2, calm);
    const stroke = translateAlong(P, [0, 0, -STROKE * s.ram.v]);
    ramRef.current?.setAttribute('transform', stroke);
    pinRefs.current.forEach((node) => node?.setAttribute('transform', stroke));
    const lever = leverOf(LEVER_REST - LEVER_SWING * s.ram.v);
    armRef.current?.setAttribute('d', lever.arm);
    knobRef.current?.setAttribute('cx', lever.knob[0].toFixed(2));
    knobRef.current?.setAttribute('cy', lever.knob[1].toFixed(2));
    s.shim.v = follow(s.shim.v, s.shim.t, dt, 0.16, calm);
    shimRef.current?.setAttribute('opacity', s.shim.v.toFixed(3));
    shimRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, 8 * (1 - s.shim.v)]),
    );
    s.needle.v = follow(s.needle.v, s.needle.t, dt, 0.3, calm);
    needleRef.current?.setAttribute('d', needleOf(s.needle.v));
    moving ||=
      s.ram.v !== s.ram.t || s.shim.v !== s.shim.t || s.needle.v !== s.needle.t;

    const working = moving || s.plan.length > 0;
    // Controls only wait for scheduled steps, not for the easing to settle.
    const pending = s.plan.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    // Idle tour: loops until someone touches the figure.
    const touring = !s.touched && !calm;
    if (touring && !working) {
      s.idle += dt;
      if (s.idle > 2.4) {
        s.idle = 0;
        actions[TOUR[s.tour % TOUR.length]]();
        s.tour += 1;
      }
    }
    return working || touring;
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
      p: 'prebuild',
      ' ': 'prebuild',
      Enter: 'prebuild',
      a: 'add',
      e: 'edit',
      u: 'upgrade',
      r: 'reset',
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
  const shown = [
    ...s.leaving,
    ...(s.tray ? [s.tray] : []),
    ...(s.press ? [s.press] : []),
  ].filter(
    (item, index, list) =>
      list.findIndex((other) => other.id === item.id) === index,
  );
  const edited = s.tray?.edited ? s.tray.id : undefined;
  const lever = leverOf(LEVER_REST - LEVER_SWING * s.ram.v);

  // The far pin sits behind the plates under the ram, the near one in front.
  const guidePin = (index: number) => (
    <g clipPath="url(#cx-guide-clip)">
      <g
        ref={(node) => {
          pinRefs.current[index] = node;
        }}
        transform={translateAlong(P, [0, 0, -STROKE * s.ram.v])}
      >
        <Solid paths={RAM_ART.pins[index]} tone="mid" crease="none" />
      </g>
    </g>
  );

  const pair = (item: Pair) => {
    const m = s.motion.get(item.id);
    return (
      <g
        key={item.id}
        ref={(node) => {
          if (node) pairs.current.set(item.id, node);
          else pairs.current.delete(item.id);
        }}
        transform={m ? translateAlong(P, [m.x, 0, m.z]) : undefined}
        opacity={m ? m.a : 1}
      >
        <PlatePair
          plugins={item.plugins}
          sdk={sdkOf(item.sdk).sdk}
          stamped={item.stamped}
          lit={item.id === s.lit}
          old={s.leaving.includes(item)}
          shim={item.edited && item.id === edited ? shimRef : undefined}
        />
        {item.edited && item.id !== edited ? (
          <g>
            <Solid paths={SHIM_ART.body} tone="mid" crease="faint" />
            <Dots points={SHIM_ART.screws} size={0.4} tone="mid" />
          </g>
        ) : null}
      </g>
    );
  };

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage cx"
        tabIndex={0}
        role="button"
        aria-label="Run prebuild. Press A to add a config plugin, E to hand-edit ios, U to upgrade the SDK, R to reset."
        onClick={() => act('prebuild')}
        onKeyDown={onKey}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          {BENCH_ART}
          {COLUMN}
          {BACK}
          {guidePin(0)}
          {shown.map(pair)}
          <Magazine sdk={sdkOf(s.sdk).sdk} />
          {BIN_FRONT}
          {guidePin(1)}
          <g ref={ramRef}>
            {RAM_BODY}
            {DIE_ART.map((die, index) => (
              <g
                key={index}
                ref={(node) => {
                  dieRefs.current[index] = node;
                }}
                transform={translateAlong(P, [0, 0, s.dies[index].z])}
                opacity={s.dies[index].a}
              >
                {die}
              </g>
            ))}
          </g>
          {FRONT}
          {HUB}
          <path ref={armRef} className="cx-lever" d={lever.arm} />
          <Dots points={[HUB_DOT]} size={0.9} tone="mid" />
          <circle
            ref={knobRef}
            className="cx-knob"
            cx={lever.knob[0]}
            cy={lever.knob[1]}
            r={2.6}
          />
          <path
            ref={needleRef}
            className="cx-needle"
            d={needleOf(s.needle.v)}
          />
          <Dots points={[DIAL_ART.hub]} size={0.7} tone="hi" />
          <defs>
            <clipPath id="cx-guide-clip">
              <path d={GUIDES.clip} />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="cx-controls" role="group" aria-label="Figure controls">
        <button
          type="button"
          onClick={() => act('prebuild')}
          disabled={busy && s.touched}
        >
          Run prebuild
        </button>
        <button
          type="button"
          onClick={() => act('add')}
          disabled={(busy && s.touched) || s.plugins >= MOST_PLUGINS}
        >
          Add config plugin
        </button>
        <button
          type="button"
          onClick={() => act('edit')}
          disabled={(busy && s.touched) || !s.tray || s.tray.edited}
        >
          Hand-edit ios/
        </button>
        <button
          type="button"
          onClick={() => act('upgrade')}
          disabled={(busy && s.touched) || s.sdk >= SDKS.length - 1}
        >
          Upgrade SDK
        </button>
        <button
          type="button"
          onClick={() => act('reset')}
          disabled={busy && s.touched}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export function CngAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How prebuild regenerates"
        hint="Tap to prebuild · A · E · U"
        readout={REST_READOUT}
        keys={[
          { mark: 'lit', label: 'The freshly generated ios/ and android/' },
          { mark: 'raised', label: 'Config plugins in app.json' },
          { mark: 'edge', label: 'Plugin changes stamped into both' },
        ]}
        caption="The magazine holds blanks cut from the Expo SDK native template. The ram is app.json, and every die bar in it is a config plugin. npx expo prebuild --clean scraps the current ios/ and android/, feeds a fresh blank pair under the ram and stamps every plugin into both. The same app.json always stamps the same folders, so a shim screwed on by hand is gone after the next run: put that change in a config plugin. Upgrading the SDK swaps the blanks, and the same dies stamp the new template, with nothing to merge."
      >
        <CngPress />
      </Plate>
    </div>
  );
}
