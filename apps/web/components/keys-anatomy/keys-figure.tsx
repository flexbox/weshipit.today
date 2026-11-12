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
import { BenchArt, Controls } from '../anatomy/bench';
import {
  BENCH,
  CARD_ART,
  DROP,
  HEIGHT,
  P,
  RAIL_ART,
  SLOT_X,
  TAB_ART,
  WIDTH,
  selectorOf,
} from './geometry';
import {
  FIRST_IDS,
  INSERTS,
  SLOTS,
  TYPED_ROW,
  readouts,
  type KeyMode,
} from './model';

/* ---------- Static art ---------- */

const RAIL = (
  <g>
    <Solid
      paths={RAIL_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={RAIL_ART.seam} tone="faint" />}
    />
    <Line d={RAIL_ART.slots} tone="lo" />
    {RAIL_ART.numbers.map((transform, index) => (
      <FaceText
        key={index}
        transform={transform}
        size={4}
        tone="lo"
        anchor="middle"
      >
        <tspan dy={1.4}>{index}</tspan>
      </FaceText>
    ))}
    <Dots points={RAIL_ART.screws} size={0.45} tone="mid" />
    <Line d={RAIL_ART.detents} tone="mid" />
    <Solid paths={RAIL_ART.selector} tone="mid" crease="none" />
    <Line d={RAIL_ART.selectorKnurl} tone="faint" />
    <Line d={RAIL_ART.selectorRing} tone="lo" />
  </g>
);

const Card = React.memo(function Card({
  id,
  state,
}: {
  id: number;
  state: 'none' | 'own' | 'wrong';
}) {
  return (
    <>
      <Solid
        paths={CARD_ART.body}
        tone="hi"
        crease="lo"
        inner={<Line d={CARD_ART.seam} tone="faint" />}
      />
      <Line d={CARD_ART.avatar} tone="mid" />
      <FaceText transform={CARD_ART.label} size={2.9} tone="mid">
        user {id}
      </FaceText>
      <Line d={CARD_ART.field} tone={state === 'wrong' ? 'red' : 'lo'} />
      {state !== 'none' ? (
        <>
          <Line
            d={CARD_ART.typed}
            tone={state === 'wrong' ? 'red' : 'lit'}
            free
          />
          <Line
            d={CARD_ART.caret}
            tone={state === 'wrong' ? 'red' : 'lit'}
            free
          />
        </>
      ) : null}
    </>
  );
});

/* ---------- Simulation ---------- */

interface Row {
  x: number;
  z: number;
  a: number;
  id: number;
  tx: number;
  tz: number;
  ta: number;
}

interface Sim {
  rows: Row[];
  mode: KeyMode;
  /** Who typed, and the slot the state is attached to in index mode. */
  tab: number;
  slot: number;
  tabA: number;
  idle: number;
  tour: number;
  clock: number;
  selector: number;
  touched: boolean;
  owner: number | null;
  plan: Array<{ at: number; run: () => void }>;
}

const rowAt = (id: number, slot: number): Row => {
  const x = SLOT_X[slot];
  return { a: 1, id, ta: 1, tx: x, tz: 0, x, z: 0 };
};
const freshRows = () => FIRST_IDS.map((id, slot) => rowAt(id, slot));

type Action = 'type' | 'insert' | 'id' | 'index' | 'reset';
const TOUR: Action[] = [
  'type',
  'insert',
  'insert',
  'index',
  'type',
  'insert',
  'insert',
  'id',
];

const LABEL =
  'React keys drawn as list cards standing in numbered slots on a rail, one card per user. Typing into a row clips a lit tab, the input’s state, onto that card and lights the text in its field. Inserting a user at the top slides every card one slot along and drops the new one into slot 0. With key set to the user id, the tab rides along with its card. With key set to the index, the tab stays at its slot number, so it lands on a different user’s card, whose field turns red. A selector at the end of the rail switches the key.';

