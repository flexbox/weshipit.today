import * as React from 'react';
import { solidSvg } from '../kit/iso-kit';
import { Dots, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Controls, HousingArt } from '../bench';
import {
  BENCH,
  BOX_ART,
  HEIGHT,
  INNER,
  KNOBS,
  P,
  TRAY_ART,
  WIDTH,
  childOf,
  detentAngle,
  leverKnob,
  leverOf,
  pointerOf,
} from './geometry';
import {
  ALIGN,
  CHILDREN,
  DEFAULTS,
  DIRECTIONS,
  GROWER,
  JUSTIFY,
  layout,
  styleText,
  type Box,
  type Style,
} from './model';
import { depthOf } from '../kit/iso-kit';

/* ---------- Static art ---------- */

const TRAY_BACK = (
  <g>
    <Solid
      paths={TRAY_ART.base}
      tone="mid"
      crease="faint"
      inner={<Line d={TRAY_ART.baseSeam} tone="faint" />}
    />
    <Line d={TRAY_ART.floor} tone="lo" />
    <Line d={TRAY_ART.grid} tone="faint" />
    <Solid paths={TRAY_ART.wallBack} tone="mid" crease="none" />
    <Solid paths={TRAY_ART.wallLeft} tone="mid" crease="none" />
    <Line d={TRAY_ART.backTicks} tone="lo" />
    <Line d={TRAY_ART.leftTicks} tone="lo" />
  </g>
);

const TRAY_FRONT = (
  <g>
    <Solid paths={TRAY_ART.wallRight} tone="mid" crease="none" />
    <Solid paths={TRAY_ART.wallFront} tone="mid" crease="none" />
    <Dots points={TRAY_ART.screws} size={0.4} tone="mid" />
  </g>
);

const BOX = (
  <g>
    <HousingArt art={BOX_ART}>
      <Line d={BOX_ART.vents} tone="lo" />
    </HousingArt>
    {BOX_ART.knobs.map((knob, index) => (
      <g key={index}>
        <Line d={knob.detents} tone="mid" />
        <Solid paths={knob.body} tone="mid" crease="none" />
        <Line d={knob.knurl} tone="faint" />
        <Line d={knob.cap} tone="lo" />
      </g>
    ))}
    <Solid paths={BOX_ART.leverBase} tone="mid" crease="none" />
    <Line d={BOX_ART.leverSlot} tone="lo" />
  </g>
);

/* ---------- Simulation ---------- */

const indexOf = (style: Style) => [
  DIRECTIONS.indexOf(style.direction),
  JUSTIFY.indexOf(style.justify),
  ALIGN.indexOf(style.align),
];

interface Sim {
  style: Style;
  boxes: Box[];
  idle: number;
  tour: number;
  lever: number;
  knobs: number[];
  order: number[];
  touched: boolean;
}

type Action = 'direction' | 'justify' | 'align' | 'grow' | 'reset';
const TOUR: Action[] = [
  'direction',
  'justify',
  'align',
  'grow',
  'grow',
  'justify',
  'justify',
  'direction',
  'reset',
];

const target = (style: Style) => layout(style, INNER.w, INNER.d);

const LABEL =
  'Flexbox drawn as a layout jig. A tray is the container; its floor is the layout box, gridded and ruled along two rims, with the main axis lit along one rim. Three child blocks sit inside. A control box beside it has three selector knobs, for flexDirection, justifyContent and alignItems, and a lever for flex: 1 on the middle child. Turning a knob slides the blocks to the layout a flexbox solver computes, starting from React Native’s defaults: column, flex-start, stretch.';

