import {
  boxCorners,
  cylinder,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  ring,
  sideSeam,
  slabOf,
  topTicks,
  type Plan,
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, housingOf, knurlOf } from '../parts';
import { ALIGN, DIRECTIONS, JUSTIFY } from './model';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 94, r: 10, w: 190, x: -128, y: -58 };

/** The container: a tray whose inner floor is the layout box. */
const TRAY: Plan = { d: 68, r: 2.5, w: 96, x: -112, y: -46 };
const WALL = 2;
export const INNER = insetPlan(TRAY, WALL);
export const FLOOR_Z = 3;
const WALL_TOP = 7;
export const CHILD_H = [8, 11, 6];

/** Control box with three selector knobs and a flex lever. */
const BOX: Plan = { d: 52, r: 3, w: 46, x: 2, y: -40 };
const BOX_TOP = 12;
export const KNOBS = [
  { at: [16, -28] as [number, number], count: DIRECTIONS.length },
  { at: [16, -12] as [number, number], count: JUSTIFY.length },
  { at: [16, 4] as [number, number], count: ALIGN.length },
];
const KNOB_R = 4.6;
const KNOB_H = 4;
export const LEVER_AT: [number, number] = [36, -12];

export const P = fitProjection(
  [...boxCorners(BASE, -BASE_H - FOOT_H, 0), ...boxCorners(TRAY, 0, 22)],
  WIDTH,
  HEIGHT,
  { azimuth: 48, elevation: 42, pad: 20 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 8, y: 20 },
  ruler: { d: 6, r: 1, w: 100, x: -112, y: 28 },
});

const backTicks = topTicks(
  INNER.x + 2,
  INNER.x + INNER.w - 2,
  4,
  5,
  TRAY.y,
  WALL_TOP,
  [1.2, 2],
  P,
);
const leftTicks = topTicks(
  INNER.y + 2,
  INNER.y + INNER.d - 2,
  4,
  5,
  TRAY.x,
  WALL_TOP,
  [1.2, 2],
  P,
  'y',
);

export const TRAY_ART = {
  base: solid(insetPlan(TRAY, -2), 0, FLOOR_Z, 4, 0.6),
  baseSeam: sideSeam(insetPlan(TRAY, -2), 1.4, P, 4),
  floor: planOutline(INNER, FLOOR_Z, P, 3),
  /** A faint layout grid on the floor, every 8 units. */
  backTicks: backTicks.minor + backTicks.major,
  grid: [
    ...Array.from({ length: 11 }, (_, i) =>
      lineOnTop(
        [INNER.x + 8 * (i + 1), INNER.y],
        [INNER.x + 8 * (i + 1), INNER.y + INNER.d],
        FLOOR_Z,
        P,
      ),
    ),
    ...Array.from({ length: 7 }, (_, i) =>
      lineOnTop(
        [INNER.x, INNER.y + 8 * (i + 1)],
        [INNER.x + INNER.w, INNER.y + 8 * (i + 1)],
        FLOOR_Z,
        P,
      ),
    ),
  ].join(''),
  leftTicks: leftTicks.minor + leftTicks.major,
  wallBack: solid(
    { d: WALL, r: 0.6, w: TRAY.w, x: TRAY.x, y: TRAY.y },
    FLOOR_Z,
    WALL_TOP - FLOOR_Z,
    2,
    0.3,
  ),
  wallFront: solid(
    { d: WALL, r: 0.6, w: TRAY.w, x: TRAY.x, y: TRAY.y + TRAY.d - WALL },
    FLOOR_Z,
    WALL_TOP - FLOOR_Z,
    2,
    0.3,
  ),
  wallLeft: solid(
    { d: TRAY.d, r: 0.6, w: WALL, x: TRAY.x, y: TRAY.y },
    FLOOR_Z,
    WALL_TOP - FLOOR_Z,
    2,
    0.3,
  ),
  wallRight: solid(
    { d: TRAY.d, r: 0.6, w: WALL, x: TRAY.x + TRAY.w - WALL, y: TRAY.y },
    FLOOR_Z,
    WALL_TOP - FLOOR_Z,
    2,
    0.3,
  ),
  /** The main axis, lit along the rim it runs beside. */
  axisColumn: lineOnTop(
    [TRAY.x + WALL / 2, INNER.y],
    [TRAY.x + WALL / 2, INNER.y + INNER.d],
    WALL_TOP,
    P,
  ),
  axisRow: lineOnTop(
    [INNER.x, TRAY.y + WALL / 2],
    [INNER.x + INNER.w, TRAY.y + WALL / 2],
    WALL_TOP,
    P,
  ),
  axisStart: at([TRAY.x + WALL / 2, TRAY.y + WALL / 2, WALL_TOP]),
  screws: [
    [TRAY.x + 1, TRAY.y + TRAY.d - 1],
    [TRAY.x + TRAY.w - 1, TRAY.y + TRAY.d - 1],
    [TRAY.x + TRAY.w - 1, TRAY.y + 1],
  ].map(([x, y]) => at([x, y, WALL_TOP])),
};

