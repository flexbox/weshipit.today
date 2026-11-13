/**
 * Legacy vs New Architecture: the legacy architecture sent everything over
 * an async JSON bridge, rendered with Paper, loaded native modules eagerly
 * and had hand-written bindings. The New Architecture uses JSI, Fabric,
 * TurboModules and Codegen, with Yoga integrated in C++. It is the default
 * since React Native 0.76 (October 2024); 0.80 began winding down legacy.
 */
import * as React from 'react';
import {
  boxCorners,
  cylinder,
  fitProjection,
  lineOnTop,
  sideMatrix,
  slabOf,
  topMatrix,
  topTicks,
  translateAlong,
  type Plan,
} from '../kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Controls, HousingArt } from '../bench';
import { BASE_H, FOOT_H, benchOf, facesOf, housingOf } from '../parts';
import { useScheduler } from '../sim';

const BAYS = [
  { label: 'JS ↔ native', legacy: 'Bridge', next: 'JSI' },
  { label: 'Renderer', legacy: 'Paper', next: 'Fabric' },
  { label: 'Modules', legacy: 'Eager', next: 'Turbo' },
  { label: 'Types', legacy: 'By hand', next: 'Codegen' },
  { label: 'Layout', legacy: 'Yoga', next: 'Yoga' },
] as const;
const VERSIONS = [0.68, 0.72, 0.76, 0.8];

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 100, r: 10, w: 250, x: -134, y: -60 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 30, r: 0, w: 160, x: -120, y: -48 }, 0, 44),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 58, pad: 18 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 60, y: 26 },
  ruler: { d: 5, r: 1, w: 80, x: -120, y: 32 },
});

const CAB: Plan = { d: 30, r: 3, w: 166, x: -124, y: -48 };
const CAB_TOP = 12;
const BAY_X = (i: number) => CAB.x + 6 + i * 32;
const CARD: Plan = { d: 4, r: 0.6, w: 26, x: 0, y: CAB.y + 12 };
const CARD_H = 24;
const LEVER_AT: [number, number] = [70, -32];
const SCALE: Plan = { d: 6, r: 1, w: 100, x: -60, y: -6 };
const scaleX = (v: number) =>
  SCALE.x + 6 + ((v - 0.68) / 0.12) * (SCALE.w - 12);
const ticks = topTicks(
  SCALE.x + 6,
  SCALE.x + SCALE.w - 6,
  (SCALE.w - 12) / 12,
  3,
  SCALE.y,
  1.2,
  [1.4, 2.6],
  P,
);
const ART = {
  bayLabels: BAYS.map((_, i) =>
    sideMatrix([BAY_X(i), CAB.y + CAB.d], 5, P, 'left'),
  ),
  cab: housingOf(P, CAB, CAB_TOP),
  card: slabOf(CARD, CAB_TOP - 2, CARD_H, P, 3, 0.4),
  cardFace: sideMatrix([2, CARD.y + CARD.d], CAB_TOP + CARD_H - 6, P, 'left'),
  knob: cylinder(0, 0, 2.6, 0, 2, P, 20, 0.4),
  lever: housingOf(
    P,
    { d: 16, r: 2, w: 16, x: LEVER_AT[0] - 8, y: LEVER_AT[1] - 8 },
    8,
  ),
  pivot: F.at([LEVER_AT[0], LEVER_AT[1], 8]),
  scale: slabOf(SCALE, 0, 1.2, P, 3, 0.3),
  scaleLabels: VERSIONS.map((v) =>
    topMatrix([scaleX(v) - 2.4, SCALE.y + 5.6], 1.2, P, 'x'),
  ),
  scaleMajor: ticks.major,
  scaleMinor: ticks.minor,
  slots: BAYS.map((_, i) =>
    F.rectOnY(CAB.y + 10, BAY_X(i), BAY_X(i) + 26, CAB_TOP, CAB_TOP),
  ),
  slotTops: BAYS.map((_, i) =>
    lineOnTop(
      [BAY_X(i) - 1, CAB.y + 11],
      [BAY_X(i) + 27, CAB.y + 11],
      CAB_TOP,
      P,
    ),
  ).join(''),
};
const leverOf = (t: number) => {
  const a = -0.7 + 1.4 * t;
  const tip = F.at([
    LEVER_AT[0],
    LEVER_AT[1] + Math.sin(a) * 18,
    8 + Math.cos(a) * 18,
  ]);
  return {
    d: `M${ART.pivot[0].toFixed(2)} ${ART.pivot[1].toFixed(2)}L${tip[0].toFixed(2)} ${tip[1].toFixed(2)}`,
    tip,
  };
};
const pointerOf = (x: number) =>
  lineOnTop([x, SCALE.y - 1], [x, SCALE.y + 3], 1.25, P);

const LABEL =
  'The two architectures drawn as a cabinet of five bays, each holding a card, with a lever on the right and a version scale in front. With the lever back, the cards read Bridge, Paper, Eager, By hand and Yoga: an async JSON bridge, the Paper renderer, native modules loaded at startup, hand-written bindings, and Yoga for layout. Throwing the lever swaps the first four cards one after another for JSI, Fabric, Turbo and Codegen, while the Yoga card stays, and the pointer on the scale moves to 0.76, the release that made the New Architecture the default.';

