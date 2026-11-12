import {
  boxCorners,
  corners,
  cylinder,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  ring,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf } from '../anatomy/parts';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 104, r: 10, w: 270, x: -150, y: -72 };

/** JS engine housing, left. */
const JS: Plan = { d: 48, r: 3, w: 44, x: -142, y: -58 };
const JS_TOP = 30;
export const JS_X1 = JS.x + JS.w;
export const ENGINE_AT: [number, number] = [-124, -36];
const ENGINE_R = 9;
const ENGINE_H = 6;

/** The rod: JavaScript's reference to the native HostObject. */
export const ROD_Y = -30;
export const ROD_Z = 18;
const ROD_HALF = 1.3;
const FLANGE_X = JS_X1;
const FLANGE_W = 2.4;
export const ROD_X0 = FLANGE_X + FLANGE_W;
export const BLOCK_XS = [-62, -22];
const BLOCK_W = 8;

/** Native side: a platform carrying the view, the fixed jaw and the native housing. */
const PLATFORM: Plan = { d: 34, r: 2, w: 64, x: -2, y: -47 };
const PLATFORM_TOP = 6;
export const FIXED_X = 56;
const JAW_W = 3;
const JAW_D = 22;
export const JAW_OPEN = 12;
const NAT: Plan = { d: 50, r: 3, w: 40, x: 62, y: -60 };
const NAT_TOP = 38;

/** Collar on the rod with a pointer over a scale plate in front of it. */
export const COLLAR_X = -42;
const SCALE: Plan = { d: 5, r: 0.8, w: 34, x: -56, y: ROD_Y + 7 };
const SCALE_TOP = 9;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(NAT, 0, NAT_TOP + 2),
    ...boxCorners(JS, 0, JS_TOP + ENGINE_H + 22),
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
  label: { d: 13, r: 2, w: 50, x: 62, y: 14 },
  ruler: { d: 6, r: 1, w: 170, x: -136, y: 20 },
});

const housing = (plan: Plan, top: number) => ({
  body: solid(plan, 3, top - 3, 4, 1),
  groove: planOutline(insetPlan(plan, 2.4), top, P, 3),
  plinth: solid(insetPlan(plan, -1.5), 0, 3, 4, 0.5),
  screws: corners(plan, 4).map(([x, y]) => at([x, y, top])),
  seam: sideSeam(plan, 9, P, 4),
});

export const JS_ART = {
  ...housing(JS, JS_TOP),
  lamp: at([JS.x + 37, JS.y + JS.d, 12]),
  lampRing: F.circleOnY(JS.x + 37, JS.y + JS.d, 12, 1.6, 14),
  socket: ring(ENGINE_AT[0], ENGINE_AT[1], ENGINE_R + 1.4, JS_TOP, P, 32),
  vents: [0, 1, 2]
    .map((row) =>
      F.rectOnY(
        JS.y + JS.d,
        JS.x + 6,
        JS.x + 30,
        10 + row * 3.2,
        11.4 + row * 3.2,
      ),
    )
    .join(''),
  /** The JSI flange: a C++ plate the rod passes through. */
  flange: solid(
    { d: 18, r: 0.8, w: FLANGE_W, x: FLANGE_X, y: ROD_Y - 9 },
    ROD_Z - 9,
    18,
    3,
    0.4,
  ),
  flangeScrews: [
    [ROD_Y - 6, ROD_Z - 6],
    [ROD_Y + 6, ROD_Z - 6],
    [ROD_Y - 6, ROD_Z + 6],
    [ROD_Y + 6, ROD_Z + 6],
  ].map(([y, z]) => at([ROD_X0, y, z])),
};

/** The engine puck, built at rest in its socket. */
export const ENGINE_ART = {
  body: cylinder(
    ENGINE_AT[0],
    ENGINE_AT[1],
    ENGINE_R,
    JS_TOP,
    ENGINE_H,
    P,
    40,
    0.8,
  ),
  dish: ring(
    ENGINE_AT[0],
    ENGINE_AT[1],
    ENGINE_R - 2.2,
    JS_TOP + ENGINE_H,
    P,
    32,
  ),
  face: topMatrix(ENGINE_AT, JS_TOP + ENGINE_H, P, 'x'),
};

/** A length of square rod between two x positions. */
export const rodOf = (x0: number, x1: number) =>
  solid(
    {
      d: ROD_HALF * 2,
      r: 0.3,
      w: Math.max(0.1, x1 - x0),
      x: x0,
      y: ROD_Y - ROD_HALF,
    },
    ROD_Z - ROD_HALF,
    ROD_HALF * 2,
    2,
  );

const blockPlan = (x: number): Plan => ({
  d: 12,
  r: 0.8,
  w: BLOCK_W,
  x,
  y: ROD_Y - 6,
});

