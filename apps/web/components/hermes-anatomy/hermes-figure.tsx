import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import { follow, useInView, useLoop, useReadout } from '../anatomy/kit/live';
import {
  BENCH,
  CARD_ART,
  HOPPER,
  OUT,
  PRESS,
  READER,
  SOURCE,
  TRACK,
  needleOf,
  switchOf,
} from './geometry';
import { CARDS, STEP, readouts, type Engine } from './model';
import {
  AT,
  FLOOR_Z,
  HEIGHT,
  P,
  RAM_DOWN,
  RAM_UP,
  STACK,
  WIDTH,
  depth,
} from './view';

/* ---------- Static art ---------- */

const BENCH_ART = (
  <g>
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

type Holder = typeof SOURCE;

const holderBack = (holder: Holder) => (
  <>
    <Solid
      paths={holder.back}
      tone="mid"
      crease="faint"
      inner={<Line d={holder.backSeam} tone="faint" />}
    />
    <Dots points={holder.backScrews} size={0.45} tone="mid" />
  </>
);

const holderFront = (holder: Holder) => (
  <>
    {holder.posts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Dots points={holder.postCaps} size={0.45} tone="mid" />
  </>
);

/** Everything behind the cards. */
const BACK_ART = (
  <g>
    <Solid paths={PRESS.foot} tone="lo" crease="faint" />
    <Dots points={PRESS.footScrews} size={0.45} tone="mid" />
    <Solid
      paths={PRESS.column}
      tone="mid"
      crease="faint"
      inner={<Line d={PRESS.columnSeam} tone="faint" />}
    />
    <Line d={PRESS.ribs} tone="lo" />
    <Solid paths={PRESS.wheelHub} tone="mid" crease="none" />
    <Solid paths={PRESS.wheel} tone="mid" crease="faint" />
    <Line d={PRESS.wheelKnurl} tone="faint" />
    <Line d={PRESS.wheelRim} tone="lo" />
    <Line d={PRESS.wheelSpokes} tone="lo" />
    <Dots points={[PRESS.wheelHubDot]} size={0.6} tone="mid" />
    <Solid
      paths={READER.back}
      tone="mid"
      crease="faint"
      inner={<Line d={READER.backSeam} tone="faint" />}
    />
    <Line d={READER.vents} tone="lo" />
    <Dots points={READER.backScrews} size={0.5} tone="mid" />
    <FaceText transform={READER.label} size={4} tone="lo" anchor="middle">
      hermes
    </FaceText>
    {holderBack(SOURCE)}
    {holderBack(HOPPER)}
    {holderBack(OUT)}
    <Solid paths={TRACK.back} tone="mid" crease="faint" />
    {READER.rollers.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Solid paths={TRACK.stopLeft} tone="mid" crease="faint" />
    <Solid paths={TRACK.floor} tone="lo" crease="faint" />
    <Line d={TRACK.grooves} tone="faint" />
    <Line d={PRESS.bedRing} tone="lo" />
  </g>
);

/** Everything in front of, or above, the cards. */
const FRONT_ART = (
  <g>
    <Solid
      paths={READER.head}
      tone="mid"
      crease="faint"
      inner={<Line d={READER.headSeam} tone="faint" />}
    />
    <Solid paths={READER.arm} tone="mid" crease="faint" />
    <Dots points={READER.armScrews} size={0.45} tone="mid" />
    <Solid paths={TRACK.front} tone="mid" crease="faint" />
    <Dots points={TRACK.frontScrews} size={0.45} tone="mid" />
    <Solid paths={TRACK.stopRight} tone="mid" crease="faint" />
    <Dots points={TRACK.stopScrews} size={0.45} tone="mid" />
    {holderFront(SOURCE)}
    {holderFront(HOPPER)}
    {holderFront(OUT)}
    <Solid
      paths={READER.front}
      tone="mid"
      crease="faint"
      inner={<Line d={READER.frontSeam} tone="faint" />}
    />
    <Dots points={READER.frontScrews} size={0.5} tone="mid" />
    <Solid paths={READER.dialPuck} tone="mid" crease="faint" />
    <Line d={READER.dialBand} tone="faint" />
    <Line d={READER.dialKnurl} tone="faint" />
    <Line d={READER.dialBezel} tone="lo" />
    <Line d={READER.dialMinor} tone="lo" />
    <Line d={READER.dialMajor} tone="mid" />
    <Line d={READER.lampRing} tone="lo" />
    <Solid paths={READER.lamp} tone="mid" crease="none" />
    <Solid paths={READER.switchPlate} tone="lo" crease="none" />
    <Dots points={READER.detents} size={0.55} tone="hi" />
    <Solid paths={READER.switchKnob} tone="mid" crease="faint" />
    <Line d={READER.switchKnurl} tone="faint" />
  </g>
);

const PRESS_TOP = (
  <>
    <Solid
      paths={PRESS.housing}
      tone="mid"
      crease="faint"
      inner={<Line d={PRESS.housingBand} tone="faint" />}
    />
    <Solid
      paths={PRESS.arm}
      tone="mid"
      crease="faint"
      inner={<Line d={PRESS.armSeam} tone="faint" />}
    />
    <Dots points={PRESS.armScrews} size={0.45} tone="mid" />
  </>
);

const RAM = (
  <Solid
    paths={PRESS.ram}
    tone="mid"
    crease="none"
    inner={<Line d={PRESS.ramMarks} tone="faint" />}
  />
);

const Card = React.memo(function Card({
  index,
  punched,
  lit,
}: {
  index: number;
  punched: boolean;
  lit: boolean;
}) {
  return (
    <>
      <path className="iso-halo hx-shadow" d={CARD_ART.body.fill} />
      <Solid
        paths={CARD_ART.body}
        tone={punched ? 'hi' : 'mid'}
        crease="faint"
        lit={lit}
        inner={<Line d={CARD_ART.seam} tone="faint" />}
      />
      <Line d={CARD_ART.stripe} tone="faint" />
      <Line d={CARD_ART.corner} tone="lo" />
      {punched ? (
        <Dots points={CARD_ART.holes[index]} size={0.62} tone="hi" />
      ) : (
        CARD_ART.text.map((d, row) => <Line key={row} d={d} tone="lo" free />)
      )}
    </>
  );
});

/* ---------- Simulation ---------- */

interface CardState {
  x: number;
  z: number;
  a: number;
  tx: number;
  tz: number;
  ta: number;
  punched: boolean;
}

interface Eased {
  v: number;
  t: number;
}

interface Sim {
  engine: Engine;
  cards: CardState[];
  ram: Eased;
  knob: Eased;
  needle: Eased;
  lamp: Eased;
  head: number;
  clock: number;
  plan: Array<{ at: number; run: () => void }>;
  launchAt: number | null;
  lit: number;
  idle: number;
  tour: number;
  touched: boolean;
}

const stackZ = (level: number) => FLOOR_Z + level * STACK;
const sourceCard = (level: number): CardState => {
  const z = stackZ(level);
  return { x: AT.source, z, a: 1, tx: AT.source, tz: z, ta: 1, punched: false };
};

const initial = (): Sim => ({
  engine: 'hermes',
  cards: Array.from({ length: CARDS }, (_, index) => sourceCard(index)),
  ram: { v: RAM_UP, t: RAM_UP },
  knob: { v: -1, t: -1 },
  needle: { v: 0, t: 0 },
  lamp: { v: 0, t: 0 },
  head: 0,
  clock: 0,
  plan: [],
  launchAt: null,
  lit: -1,
  idle: 0,
  tour: 0,
  touched: false,
});

const LABEL =
  'A punch-card press and a card reader on a bench, standing for a JavaScript engine in a React Native app. Printed cards are the JavaScript source. The press compiles a card by punching it into bytecode. The reader runs punched cards, and a lamp lights when the app is ready. A dial on the reader times the launch. With the engine switch on Hermes, the press runs at build time before the launch begins, so at launch the reader only runs cards. With the switch on JavaScriptCore, every card goes through the press during the launch, and the dial keeps turning while it does.';

const SECONDS_PER_CARD = STEP.toPress + STEP.punch;

export function HermesBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const cardRefs = React.useRef<Array<SVGGElement | null>>([]);
  const cardLayer = React.useRef<SVGGElement>(null);
  const order = React.useRef<number[]>([]);
  const ramRef = React.useRef<SVGGElement>(null);
  const needleRef = React.useRef<SVGPathElement>(null);
  const knobRef = React.useRef<SVGPathElement>(null);
  const lampRef = React.useRef<SVGGElement>(null);
  const headRef = React.useRef<SVGGElement>(null);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  /** Fade the deck out of the out-stack and lay it back, unpunched, in the source holder. */
  const resetDeck = () => {
    const s = sim.current;
    s.cards.forEach((card) => (card.ta = 0));
    s.needle.t = 0;
    s.lamp.t = 0;
    s.lit = -1;
    later(0.45, () => {
      s.cards.forEach((card, index) =>
        Object.assign(card, sourceCard(index), { a: 0, ta: 1 }),
      );
      rerender();
    });
  };

  /** Every card through the press, top of the stack first. Returns the time it takes. */
  const compileAll = (start: number, onCard: (done: number) => void) => {
    const s = sim.current;
    for (let step = 0; step < CARDS; step++) {
      const index = CARDS - 1 - step;
      const card = s.cards[index];
      const t = start + step * SECONDS_PER_CARD;
      later(t, () => {
        card.tx = AT.press;
        card.tz = FLOOR_Z;
        s.lit = index;
        rerender();
      });
      later(t + STEP.toPress, () => (s.ram.t = RAM_DOWN));
      later(t + STEP.toPress + STEP.punch * 0.5, () => {
        card.punched = true;
        s.ram.t = RAM_UP;
        rerender();
        onCard(step + 1);
      });
      later(t + SECONDS_PER_CARD, () => {
        card.tx = AT.hopper;
        card.tz = stackZ(step);
      });
    }
    return CARDS * SECONDS_PER_CARD + STEP.toHopper;
  };

  /** Feed every card from the hopper through the read head to the out-stack. */
  const runAll = (start: number, onCard: (done: number) => void) => {
    const s = sim.current;
    for (let step = 0; step < CARDS; step++) {
      // The hopper holds the deck in compile order: take the top card first.
      const index = step;
      const card = s.cards[index];
      const t = start + step * STEP.feed;
      later(t, () => {
        card.tx = AT.head;
        card.tz = FLOOR_Z;
        s.lit = index;
        rerender();
      });
      later(t + STEP.feed * 0.8, () => {
        s.head = 1;
        card.tx = AT.out;
        card.tz = stackZ(step);
        onCard(step + 1);
      });
    }
    return CARDS * STEP.feed + 0.5;
  };

  const startLaunch = () => {
    const s = sim.current;
    s.launchAt = s.clock;
  };

  const finishLaunch = () => {
    const s = sim.current;
    const seconds = s.launchAt === null ? 0 : s.clock - s.launchAt;
    s.launchAt = null;
    s.needle.t = seconds;
    s.lamp.t = 1;
    s.lit = -1;
    rerender();
    say(readouts.ready(s.engine, seconds));
  };

  const launch = () => {
    const s = sim.current;
    const engine = s.engine;
    resetDeck();
    let parsed = 0;
    let run = 0;
    const begin = 0.9;
    if (engine === 'hermes') {
      later(begin - 0.2, () => say(readouts.building(0)));
      const built = compileAll(begin, (done) => say(readouts.building(done)));
      const go = begin + built + 0.5;
      later(go - 0.4, () => say(readouts.built()));
      later(go, () => {
        startLaunch();
        say(readouts.launching(engine, 0, 0));
      });
      const ran = runAll(go + 0.1, (done) =>
        say(readouts.launching(engine, 0, done)),
      );
      later(go + 0.1 + ran, finishLaunch);
    } else {
      later(begin - 0.05, () => {
        startLaunch();
        say(readouts.launching(engine, 0, 0));
      });
      const built = compileAll(begin, (done) => {
        parsed = done;
        say(readouts.launching(engine, parsed, run));
      });
      const ran = runAll(begin + built, (done) => {
        run = done;
        say(readouts.launching(engine, parsed, run));
      });
      later(begin + built + ran, finishLaunch);
    }
  };

  const setEngine = (engine: Engine) => {
    const s = sim.current;
    if (s.engine === engine) return;
    s.engine = engine;
    s.knob.t = engine === 'hermes' ? -1 : 1;
    s.needle.t = 0;
    s.lamp.t = 0;
    rerender();
    say(readouts.rest(engine));
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    s.clock += dt;
    const due = s.plan.filter((step) => step.at <= s.clock);
    if (due.length) {
      s.plan = s.plan.filter((step) => step.at > s.clock);
      due.sort((a, b) => a.at - b.at).forEach((step) => step.run());
    }

    let moving = false;
    s.cards.forEach((card, index) => {
      card.x = follow(card.x, card.tx, dt, 0.13, calm);
      card.z = follow(card.z, card.tz, dt, 0.09, calm);
      card.a = follow(card.a, card.ta, dt, 0.1, calm);
      moving ||= card.x !== card.tx || card.z !== card.tz || card.a !== card.ta;
      const node = cardRefs.current[index];
      if (node) {
        node.setAttribute('transform', translateAlong(P, [card.x, 0, card.z]));
        node.setAttribute('opacity', card.a.toFixed(3));
      }
    });

    // Paint the cards far to near: a card lifting off a stack goes on top.
    const sorted = s.cards
      .map((card, index) => ({ index, key: depth(card.x, card.z) }))
      .sort((a, b) => a.key - b.key)
      .map((entry) => entry.index);
    if (sorted.join() !== order.current.join() && cardLayer.current) {
      order.current = sorted;
      sorted.forEach((index) => {
        const node = cardRefs.current[index];
        if (node) cardLayer.current!.appendChild(node);
      });
    }

    s.ram.v = follow(s.ram.v, s.ram.t, dt, 0.05, calm);
    ramRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, s.ram.v]),
    );
    s.knob.v = follow(s.knob.v, s.knob.t, dt, 0.12, calm);
    knobRef.current?.setAttribute('d', switchOf(s.knob.v));
    if (s.launchAt !== null) s.needle.v = s.clock - s.launchAt;
    else s.needle.v = follow(s.needle.v, s.needle.t, dt, 0.25, calm);
    needleRef.current?.setAttribute('d', needleOf(s.needle.v));
    s.lamp.v = follow(s.lamp.v, s.lamp.t, dt, 0.15, calm);
    lampRef.current?.setAttribute(
      'opacity',
      (0.12 + 0.88 * s.lamp.v).toFixed(3),
    );
    s.head = follow(s.head, 0, dt, 0.18, calm);
    headRef.current?.setAttribute('opacity', (0.15 + 0.85 * s.head).toFixed(3));

    moving ||=
      s.ram.v !== s.ram.t ||
      s.knob.v !== s.knob.t ||
      s.needle.v !== s.needle.t ||
      s.lamp.v !== s.lamp.t ||
      s.head > 0.01 ||
      s.launchAt !== null;

    const pending = s.plan.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    // Idle tour: Hermes, then JSC, until someone touches the figure.
    const touring = !s.touched && !calm;
    if (touring && !moving && !pending) {
      s.idle += dt;
      if (s.idle > 2.6) {
        s.idle = 0;
        setEngine(s.tour % 2 === 0 ? 'hermes' : 'jsc');
        later(0.6, launch);
        s.tour += 1;
      }
    }
    return moving || pending || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (run: () => void) => {
    const s = sim.current;
    s.touched = true;
    if (s.plan.length) return;
    run();
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      Enter: launch,
      ' ': launch,
      l: launch,
      h: () => setEngine('hermes'),
      j: () => setEngine('jsc'),
    };
    const run = keys[event.key];
    if (!run) return;
    event.preventDefault();
    act(run);
  };

  const s = sim.current;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage hx"
        tabIndex={0}
        role="button"
        aria-label="Launch the app. Press H for Hermes or J for JavaScriptCore."
        onClick={() => act(launch)}
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
          {BACK_ART}
          <g ref={cardLayer}>
            {s.cards.map((card, index) => (
              <g
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                transform={translateAlong(P, [card.x, 0, card.z])}
                opacity={card.a}
              >
                <Card
                  index={index}
                  punched={card.punched}
                  lit={index === s.lit}
                />
              </g>
            ))}
          </g>
          <g ref={ramRef} transform={translateAlong(P, [0, 0, s.ram.v])}>
            {RAM}
          </g>
          {PRESS_TOP}
          {FRONT_ART}
          <g ref={headRef} opacity={0.15}>
            <Dots points={[READER.headLamp]} size={0.9} tone="hi" />
          </g>
          <path
            ref={needleRef}
            className="hx-needle"
            d={needleOf(s.needle.v)}
          />
          <Dots points={[READER.dialHub]} size={0.65} tone="hi" />
          <path
            ref={knobRef}
            className="iso-line hx-pointer"
            data-tone="lit"
            d={switchOf(s.knob.v)}
          />
          <g ref={lampRef} opacity={0.12}>
            <Dots points={[READER.lampDot]} size={1.4} tone="hi" />
          </g>
        </svg>
      </div>
      <div className="hx-controls" role="group" aria-label="Figure controls">
        <div
          className="hx-engine"
          role="radiogroup"
          aria-label="JavaScript engine"
        >
          {(['hermes', 'jsc'] as const).map((engine) => (
            <button
              key={engine}
              type="button"
              role="radio"
              aria-checked={s.engine === engine}
              onClick={() => act(() => setEngine(engine))}
              disabled={busy && s.touched}
            >
              {engine === 'hermes' ? 'Hermes' : 'JavaScriptCore'}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => act(launch)}
          disabled={busy && s.touched}
        >
          Launch app
        </button>
      </div>
    </div>
  );
}

export function HermesAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="When Hermes compiles"
        hint="Tap to launch · H / J engine"
        readout={readouts.rest('hermes')}
        keys={[
          { mark: 'lit', label: 'The card being worked on' },
          { mark: 'raised', label: 'Punched card: bytecode' },
          { mark: 'dim', label: 'Printed card: JavaScript source' },
        ]}
        caption="Both engines turn source into bytecode before running it; the difference is when. Hermes compiles the bundle with hermesc at build time and ships the bytecode in the app, so the launch dial only times the reader. JavaScriptCore receives source text and parses it on every launch, so the press runs while the dial turns. Hermes has no JIT: the reader interprets bytecode, trading peak speed for fast, predictable startup. The dial is in figure seconds; the gap, not the unit, is the point."
      >
        <HermesBench />
      </Plate>
    </div>
  );
}
