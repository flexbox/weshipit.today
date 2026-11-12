import * as React from 'react';
import { pathOf, translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, Line, Plate, Solid } from '../anatomy/kit/draw';
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
  PhoneBack,
  PhoneFront,
  PhoneScreen,
  Runner,
  Socket,
} from '../anatomy/bench';
import { hideRun, runAlong } from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';
import {
  BENCH,
  CABLE,
  CARD_ART,
  DOCK_SOCKET,
  HEIGHT,
  P,
  PHONE_ART,
  PRESS_ART,
  PRESS_X,
  SLOT,
  TRACK_ART,
  WIDTH,
  rollerOf,
} from './geometry';
import { COMPILED, SOURCE, readouts, type Case } from './model';

const CABLE_D = pathOf(CABLE);
const SW = PHONE_ART.sw;

const TRACK = (
  <g>
    <Solid
      paths={TRACK_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={TRACK_ART.seam} tone="faint" />}
    />
    <Line d={TRACK_ART.guides} tone="faint" />
    <Line d={TRACK_ART.bays} tone="lo" />
    <Solid paths={TRACK_ART.stop} tone="mid" crease="faint" />
    <Solid paths={TRACK_ART.socket} tone="mid" crease="none" />
    <Solid paths={PRESS_ART.cheekBack} tone="mid" crease="faint" />
  </g>
);

const PRESS_FRONT = (
  <g>
    <Solid paths={PRESS_ART.cheekFront} tone="mid" crease="faint" />
    <Solid paths={PRESS_ART.bar} tone="mid" crease="faint" />
    <Dots points={PRESS_ART.barScrews} size={0.45} tone="mid" />
    <Line d={PRESS_ART.lampRing} tone="lo" />
  </g>
);

function CodeCard({
  compiled,
  kind,
  lit,
}: {
  kind: Case;
  compiled: boolean;
  lit: boolean;
}) {
  const lines = compiled ? COMPILED[kind] : SOURCE[kind];
  return (
    <>
      <Solid paths={CARD_ART.body} tone="hi" crease="lo" lit={lit} />
      <Line d={CARD_ART.gutter} tone="faint" />
      <g transform={CARD_ART.face}>
        {lines.map((line, row) => (
          <text
            key={row}
            className={compiled ? 'af-mono' : 'af-mono jx-src'}
            x={0}
            y={row * 4.4 + 1}
            fontSize={2.9}
            xmlSpace="preserve"
          >
            {line}
          </text>
        ))}
      </g>
    </>
  );
}

/* ---------- Simulation ---------- */

interface Card {
  x: number;
  a: number;
  id: number;
  kind: Case;
  tx: number;
  ta: number;
  compiled: boolean;
}

interface Sim {
  jam: number;
  spin: number;
  cards: Card[];
  phase: number;
  pulse: number;
  nextId: number;
  shown: Case | null;
}

const TOUR: Case[] = ['one', 'two', 'fragment'];

const LABEL =
  'JSX drawn as a card press. A card printed with JSX, a View wrapping a Text, slides along a track under the roller of a press labelled with nothing but its job: compiling. As it passes the roller its face changes to plain function calls, jsx(View, …) wrapping jsx(Text, …), and a pulse runs down a cable to a phone, which shows the real native view: a box with Hi in it. A card with two sibling Text tags and no wrapper jams at the roller and the press lamp turns red. Wrapped in a fragment, it passes, and the phone shows two lines of text with no extra box.';