export const BLOCKS = BLOCK_XS.map((x) => ({
  block: solid(blockPlan(x), ROD_Z - 5, 10, 3, 0.6),
  bore: F.rectOnX(x + BLOCK_W, ROD_Y - 2, ROD_Y + 2, ROD_Z - 2, ROD_Z + 2),
  cap: at([x + BLOCK_W / 2, ROD_Y, ROD_Z + 5]),
  foot: solid({ d: 12, r: 1, w: 12, x: x - 2, y: ROD_Y - 6 }, 0, 1.6, 3, 0.3),
  footScrews: [at([x, ROD_Y + 4, 1.6]), at([x + BLOCK_W, ROD_Y + 4, 1.6])],
  post: solid(
    { d: 6, r: 0.6, w: 5, x: x + 1.5, y: ROD_Y - 3 },
    0,
    ROD_Z - 5,
    3,
    0.3,
  ),
  seam: sideSeam(blockPlan(x), ROD_Z, P, 3),
  x0: x,
  x1: x + BLOCK_W,
}));

/** The collar and its pointer, built at rest; they ride the rod. */
export const COLLAR_ART = {
  body: solid(
    { d: 5, r: 0.8, w: 4, x: COLLAR_X - 2, y: ROD_Y - 2.5 },
    ROD_Z - 2.5,
    5,
    3,
    0.4,
  ),
  pointer: F.lineOnY(
    ROD_Y + 2.5,
    COLLAR_X,
    COLLAR_X,
    ROD_Z - 2.5,
    SCALE_TOP + 1.2,
  ),
  tip: lineOnTop(
    [COLLAR_X, ROD_Y + 2.5],
    [COLLAR_X, SCALE.y + 2],
    SCALE_TOP + 0.1,
    P,
  ),
};

const SCALE_TICKS = topTicks(
  SCALE.x + 2,
  SCALE.x + SCALE.w - 2,
  2,
  5,
  SCALE.y + SCALE.d,
  SCALE_TOP,
  [-1.4, -2.6],
  P,
);

export const SCALE_ART = {
  major: SCALE_TICKS.major,
  minor: SCALE_TICKS.minor,
  plate: solid(SCALE, SCALE_TOP - 1.2, 1.2, 3, 0.3),
  post: solid(
    { d: 3, r: 0.4, w: 4, x: SCALE.x + SCALE.w / 2 - 2, y: SCALE.y + 1 },
    0,
    SCALE_TOP - 1.2,
    2,
  ),
};

/* ---------- Native side ---------- */

export const PLATFORM_ART = {
  body: solid(PLATFORM, 0, PLATFORM_TOP, 4, 0.8),
  rail: lineOnTop([PLATFORM.x + 4, ROD_Y], [FIXED_X, ROD_Y], PLATFORM_TOP, P),
  screws: corners(PLATFORM, 3).map(([x, y]) => at([x, y, PLATFORM_TOP])),
  seam: sideSeam(PLATFORM, 2.4, P, 4),
};

const jawPlan = (x: number): Plan => ({
  d: JAW_D,
  r: 0.6,
  w: JAW_W,
  x,
  y: ROD_Y - JAW_D / 2,
});

/** The moving jaw at the rod's end, built at x = 0; translated along x. */
export const JAW_ART = {
  body: solid(
    jawPlan(-JAW_W),
    PLATFORM_TOP + 0.4,
    ROD_Z + 8 - PLATFORM_TOP,
    3,
    0.4,
  ),
  screws: [
    at([-JAW_W / 2, ROD_Y - 7, ROD_Z + 8]),
    at([-JAW_W / 2, ROD_Y + 7, ROD_Z + 8]),
  ],
};

export const FIXED_ART = {
  body: solid(jawPlan(FIXED_X), PLATFORM_TOP, ROD_Z + 8 - PLATFORM_TOP, 3, 0.4),
  screws: [
    at([FIXED_X + JAW_W / 2, ROD_Y - 7, ROD_Z + 8]),
    at([FIXED_X + JAW_W / 2, ROD_Y + 7, ROD_Z + 8]),
  ],
};

/** The native view being measured: a block against the fixed jaw. */
export const viewOf = (width: number) => {
  const plan: Plan = {
    d: 16,
    r: 1.2,
    w: width,
    x: FIXED_X - width,
    y: ROD_Y - 8,
  };
  return {
    body: solid(plan, PLATFORM_TOP, 16, 3, 0.6),
    rules: [0, 1, 2]
      .map((row) =>
        lineOnTop(
          [plan.x + 3, plan.y + 4 + row * 3],
          [
            plan.x + 3 + (width - 6) * [0.8, 0.55, 0.7][row],
            plan.y + 4 + row * 3,
          ],
          PLATFORM_TOP + 16,
          P,
        ),
      )
      .join(''),
    seam: sideSeam(plan, PLATFORM_TOP + 4, P, 3),
  };
};

export const NAT_ART = {
  ...housing(NAT, NAT_TOP),
  bay: F.rectOnY(NAT.y + NAT.d, NAT.x + 14, NAT.x + 34, 22, 32),
  bayRules: [25, 29]
    .map((z) => F.lineOnY(NAT.y + NAT.d, NAT.x + 16, NAT.x + 26, z))
    .join(''),
  lamp: at([NAT.x + 30, NAT.y + NAT.d, 12]),
  lampRing: F.circleOnY(NAT.x + 30, NAT.y + NAT.d, 12, 1.6, 14),
  vents: [0, 1, 2, 3, 4]
    .map((row) =>
      F.rectOnX(
        NAT.x + NAT.w,
        NAT.y + 8,
        NAT.y + NAT.d - 8,
        12 + row * 3.4,
        13.4 + row * 3.4,
      ),
    )
    .join(''),
};
