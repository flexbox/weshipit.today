import {
  corners,
  cylinder,
  depthOf,
  dotGrid,
  insetPlan,
  knurl,
  lineOnTop,
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
} from '../anatomy/kit/iso-kit';
import {
  ARM,
  ARM_Z,
  AT,
  BASE,
  BASE_H,
  CARD,
  CARD_H,
  COLUMN,
  COLUMN_TOP,
  DIAL_R,
  DIAL_TOP,
  DIAL_X,
  DIAL_Y,
  FLOOR_Z,
  FOOT_H,
  HEAD,
  HEAD_ARM,
  HEAD_Z,
  HOUSING_Z,
  LAMP_X,
  LIP_Z,
  P,
  PRESS_X,
  RAM_LEN,
  RAM_R,
  READER_BACK,
  READER_BACK_TOP,
  READER_FRONT,
  READER_FRONT_TOP,
  SWITCH_X,
  TRACK_X0,
  TRACK_X1,
  TRACK_Y0,
  TRACK_Y1,
  MID_Y,
  at,
} from './view';
import { CARDS, DIAL_SPAN } from './model';

const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);
const post = (
  x: number,
  y: number,
  r: number,
  z: number,
  h: number,
  steps = 24,
) => cylinder(x, y, r, z, h, P, steps);
const join = (paths: string[]) => paths.join('');
const byDepth = (points: Plane[]) =>
  [...points].sort(
    (a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P),
  );
const slotOnX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
  pathOf(
    [at([x, y0, z0]), at([x, y1, z0]), at([x, y1, z1]), at([x, y0, z1])],
    true,
  );

/* ---------- Bench ---------- */

const RULER: Plan = { d: 6, r: 1, w: 170, x: -122, y: 42 };
const LABEL: Plan = { d: 12, r: 2, w: 54, x: 62, y: 40 };
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
      [LABEL.x + [42, 30, 36][row], LABEL.y + 3.6 + row * 2.4],
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

/* ---------- Track ---------- */

const TRACK_W = TRACK_X1 - TRACK_X0;

export const TRACK = {
  back: solid(
    { d: 2, r: 0.5, w: TRACK_W, x: TRACK_X0, y: TRACK_Y0 - 2 },
    0,
    LIP_Z,
    2,
    0.3,
  ),
  floor: solid(
    { d: TRACK_Y1 - TRACK_Y0, r: 0, w: TRACK_W, x: TRACK_X0, y: TRACK_Y0 },
    0,
    FLOOR_Z,
    2,
  ),
  front: solid(
    { d: 2, r: 0.5, w: TRACK_W, x: TRACK_X0, y: TRACK_Y1 },
    0,
    LIP_Z,
    2,
    0.3,
  ),
  frontScrews: [-112, -75, -26, 26, 73, 112].map((x) =>
    at([x, TRACK_Y1 + 1, LIP_Z]),
  ),
  grooves: join(
    [TRACK_Y0 + 0.6, TRACK_Y1 - 0.6].map((y) =>
      lineOnTop([TRACK_X0, y], [TRACK_X1, y], FLOOR_Z, P),
    ),
  ),
  stopLeft: solid(
    { d: 22, r: 0.8, w: 3, x: TRACK_X0 - 3, y: TRACK_Y0 - 2 },
    0,
    14,
    3,
    0.4,
  ),
  stopRight: solid(
    { d: 22, r: 0.8, w: 3, x: TRACK_X1, y: TRACK_Y0 - 2 },
    0,
    14,
    3,
    0.4,
  ),
  stopScrews: [TRACK_X0 - 1.5, TRACK_X1 + 1.5].flatMap((x) => [
    at([x, TRACK_Y0 + 1, 14]),
    at([x, TRACK_Y1 - 1, 14]),
  ]),
};

/** Back plates and front corner posts that hold a stack of cards. */
function holder(x: number) {
  const back: Plan = { d: 4, r: 1, w: 26, x: x - 13, y: TRACK_Y0 - 6 };
  return {
    back: solid(back, 0, 20, 3, 0.5),
    backScrews: [at([x - 9, TRACK_Y0 - 4, 20]), at([x + 9, TRACK_Y0 - 4, 20])],
    backSeam: sideSeam(back, 16, P, 3),
    postCaps: [x - 13, x + 13].map((px) => at([px, TRACK_Y1 + 3.5, 12])),
    posts: [x - 14.5, x + 11.5].map((px) =>
      solid({ d: 3, r: 0.8, w: 3, x: px, y: TRACK_Y1 + 2 }, 0, 12, 2, 0.3),
    ),
  };
}

export const SOURCE = holder(AT.source);
export const HOPPER = holder(AT.hopper);
export const OUT = holder(AT.out);

/* ---------- Press (the compiler) ---------- */

const HOUSING_R = 5.2;