export function FlexboxBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      boxes: target(DEFAULTS),
      idle: 0,
      knobs: indexOf(DEFAULTS).map((k, i) => detentAngle(k, KNOBS[i].count)),
      lever: 0,
      order: [0, 1, 2],
      style: { ...DEFAULTS },
      touched: false,
      tour: 0,
    };
  const [style, setStyle] = React.useState<Style>(DEFAULTS);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const layer = React.useRef<SVGGElement>(null);
  const childRefs = React.useRef<Array<SVGGElement | null>>([]);
  const pointerRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const leverRef = React.useRef<SVGPathElement>(null);
  const leverDot = React.useRef<SVGCircleElement>(null);

  const apply = (next: Style) => {
    sim.current.style = next;
    setStyle(next);
    say(styleText(next));
  };

  const cycle = <T extends string>(list: readonly T[], value: T) =>
    list[(list.indexOf(value) + 1) % list.length];

  const actions: Record<Action, () => void> = {
    align: () =>
      apply({
        ...sim.current.style,
        align: cycle(ALIGN, sim.current.style.align),
      }),
    direction: () =>
      apply({
        ...sim.current.style,
        direction: cycle(DIRECTIONS, sim.current.style.direction),
      }),
    grow: () => apply({ ...sim.current.style, grow: !sim.current.style.grow }),
    justify: () =>
      apply({
        ...sim.current.style,
        justify: cycle(JUSTIFY, sim.current.style.justify),
      }),
    reset: () => apply({ ...DEFAULTS }),
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    let moving = false;
    const goal = target(s.style);
    s.boxes = s.boxes.map((box, index) => {
      const to = goal[index];
      const next = {
        h: follow(box.h, to.h, dt, 0.14, calm),
        w: follow(box.w, to.w, dt, 0.14, calm),
        x: follow(box.x, to.x, dt, 0.14, calm),
        y: follow(box.y, to.y, dt, 0.14, calm),
      };
      moving ||=
        next.x !== to.x ||
        next.y !== to.y ||
        next.w !== to.w ||
        next.h !== to.h;
      return next;
    });
    s.boxes.forEach((box, index) => {
      const node = childRefs.current[index];
      if (node)
        node.innerHTML = solidSvg(childOf(index, box), {
          crease: 'lo',
          lit: index === GROWER,
          tone: 'hi',
        });
    });
    // Paint the children far to near.
    const order = [0, 1, 2].sort((a, b) => {
      const da = depthOf(
        [
          INNER.x + s.boxes[a].x + s.boxes[a].w / 2,
          INNER.y + s.boxes[a].y + s.boxes[a].h / 2,
          0,
        ],
        P,
      );
      const db = depthOf(
        [
          INNER.x + s.boxes[b].x + s.boxes[b].w / 2,
          INNER.y + s.boxes[b].y + s.boxes[b].h / 2,
          0,
        ],
        P,
      );
      return da - db;
    });
    if (order.join() !== s.order.join() && layer.current) {
      s.order = order;
      order.forEach((index) => {
        const node = childRefs.current[index];
        if (node) layer.current!.appendChild(node);
      });
    }

    indexOf(s.style).forEach((k, index) => {
      const angle = detentAngle(k, KNOBS[index].count);
      s.knobs[index] = follow(s.knobs[index], angle, dt, 0.08, calm);
      moving ||= s.knobs[index] !== angle;
      pointerRefs.current[index]?.setAttribute(
        'd',
        pointerOf(index, s.knobs[index]),
      );
    });
    s.lever = follow(s.lever, s.style.grow ? 1 : 0, dt, 0.08, calm);
    moving ||= s.lever !== (s.style.grow ? 1 : 0);
    leverRef.current?.setAttribute('d', leverOf(s.lever));
    const [kx, ky] = leverKnob(s.lever);
    leverDot.current?.setAttribute('cx', kx.toFixed(2));
    leverDot.current?.setAttribute('cy', ky.toFixed(2));

    const touring = !s.touched && !calm;
    if (touring && !moving) {
      s.idle += dt;
      if (s.idle > 1.3) {
        s.idle = 0;
        actions[TOUR[s.tour % TOUR.length]]();
        s.tour += 1;
      }
    }
    return moving || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (action: Action) => {
    sim.current.touched = true;
    actions[action]();
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'direction',
      a: 'align',
      d: 'direction',
      Enter: 'direction',
      f: 'grow',
      j: 'justify',
      r: 'reset',
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

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Switch flexDirection. Press J for justifyContent, A for alignItems, F for flex: 1, R to reset."
        onClick={() => act('direction')}
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
          {TRAY_BACK}
          <Line
            d={
              style.direction === 'row' ? TRAY_ART.axisRow : TRAY_ART.axisColumn
            }
            tone="lit"
          />
          <Dots points={[TRAY_ART.axisStart]} size={0.8} tone="hi" />
          <g ref={layer}>
            {CHILDREN.map((_, index) => (
              <g
                key={index}
                ref={(node) => {
                  childRefs.current[index] = node;
                }}
                dangerouslySetInnerHTML={{
                  __html: solidSvg(childOf(index, s.boxes[index]), {
                    crease: 'lo',
                    lit: index === GROWER,
                    tone: 'hi',
                  }),
                }}
              />
            ))}
          </g>
          {TRAY_FRONT}
          {BOX}
          {KNOBS.map((_, index) => (
            <path
              key={index}
              ref={(node) => {
                pointerRefs.current[index] = node;
              }}
              className="iso-line af-pointer"
              data-tone="lit"
              d={pointerOf(index, s.knobs[index])}
            />
          ))}
          <path
            ref={leverRef}
            className="iso-line af-pointer"
            data-tone="hi"
            d={leverOf(s.lever)}
          />
          <circle
            ref={leverDot}
            className="af-head"
            cx={leverKnob(s.lever)[0]}
            cy={leverKnob(s.lever)[1]}
            r={1.3}
          />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('direction')}>
          flexDirection: {style.direction}
        </button>
        <button type="button" onClick={() => act('justify')}>
          justify: {style.justify}
        </button>
        <button type="button" onClick={() => act('align')}>
          align: {style.align}
        </button>
        <button
          type="button"
          onClick={() => act('grow')}
          aria-pressed={style.grow}
        >
          flex: 1 {style.grow ? 'on' : 'off'}
        </button>
        <button type="button" onClick={() => act('reset')}>
          Defaults
        </button>
      </Controls>
    </div>
  );
}

export function FlexboxAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How flexbox lays out a view"
        hint="Tap for direction · J justify · A align · F flex"
        readout={styleText(DEFAULTS)}
        keys={[
          { label: 'Child with flex: 1', mark: 'lit' },
          { label: 'Child view', mark: 'raised' },
          { label: 'Main axis', mark: 'edge' },
        ]}
        caption="Every React Native view is a flex container, laid out by Yoga. flexDirection picks the main axis (column by default, unlike the web's row), justifyContent distributes children along it and alignItems places them across it; stretch, the default, makes them fill the cross axis. flex: 1 tells a child to take all the remaining space along the main axis, which is why a screen's root view almost always has it."
      >
        <FlexboxBench />
      </Plate>
    </div>
  );
}