export function ArchitectureBench() {
  const sim = React.useRef({
    cards: BAYS.map(() => ({
      lift: 0,
      shown: 'legacy' as 'legacy' | 'next',
      target: 0,
    })),
    lever: 0,
    mode: 'legacy' as 'legacy' | 'next',
    pointer: scaleX(0.72),
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const cardRefs = React.useRef<Array<SVGGElement | null>>([]);
  const leverRef = React.useRef<SVGPathElement>(null);
  const knobRef = React.useRef<SVGCircleElement>(null);
  const pointerRef = React.useRef<SVGPathElement>(null);

  const flip = () => {
    const s = sim.current;
    s.mode = s.mode === 'legacy' ? 'next' : 'legacy';
    rerender();
    BAYS.forEach((bay, i) => {
      if (bay.legacy === bay.next) return;
      sch.later(0.2 + i * 0.35, () => {
        s.cards[i].target = 1;
        sch.later(0.3, () => {
          s.cards[i].shown = s.mode;
          s.cards[i].target = 0;
          rerender();
        });
      });
    });
    sch.later(0.2 + 4 * 0.35 + 0.3, () =>
      say(
        s.mode === 'next'
          ? `New Architecture · default since React Native 0.76`
          : `legacy: bridge, Paper, eager modules`,
      ),
    );
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.cards.forEach((card, i) => {
      card.lift = follow(card.lift, card.target, dt, 0.08, calm);
      moving ||= card.lift !== card.target;
      cardRefs.current[i]?.setAttribute(
        'transform',
        translateAlong(P, [BAY_X(i), 0, 18 * card.lift]),
      );
      cardRefs.current[i]?.setAttribute(
        'opacity',
        (1 - 0.8 * card.lift).toFixed(3),
      );
    });
    const goal = s.mode === 'next' ? 1 : 0;
    s.lever = follow(s.lever, goal, dt, 0.1, calm);
    const lever = leverOf(s.lever);
    leverRef.current?.setAttribute('d', lever.d);
    knobRef.current?.setAttribute('cx', lever.tip[0].toFixed(2));
    knobRef.current?.setAttribute('cy', lever.tip[1].toFixed(2));
    const px = scaleX(s.mode === 'next' ? 0.76 : 0.72);
    s.pointer = follow(s.pointer, px, dt, 0.2, calm);
    pointerRef.current?.setAttribute('d', pointerOf(s.pointer));
    moving ||= s.lever !== goal || s.pointer !== px;
    const touring = sch.tourStep(dt, !moving && !pending, calm, 2.2, () =>
      flip(),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = () => {
    sch.touch();
    if (sch.pending) return;
    flip();
    kick();
  };
  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);
  const s = sim.current;
  const locked = sch.busy && sch.touched;
  const lever = leverOf(s.lever);

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Throw the lever between the legacy and the New Architecture."
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
          <HousingArt art={ART.cab}>
            <Line d={ART.slotTops} tone="lo" />
          </HousingArt>
          {BAYS.map((bay, i) => (
            <g key={i}>
              <g
                ref={(node) => void (cardRefs.current[i] = node)}
                transform={translateAlong(P, [BAY_X(i), 0, 0])}
              >
                <Solid
                  paths={ART.card}
                  tone="hi"
                  crease="lo"
                  lit={s.cards[i].shown === 'next' && bay.legacy !== bay.next}
                />
                <g transform={ART.cardFace}>
                  <text className="af-mono" fontSize={3.4} y={1.2}>
                    {s.cards[i].shown === 'next' ? bay.next : bay.legacy}
                  </text>
                </g>
              </g>
              <FaceText transform={ART.bayLabels[i]} size={2.4} tone="lo">
                {bay.label}
              </FaceText>
            </g>
          ))}
          <HousingArt art={ART.lever} />
          <path
            ref={leverRef}
            className="iso-line ra-arm"
            data-tone="hi"
            d={lever.d}
          />
          <circle
            ref={knobRef}
            className="af-head"
            cx={lever.tip[0].toFixed(2)}
            cy={lever.tip[1].toFixed(2)}
            r={2}
          />
          <Dots points={[ART.pivot]} size={0.8} tone="mid" />
          <Solid paths={ART.scale} tone="lo" crease="none" />
          <Line d={ART.scaleMinor} tone="lo" />
          <Line d={ART.scaleMajor} tone="mid" />
          {VERSIONS.map((v, i) => (
            <FaceText
              key={v}
              transform={ART.scaleLabels[i]}
              size={2.2}
              tone={v === 0.76 ? 'hi' : 'lo'}
            >
              {v.toFixed(2)}
            </FaceText>
          ))}
          <path
            ref={pointerRef}
            className="iso-line af-pointer"
            data-tone="lit"
            d={pointerOf(s.pointer)}
          />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={act} disabled={locked}>
          {s.mode === 'legacy'
            ? 'Switch to the New Architecture'
            : 'Back to legacy'}
        </button>
      </Controls>
    </div>
  );
}

export function ArchitectureAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Two architectures, part by part"
        hint="Tap to throw the lever"
        readout="legacy: bridge, Paper, eager modules"
        keys={[
          { label: 'New Architecture part', mark: 'lit' },
          { label: 'Legacy part', mark: 'raised' },
          { label: 'Release that made it default', mark: 'edge' },
        ]}
        caption="The legacy architecture sent every instruction between JavaScript and native code as JSON over an async bridge, rendered with Paper, loaded every native module at startup and relied on hand-written bindings. The New Architecture replaces those with JSI (direct, synchronous calls), Fabric, TurboModules loaded on demand and Codegen-typed bindings; Yoga lays out both, now integrated in C++. It became the default in React Native 0.76 in October 2024, and 0.80 began winding legacy support down: tutorials from before late 2024 may describe bridge behaviour that no longer applies."
      >
        <ArchitectureBench />
      </Plate>
    </div>
  );
}
