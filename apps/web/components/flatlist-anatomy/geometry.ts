import {
  boxCorners,
  cylinder,
  fitProjection,
  lineOnTop,
  planOutline,
  ring,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, housingOf } from '../anatomy/parts';

export const WIDTH = 640;
export const HEIGHT = 340;

const BASE: Plan = { d: 96, r: 10, w: 292, x: -152, y: -58 };

/** The data rail along x: every row of the list has a place on it. */
export const RAIL_X0 = -140;
export const RAIL_X1 = 128;
const RAIL: Plan = { d: 26, r: 2, w: RAIL_X1 - RAIL_X0, x: RAIL_X0, y: -20 };
const RAIL_TOP = 5;
export const ROW = 12;

/** The viewport frame: rows under it are on screen. */
export const VIEW_X0 = -14;
export const VIEW_X1 = VIEW_X0 + ROW * 4;
/** Render window: viewport plus a buffer each side. */
export const BUFFER = ROW * 1.5;
const POST_W = 4;
const FRAME_TOP = 32;

/** A row block, built at x = 0. */
const BLOCK: Plan = { d: 20, r: 1, w: ROW - 2, x: 1, y: RAIL.y + 3 };
const BLOCK_H = 6;

/** Gauge housing for mounted views, front right. */
const GAUGE: Plan = { d: 16, r: 2.5, w: 30, x: 88, y: 12 };
const GAUGE_TOP = 26;

/** Scroll wheel at the rail's left end. */
export const WHEEL = {
  r: 7,
  x: -126,
  y: RAIL.y + RAIL.d / 2,
  z0: RAIL_TOP,
  z1: RAIL_TOP + 7,
};

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(
      { d: 40, r: 0, w: VIEW_X1 - VIEW_X0, x: VIEW_X0, y: -24 },
      0,
      FRAME_TOP + 3,
    ),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 50, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 13, r: 2, w: 44, x: 30, y: 16 },
  ruler: { d: 6, r: 1, w: 150, x: -138, y: 22 },
});

const ticks = topTicks(
  RAIL_X0 + 18,
  RAIL_X1 - 3,
  ROW / 3,
  3,
  RAIL.y + RAIL.d,
  RAIL_TOP,
  [-1.4, -2.8],
  P,
);

export const RAIL_ART = {
  body: solid(RAIL, 0, RAIL_TOP, 4, 0.6),
  groove: planOutline(
    { d: RAIL.d - 6, r: 1, w: RAIL.w - 24, x: RAIL.x + 20, y: RAIL.y + 3 },
    RAIL_TOP,
    P,
    2,
  ),
  seam: sideSeam(RAIL, 2, P, 4),
  stop: solid(
    { d: RAIL.d, r: 1, w: 4, x: RAIL_X1, y: RAIL.y },
    0,
    RAIL_TOP + 5,
    3,
    0.4,
  ),
  ticksMajor: ticks.major,
  ticksMinor: ticks.minor,
  wheel: cylinder(
    WHEEL.x,
    WHEEL.y,
    WHEEL.r,
    WHEEL.z0,
    WHEEL.z1 - WHEEL.z0,
    P,
    36,
    0.6,
  ),
  wheelCap: ring(WHEEL.x, WHEEL.y, WHEEL.r - 2.4, WHEEL.z1, P, 28),
  wheelHub: at([WHEEL.x, WHEEL.y, WHEEL.z1]),
};

const post = (x: number, y: number): Plan => ({
  d: 4,
  r: 0.6,
  w: POST_W,
  x,
  y,
});
const backY = RAIL.y - 6;
const frontY = RAIL.y + RAIL.d + 2;

export const FRAME_ART = {
  back: [VIEW_X0 - POST_W, VIEW_X1].map((x) =>
    solid(post(x, backY), 0, FRAME_TOP, 2, 0.4),
  ),
  front: [VIEW_X0 - POST_W, VIEW_X1].map((x) =>
    solid(post(x, frontY), 0, FRAME_TOP, 2, 0.4),
  ),
  /** Two crossbars along y and two side bars along x make the window. */
  bars: [
    solid(
      {
        d: frontY + 4 - backY,
        r: 0.6,
        w: POST_W,
        x: VIEW_X0 - POST_W,
        y: backY,
      },
      FRAME_TOP,
      3,
      2,
      0.4,
    ),
    solid(
      { d: frontY + 4 - backY, r: 0.6, w: POST_W, x: VIEW_X1, y: backY },
      FRAME_TOP,
      3,
      2,
      0.4,
    ),
  ],
  feet: [VIEW_X0 - POST_W / 2, VIEW_X1 + POST_W / 2]
    .flatMap((x) =>
      [backY + 2, frontY + 2].map((y) => ring(x, y, 3.4, 0, P, 16)),
    )
    .join(''),
  screws: [VIEW_X0 - POST_W / 2, VIEW_X1 + POST_W / 2].flatMap((x) => [
    at([x, backY + 2, FRAME_TOP + 3]),
    at([x, frontY + 2, FRAME_TOP + 3]),
  ]),
  sideBack: solid(
    { d: 4, r: 0.6, w: VIEW_X1 - VIEW_X0, x: VIEW_X0, y: backY },
    FRAME_TOP,
    3,
    2,
    0.4,
  ),
  sideFront: solid(
    { d: 4, r: 0.6, w: VIEW_X1 - VIEW_X0, x: VIEW_X0, y: frontY },
    FRAME_TOP,
    3,
    2,
    0.4,
  ),
};

/** The render window's edges, marked on the rail as faint brackets. */
export const WINDOW_ART = [VIEW_X0 - BUFFER, VIEW_X1 + BUFFER]
  .map((x) => lineOnTop([x, RAIL.y + 1], [x, RAIL.y + RAIL.d - 1], RAIL_TOP, P))
  .join('');

export const BLOCK_ART = {
  body: solid(BLOCK, RAIL_TOP, BLOCK_H, 3, 0.4),
  face: topMatrix(
    [BLOCK.x + BLOCK.w / 2, BLOCK.y + 5],
    RAIL_TOP + BLOCK_H,
    P,
    'y',
  ),
  rules: [0, 1]
    .map((row) =>
      lineOnTop(
        [BLOCK.x + 2.4 + row * 3, BLOCK.y + 10],
        [BLOCK.x + 2.4 + row * 3, BLOCK.y + 10 + [7.4, 5][row]],
        RAIL_TOP + BLOCK_H,
        P,
      ),
    )
    .join(''),
  seam: sideSeam(BLOCK, RAIL_TOP + 2, P, 3),
};
export const BLOCK_LIFT = 10;

export const GAUGE_ART = {
  ...housingOf(P, GAUGE, GAUGE_TOP),
  dial: sideMatrix(
    [GAUGE.x + GAUGE.w / 2, GAUGE.y + GAUGE.d],
    GAUGE_TOP / 2 + 1,
    P,
    'left',
  ),
  vents: [0, 1, 2]
    .map((row) =>
      F.rectOnX(
        GAUGE.x + GAUGE.w,
        GAUGE.y + 3,
        GAUGE.y + GAUGE.d - 3,
        8 + row * 3,
        9.3 + row * 3,
      ),
    )
    .join(''),
};
