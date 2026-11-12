import * as React from 'react';
import { solidSvg, translateAlong } from '../anatomy/kit/iso-kit';
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
  BLOCKS,
  COLLAR_ART,
  ENGINE_ART,
  FIXED_ART,
  FIXED_X,
  HEIGHT,
  JAW_ART,
  JAW_OPEN,
  JS_ART,
  NAT_ART,
  P,
  PLATFORM_ART,
  ROD_X0,
  SCALE_ART,
  WIDTH,
  rodOf,
  viewOf,
} from './geometry';
import { ENGINES, FIRST_WIDTH, WIDTHS, readouts, type Engine } from './model';

/* ---------- Static art ---------- */

function Housing({ art }: { art: typeof JS_ART | typeof NAT_ART }) {
  return (
    <>
      <Solid paths={art.plinth} tone="lo" crease="faint" />
      <Solid
        paths={art.body}
        tone="mid"
        crease="faint"
        inner={<Line d={art.seam} tone="faint" />}
      />
      <Line d={art.groove} tone="faint" />
      <Dots points={art.screws} size={0.5} tone="mid" />
      <Line d={art.vents} tone="lo" />
      <Line d={art.lampRing} tone="lo" />
    </>
  );
}

const JS_HOUSING = (
  <g>
    <Housing art={JS_ART} />
    <Line d={JS_ART.socket} tone="lo" />
  </g>
);

const FLANGE = (
  <g>
    <Solid paths={JS_ART.flange} tone="mid" crease="faint" />
    <Dots points={JS_ART.flangeScrews} size={0.45} tone="mid" />
  </g>
);

const SEG0 = rodOf(ROD_X0, BLOCKS[0].x0);
const SEG1 = rodOf(BLOCKS[0].x1, BLOCKS[1].x0);

function Block({ index }: { index: number }) {
  const block = BLOCKS[index];
  return (
    <>
      <Solid paths={block.foot} tone="lo" crease="none" />
      <Dots points={block.footScrews} size={0.4} tone="mid" />
      <Solid paths={block.post} tone="mid" crease="faint" />
      <Solid
        paths={block.block}
        tone="mid"
        crease="faint"
        inner={<Line d={block.seam} tone="faint" />}
      />
      <Line d={block.bore} tone="lo" />
      <Dots points={[block.cap]} size={0.5} tone="mid" />
    </>
  );
}

const SCALE = (
  <g>
    <Solid paths={SCALE_ART.post} tone="lo" crease="none" />
    <Solid paths={SCALE_ART.plate} tone="lo" crease="none" />
    <Line d={SCALE_ART.minor} tone="lo" />
    <Line d={SCALE_ART.major} tone="mid" />
  </g>
);

const PLATFORM = (
  <g>
    <Solid
      paths={PLATFORM_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={PLATFORM_ART.seam} tone="faint" />}
    />
    <Line d={PLATFORM_ART.rail} tone="faint" />
    <Dots points={PLATFORM_ART.screws} size={0.4} tone="mid" />
  </g>
);

const FIXED = (
  <g>
    <Solid paths={FIXED_ART.body} tone="mid" crease="faint" />
    <Dots points={FIXED_ART.screws} size={0.4} tone="mid" />
  </g>
);

const NAT_HOUSING = (
  <g>
    <Housing art={NAT_ART} />
    <Line d={NAT_ART.bay} tone="lo" />
    <Line d={NAT_ART.bayRules} tone="faint" free />
  </g>
);

const VIEWS = WIDTHS.map((width) => viewOf(width));

function EnginePuck({ engine }: { engine: Engine }) {
  return (
    <>
      <Solid paths={ENGINE_ART.body} tone="hi" crease="lo" />
      <Line d={ENGINE_ART.dish} tone="faint" />
      <FaceText
        transform={ENGINE_ART.face}
        size={3.4}
        tone="mid"
        anchor="middle"
      >
        <tspan dy={1.2}>{engine}</tspan>
      </FaceText>
    </>
  );
}

/* ---------- Simulation ---------- */

