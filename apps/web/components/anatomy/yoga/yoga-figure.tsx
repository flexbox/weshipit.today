/**
 * Yoga is a C++ layout engine shared by iOS and Android: it takes a tree of
 * nodes with style props and returns a tree of rectangles, so a layout
 * measures the same on both platforms. Layout here uses the same small
 * flexbox solver as the Flexbox figure.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  insetPlan,
  pathOf,
  planOutline,
  sideMatrix,
  slabOf,
  solidSvg,
  topMatrix,
  type Plan,
  type Point3,
} from '../kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Cable, Controls, HousingArt, Runner } from '../bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  hideRun,
  housingOf,
  routeOf,
  runAlong,
} from '../parts';
import { useScheduler } from '../sim';
import { DEFAULTS, layout, type Box, type Style } from '../flexbox/model';

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 112, r: 10, w: 250, x: -140, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 24, r: 0, w: 40, x: -60, y: -54 }, 0, 34),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 50, elevation: 38, pad: 18 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 10, r: 2, w: 38, x: 62, y: 36 },
  ruler: { d: 5, r: 1, w: 100, x: -126, y: 40 },
});

const ENGINE: Plan = { d: 24, r: 3, w: 40, x: -60, y: -54 };
const ENGINE_TOP = 30;
const CARD: Plan = { d: 22, r: 1.4, w: 42, x: -130, y: -46 };
const TRAYS: Plan[] = [
  { d: 40, r: 2, w: 52, x: -30, y: -12 },
  { d: 40, r: 2, w: 52, x: 34, y: -12 },
];
/** The solver works in a 92 × 64 box; the trays show it at half size. */
const W = 92;
const H = 64;
const K = 0.5;
const ART = {
  card: slabOf(CARD, 0, 3, P, 3, 0.4),
  cardFace: topMatrix([CARD.x + 2.4, CARD.y + 5], 3, P, 'x'),
  engine: housingOf(P, ENGINE, ENGINE_TOP),
  engineLabel: sideMatrix(
    [ENGINE.x + 4, ENGINE.y + ENGINE.d],
    ENGINE_TOP - 4,
    P,
    'left',
  ),
  gauge: slabOf({ d: 3, r: 0.6, w: 10, x: 23, y: 6 }, 0, 10, P, 2, 0.3),
  gaugeLamp: F.at([28, 9, 10]),
  trays: TRAYS.map((t) => ({
    base: slabOf(insetPlan(t, -1.5), 0, 3, P, 3, 0.5),
    floor: planOutline(t, 3, P, 2),
    label: sideMatrix([t.x, t.y + t.d + 1.5], 1.2, P, 'left'),
  })),
  vents: [0, 1, 2]
    .map((r) =>
      F.rectOnX(
        ENGINE.x + ENGINE.w,
        ENGINE.y + 4,
        ENGINE.y + ENGINE.d - 4,
        8 + r * 3,
        9.3 + r * 3,
      ),
    )
    .join(''),
};
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 4));
const CABLES = [
  route([
    [ENGINE.x + 12, ENGINE.y + ENGINE.d + 1, 2],
    [ENGINE.x + 12, -18, 1.3],
    [-4, -18, 1.3],
    [-4, -13.6, 1.3],
  ]),
  route([
    [ENGINE.x + 28, ENGINE.y + ENGINE.d + 1, 2],
    [ENGINE.x + 28, -22, 1.3],
    [60, -22, 1.3],
    [60, -13.6, 1.3],
  ]),
  route([
    [CARD.x + CARD.w, CARD.y + 11, 1.6],
    [ENGINE.x - 6, CARD.y + 11, 1.3],
    [ENGINE.x, CARD.y + 11, 2],
  ]),
];
const blockOf = (tray: number, box: Box, i: number) =>
  solidSvg(
    slabOf(
      {
        d: Math.max(1, box.h * K - 0.8),
        r: 0.8,
        w: Math.max(1, box.w * K - 0.8),
        x: TRAYS[tray].x + 3 + box.x * K + 0.4,
        y: TRAYS[tray].y + 3 + box.y * K + 0.4,
      },
      3,
      [3, 4, 2.4][i],
      P,
      3,
      0.3,
    ),
    { crease: 'lo', lit: i === 1, tone: 'hi' },
  );

const STEPS: Array<Partial<Style>> = [
  { direction: 'row' },
  { grow: true },
  { align: 'center', grow: false },
  { justify: 'space-between' },
  {},
];
const describe = (st: Style) => [
  `direction: '${st.direction}'`,
  `justify: '${st.justify}'`,
  `align: '${st.align}'`,
  st.grow ? 'flex: 1 (middle)' : '',
];

const LABEL =
  'Yoga drawn as a C++ engine housing on a bench. A style card on the left lists the layout props; a cable carries it into the engine. Two more cables run from the engine to two trays, one for iOS and one for Android. Changing the style sends the card in and pulses down both cables, and the same rectangles slide into place on both trays, block for block. A lamp on a post between the trays stays lit: the layouts match.';