export const BOX_ART = {
  ...housingOf(P, BOX, BOX_TOP),
  knobs: KNOBS.map(({ at: [x, y], count }) => ({
    body: cylinder(x, y, KNOB_R, BOX_TOP, KNOB_H, P, 32, 0.6),
    cap: ring(x, y, KNOB_R - 1.6, BOX_TOP + KNOB_H, P, 24),
    detents: Array.from({ length: count }, (_, k) => {
      const a = detentAngle(k, count);
      return lineOnTop(
        [x + Math.sin(a) * (KNOB_R + 1.2), y - Math.cos(a) * (KNOB_R + 1.2)],
        [x + Math.sin(a) * (KNOB_R + 2.6), y - Math.cos(a) * (KNOB_R + 2.6)],
        BOX_TOP,
        P,
      );
    }).join(''),
    knurl: knurlOf(P, x, y, KNOB_R, BOX_TOP, BOX_TOP + KNOB_H, 30, 0),
  })),
  leverBase: solid(
    { d: 10, r: 1.2, w: 6, x: LEVER_AT[0] - 3, y: LEVER_AT[1] - 5 },
    BOX_TOP,
    2,
    3,
    0.4,
  ),
  leverSlot: lineOnTop(
    [LEVER_AT[0], LEVER_AT[1] - 3.6],
    [LEVER_AT[0], LEVER_AT[1] + 3.6],
    BOX_TOP + 2,
    P,
  ),
  vents: [0, 1]
    .map((row) =>
      F.rectOnX(
        BOX.x + BOX.w,
        BOX.y + 8,
        BOX.y + BOX.d - 8,
        5 + row * 2.6,
        6.2 + row * 2.6,
      ),
    )
    .join(''),
};

/** Detents spread over 120° for a knob with `count` positions. */
export function detentAngle(k: number, count: number) {
  return ((-60 + (120 * k) / Math.max(1, count - 1)) * Math.PI) / 180;
}

/** Knob pointer at angle a. */
export const pointerOf = (index: number, angle: number) => {
  const [x, y] = KNOBS[index].at;
  return lineOnTop(
    [x, y],
    [
      x + Math.sin(angle) * (KNOB_R - 0.8),
      y - Math.cos(angle) * (KNOB_R - 0.8),
    ],
    BOX_TOP + KNOB_H + 0.05,
    P,
  );
};

/** The flex lever: a post tilted back (off) or forward (flex: 1). */
export const leverOf = (t: number) => {
  const [x, y] = LEVER_AT;
  const a = at([x, y, BOX_TOP + 2]);
  const b = at([x, y - 3 + 6 * t, BOX_TOP + 9]);
  return `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}`;
};
export const leverKnob = (t: number) =>
  at([LEVER_AT[0], LEVER_AT[1] - 3 + 6 * t, BOX_TOP + 9]);

/** A child view as a solid for a layout box (layout x → world x, layout y → world y). */
export const childOf = (
  index: number,
  box: { x: number; y: number; w: number; h: number },
) => {
  const plan: Plan = {
    d: Math.max(1, box.h - 1),
    r: 1.2,
    w: Math.max(1, box.w - 1),
    x: INNER.x + box.x + 0.5,
    y: INNER.y + box.y + 0.5,
  };
  return slabOf(plan, FLOOR_Z, CHILD_H[index], P, 3, 0.6);
};
