import {
  corners,
  cylinder,
  depthOf,
  insetPlan,
  knurl,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  radialTicks,
  ring,
  sideArc,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
} from '../anatomy/kit/iso-kit';
import {
  BACK,
  BACK_TOP,
  BASE,
  BASE_H,
  BAY,
  CART,
  CART_HALF,
  CART_PIN_X,
  CART_TOP,
  CARD_TOP,
  DIAL_R,
  DIAL_STEPS,
  DIAL_TOP,
  DIAL_X,
  DIAL_Y,
  FEED_X0,
  FEED_X1,
  FLOOR_Z,
  FOOT_H,
  FRONT,
  FRONT_TOP,
  LIP_Z,
  P,
  PAWL,
  PAWL_TOP,
  PIN_YS,
  PLANE_TOP,
  RACK,
  RACK_TOP,
  SOCKET_TOP,
  SOCKET_XS,
  TRACK_Y0,
  TRACK_Y1,
  TRAY_X0,
  TRAY_X1,
  at,
} from './view';

const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);
const post = (
  x: number,
  y: number,
  r: number,
  z: number,
  h: number,
  steps = 20,
) => cylinder(x, y, r, z, h, P, steps);
const segment = (a: Point3, b: Point3) => pathOf([at(a), at(b)]);
const join = (paths: string[]) => paths.join('');
const byDepth = (points: Plane[]) =>
  [...points].sort(
    (a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P),
  );

/** A closed slot on a vertical face at x (spanning y) or at y (spanning x). */
function slotOnX(x: number, y0: number, y1: number, z0: number, z1: number) {
  return pathOf(
    [at([x, y0, z0]), at([x, y1, z0]), at([x, y1, z1]), at([x, y0, z1])],
    true,
  );
}

/* ---------- Bench ---------- */

const RULER: Plan = { d: 6, r: 1, w: 238, x: -152, y: 46 };
const LABEL: Plan = { d: 12, r: 2, w: 52, x: 100, y: 44 };
const TICKS = topTicks(
  RULER.x + 3,
  RULER.x + RULER.w - 3,
  4,
  5,
  RULER.y,
  0.6,
  [2, 3.6],
  P,
);

export const BENCH = {
  feet: byDepth(corners(BASE, 22)).map(([x, y]) => [
    post(x, y, 7, -BASE_H - FOOT_H, 1.6, 28),
    post(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, 28),
  ]),
  groove: planOutline(insetPlan(BASE, 5), 0, P),
  halo: solid(BASE, -BASE_H - FOOT_H, BASE_H).fill,
  label: solid(LABEL, 0, 0.8, 4),
  labelLine: planOutline(insetPlan(LABEL, 1.6), 0.8, P),
  labelRules: [0, 1, 2].map((row) =>
    lineOnTop(
      [LABEL.x + 8, LABEL.y + 3.6 + row * 2.4],
      [LABEL.x + [40, 30, 36][row], LABEL.y + 3.6 + row * 2.4],
      0.8,
      P,
    ),
  ),
  labelScrews: [
    at([LABEL.x + 3.6, LABEL.y + LABEL.d / 2, 0.8]),
    at([LABEL.x + LABEL.w - 3.6, LABEL.y + LABEL.d / 2, 0.8]),
  ],
  ruler: solid(RULER, 0, 0.6, 3),
  screwRings: join(
    corners(BASE, 10).map(([x, y]) => ring(x, y, 2.2, 0, P, 16)),
  ),
  screws: corners(BASE, 10).map(([x, y]) => at([x, y, 0])),
  slab: solid(BASE, -BASE_H, BASE_H, 8, 1.6),
  ticksMajor: TICKS.major,
  ticksMinor: TICKS.minor,
};

/* ---------- Update server rack (EAS Update) ---------- */

const RACK_FACE = RACK.y + RACK.d;
const STUB_ZS = [12, 28, 44];