interface Sim {
  idle: number;
  tour: number;
  clock: number;
  engine: number;
  touched: boolean;
  /** The engine leaving its socket during a swap, if any. */
  jaw: number;
  lift: number;
  view: number;
  lamp: number;
  outgoing: number;
  viewFade: number;
  jawTarget: number;
  liftTarget: number;
  plan: Array<{ at: number; run: () => void }>;
}

const initial = (): Sim => ({
  clock: 0,
  engine: 0,
  idle: 0,
  jaw: JAW_OPEN,
  jawTarget: JAW_OPEN,
  lamp: 0,
  lift: 0,
  liftTarget: 0,
  outgoing: -1,
  plan: [],
  touched: false,
  tour: 0,
  view: FIRST_WIDTH,
  viewFade: 1,
});

const TOUR = [
  'measure',
  'resize',
  'measure',
  'swap',
  'measure',
  'resize',
] as const;
type Action = (typeof TOUR)[number];

const closedAt = (view: number) => FIXED_X - WIDTHS[view];
const SETTLED = 0.01;

const LABEL =
  'JSI drawn as a bench. On the left, a JavaScript engine housing with a swappable engine puck, Hermes or JavaScriptCore, in a socket on top. A square rod leaves it through a C++ flange and runs through two bushings to a caliper on the native side: the rod is JavaScript’s direct reference to a native HostObject. Measuring a view pushes the rod until its jaw closes on the native view, and the pointer on the rod reads the width over a scale on the JavaScript side in the same moment: a synchronous answer, with no JSON and no queue. Swapping the engine leaves the flange and rod unchanged.';