export function KeysBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      clock: 0,
      idle: 0,
      mode: 'id',
      owner: null,
      plan: [],
      rows: freshRows(),
      selector: -1,
      slot: TYPED_ROW,
      tab: SLOT_X[TYPED_ROW],
      tabA: 0,
      touched: false,
      tour: 0,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const [mode, setMode] = React.useState<KeyMode>('id');
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const rowRefs = React.useRef(new Map<number, SVGGElement>());
  const tabRef = React.useRef<SVGGElement>(null);
  const selectorRef = React.useRef<SVGPathElement>(null);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const reset = (next: KeyMode) => {
    const s = sim.current;
    s.mode = next;
    setMode(next);
    s.rows = freshRows();
    s.owner = null;
    s.slot = TYPED_ROW;
    rerender();
    say(readouts.rest(next));
    later(0.4, () => undefined);
  };

  const actions: Record<Action, () => void> = {
    id: () => reset('id'),
    index: () => reset('index'),
    insert: () => {
      const s = sim.current;
      const added = s.rows.length - FIRST_IDS.length;
      if (s.rows.length >= SLOTS || added >= INSERTS.length) {
        say(readouts.full());
        return;
      }
      const id = INSERTS[added];
      s.rows.forEach((row, slot) => {
        row.tx = SLOT_X[slot + 1];
      });
      s.rows.unshift({ ...rowAt(id, 0), a: 0, z: DROP });
      rerender();
      later(0.7, () => {
        if (s.owner === null) return;
        const ownerSlot = s.rows.findIndex((row) => row.id === s.owner);
        if (s.mode === 'id') {
          s.slot = ownerSlot;
          say(readouts.keptWithId(id, s.owner, ownerSlot));
        } else {
          say(readouts.keptAtIndex(id, s.slot, s.rows[s.slot].id, s.owner));
        }
        rerender();
      });
    },
    reset: () => reset(sim.current.mode),
    type: () => {
      const s = sim.current;
      s.owner = s.rows[TYPED_ROW].id;
      s.slot = TYPED_ROW;
      rerender();
      say(readouts.typed(s.owner, TYPED_ROW));
      later(0.4, () => undefined);
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
    for (const row of s.rows) {
      row.x = follow(row.x, row.tx, dt, 0.16, calm);
      row.z = follow(row.z, row.tz, dt, 0.1, calm);
      row.a = follow(row.a, row.ta, dt, 0.1, calm);
      moving ||= row.x !== row.tx || row.z !== row.tz || row.a !== row.ta;
      const node = rowRefs.current.get(row.id);
      node?.setAttribute('transform', translateAlong(P, [row.x, 0, row.z]));
      node?.setAttribute('opacity', row.a.toFixed(3));
    }
    // The tab follows its owner's card (id) or stays at its slot (index).
    const ownerRow = s.rows.find((row) => row.id === s.owner);
    const tabTarget = s.mode === 'id' && ownerRow ? ownerRow.x : SLOT_X[s.slot];
    s.tab =
      s.mode === 'id' && ownerRow
        ? tabTarget
        : follow(s.tab, tabTarget, dt, 0.16, calm);
    s.tabA = follow(s.tabA, s.owner === null ? 0 : 1, dt, 0.1, calm);
    moving ||= s.tab !== tabTarget || s.tabA !== (s.owner === null ? 0 : 1);
    tabRef.current?.setAttribute('transform', translateAlong(P, [s.tab, 0, 0]));
    tabRef.current?.setAttribute('opacity', s.tabA.toFixed(3));

    const side = s.mode === 'id' ? -1 : 1;
    s.selector = follow(s.selector, side, dt, 0.08, calm);
    selectorRef.current?.setAttribute('d', selectorOf(s.selector));
    moving ||= s.selector !== side;

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
      ' ': 'insert',
      Enter: 'insert',
      i: 'insert',
      k: sim.current.mode === 'id' ? 'index' : 'id',
      r: 'reset',
      t: 'type',
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
  const holder =
    s.owner === null
      ? null
      : s.mode === 'id'
        ? s.owner
        : (s.rows[s.slot]?.id ?? null);

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Insert a user at the top. Press T to type into row 1, K to switch the key, R to reset."
        onClick={() => act(s.owner === null ? 'type' : 'insert')}
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
          {RAIL}
          <path
            ref={selectorRef}
            className="iso-line af-pointer"
            data-tone="lit"
            d={selectorOf(s.selector)}
          />
          {s.rows.map((row) => (
            <g
              key={row.id}
              ref={(node) => {
                if (node) rowRefs.current.set(row.id, node);
                else rowRefs.current.delete(row.id);
              }}
              transform={translateAlong(P, [row.x, 0, row.z])}
              opacity={row.a}
            >
              <Card
                id={row.id}
                state={
                  holder !== row.id
                    ? 'none'
                    : holder === s.owner
                      ? 'own'
                      : 'wrong'
                }
              />
            </g>
          ))}
          <g ref={tabRef} opacity={0}>
            <Solid paths={TAB_ART.body} tone="hi" crease="lo" lit />
            <Line d={TAB_ART.grip} tone="faint" />
          </g>
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('type')} disabled={locked}>
          Type in row 1
        </button>
        <button type="button" onClick={() => act('insert')} disabled={locked}>
          Insert at top
        </button>
        <div className="af-segmented" role="radiogroup" aria-label="Key">
          {(['id', 'index'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => act(value)}
              disabled={locked}
            >
              {value === 'id' ? 'key={user.id}' : 'key={index}'}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => act('reset')} disabled={locked}>
          Reset
        </button>
      </Controls>
    </div>
  );
}

export function KeysAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Why keys must be stable"
        hint="Tap to type, then insert · K switch key"
        readout={readouts.rest('id')}
        keys={[
          { label: 'Typed input (component state)', mark: 'lit' },
          { label: 'State on the wrong row', mark: 'red' },
          { label: 'Row in the list', mark: 'raised' },
        ]}
        caption="React matches list items between renders by key. Keyed by a stable id, a row keeps its state, here the text typed into its input, wherever it moves. Keyed by the array index, React matches by position: insert a row at the top and the state stays at index 1, so it shows up on a different user. Keys only need to be unique among siblings; in a FlatList, keyExtractor does the same job."
      >
        <KeysBench />
      </Plate>
    </div>
  );
}