export const RACK_ART = {
  cap: solid(insetPlan(RACK, -1.4), RACK_TOP, 3, 4, 0.8),
  capScrews: corners(RACK, 4).map(([x, y]) => at([x, y, RACK_TOP + 3])),
  lights: [0, 1, 2].map((index) =>
    at([RACK.x + 10 + index * 5, RACK_FACE, 62]),
  ),
  plinth: solid(insetPlan(RACK, -1.6), 0, 4, 4, 0.6),
  stubRules: join(
    STUB_ZS.map((z) =>
      lineOnTop(
        [RACK.x + 12, RACK_FACE + 1.6],
        [RACK.x + 30, RACK_FACE + 1.6],
        z + 10,
        P,
      ),
    ),
  ),
  stubs: STUB_ZS.map((z) =>
    solid(
      { d: 8, r: 1.5, w: 34, x: RACK.x + 6, y: RACK_FACE - 4 },
      z,
      10,
      4,
      0.5,
    ),
  ),
  tower: solid(RACK, 4, RACK_TOP - 4, 4, 1),
  towerSeams: sideSeam(RACK, 56, P, 4) + sideSeam(RACK, 10, P, 4),
  vents: join(
    [16, 20, 24, 28, 32, 36, 40].map((z) =>
      slotOnX(RACK.x + RACK.w, RACK.y + 8, RACK.y + 38, z, z + 1.6),
    ),
  ),
};

/* ---------- Chassis back block, backplane and module cards ---------- */

const PLANE: Plan = { d: 34, r: 2, w: 108, x: -54, y: -44 };

export const BACK_ART = {
  block: solid(BACK, 0, BACK_TOP, 6, 1.2),
  connector: solid(
    { d: 10, r: 1, w: 6, x: PLANE.x + PLANE.w - 2, y: -24 },
    BACK_TOP,
    PLANE_TOP - BACK_TOP + 3,
    3,
    0.4,
  ),
  plane: solid(PLANE, BACK_TOP, PLANE_TOP - BACK_TOP, 4, 0.5),
  screws: corners(BACK, 4).map(([x, y]) => at([x, y, BACK_TOP])),
  seam: sideSeam(BACK, 6, P, 6),
  traces: join(
    [-38, -32, -26].map((y) =>
      lineOnTop([PLANE.x, y], [PLANE.x + PLANE.w, y], PLANE_TOP, P),
    ),
  ),
  vents: join(
    [10, 14, 18, 22, 26].map((z) =>
      slotOnX(BACK.x + BACK.w, BACK.y + 8, BACK.y + 40, z, z + 1.6),
    ),
  ),
};

export const SOCKETS = SOCKET_XS.map((x) => ({
  body: solid(
    { d: 30, r: 1, w: 6, x: x - 3, y: -42 },
    PLANE_TOP,
    SOCKET_TOP - PLANE_TOP,
    3,
    0.4,
  ),
  latch: solid(
    { d: 1.6, r: 0.4, w: 3.2, x: x - 1.6, y: -12.4 },
    SOCKET_TOP,
    2,
    2,
  ),
  slot: planOutline(
    { d: 26, r: 0.8, w: 1.6, x: x - 0.8, y: -40 },
    SOCKET_TOP,
    P,
    3,
  ),
}));

/** One module card, built in its socket. */
export const CARDS = SOCKET_XS.map((x) => ({
  board: solid(
    { d: 26, r: 0.3, w: 1.8, x: x - 0.9, y: -40 },
    SOCKET_TOP - 1,
    CARD_TOP - SOCKET_TOP + 1,
    2,
  ),
  bracket: solid(
    { d: 2.4, r: 0.4, w: 3, x: x - 1.5, y: -15 },
    SOCKET_TOP - 1,
    CARD_TOP - SOCKET_TOP + 3,
    2,
    0.3,
  ),
  chip: solid(
    { d: 9, r: 0.2, w: 0.8, x: x + 0.9, y: -34 },
    SOCKET_TOP + 5,
    7,
    2,
  ),
  led: at([x, -13.8, CARD_TOP + 2]),
}));

