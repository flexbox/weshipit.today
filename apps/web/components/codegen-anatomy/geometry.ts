import {
  boxCorners,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf } from '../anatomy/parts';
import { PLATES } from './model';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 100, r: 10, w: 250, x: -136, y: -62 };

/** Four plates in a row: the spec, then the three generated bindings. */
export const PITCH = 52;
export const PLATE_XS = PLATES.map((_, i) => -112 + i * PITCH);
const PLATE_Y = -34;
const PLATE_W = 26;
const PLATE_D = 18;
const BED: Plan = { d: 30, r: 2.5, w: 216, x: -122, y: -40 };
const BED_TOP = 4;
export const PLATE_TOP = BED_TOP + 1.6;

/** The gantry: rails along y at both ends, a beam along x riding them. */
const RAIL_XS = [BED.x - 6, BED.x + BED.w + 2];
const RAIL_TOP = 28;
export const BEAM_Z = RAIL_TOP;
const BEAM_Y = PLATE_Y + PLATE_D / 2;
export const HEAD_Z = BEAM_Z - 1;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(BED, 0, RAIL_TOP + 6),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 56, elevation: 36, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 12, r: 2, w: 44, x: 60, y: 14 },
  ruler: { d: 6, r: 1, w: 160, x: -122, y: 22 },
});

const ticks = topTicks(
  BED.x + 4,
  BED.x + BED.w - 4,
  4,
  5,
  BED.y + BED.d,
  BED_TOP,
  [-1.4, -2.8],
  P,
);

export const BED_ART = {
  body: solid(BED, 0, BED_TOP, 4, 0.8),
  rails: RAIL_XS.map((x) => ({
    post: solid({ d: 4, r: 0.6, w: 4, x, y: BED.y - 2 }, 0, RAIL_TOP, 2, 0.4),
    postFront: solid(
      { d: 4, r: 0.6, w: 4, x, y: BED.y + BED.d - 2 },
      0,
      RAIL_TOP,
      2,
      0.4,
    ),
    rail: solid(
      { d: BED.d + 2, r: 0.6, w: 4, x, y: BED.y - 2 },
      RAIL_TOP,
      2.4,
      2,
      0.3,
    ),
  })),
  seam: sideSeam(BED, 1.6, P, 4),
  ticksMajor: ticks.major,
  ticksMinor: ticks.minor,
};

export const PLATE_ART = PLATE_XS.map((x, index) => {
  const plan: Plan = {
    d: PLATE_D,
    r: 1,
    w: PLATE_W,
    x: x - PLATE_W / 2,
    y: PLATE_Y,
  };
  return {
    body: solid(plan, BED_TOP, PLATE_TOP - BED_TOP, 3, 0.3),
    border: planOutline(insetPlan(plan, 1), PLATE_TOP, P, 2),
    /** The engraving plane: u along +x, v along +y, origin at the plate's back-left corner. */
    face: topMatrix([plan.x, plan.y], PLATE_TOP, P, 'x'),
    label: sideMatrix([plan.x + 1, plan.y + plan.d], BED_TOP - 0.6, P, 'left'),
    lamp: at([plan.x + plan.w - 2.6, BED.y + BED.d, 2.2]),
    lampRing: F.circleOnY(plan.x + plan.w - 2.6, BED.y + BED.d, 2.2, 1.1, 12),
    tag: index === 0 ? 'spec' : 'binding',
  };
});

/** The beam, built at its rest y; translated along y. */
export const BEAM_ART = {
  beam: solid(
    {
      d: 5,
      r: 0.8,
      w: RAIL_XS[1] + 4 - RAIL_XS[0],
      x: RAIL_XS[0],
      y: BEAM_Y - 2.5,
    },
    BEAM_Z + 2.4,
    3,
    3,
    0.4,
  ),
  slot: lineOnTop(
    [RAIL_XS[0] + 6, BEAM_Y],
    [RAIL_XS[1] - 2, BEAM_Y],
    BEAM_Z + 5.4,
    P,
  ),
};
export const BEAM_REST_Y = BEAM_Y;

/** One tool head, built over plate 0's engraving origin; translated in x, y, z. */
export const HEAD_ART = {
  carriage: solid(
    { d: 6, r: 0.8, w: 5, x: -2.5, y: -3 },
    BEAM_Z + 5.4,
    3,
    3,
    0.4,
  ),
  spindle: solid(
    { d: 2.4, r: 0.4, w: 2.4, x: -1.2, y: -1.2 },
    PLATE_TOP + 1.2,
    BEAM_Z + 5.4 - PLATE_TOP - 1.2,
    2,
    0.2,
  ),
  tip: at([0, 0, PLATE_TOP + 0.6]),
};
export const PLATE_ORIGIN = { x: PLATE_XS[0] - PLATE_W / 2, y: PLATE_Y };