export const PRESS = {
  arm: solid(ARM, ARM_Z, 8, 4, 0.8),
  armScrews: [
    at([PRESS_X - 6, ARM.y + 4, ARM_Z + 8]),
    at([PRESS_X + 6, ARM.y + 4, ARM_Z + 8]),
  ],
  armSeam: sideSeam(ARM, ARM_Z + 3, P, 4),
  column: solid(COLUMN, 3, COLUMN_TOP - 3, 4, 1),
  columnSeam: sideSeam(COLUMN, 10, P, 4),
  foot: solid(insetPlan(COLUMN, -2.5), 0, 3, 4, 0.5),
  footScrews: corners(insetPlan(COLUMN, -2.5), 1.8).map(([x, y]) =>
    at([x, y, 3]),
  ),
  housing: post(PRESS_X, MID_Y, HOUSING_R, HOUSING_Z, ARM_Z - HOUSING_Z, 32),
  housingBand: sideArc(PRESS_X, MID_Y, HOUSING_R, HOUSING_Z + 3, P, 24),
  ribs: join(
    [-6, 0, 6].map((dx) =>
      slotOnX(
        COLUMN.x + COLUMN.w,
        COLUMN.y + 3,
        COLUMN.y + COLUMN.d - 3,
        14 + dx + 6,
        14 + dx + 7.4,
      ),
    ),
  ),
  /** The ram, built with its bottom at z = 0 and moved up and down. */
  bedRing: ring(PRESS_X, MID_Y, RAM_R + 1, FLOOR_Z, P, 24),
  ram: post(PRESS_X, MID_Y, RAM_R, 0, RAM_LEN, 24),
  ramMarks: join(
    [4, 7, 10].map((z) => sideArc(PRESS_X, MID_Y, RAM_R, z, P, 16)),
  ),
  wheel: post(PRESS_X + 13, -16, 6.5, COLUMN_TOP + 3, 2.2, 40),
  wheelHub: post(PRESS_X + 13, -16, 2, COLUMN_TOP, 3, 16),
  wheelHubDot: at([PRESS_X + 13, -16, COLUMN_TOP + 5.2]),
  wheelKnurl: knurl(
    PRESS_X + 13,
    -16,
    6.5,
    COLUMN_TOP + 3,
    COLUMN_TOP + 5.2,
    36,
    P,
    0.3,
  ),
  wheelRim:
    ring(PRESS_X + 13, -16, 5.4, COLUMN_TOP + 5.2, P, 40) +
    ring(PRESS_X + 13, -16, 1.4, COLUMN_TOP + 5.2, P, 16),
  wheelSpokes: join(
    [0, 1, 2].map((index) => {
      const angle = (index / 3) * Math.PI * 2 + 0.4;
      return lineOnTop(
        [PRESS_X + 13 + Math.cos(angle) * 1.4, -16 + Math.sin(angle) * 1.4],
        [PRESS_X + 13 + Math.cos(angle) * 5.2, -16 + Math.sin(angle) * 5.2],
        COLUMN_TOP + 5.2,
        P,
      );
    }),
  ),
};

/* ---------- Reader (the engine) ---------- */

const DIAL_TICKS = radialTicks(
  DIAL_X,
  DIAL_Y,
  DIAL_R - 1.4,
  DIAL_SPAN * 2,
  2,
  DIAL_TOP,
  [0.8, 1.6],
  P,
);