/* ---------- Track: bay floor, tray and feed rails ---------- */

const rail = (x0: number, x1: number) => ({
  back: solid(
    { d: 3, r: 0.6, w: x1 - x0, x: x0, y: TRACK_Y0 - 3 },
    0,
    LIP_Z,
    2,
    0.4,
  ),
  floor: solid(
    { d: TRACK_Y1 - TRACK_Y0, r: 0, w: x1 - x0, x: x0, y: TRACK_Y0 },
    0,
    FLOOR_Z,
    2,
  ),
  front: solid(
    { d: 3, r: 0.6, w: x1 - x0, x: x0, y: TRACK_Y1 },
    0,
    LIP_Z,
    2,
    0.4,
  ),
  groove: lineOnTop(
    [x0, (TRACK_Y0 + TRACK_Y1) / 2],
    [x1, (TRACK_Y0 + TRACK_Y1) / 2],
    FLOOR_Z,
    P,
  ),
  screws: [x0 + 6, (x0 + x1) / 2, x1 - 6].map((x) =>
    at([x, TRACK_Y1 + 1.5, LIP_Z]),
  ),
});

export const TRAY = rail(TRAY_X0, TRAY_X1);
export const FEED = rail(FEED_X0, FEED_X1);

export const STOPS = {
  bumper: solid({ d: 8, r: 0.6, w: 2, x: FEED_X1 - 2, y: 6 }, FLOOR_Z, 6, 2),
  left: solid(
    {
      d: TRACK_Y1 - TRACK_Y0 + 6,
      r: 0.8,
      w: 3,
      x: TRAY_X0 - 3,
      y: TRACK_Y0 - 3,
    },
    0,
    16,
    3,
    0.4,
  ),
  leftScrews: [
    at([TRAY_X0 - 1.5, TRACK_Y0 + 2, 16]),
    at([TRAY_X0 - 1.5, TRACK_Y1 - 2, 16]),
  ],
  right: solid(
    { d: TRACK_Y1 - TRACK_Y0 + 6, r: 0.8, w: 3, x: FEED_X1, y: TRACK_Y0 - 3 },
    0,
    16,
    3,
    0.4,
  ),
  rightScrews: [
    at([FEED_X1 + 1.5, TRACK_Y0 + 2, 16]),
    at([FEED_X1 + 1.5, TRACK_Y1 - 2, 16]),
  ],
};

export const BAY_ART = {
  floor: solid(BAY, 0, FLOOR_Z, 2),
  grooves: join(
    [TRACK_Y0 + 0.6, TRACK_Y1 - 0.6].map((y) =>
      lineOnTop([BAY.x, y], [BAY.x + BAY.w, y], FLOOR_Z, P),
    ),
  ),
  pawlSlot: planOutline(insetPlan(PAWL, -0.6), FLOOR_Z, P, 2),
};

/* ---------- Pawl (the runtime key on the binary) ---------- */

export const PAWL_ART = {
  body: solid(PAWL, FLOOR_Z, PAWL_TOP - FLOOR_Z, 2, 0.4),
  seam: sideSeam(PAWL, PAWL_TOP - 4, P, 2),
  /** Everything above the bay floor, so the pawl vanishes into its slot. */
  clip: solid(insetPlan(PAWL, -1), FLOOR_Z, 80, 2).fill,
};

export const pinsOf = (x: number, base: number, key: number[]) =>
  key.map((height, index) => ({
    body: post(x, PIN_YS[index], 1.5, base, height, 18),
    cap: at([x, PIN_YS[index], base + height]),
  }));

/* ---------- Cartridge (the JS bundle) ---------- */

const LABEL_RECESS: Plan = { d: 13, r: 1.2, w: 19, x: -5, y: 3.5 };

