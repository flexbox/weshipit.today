import {
  boxCorners,
  cylinder,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  ring,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  type Plan,
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, knurlOf } from '../parts';
import { SLOTS } from './model';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 96, r: 10, w: 270, x: -150, y: -60 };

/** The list rail: React's positions, one slot per row. */
const RAIL: Plan = { d: 26, r: 2.5, w: 214, x: -140, y: -40 };
const RAIL_TOP = 6;
export const PITCH = 32;
export const SLOT_X = Array.from({ length: SLOTS }, (_, i) => -122 + i * PITCH);
const CARD_W = 24;
const CARD_D = 4;
const CARD_Y = -30;
const CARD_FACE = CARD_Y + CARD_D;
const CARD_TOP = RAIL_TOP + 32;
export const DROP = 18;

/** Key-mode selector at the rail's right end. */
const SELECT_AT: [number, number] = [60, -27];
const SELECT_Z = RAIL_TOP;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(RAIL, 0, CARD_TOP + 6),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 56, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 13, r: 2, w: 46, x: 62, y: 14 },
  ruler: { d: 6, r: 1, w: 180, x: -134, y: 22 },
});

export const RAIL_ART = {
  body: solid(RAIL, 0, RAIL_TOP, 4, 0.8),
  seam: sideSeam(RAIL, 2.4, P, 4),
  slots: SLOT_X.map((x) =>
    planOutline(
      {
        d: CARD_D + 2,
        r: 0.6,
        w: CARD_W + 2,
        x: x - CARD_W / 2 - 1,
        y: CARD_Y - 1,
      },
      RAIL_TOP,
      P,
      2,
    ),
  ).join(''),
  /** Slot numbers engraved in front of each slot. */
  detents: [-0.7, 0.7]
    .map((a) =>
      lineOnTop(
        [SELECT_AT[0] + Math.sin(a) * 6.4, SELECT_AT[1] - Math.cos(a) * 6.4],
        [SELECT_AT[0] + Math.sin(a) * 8, SELECT_AT[1] - Math.cos(a) * 8],
        RAIL_TOP,
        P,
      ),
    )
    .join(''),
  numbers: SLOT_X.map((x) => topMatrix([x, CARD_FACE + 8], RAIL_TOP, P, 'x')),
  screws: [RAIL.x + 4, RAIL.x + RAIL.w - 4].flatMap((x) => [
    at([x, RAIL.y + 4, RAIL_TOP]),
    at([x, RAIL.y + RAIL.d - 4, RAIL_TOP]),
  ]),
  selector: cylinder(SELECT_AT[0], SELECT_AT[1], 5, SELECT_Z, 3, P, 32, 0.6),
  selectorKnurl: knurlOf(
    P,
    SELECT_AT[0],
    SELECT_AT[1],
    5,
    SELECT_Z,
    SELECT_Z + 3,
    30,
    0,
  ),
  selectorRing: ring(SELECT_AT[0], SELECT_AT[1], 3.4, SELECT_Z + 3, P, 24),
};

export const selectorOf = (side: number) =>
  lineOnTop(
    SELECT_AT,
    [
      SELECT_AT[0] + Math.sin(side * 0.7) * 3.2,
      SELECT_AT[1] - Math.cos(side * 0.7) * 3.2,
    ],
    SELECT_Z + 3.05,
    P,
  );

/** A row card, built at x = 0 standing in a slot; translated along x and z. */
const CARD: Plan = { d: CARD_D, r: 0.6, w: CARD_W, x: -CARD_W / 2, y: CARD_Y };
export const CARD_ART = {
  avatar: F.circleOnY(-6, CARD_FACE, CARD_TOP - 9, 3.4, 20),
  body: solid(CARD, RAIL_TOP - 2, CARD_TOP - RAIL_TOP + 2, 3, 0.4),
  label: sideMatrix([-1, CARD_FACE], CARD_TOP - 7.6, P, 'left'),
  seam: sideSeam(CARD, CARD_TOP - 3, P, 3),
  /** The text input on each row. */
  caret: F.lineOnY(CARD_FACE, 4.4, 4.4, RAIL_TOP + 7.6, RAIL_TOP + 11.4),
  field: F.rectOnY(CARD_FACE, -9.5, 9.5, RAIL_TOP + 6, RAIL_TOP + 13),
  typed: F.lineOnY(CARD_FACE, -7.5, 3, RAIL_TOP + 9.5),
};

/** The state tab: a lit clip on a card's top edge; translated along x. */
const TAB: Plan = { d: CARD_D + 3, r: 0.8, w: 10, x: -5, y: CARD_Y - 1.5 };
export const TAB_ART = {
  body: solid(TAB, CARD_TOP - 1, 4, 3, 0.4),
  grip: planOutline(insetPlan(TAB, 1.4), CARD_TOP + 3, P, 2),
};