export function YogaBench() {
  const sim = React.useRef({
    boxes: layout(DEFAULTS, W, H),
    pulses: [-1, -1, -1],
    step: 0,
    style: { ...DEFAULTS } as Style,
    target: { ...DEFAULTS } as Style,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const trayRefs = React.useRef<Array<SVGGElement | null>>([]);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);

  const change = () => {
    const s = sim.current;
    const step = STEPS[s.step % STEPS.length];
    s.step += 1;
    s.style = Object.keys(step).length
      ? { ...s.style, ...step }
      : { ...DEFAULTS };
    s.pulses[2] = 0;
    rerender();
    sch.later(0.6, () => {
      s.pulses[0] = 0;
      s.pulses[1] = 0;
      sch.later(0.6, () => {
        s.target = { ...s.style };
        say(
          `${s.style.direction} · ${s.style.justify} · ${s.style.align}${s.style.grow ? ' · flex: 1' : ''} → same on iOS and Android`,
        );
      });
    });
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    const goal = layout(s.target, W, H);
    let moving = false;
    s.boxes = s.boxes.map((b, i) => {
      const t = goal[i];
      const next = {
        h: follow(b.h, t.h, dt, 0.12, calm),
        w: follow(b.w, t.w, dt, 0.12, calm),
        x: follow(b.x, t.x, dt, 0.12, calm),
        y: follow(b.y, t.y, dt, 0.12, calm),
      };
      moving ||=
        next.x !== t.x || next.y !== t.y || next.w !== t.w || next.h !== t.h;
      return next;
    });
    trayRefs.current.forEach((node, tray) => {
      if (node)
        node.innerHTML = s.boxes.map((b, i) => blockOf(tray, b, i)).join('');
    });
    s.pulses = s.pulses.map((t, i) => {
      if (t < 0) {
        hideRun(runRefs.current[i], headRefs.current[i]);
        return t;
      }
      const next = calm ? 1 : t + dt / 0.6;
      if (runRefs.current[i])
        runAlong(
          runRefs.current[i]!,
          headRefs.current[i],
          Math.min(1, next),
          1,
        );
      moving = true;
      return next >= 1 ? -1 : next;
    });
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.4, () =>
      change(),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = () => {
    sch.touch();
    if (sch.pending) return;
    change();
    kick();
  };
  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);
  const s = sim.current;
  const locked = sch.busy && sch.touched;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Change the style and lay it out again."
        onClick={act}
        onKeyDown={(event) => {
          if (event.key !== ' ' && event.key !== 'Enter') return;
          event.preventDefault();
          act();
        }}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <BenchArt bench={BENCH} />
          <HousingArt art={ART.engine}>
            <Line d={ART.vents} tone="lo" />
          </HousingArt>
          <FaceText transform={ART.engineLabel} size={3} tone="mid">
            Yoga · C++
          </FaceText>
          <Solid paths={ART.card} tone="hi" crease="lo" lit />
          <g transform={ART.cardFace}>
            {describe(s.style).map((line, i) => (
              <text key={i} className="af-mono" y={i * 3.6} fontSize={2.6}>
                {line}
              </text>
            ))}
          </g>
          {CABLES.map((d, i) => (
            <g key={i}>
              <Cable d={d} />
              <Runner
                d={d}
                runRef={(node) => void (runRefs.current[i] = node)}
                headRef={(node) => void (headRefs.current[i] = node)}
              />
            </g>
          ))}
          {ART.trays.map((tray, i) => (
            <g key={i}>
              <Solid paths={tray.base} tone="mid" crease="faint" />
              <Line d={tray.floor} tone="lo" />
              <g ref={(node) => void (trayRefs.current[i] = node)} />
              <FaceText transform={tray.label} size={3} tone="mid">
                {i ? 'Android' : 'iOS'}
              </FaceText>
            </g>
          ))}
          <Solid paths={ART.gauge} tone="mid" crease="faint" />
          <circle
            className="af-head"
            cx={ART.gaugeLamp[0].toFixed(2)}
            cy={ART.gaugeLamp[1].toFixed(2)}
            r={0.9}
          />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={act} disabled={locked}>
          Change style
        </button>
      </Controls>
    </div>
  );
}

export function YogaAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="One layout engine, two platforms"
        hint="Tap to change the style"
        readout="column · flex-start · stretch → same on both"
        keys={[
          { label: 'Style in, middle view', mark: 'lit' },
          { label: 'Laid-out view', mark: 'raised' },
          { label: 'Layout on its way', mark: 'edge' },
        ]}
        caption="Yoga is the C++ layout engine behind React Native's flexbox. It knows nothing about React: it takes a tree of nodes with style props and returns a tree of rectangles, and because the same code runs on both platforms, a flex: 1 layout measures the same on an iPhone and a Pixel. It implements the subset of Flexbox apps need, with React Native's defaults: column direction, flex-start alignContent, and flex as a single number."
      >
        <YogaBench />
      </Plate>
    </div>
  );
}