export const READER = {
  arm: solid(HEAD_ARM, READER_BACK_TOP - 6, 6, 3, 0.6),
  armScrews: [
    at([HEAD_ARM.x + 4, HEAD_ARM.y + 3, READER_BACK_TOP]),
    at([HEAD_ARM.x + HEAD_ARM.w - 4, HEAD_ARM.y + 3, READER_BACK_TOP]),
  ],
  back: solid(READER_BACK, 0, READER_BACK_TOP, 6, 1.2),
  backScrews: corners(READER_BACK, 3.5).map(([x, y]) =>
    at([x, y, READER_BACK_TOP]),
  ),
  backSeam: sideSeam(READER_BACK, 5, P, 6),
  dialBand: sideArc(DIAL_X, DIAL_Y, DIAL_R, READER_FRONT_TOP + 1, P, 28),
  dialBezel: ring(DIAL_X, DIAL_Y, DIAL_R - 0.8, DIAL_TOP, P, 44),
  dialHub: at([DIAL_X, DIAL_Y, DIAL_TOP]),
  dialKnurl: knurl(
    DIAL_X,
    DIAL_Y,
    DIAL_R,
    READER_FRONT_TOP,
    DIAL_TOP,
    36,
    P,
    0.3,
  ),
  dialMajor: DIAL_TICKS.major,
  dialMinor: DIAL_TICKS.minor,
  dialPuck: post(
    DIAL_X,
    DIAL_Y,
    DIAL_R,
    READER_FRONT_TOP,
    DIAL_TOP - READER_FRONT_TOP,
    44,
  ),
  front: solid(READER_FRONT, 0, READER_FRONT_TOP, 6, 1.2),
  frontScrews: corners(READER_FRONT, 2.6).map(([x, y]) =>
    at([x, y, READER_FRONT_TOP]),
  ),
  frontSeam: sideSeam(READER_FRONT, 4, P, 6),
  head: solid(HEAD, HEAD_Z, READER_BACK_TOP - 6 - HEAD_Z, 3, 0.4),
  headLamp: at([AT.head, HEAD_ARM.y + HEAD_ARM.d - 3, READER_BACK_TOP]),
  headSeam: sideSeam(HEAD, HEAD_Z + 3, P, 3),
  label: topMatrix(
    [READER_BACK.x + 14, READER_BACK.y + 9],
    READER_BACK_TOP,
    P,
    'x',
  ),
  lamp: post(LAMP_X, DIAL_Y, 2, READER_FRONT_TOP, 1.2, 20),
  lampDot: at([LAMP_X, DIAL_Y, READER_FRONT_TOP + 1.2]),
  lampRing: ring(LAMP_X, DIAL_Y, 3, READER_FRONT_TOP, P, 20),
  rollers: [AT.head - 9, AT.head + 9].map((x) =>
    post(x, -1, 1.4, LIP_Z, 3, 16),
  ),
  switchKnob: post(SWITCH_X, DIAL_Y, 2.8, READER_FRONT_TOP + 0.6, 2.6, 24),
  switchKnurl: knurl(
    SWITCH_X,
    DIAL_Y,
    2.8,
    READER_FRONT_TOP + 0.6,
    READER_FRONT_TOP + 3.2,
    20,
    P,
    0.3,
  ),
  switchPlate: solid(
    { d: 9, r: 1.5, w: 10, x: SWITCH_X - 5, y: DIAL_Y - 4.5 },
    READER_FRONT_TOP,
    0.6,
    3,
  ),
  vents: join(
    [8, 12, 16, 20].map((z) =>
      slotOnX(
        READER_BACK.x + READER_BACK.w,
        READER_BACK.y + 5,
        READER_BACK.y + 19,
        z,
        z + 1.6,
      ),
    ),
  ),
  /** Detents for the two engine positions. */
  detents: [-1, 1].map((side) =>
    at([SWITCH_X + side * 3.6, DIAL_Y - 3.2, READER_FRONT_TOP + 0.6]),
  ),
};

/** Dial needle for a launch time in figure seconds. */
export function needleOf(seconds: number) {
  const angle = (Math.min(seconds, DIAL_SPAN) / DIAL_SPAN) * Math.PI * 2;
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
      point(DIAL_R - 2, 0),
      point(0, 0.5),
      point(-1.6, 0.28),
      point(-1.6, -0.28),
      point(0, -0.5),
    ],
    true,
  );
}

/** Engine switch pointer: -1 points at Hermes (left detent), +1 at JSC. */
export function switchOf(side: number) {
  const angle = side * 0.75;
  const ux = Math.sin(angle);
  const uy = -Math.cos(angle);
  const z = READER_FRONT_TOP + 3.2;
  return lineOnTop(
    [SWITCH_X, DIAL_Y],
    [SWITCH_X + ux * 2.4, DIAL_Y + uy * 2.4],
    z,
    P,
  );
}

/* ---------- Cards (the JavaScript bundle) ---------- */

/** Source text: rule lines printed on the card. */
const TEXT_ROWS = [16, 11, 18, 8, 14];
/** Each card's bytecode: a punch pattern, 10 columns × 4 rows. */
function holesOf(index: number): Flat[] {
  const all = dotGrid(CARD.x + 3.4, CARD.y + 3.2, 10, 4, 1.9, CARD_H, P);
  return all.filter((_, hole) => (hole * 7 + index * 13) % 5 < 2);
}

export const CARD_ART = {
  body: solid(CARD, 0, CARD_H, 3, 0.3),
  corner: pathOf([
    at([CARD.x + 3, CARD.y, CARD_H]),
    at([CARD.x, CARD.y + 3, CARD_H]),
  ]),
  holes: Array.from({ length: CARDS }, (_, index) => holesOf(index)),
  seam: sideSeam(CARD, CARD_H / 2, P, 3),
  stripe: planOutline(
    {
      d: CARD.d - 2.8,
      r: 0.6,
      w: CARD.w - 3.2,
      x: CARD.x + 1.6,
      y: CARD.y + 1.4,
    },
    CARD_H,
    P,
    2,
  ),
  text: TEXT_ROWS.map((length, row) =>
    lineOnTop(
      [CARD.x + 3.6, CARD.y + 2.8 + row * 2.6],
      [CARD.x + 3.6 + length, CARD.y + 2.8 + row * 2.6],
      CARD_H,
      P,
    ),
  ),
};