export function JsxBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      cards: [],
      jam: 0,
      nextId: 1,
      phase: 0,
      pulse: -1,
      shown: null,
      spin: 0,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const cardRefs = React.useRef(new Map<number, SVGGElement>());
  const rollerRef = React.useRef<SVGGElement>(null);
  const lampRef = React.useRef<SVGCircleElement>(null);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);

  const feed = (kind: Case) => {
    const s = sim.current;
    s.cards.forEach((card) => (card.ta = 0));
    const card: Card = {
      a: 0,
      compiled: false,
      id: s.nextId++,
      kind,
      ta: 1,
      tx: SLOT.in,
      x: SLOT.in,
    };
    s.cards.push(card);
    s.jam = 0;
    rerender();
    sch.later(0.35, () => {
      s.spin = 1;
      card.tx = kind === 'two' ? PRESS_X - 26 : SLOT.out;
      if (kind === 'two') {
        sch.later(0.9, () => {
          s.spin = 0;
          s.jam = 1;
          say(readouts.jam());
        });
        return;
      }
      sch.later(1.5, () => {
        s.spin = 0;
        s.pulse = 0;
        sch.later(0.7, () => {
          s.shown = kind;
          rerender();
          say(kind === 'one' ? readouts.one() : readouts.fragment());
        });
      });
    });
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    let changed = false;
    for (const card of s.cards) {
      card.x = follow(card.x, card.tx, dt, 0.3, calm);
      card.a = follow(card.a, card.ta, dt, 0.12, calm);
      moving ||= card.x !== card.tx || card.a !== card.ta;
      if (!card.compiled && card.kind !== 'two' && card.x > PRESS_X) {
        card.compiled = true;
        changed = true;
      }
      const node = cardRefs.current.get(card.id);
      node?.setAttribute('transform', translateAlong(P, [card.x, 0, 0]));
      node?.setAttribute('opacity', card.a.toFixed(3));
    }
    const before = s.cards.length;
    s.cards = s.cards.filter((card) => card.ta > 0 || card.a > 0.02);
    if (changed || s.cards.length !== before) rerender();

    if (s.spin > 0 && !calm) {
      s.phase -= dt * 6;
      const roller = rollerOf(s.phase);
      const [body, end, stripes] = Array.from(
        rollerRef.current?.querySelectorAll('path') ?? [],
      );
      body?.setAttribute('d', roller.body);
      end?.setAttribute('d', roller.end);
      stripes?.setAttribute('d', roller.stripes);
      moving = true;
    }
    s.jam = Math.max(0, s.jam - (calm ? 0 : dt * 0.15));
    if (lampRef.current) {
      lampRef.current.setAttribute('class', s.jam > 0 ? 'af-red' : 'af-head');
      lampRef.current.setAttribute(
        'opacity',
        s.jam > 0 ? '1' : s.spin ? '0.9' : '0.15',
      );
    }
    if (s.pulse >= 0) {
      s.pulse += calm ? 1 : dt / 0.7;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current) {
      runAlong(runRef.current, headRef.current, s.pulse, 1);
      moving = true;
    } else hideRun(runRef.current, headRef.current);

    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.6, (i) =>
      feed(TOUR[i % TOUR.length]),
    );
    return moving || pending || touring || s.jam > 0;
  };

  const kick = useLoop(tick, inView);

  const act = (kind: Case) => {
    sch.touch();
    if (sch.pending) return;
    feed(kind);
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Case> = {
      ' ': 'one',
      '1': 'one',
      '2': 'two',
      '3': 'fragment',
      Enter: 'one',
    };
    const kind = map[event.key];
    if (!kind) return;
    event.preventDefault();
    act(kind);
  };

  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);

  const s = sim.current;
  const locked = sch.busy && sch.touched;
  const roller = rollerOf(s.phase);

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Compile a View with a Text. Press 2 for two roots, 3 for a fragment."
        onClick={() => act('one')}
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
          {TRACK}
          {s.cards.map((card) => (
            <g
              key={card.id}
              ref={(node) => {
                if (node) cardRefs.current.set(card.id, node);
                else cardRefs.current.delete(card.id);
              }}
              transform={translateAlong(P, [card.x, 0, 0])}
              opacity={card.a}
            >
              <CodeCard
                kind={card.kind}
                compiled={card.compiled}
                lit={card.compiled}
              />
            </g>
          ))}
          <g ref={rollerRef}>
            <path className="jx-roller" d={roller.body} />
            <path className="jx-roller-end" d={roller.end} />
            <path className="iso-line" data-tone="lo" d={roller.stripes} />
          </g>
          <Dots points={[PRESS_ART.hub]} size={0.6} tone="mid" />
          {PRESS_FRONT}
          <circle
            ref={lampRef}
            className="af-head"
            cx={PRESS_ART.lamp[0].toFixed(2)}
            cy={PRESS_ART.lamp[1].toFixed(2)}
            r={0.9}
            opacity={0.15}
          />

          <Cable d={CABLE_D} />
          <Runner
            d={CABLE_D}
            runRef={(node) => void (runRef.current = node)}
            headRef={(node) => void (headRef.current = node)}
          />
          <PhoneBack phone={PHONE_ART} />
          <PhoneScreen phone={PHONE_ART} id="jx-screen">
            {s.shown === 'one' ? (
              <>
                <rect
                  className="jx-view"
                  x={4}
                  y={10}
                  width={SW - 8}
                  height={18}
                  rx={1.4}
                />
                <text className="af-mono" x={7} y={20.6} fontSize={4}>
                  Hi
                </text>
              </>
            ) : s.shown === 'fragment' ? (
              <>
                <text className="af-mono" x={7} y={16} fontSize={4}>
                  Hi
                </text>
                <text className="af-mono" x={7} y={23} fontSize={4}>
                  Yo
                </text>
              </>
            ) : null}
          </PhoneScreen>
          <PhoneFront phone={PHONE_ART} />
          <Socket socket={DOCK_SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('one')} disabled={locked}>
          {'<View><Text>'}
        </button>
        <button type="button" onClick={() => act('two')} disabled={locked}>
          Two roots
        </button>
        <button type="button" onClick={() => act('fragment')} disabled={locked}>
          {'Wrap in <>…</>'}
        </button>
      </Controls>
    </div>
  );
}

export function JsxAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="What JSX compiles to"
        hint="Tap to compile · 2 two roots · 3 fragment"
        readout={readouts.rest()}
        keys={[
          { label: 'Compiled function calls', mark: 'lit' },
          { label: 'JSX source', mark: 'raised' },
          { label: 'Syntax error', mark: 'red' },
        ]}
        caption="JSX looks like markup but is compiled into plain function calls (jsx and jsxs in React's automatic runtime) that return React elements. In React Native the tags are core components, so <View> becomes a UIView on iOS and a ViewGroup on Android, never a DOM node. A component returns one root: two sibling tags need a wrapper, and a fragment <>…</> groups them without adding a native view."
      >
        <JsxBench />
      </Plate>
    </div>
  );
}