export function JsiBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const seg2Ref = React.useRef<SVGGElement>(null);
  const jawRef = React.useRef<SVGGElement>(null);
  const collarRef = React.useRef<SVGGElement>(null);
  const pointerRef = React.useRef<SVGGElement>(null);
  const engineRef = React.useRef<SVGGElement>(null);
  const viewRef = React.useRef<SVGGElement>(null);
  const lampRefs = React.useRef<Array<SVGGElement | null>>([]);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  /** Close the jaw on the view; JS and native lamps light in the same frame. */
  const measure = (then?: () => void) => {
    const s = sim.current;
    s.jawTarget = closedAt(s.view);
    later(0.55, () => {
      s.lamp = 1;
      say(readouts.measured(WIDTHS[s.view]));
      later(0.7, () => {
        s.jawTarget = JAW_OPEN;
        later(0.4, () => then?.());
      });
    });
  };

  const actions: Record<Action, () => void> = {
    measure: () => measure(),
    resize: () => {
      const s = sim.current;
      s.viewFade = 0;
      later(0.25, () => {
        s.view = (s.view + 1) % WIDTHS.length;
        rerender();
        say(readouts.resized(WIDTHS[s.view]));
        later(0.35, () => undefined);
      });
    },
    swap: () => {
      const s = sim.current;
      s.liftTarget = 1;
      later(0.45, () => {
        s.engine = (s.engine + 1) % ENGINES.length;
        rerender();
        s.liftTarget = 0;
        later(0.5, () =>
          measure(() =>
            say(readouts.swapped(ENGINES[s.engine], WIDTHS[s.view])),
          ),
        );
      });
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

    s.jaw = follow(s.jaw, s.jawTarget, dt, 0.09, calm);
    const travel = s.jaw - JAW_OPEN;
    jawRef.current?.setAttribute('transform', translateAlong(P, [s.jaw, 0, 0]));
    collarRef.current?.setAttribute(
      'transform',
      translateAlong(P, [travel, 0, 0]),
    );
    if (seg2Ref.current)
      seg2Ref.current.innerHTML = solidSvg(rodOf(BLOCKS[1].x1, s.jaw - 3), {
        crease: 'none',
        lit: true,
        tone: 'hi',
      });
    pointerRef.current?.setAttribute(
      'transform',
      translateAlong(P, [travel, 0, 0]),
    );
    moving ||= s.jaw !== s.jawTarget;

    s.lift = follow(s.lift, s.liftTarget, dt, 0.1, calm);
    engineRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, 22 * s.lift]),
    );
    engineRef.current?.setAttribute('opacity', (1 - s.lift * 0.9).toFixed(3));
    moving ||= s.lift !== s.liftTarget;

    s.viewFade = follow(s.viewFade, 1, dt, 0.12, calm);
    viewRef.current?.setAttribute('opacity', s.viewFade.toFixed(3));
    moving ||= s.viewFade !== 1;

    s.lamp = follow(s.lamp, 0, dt, 0.5, calm);
    lampRefs.current.forEach((node) =>
      node?.setAttribute('opacity', (0.12 + 0.88 * s.lamp).toFixed(3)),
    );
    moving ||= s.lamp > SETTLED;

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
      ' ': 'measure',
      e: 'swap',
      Enter: 'measure',
      m: 'measure',
      r: 'resize',
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
  const seg2 = rodOf(BLOCKS[1].x1, s.jaw - 3);
  const view = VIEWS[s.view];

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Measure the native view. Press R to resize it, E to swap the JavaScript engine."
        onClick={() => act('measure')}
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
          {PLATFORM}
          {JS_HOUSING}
          <g ref={(node) => void (lampRefs.current[0] = node)} opacity={0.12}>
            <Dots points={[JS_ART.lamp]} size={0.9} tone="hi" />
          </g>
          <g ref={engineRef}>
            <EnginePuck engine={ENGINES[s.engine]} />
          </g>
          {FLANGE}
          <Solid paths={SEG0} tone="hi" crease="none" lit />
          <Block index={0} />
          <Solid paths={SEG1} tone="hi" crease="none" lit />
          <g ref={collarRef}>
            <Solid paths={COLLAR_ART.body} tone="mid" crease="none" />
          </g>
          {SCALE}
          <g ref={pointerRef}>
            <Line d={COLLAR_ART.pointer} tone="lit" />
            <Line d={COLLAR_ART.tip} tone="lit" free="end" />
          </g>
          <Block index={1} />
          <g ref={seg2Ref}>
            <Solid paths={seg2} tone="hi" crease="none" lit />
          </g>
          <g ref={jawRef} transform={translateAlong(P, [s.jaw, 0, 0])}>
            <Solid paths={JAW_ART.body} tone="mid" crease="faint" />
            <Dots points={JAW_ART.screws} size={0.4} tone="mid" />
          </g>
          <g ref={viewRef}>
            <Solid
              paths={view.body}
              tone="hi"
              crease="lo"
              inner={<Line d={view.seam} tone="faint" />}
            />
            <Line d={view.rules} tone="lo" free />
          </g>
          {FIXED}
          {NAT_HOUSING}
          <g ref={(node) => void (lampRefs.current[1] = node)} opacity={0.12}>
            <Dots points={[NAT_ART.lamp]} size={0.9} tone="hi" />
          </g>
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('measure')} disabled={locked}>
          Measure view
        </button>
        <button type="button" onClick={() => act('resize')} disabled={locked}>
          Resize view
        </button>
        <button type="button" onClick={() => act('swap')} disabled={locked}>
          Swap engine
        </button>
      </Controls>
    </div>
  );
}

export function JsiAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How JSI calls native code"
        hint="Tap to measure · R resize · E engine"
        readout={readouts.rest(ENGINES[0])}
        keys={[
          { label: 'The JSI reference', mark: 'lit' },
          { label: 'Native view', mark: 'raised' },
          { label: 'JavaScript engine', mark: 'edge' },
        ]}
        caption="JSI is a small C++ API between the JavaScript engine and native code. Native code exposes a HostObject and JavaScript holds a real reference to it, so a call needs no JSON and no queue, and can return a value synchronously: the pointer reads the view's width the moment the jaw closes. That is what lets Fabric read layout synchronously and TurboModules be called directly. Because JSI abstracts the engine, Hermes and JavaScriptCore plug into the same coupling."
      >
        <JsiBench />
      </Plate>
    </div>
  );
}
