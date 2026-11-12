import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import {
  BenchArt,
  Controls,
  FaceDial,
  HousingArt,
  dialRotate,
} from '../anatomy/bench';
import { knurlOf } from '../anatomy/parts';
import {
  BENCH,
  BLOCK_ART,
  BLOCK_LIFT,
  BUFFER,
  FRAME_ART,
  GAUGE_ART,
  HEIGHT,
  P,
  RAIL_ART,
  RAIL_X1,
  ROW,
  VIEW_X0,
  VIEW_X1,
  WHEEL,
  WIDTH,
  WINDOW_ART,
} from './geometry';
import { ROWS, readouts, type Mode } from './model';

/* ---------- Static art ---------- */

const RAIL = (
  <g>
    {FRAME_ART.back.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Line d={FRAME_ART.feet} tone="lo" />
    <Solid
      paths={RAIL_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={RAIL_ART.seam} tone="faint" />}
    />
    <Line d={RAIL_ART.groove} tone="faint" />
    <Line d={RAIL_ART.ticksMinor} tone="lo" />
    <Line d={RAIL_ART.ticksMajor} tone="mid" />
    <Solid paths={RAIL_ART.wheel} tone="mid" crease="none" />
    <Line d={RAIL_ART.wheelCap} tone="lo" />
    <Dots points={[RAIL_ART.wheelHub]} size={0.6} tone="mid" />
  </g>
);

const FRAME_FRONT = (
  <g>
    <Solid paths={RAIL_ART.stop} tone="mid" crease="faint" />
    {FRAME_ART.front.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Solid paths={FRAME_ART.sideBack} tone="mid" crease="faint" />
    {FRAME_ART.bars.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Solid paths={FRAME_ART.sideFront} tone="mid" crease="faint" />
    <Dots points={FRAME_ART.screws} size={0.45} tone="mid" />
  </g>
);

const Block = React.memo(function Block({
  index,
  onScreen,
}: {
  index: number;
  onScreen: boolean;
}) {
  return (
    <>
      <Solid
        paths={BLOCK_ART.body}
        tone="hi"
        crease="lo"
        lit={onScreen}
        inner={<Line d={BLOCK_ART.seam} tone="faint" />}
      />
      <Line d={BLOCK_ART.rules} tone="lo" free />
      <FaceText
        transform={BLOCK_ART.face}
        size={3.2}
        tone="mid"
        anchor="middle"
      >
        <tspan dy={1.1}>{index}</tspan>
      </FaceText>
    </>
  );
});

/* ---------- Simulation ---------- */

const START = 40 * ROW;
const DRIFT = 10;
const FADE = 7;
const RANGE: Record<Mode, [number, number]> = {
  flatlist: [VIEW_X0 - BUFFER, VIEW_X1 + BUFFER],
  scrollview: [-112, RAIL_X1 - 2],
};

const xOf = (index: number, scroll: number) => VIEW_X0 + index * ROW - scroll;

function rangeOf(mode: Mode, scroll: number): [number, number] {
  const [lo, hi] = RANGE[mode];
  const first = Math.max(0, Math.ceil((lo - VIEW_X0 + scroll) / ROW - 0.5));
  const last = Math.min(
    ROWS - 1,
    Math.floor((hi - VIEW_X0 + scroll) / ROW - 0.5),
  );
  return [first, last];
}

/** Lift and fade near the render window's edges: a row being recycled. */
function edgeOf(mode: Mode, x: number) {
  const [lo, hi] = RANGE[mode];
  const centre = x + ROW / 2;
  const t = Math.max(
    0,
    Math.min(1, (centre - lo) / FADE, (hi - centre) / FADE),
  );
  // Rise first, and only fade at the top of the hop, so the block stays solid.
  return {
    a: Math.min(1, t / 0.3),
    z: (1 - t) * (mode === 'flatlist' ? BLOCK_LIFT : 0),
  };
}

interface Sim {
  mode: Mode;
  row: number;
  idle: number;
  tour: number;
  gauge: number;
  scroll: number;
  velocity: number;
  touched: boolean;
  range: [number, number];
}

const TOUR = [
  'fling',
  'fling',
  'scrollview',
  'fling',
  'flatlist',
  'back',
] as const;
type Action = (typeof TOUR)[number];

const LABEL =
  'FlatList drawn as a long rail with a place for each of a thousand rows, sliding under a viewport frame. In FlatList mode only the row blocks inside the render window, the viewport plus a short buffer each side, exist: as a row leaves the window it lifts off and a fresh block drops in at the other edge, so the gauge for mounted views stays near zero. In ScrollView mode every row is mounted, the whole rail fills with blocks and the gauge pegs at a thousand. A knurled wheel at the rail’s end turns as the list scrolls.';

export function FlatListBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      gauge: 0,
      idle: 0,
      mode: 'flatlist',
      range: rangeOf('flatlist', START),
      row: Math.round(START / ROW),
      scroll: START,
      touched: false,
      tour: 0,
      velocity: DRIFT,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const [mode, setMode] = React.useState<Mode>('flatlist');
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const blockRefs = React.useRef(new Map<number, SVGGElement>());
  const knurlRef = React.useRef<SVGPathElement>(null);
  const needleRef = React.useRef<SVGPathElement>(null);

  const actions: Record<Action, () => void> = {
    back: () => {
      sim.current.velocity = -150;
    },
    flatlist: () => {
      sim.current.mode = 'flatlist';
      setMode('flatlist');
    },
    fling: () => {
      sim.current.velocity = 170;
    },
    scrollview: () => {
      sim.current.mode = 'scrollview';
      setMode('scrollview');
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    if (calm) return false;
    // Fling decays back to a slow drift, like momentum scrolling settling.
    s.velocity += (DRIFT - s.velocity) * (1 - Math.exp(-dt / 0.7));
    s.scroll = Math.max(
      0,
      Math.min((ROWS - 4) * ROW, s.scroll + s.velocity * dt),
    );
    if (s.scroll >= (ROWS - 4) * ROW) s.scroll = START;

    const range = rangeOf(s.mode, s.scroll);
    if (range[0] !== s.range[0] || range[1] !== s.range[1]) {
      s.range = range;
      rerender();
    }
    for (const [index, node] of blockRefs.current) {
      const x = xOf(index, s.scroll);
      const edge = edgeOf(s.mode, x);
      node.setAttribute('transform', translateAlong(P, [x, 0, edge.z]));
      node.setAttribute('opacity', edge.a.toFixed(3));
    }

    knurlRef.current?.setAttribute(
      'd',
      knurlOf(
        P,
        WHEEL.x,
        WHEEL.y,
        WHEEL.r,
        WHEEL.z0,
        WHEEL.z1,
        28,
        s.scroll / WHEEL.r,
      ),
    );

    const mounted = s.mode === 'flatlist' ? range[1] - range[0] + 1 : ROWS;
    const target = mounted / ROWS;
    s.gauge += (target - s.gauge) * (1 - Math.exp(-dt / 0.25));
    needleRef.current?.setAttribute('transform', dialRotate(s.gauge));

    const row = Math.round((s.scroll + ROW / 2) / ROW);
    if (row !== s.row) {
      s.row = row;
      say(
        s.mode === 'flatlist'
          ? readouts.flat(mounted, row)
          : readouts.scroll(row),
      );
    }

    if (!s.touched) {
      s.idle += dt;
      if (s.idle > 3.4) {
        s.idle = 0;
        actions[TOUR[s.tour % TOUR.length]]();
        s.tour += 1;
      }
    }
    return true;
  };

  const kick = useLoop(tick, inView);

  const act = (action: Action) => {
    sim.current.touched = true;
    actions[action]();
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'fling',
      ArrowDown: 'fling',
      ArrowLeft: 'back',
      ArrowRight: 'fling',
      ArrowUp: 'back',
      Enter: 'fling',
      f: 'flatlist',
      s: 'scrollview',
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
  const indexes: number[] = [];
  for (let index = s.range[0]; index <= s.range[1]; index++)
    indexes.push(index);
  const onScreen = (index: number) => {
    const centre = xOf(index, s.scroll) + ROW / 2;
    return centre > VIEW_X0 && centre < VIEW_X1;
  };

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Fling the list. Arrow keys scroll, F for FlatList, S for ScrollView."
        onClick={() => act('fling')}
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
            ref={knurlRef}
            className="iso-line"
            data-tone="faint"
            d={knurlOf(P, WHEEL.x, WHEEL.y, WHEEL.r, WHEEL.z0, WHEEL.z1, 28, 0)}
          />
          {mode === 'flatlist' ? (
            <Line d={WINDOW_ART} tone="mid" dashed />
          ) : null}
          {indexes.map((index) => {
            const x = xOf(index, s.scroll);
            const edge = edgeOf(s.mode, x);
            return (
              <g
                key={index}
                ref={(node) => {
                  if (node) blockRefs.current.set(index, node);
                  else blockRefs.current.delete(index);
                }}
                transform={translateAlong(P, [x, 0, edge.z])}
                opacity={edge.a}
              >
                <Block index={index} onScreen={onScreen(index)} />
              </g>
            );
          })}
          {FRAME_FRONT}
          <HousingArt art={GAUGE_ART}>
            <Line d={GAUGE_ART.vents} tone="lo" />
          </HousingArt>
          <FaceDial
            transform={GAUGE_ART.dial}
            needleRef={needleRef}
            r={7}
            ticks={10}
          />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('fling')}>
          Fling down
        </button>
        <button type="button" onClick={() => act('back')}>
          Fling up
        </button>
        <div
          className="af-segmented"
          role="radiogroup"
          aria-label="List component"
        >
          {(['flatlist', 'scrollview'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => act(value)}
            >
              {value === 'flatlist' ? 'FlatList' : 'ScrollView'}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function FlatListAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How FlatList stays light"
        hint="Tap to fling · F FlatList · S ScrollView"
        readout={readouts.rest()}
        keys={[
          { label: 'Row on screen', mark: 'lit' },
          { label: 'Mounted row', mark: 'raised' },
          { label: 'Render window edge', mark: 'dashed' },
        ]}
        caption="FlatList mounts only the rows inside its render window around the viewport and recycles them as you scroll, so the number of native views stays flat whether the data has ten rows or a thousand. A ScrollView mounts every child up front. The real default window (windowSize: 21) is 21 viewports tall; it is shrunk here so you can watch rows recycle. Stable keyExtractor ids, getItemLayout for fixed-height rows and a memoised row component are what keep it fast."
      >
        <FlatListBench />
      </Plate>
    </div>
  );
}
