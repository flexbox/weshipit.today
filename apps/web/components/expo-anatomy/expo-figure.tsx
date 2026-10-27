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
  BACK_ART,
  BAY_ART,
  BENCH,
  CARDS,
  CART_ART,
  FEED,
  FRONT_ART,
  PAWL_ART,
  RACK_ART,
  SOCKETS,
  STOPS,
  TRAY,
  needleOf,
  pinsOf,
} from './geometry';
import {
  FIRST_MODULES,
  MODULES,
  MOST_MODULES,
  fingerprintOf,
  keyOf,
  readouts,
} from './model';
import {
  CART_PIN_X,
  CART_TOP,
  DROP_Z,
  HEIGHT,
  P,
  PAWL_DROP,
  PAWL_TOP,
  PAWL_X,
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

const RACK = (
  <g key="rack">
    <Solid paths={RACK_ART.plinth} tone="lo" crease="faint" />
    <Solid
      paths={RACK_ART.tower}
      tone="mid"
      crease="faint"
      inner={<Line d={RACK_ART.towerSeams} tone="faint" />}
    />
    <Line d={RACK_ART.vents} tone="lo" />
    {RACK_ART.stubs.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Line d={RACK_ART.stubRules} tone="lo" free />
    <Dots points={RACK_ART.lights} size={0.7} tone="hi" pulse />
    <Solid paths={RACK_ART.cap} tone="mid" crease="faint" />
    <Dots points={RACK_ART.capScrews} size={0.45} tone="mid" />
  </g>
);

const BACK = (
  <g key="back">
    <Solid
      paths={BACK_ART.block}
      tone="mid"
      crease="faint"
      inner={<Line d={BACK_ART.seam} tone="faint" />}
    />
    <Line d={BACK_ART.vents} tone="lo" />
    <Dots points={BACK_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BACK_ART.plane} tone="lo" crease="faint" />
    <Line d={BACK_ART.traces} tone="faint" />
    <Solid paths={BACK_ART.connector} tone="mid" crease="faint" />
  </g>
);

const SOCKET_ART = SOCKETS.map((socket, index) => (
  <g key={`socket-${index}`}>
    <Solid paths={socket.body} tone="mid" crease="faint" />
    <Line d={socket.slot} tone="lo" />
    <Solid paths={socket.latch} tone="mid" crease="none" />
  </g>
));

const CARD_ART = CARDS.map((card, index) => (
  <g key={`card-${index}`}>
    <Solid paths={card.board} tone="hi" crease="lo" />
    <Solid paths={card.chip} tone="mid" crease="none" />
    <Solid paths={card.bracket} tone="mid" crease="faint" />
    <Dots points={[card.led]} size={0.75} tone="hi" />
  </g>
));

const TRACK_BACK = (
  <g key="track-back">
    <Solid paths={TRAY.back} tone="mid" crease="faint" />
    <Solid paths={TRAY.floor} tone="lo" crease="faint" />
    <Line d={TRAY.groove} tone="faint" />
    <Solid paths={STOPS.left} tone="mid" crease="faint" />
    <Dots points={STOPS.leftScrews} size={0.45} tone="mid" />
    <Solid paths={BAY_ART.floor} tone="lo" crease="faint" />
    <Line d={BAY_ART.grooves} tone="faint" />
    <Line d={BAY_ART.pawlSlot} tone="lo" />
    <Solid paths={FEED.back} tone="mid" crease="faint" />
    <Solid paths={FEED.floor} tone="lo" crease="faint" />
    <Line d={FEED.groove} tone="faint" />
    <Solid paths={STOPS.bumper} tone="mid" crease="faint" />
  </g>
);

const TRACK_FRONT = (
  <g key="track-front">
    <Solid paths={TRAY.front} tone="mid" crease="faint" />
    <Dots points={TRAY.screws} size={0.45} tone="mid" />
    <Solid paths={FEED.front} tone="mid" crease="faint" />
    <Dots points={FEED.screws} size={0.45} tone="mid" />
    <Solid paths={STOPS.right} tone="mid" crease="faint" />
    <Dots points={STOPS.rightScrews} size={0.45} tone="mid" />
  </g>
);

const FRONT = (
  <g key="front">
    <Solid
      paths={FRONT_ART.block}
      tone="mid"
      crease="faint"
      inner={<Line d={FRONT_ART.seam} tone="faint" />}
    />
    <Line d={FRONT_ART.vents} tone="lo" />
    <FaceText transform={FRONT_ART.label} size={4.2} tone="lo" anchor="middle">
      expo
    </FaceText>
    <Dots points={FRONT_ART.screws} size={0.5} tone="mid" />
    <Solid paths={FRONT_ART.dialPuck} tone="mid" crease="faint" />
    <Line d={FRONT_ART.dialBand} tone="faint" />
    <Line d={FRONT_ART.dialKnurl} tone="faint" />
    <Line d={FRONT_ART.dialBezel} tone="lo" />
    <Line d={FRONT_ART.dialMinor} tone="lo" />
    <Line d={FRONT_ART.dialMajor} tone="mid" />
    <Line d={FRONT_ART.lampRings} tone="lo" />
    {FRONT_ART.lamps.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
  </g>
);

const PAWL_BODY = (
  <Solid
    paths={PAWL_ART.body}
    tone="mid"
    crease="faint"
    inner={<Line d={PAWL_ART.seam} tone="faint" />}
  />
);

function Pins({
  base,
  fingerprint,
  x,
}: {
  x: number;
  base: number;
  fingerprint: string;
}) {
  const pins = React.useMemo(
    () => pinsOf(x, base, keyOf(fingerprint)),
    [x, base, fingerprint],
  );
  return (
    <g>
      {pins.map((pin, index) => (
        <Solid key={index} paths={pin.body} tone="hi" crease="none" />
      ))}
    </g>
  );
}

const CART_SHADOW = <path className="iso-halo xa-shadow" d={CART_ART.shadow} />;

const Cartridge = React.memo(function Cartridge({
  fingerprint,
  lit,
  old,
}: {
  fingerprint: string;
  lit: boolean;
  old: boolean;
}) {
  return (
    <>
      {CART_SHADOW}
      <Solid
        paths={CART_ART.body}
        tone={old ? 'mid' : 'hi'}
        crease={old ? 'faint' : 'lo'}
        lit={lit}
        inner={
          <>
            <Line d={CART_ART.seam} tone="faint" />
            <Line d={CART_ART.grips} tone="faint" />
          </>
        }
      />
      <Line d={CART_ART.recess} tone="lo" />
      {CART_ART.rules.map((d, index) => (
        <Line key={index} d={d} tone="faint" free />
      ))}
      <Line d={CART_ART.pinBed} tone="faint" />
      <Pins x={CART_PIN_X} base={CART_TOP} fingerprint={fingerprint} />
    </>
  );
});

/* ---------- Simulation ---------- */

interface Cart {
  id: number;
  fp: string;
  patch: number;
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
  bay: Cart;
  tray?: Cart;
  feed?: Cart;
  patch: number;
  binary: string;
  builds: number;
  nextId: number;
  modules: number;
  /** Cartridges on their way out, drawn behind (back) or in front of (front) the pawl. */
  lit: number;
  pawl: Eased;
  lamp: number;
  idle: number;
  tour: number;
  needle: Eased;
  clock: number;
  touched: boolean;
  motion: Map<number, Motion>;
  plan: Array<{ at: number; run: () => void }>;
  leaving: Array<{ cart: Cart; front: boolean }>;
  cards: Array<{ z: number; a: number; tz: number; ta: number }>;
}

const FIRST_BUILDS = 1;
const FIRST_PATCH = 1;
const TOUR = [
  'ship',
  'ship',
  'add',
  'ship',
  'build',
  'ship',
  'add',
  'build',
  'ship',
  'reset',
] as const;
type Action = (typeof TOUR)[number];

const placed = (x: number, z = 0, a = 1): Motion => ({
  a,
  ta: a,
  tx: x,
  tz: z,
  x,
  z,
});

function initial(): Sim {
  const fp = fingerprintOf(FIRST_MODULES);
  const tray = { fp, id: 1, patch: FIRST_PATCH - 1 };
  const bay = { fp, id: 2, patch: FIRST_PATCH };
  return {
    bay,
    binary: fp,
    builds: FIRST_BUILDS,
    cards: MODULES.map((_, index) =>
      index < FIRST_MODULES
        ? { a: 1, ta: 1, tz: 0, z: 0 }
        : { a: 0, ta: 0, tz: 26, z: 26 },
    ),
    clock: 0,
    idle: 0,
    lamp: 0,
    leaving: [],
    lit: bay.id,
    modules: FIRST_MODULES,
    motion: new Map([
      [tray.id, placed(SLOT_X.tray)],
      [bay.id, placed(SLOT_X.bay)],
    ]),
    needle: { t: FIRST_BUILDS, v: FIRST_BUILDS },
    nextId: 3,
    patch: FIRST_PATCH,
    pawl: { t: 0, v: 0 },
    plan: [],
    touched: false,
    tour: 0,
    tray,
  };
}

const REST_READOUT = readouts.rest(FIRST_PATCH, fingerprintOf(FIRST_MODULES));
const SETTLED = 0.05;

/* ---------- Live figure ---------- */

const LABEL =
  'A cartridge console on a bench, standing for an Expo app. The console chassis is the native binary. Cards plugged into its backplane are Expo SDK native modules. The cartridge in its bay is the JavaScript bundle. New cartridges come from an update server rack and ride a track into the bay over the air, but only if their key pins match the pawl at the bay entrance, which is the binary’s runtime fingerprint. Adding a native module card changes the fingerprint, so updates are held at the pawl until a new build re-keys the console. A dial counts the builds.';

export function ExpoConsole() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const carts = React.useRef(new Map<number, SVGGElement>());
  const cardRefs = React.useRef<Array<SVGGElement | null>>([]);
  const pawlRef = React.useRef<SVGGElement>(null);
  const needleRef = React.useRef<SVGPathElement>(null);
  const lampRef = React.useRef<SVGGElement>(null);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const retire = (cart: Cart, front: boolean, motion: Partial<Motion>) => {
    const s = sim.current;
    s.leaving.push({ cart, front });
    Object.assign(s.motion.get(cart.id)!, motion);
    later(1.2, () => {
      s.leaving = s.leaving.filter((entry) => entry.cart.id !== cart.id);
      s.motion.delete(cart.id);
      rerender();
    });
  };

  const tryAdvance = () => {
    const s = sim.current;
    const feed = s.feed;
    if (!feed) return;
    if (feed.fp !== s.binary) {
      s.motion.get(feed.id)!.tx = SLOT_X.stop;
      later(0.5, () => {
        s.motion.get(feed.id)!.tx = SLOT_X.feed;
        say(readouts.blocked(feed.patch, feed.fp, s.binary));
      });
      return;
    }
    s.pawl.t = 1;
    later(0.4, () => {
      if (s.tray) retire(s.tray, false, { ta: 0, tx: SLOT_X.gone });
      s.tray = s.bay;
      s.bay = feed;
      s.feed = undefined;
      s.motion.get(s.tray.id)!.tx = SLOT_X.tray;
      s.motion.get(s.bay.id)!.tx = SLOT_X.bay;
      rerender();
      later(1.1, () => {
        s.pawl.t = 0;
        s.lamp = 1;
        say(readouts.shipped(feed.patch, feed.fp));
      });
    });
  };

  const actions: Record<Action, () => void> = {
    add: () => {
      const s = sim.current;
      if (s.modules >= MOST_MODULES) {
        say(readouts.full());
        return;
      }
      const from = fingerprintOf(s.modules);
      const card = s.cards[s.modules];
      card.tz = 0;
      card.ta = 1;
      s.modules += 1;
      say(
        readouts.added(MODULES[s.modules - 1], from, fingerprintOf(s.modules)),
      );
      later(0.9, () => undefined);
    },
    build: () => {
      const s = sim.current;
      const target = fingerprintOf(s.modules);
      if (s.binary === target) {
        say(readouts.current(target));
        return;
      }
      s.pawl.t = 1;
      retire(s.bay, false, { ta: 0, tz: DROP_Z });
      later(0.5, () => {
        s.binary = target;
        s.builds += 1;
        s.needle.t = s.builds;
        // A new binary ships with the current JavaScript embedded in it.
        s.bay = {
          fp: target,
          id: s.nextId++,
          patch: s.patch - (s.feed ? 1 : 0),
        };
        s.motion.set(s.bay.id, { ...placed(SLOT_X.bay), a: 0, z: DROP_Z });
        rerender();
        say(readouts.built(s.builds, target));
        later(0.9, () => {
          s.pawl.t = 0;
          later(0.6, () => {
            if (s.feed && s.feed.fp === s.binary) tryAdvance();
          });
        });
      });
    },
    reset: () => {
      const s = sim.current;
      for (const cart of [s.tray, s.bay, s.feed])
        if (cart) retire(cart, cart === s.feed, { ta: 0 });
      const fresh = initial();
      s.modules = fresh.modules;
      s.binary = fresh.binary;
      s.builds = fresh.builds;
      s.patch = fresh.patch;
      s.needle.t = fresh.builds;
      s.cards.forEach((card, index) =>
        Object.assign(card, {
          ta: fresh.cards[index].ta,
          tz: fresh.cards[index].tz,
        }),
      );
      const tray = { ...fresh.tray!, id: s.nextId++ };
      const bay = { ...fresh.bay, id: s.nextId++ };
      s.tray = tray;
      s.bay = bay;
      s.feed = undefined;
      s.lit = bay.id;
      s.motion.set(tray.id, { ...placed(SLOT_X.tray), a: 0 });
      s.motion.set(bay.id, { ...placed(SLOT_X.bay), a: 0 });
      rerender();
      say(REST_READOUT);
      later(1.2, () => undefined);
    },
    ship: () => {
      const s = sim.current;
      s.patch += 1;
      const cart = {
        fp: fingerprintOf(s.modules),
        id: s.nextId++,
        patch: s.patch,
      };
      if (s.feed) retire(s.feed, true, { ta: 0, tz: DROP_Z });
      s.feed = cart;
      s.lit = cart.id;
      s.motion.set(cart.id, { ...placed(SLOT_X.feed), a: 0, z: DROP_Z });
      rerender();
      later(0.8, tryAdvance);
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
      m.x = follow(m.x, m.tx, dt, 0.26, calm);
      m.z = follow(m.z, m.tz, dt, 0.14, calm);
      m.a = follow(m.a, m.ta, dt, 0.16, calm);
      moving ||= m.x !== m.tx || m.z !== m.tz || m.a !== m.ta;
      const node = carts.current.get(id);
      if (node) {
        node.setAttribute('transform', translateAlong(P, [m.x, 0, m.z]));
        node.setAttribute('opacity', m.a.toFixed(3));
      }
    }
    s.cards.forEach((card, index) => {
      card.z = follow(card.z, card.tz, dt, 0.16, calm);
      card.a = follow(card.a, card.ta, dt, 0.14, calm);
      moving ||= card.z !== card.tz || card.a !== card.ta;
      const node = cardRefs.current[index];
      if (node) {
        node.setAttribute('transform', translateAlong(P, [0, 0, card.z]));
        node.setAttribute('opacity', card.a.toFixed(3));
      }
    });
    s.pawl.v = follow(s.pawl.v, s.pawl.t, dt, 0.1, calm);
    pawlRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, -PAWL_DROP * s.pawl.v]),
    );
    s.needle.v = follow(s.needle.v, s.needle.t, dt, 0.3, calm);
    needleRef.current?.setAttribute('d', needleOf(s.needle.v));
    s.lamp = follow(s.lamp, 0, dt, 0.7, calm);
    lampRef.current?.setAttribute('opacity', (0.15 + 0.85 * s.lamp).toFixed(3));
    moving ||=
      s.pawl.v !== s.pawl.t || s.needle.v !== s.needle.t || s.lamp > SETTLED;

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
      if (s.idle > 2.2) {
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
      ' ': 'ship',
      b: 'build',
      Enter: 'ship',
      m: 'add',
      r: 'reset',
      u: 'ship',
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
  // A bay cartridge being swapped out by a build is briefly both leaving and
  // still in the bay: draw it once.
  const back = [
    ...s.leaving.filter((entry) => !entry.front).map((entry) => entry.cart),
    ...(s.tray ? [s.tray] : []),
    s.bay,
  ].filter(
    (item, index, list) =>
      list.findIndex((other) => other.id === item.id) === index,
  );
  const front = [
    ...(s.feed ? [s.feed] : []),
    ...s.leaving.filter((entry) => entry.front).map((entry) => entry.cart),
  ];

  const cart = (item: Cart) => {
    const m = s.motion.get(item.id);
    return (
      <g
        key={item.id}
        ref={(node) => {
          if (node) carts.current.set(item.id, node);
          else carts.current.delete(item.id);
        }}
        transform={m ? translateAlong(P, [m.x, 0, m.z]) : undefined}
        opacity={m ? m.a : 1}
      >
        <Cartridge
          fingerprint={item.fp}
          lit={item.id === s.lit}
          old={item.id === s.tray?.id}
        />
      </g>
    );
  };

  return (
    <div className="xa-controls-wrap">
      <div
        ref={anchor}
        className="iso-stage xa"
        tabIndex={0}
        role="button"
        aria-label="Ship a JavaScript update. Press M to add a native module, B to run a build, R to reset."
        onClick={() => act('ship')}
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
          {RACK}
          {BACK}
          {SOCKET_ART.map((socket, index) => (
            <React.Fragment key={index}>
              {socket}
              <g
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                transform={translateAlong(P, [0, 0, s.cards[index].z])}
                opacity={s.cards[index].a}
              >
                {CARD_ART[index]}
              </g>
            </React.Fragment>
          ))}
          {TRACK_BACK}
          {back.map(cart)}
          <g clipPath="url(#xa-pawl-clip)">
            <g ref={pawlRef}>
              {PAWL_BODY}
              <Pins x={PAWL_X} base={PAWL_TOP} fingerprint={s.binary} />
            </g>
          </g>
          {front.map(cart)}
          {TRACK_FRONT}
          {FRONT}
          <path
            ref={needleRef}
            className="xa-needle"
            d={needleOf(s.needle.v)}
          />
          <Dots points={[FRONT_ART.dialHub]} size={0.7} tone="hi" />
          <g ref={lampRef} className="xa-lamp" opacity={0.15}>
            <Dots points={FRONT_ART.lampDots} size={1.1} tone="hi" />
          </g>
          <defs>
            <clipPath id="xa-pawl-clip">
              <path d={PAWL_ART.clip} />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="xa-controls" role="group" aria-label="Figure controls">
        <button
          type="button"
          onClick={() => act('ship')}
          disabled={busy && s.touched}
        >
          Ship JS update
        </button>
        <button
          type="button"
          onClick={() => act('add')}
          disabled={(busy && s.touched) || s.modules >= MOST_MODULES}
        >
          Add native module
        </button>
        <button
          type="button"
          onClick={() => act('build')}
          disabled={
            (busy && s.touched) || s.binary === fingerprintOf(s.modules)
          }
        >
          Run EAS Build
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

export function ExpoAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How Expo ships"
        hint="Tap to ship · M module · B build"
        readout={REST_READOUT}
        keys={[
          { label: 'The newest JS bundle', mark: 'lit' },
          { label: 'Native modules in the binary', mark: 'raised' },
          { label: 'Runtime key pins', mark: 'edge' },
        ]}
        caption="The console is the native binary, built with EAS Build and released through the stores. Its cards are Expo SDK native modules. The cartridge is the JavaScript bundle: EAS Update ships a new one over the air, and it seats only if its key pins match the binary's runtime fingerprint. Add a native module and the fingerprint changes, so the next update waits at the pawl until a new build re-keys the console."
      >
        <ExpoConsole />
      </Plate>
    </div>
  );
}