export const CART_ART = {
  body: solid(CART, FLOOR_Z, CART_TOP - FLOOR_Z, 4, 0.8),
  grips: join(
    [6, 10, 14].map((y) =>
      segment([CART_HALF, y, FLOOR_Z + 0.2], [CART_HALF, y, CART_TOP - 0.2]),
    ),
  ),
  pinBed: planOutline(
    { d: 15.2, r: 1.4, w: 5.2, x: CART_PIN_X - 2.6, y: 2.4 },
    CART_TOP,
    P,
    3,
  ),
  recess: planOutline(LABEL_RECESS, CART_TOP, P, 3),
  rules: [0, 1, 2].map((row) =>
    lineOnTop(
      [LABEL_RECESS.x + 3, LABEL_RECESS.y + 3.4 + row * 3],
      [LABEL_RECESS.x + [15, 11, 13][row], LABEL_RECESS.y + 3.4 + row * 3],
      CART_TOP,
      P,
    ),
  ),
  seam: sideSeam(CART, FLOOR_Z + 5, P, 4),
  shadow: solid(insetPlan(CART, 2), FLOOR_Z, 0.1).fill,
};

/* ---------- Chassis front block: vents, label, dial, lamps ---------- */

const DIAL_TICKS = radialTicks(
  DIAL_X,
  DIAL_Y,
  DIAL_R - 1.6,
  DIAL_STEPS,
  5,
  DIAL_TOP,
  [0.9, 1.8],
  P,
);

export const FRONT_ART = {
  block: solid(FRONT, 0, FRONT_TOP, 6, 1.2),
  dialBand: sideArc(DIAL_X, DIAL_Y, DIAL_R, FRONT_TOP + 1, P, 32),
  dialBezel: ring(DIAL_X, DIAL_Y, DIAL_R - 0.9, DIAL_TOP, P, 48),
  dialHub: at([DIAL_X, DIAL_Y, DIAL_TOP]),
  dialKnurl: knurl(DIAL_X, DIAL_Y, DIAL_R, FRONT_TOP, DIAL_TOP, 40, P, 0.3),
  dialMajor: DIAL_TICKS.major,
  dialMinor: DIAL_TICKS.minor,
  dialPuck: post(DIAL_X, DIAL_Y, DIAL_R, FRONT_TOP, 3, 48),
  label: topMatrix([-24, 33.2], FRONT_TOP, P, 'x'),
  lampDots: [38, 45].map((x) => at([x, 31, FRONT_TOP + 1])),
  lampRings: join([38, 45].map((x) => ring(x, 31, 2.6, FRONT_TOP, P, 16))),
  lamps: [38, 45].map((x) => post(x, 31, 1.7, FRONT_TOP, 1, 16)),
  screws: corners(FRONT, 3.2).map(([x, y]) => at([x, y, FRONT_TOP])),
  seam: sideSeam(FRONT, 4, P, 6),
  vents: join(
    [0, 1, 2, 3, 4].map((index) =>
      planOutline(
        { d: 10, r: 1.2, w: 2.4, x: -55 + index * 5, y: 26 },
        FRONT_TOP,
        P,
        3,
      ),
    ),
  ),
};

/** The dial needle, pointing at a build count. */
export function needleOf(builds: number) {
  const angle = (builds / DIAL_STEPS) * Math.PI * 2;
  const ux = Math.sin(angle);
  const uy = -Math.cos(angle);
  const point = (along: number, across: number): Flat =>
    at([
      DIAL_X + ux * along - uy * across,
      DIAL_Y + uy * along + ux * across,
      DIAL_TOP + 0.1,
    ]);
  return pathOf(
    [
      point(DIAL_R - 2.2, 0),
      point(0, 0.55),
      point(-1.8, 0.3),
      point(-1.8, -0.3),
      point(0, -0.55),
    ],
    true,
  );
}
