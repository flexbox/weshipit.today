import {
  boxCorners,
  cylinder,
  fitProjection,
  lineOnTop,
  planOutline,
  ring,
  sideSeam,
  slabOf,
  topMatrix,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, phoneOf } from '../anatomy/parts';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 104, r: 10, w: 236, x: -132, y: -62 };

/** The tab plate with one spindle per tab. */
const PLATE: Plan = { d: 44, r: 3, w: 116, x: -122, y: -44 };
const PLATE_TOP = 4;
export const SPINDLE_X = [-102, -64, -26];
const SPINDLE_Y = -26;
const POST_TOP = PLATE_TOP + 22;
export const CARD_H = 2.2;
export const CARD_Z0 = PLATE_TOP + 2;
const CARD: Plan = { d: 16, r: 1.4, w: 24, x: -12, y: SPINDLE_Y - 8 };
const HUB: [number, number] = [-64, -6];

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 40, x: 24, y: -50 }, 0, 80),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 52, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 13, r: 2, w: 44, x: 46, y: 22 },
  ruler: { d: 6, r: 1, w: 120, x: -118, y: 28 },
});

export const PHONE_ART = phoneOf(P, { sh: 60, sw: 32, x: 24, y: -48 });

export const PLATE_ART = {
  baseRings: SPINDLE_X.map((x) => ring(x, SPINDLE_Y, 7, PLATE_TOP + 2, P, 32)),
  bases: SPINDLE_X.map((x) =>
    cylinder(x, SPINDLE_Y, 9, PLATE_TOP, 2, P, 36, 0.4),
  ),
  body: solid(PLATE, 0, PLATE_TOP, 4, 0.8),
  caps: SPINDLE_X.map((x) => at([x, SPINDLE_Y, POST_TOP])),
  posts: SPINDLE_X.map((x) =>
    cylinder(x, SPINDLE_Y, 1.3, PLATE_TOP + 2, POST_TOP - PLATE_TOP - 2, P, 16),
  ),
  screws: [
    [PLATE.x + 3, PLATE.y + 3],
    [PLATE.x + PLATE.w - 3, PLATE.y + 3],
    [PLATE.x + 3, PLATE.y + PLATE.d - 3],
    [PLATE.x + PLATE.w - 3, PLATE.y + PLATE.d - 3],
  ].map(([x, y]) => at([x, y, PLATE_TOP])),
  seam: sideSeam(PLATE, 1.8, P, 4),
  /** Tab names engraved in front of each spindle. */
  detents: SPINDLE_X.map((x) => {
    const a = Math.atan2(x - HUB[0], -(SPINDLE_Y - HUB[1]));
    return lineOnTop(
      [HUB[0] + Math.sin(a) * 5, HUB[1] - Math.cos(a) * 5],
      [HUB[0] + Math.sin(a) * 6.6, HUB[1] - Math.cos(a) * 6.6],
      PLATE_TOP,
      P,
    );
  }).join(''),
  hub: cylinder(HUB[0], HUB[1], 3.4, PLATE_TOP, 2.4, P, 28, 0.4),
  hubCap: at([HUB[0], HUB[1], PLATE_TOP + 2.4]),
  names: SPINDLE_X.map((x) =>
    topMatrix([x, SPINDLE_Y + 15], PLATE_TOP, P, 'x'),
  ),
};

/** The selector arm pointing from the hub at spindle `tab` (fractional while moving). */
export const armOf = (tab: number) => {
  const x = -102 + tab * 38;
  const a = Math.atan2(x - HUB[0], -(SPINDLE_Y - HUB[1]));
  return lineOnTop(
    HUB,
    [HUB[0] + Math.sin(a) * 4.6, HUB[1] - Math.cos(a) * 4.6],
    PLATE_TOP + 2.45,
    P,
  );
};

/** A screen card, built at x = 0 and z = 0 on a spindle; translated. */
export const CARD_ART = {
  body: solid(CARD, CARD_Z0, CARD_H, 3, 0.3),
  header: planOutline(
    { d: 2.2, r: 0.4, w: CARD.w - 4, x: CARD.x + 2, y: CARD.y + CARD.d - 3.6 },
    CARD_Z0 + CARD_H,
    P,
    1,
  ),
  hole: ring(0, SPINDLE_Y, 1.8, CARD_Z0 + CARD_H, P, 14),
  rules: [0, 1, 2]
    .map((row) =>
      lineOnTop(
        [CARD.x + 3, CARD.y + 3 + row * 2.4],
        [CARD.x + 3 + [7, 5, 6][row], CARD.y + 3 + row * 2.4],
        CARD_Z0 + CARD_H,
        P,
      ),
    )
    .join(''),
};

/** The upper part of a post, from height z to its cap. */
export const postAbove = (tab: number, z: number) =>
  cylinder(
    SPINDLE_X[tab],
    SPINDLE_Y,
    1.3,
    z,
    Math.max(0.1, POST_TOP - z),
    P,
    16,
  );
