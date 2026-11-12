import {
  boxCorners,
  fitProjection,
  sideMatrix,
  slabOf,
  topMatrix,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  housingOf,
  phoneOf,
  routeOf,
} from '../anatomy/parts';
import { DEV_CHIPS, EXPO_GO_CHIPS } from './model';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 108, r: 10, w: 262, x: -150, y: -66 };
const METRO: Plan = { d: 30, r: 3, w: 36, x: -140, y: -54 };
const METRO_TOP = 30;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 120, x: -70, y: -50 }, 0, 72),
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
  label: { d: 11, r: 2, w: 40, x: 64, y: 26 },
  ruler: { d: 5, r: 1, w: 100, x: -136, y: 32 },
});

export const PHONES = [
  phoneOf(P, { ledge: 26, margin: 7, sh: 50, sw: 26, x: -70, y: -50 }),
  phoneOf(P, { ledge: 26, margin: 7, sh: 50, sw: 26, x: 2, y: -50 }),
];
export const SOCKETS = [PHONES[0].socketAt(-42), PHONES[1].socketAt(30)];
export const DOCK_LABELS = [
  sideMatrix([-75, PHONES[0].dockFront], 5, P, 'left'),
  sideMatrix([-3, PHONES[1].dockFront], 5, P, 'left'),
];

/** Native module chips on each dock's ledge: the native code compiled into that app. */
const CHIP_W = 5;
const chipXs = (x0: number, n: number) =>
  Array.from({ length: n }, (_, i) => x0 + i * (CHIP_W + 1.4));
export const CHIP_Y = -36;
const CHIP: Plan = { d: 5, r: 0.6, w: CHIP_W, x: 0, y: CHIP_Y };
export const chipOf = (x: number) =>
  solid({ ...CHIP, x }, PHONES[0].dockTop, 2.2, 2, 0.3);
export const chipTop = (x: number) =>
  at([x + CHIP_W / 2, CHIP_Y + 2.5, PHONES[0].dockTop + 2.2]);
export const GO_CHIP_XS = chipXs(-72, EXPO_GO_CHIPS.length);
export const DEV_CHIP_XS = chipXs(0, DEV_CHIPS.length + 1);
export const SEAL = solid(
  {
    d: 7,
    r: 1,
    w: GO_CHIP_XS.length * (CHIP_W + 1.4) + 2,
    x: -73,
    y: CHIP_Y - 1,
  },
  PHONES[0].dockTop,
  0.6,
  2,
  0.2,
);
export const CHIP_LABELS = [
  topMatrix([-72, CHIP_Y + 8.6], PHONES[0].dockTop, P, 'x'),
  topMatrix([0, CHIP_Y + 8.6], PHONES[0].dockTop, P, 'x'),
];

export const METRO_ART = {
  ...housingOf(P, METRO, METRO_TOP),
  label: sideMatrix([METRO.x + 4, METRO.y + METRO.d], METRO_TOP - 4, P, 'left'),
  sockets: [METRO.x + 10, METRO.x + 24].map((x) =>
    solid({ d: 3, r: 0.6, w: 6, x: x - 3, y: METRO.y + METRO.d }, 1, 5, 3, 0.3),
  ),
  vents: [0, 1, 2, 3]
    .map((row) =>
      F.rectOnX(
        METRO.x + METRO.w,
        METRO.y + 5,
        METRO.y + METRO.d - 5,
        8 + row * 3,
        9.3 + row * 3,
      ),
    )
    .join(''),
};

const front = METRO.y + METRO.d + 3;
export const CABLES = [
  routeOf(
    P,
    [
      [METRO.x + 24, front, 3.4],
      [METRO.x + 24, front + 5, 1.3],
      [METRO.x + 24, 4, 1.3],
      [-42, 4, 1.3],
      SOCKETS[0].end,
    ] as Point3[],
    4,
  ),
  routeOf(
    P,
    [
      [METRO.x + 10, front, 3.4],
      [METRO.x + 10, front + 5, 1.3],
      [METRO.x + 10, 10, 1.3],
      [30, 10, 1.3],
      SOCKETS[1].end,
    ] as Point3[],
    4,
  ),
];

/** The rebuild press over the dev build's chip row. */
const PRESS_X = DEV_CHIP_XS[DEV_CHIPS.length] + CHIP_W / 2;
export const PRESS_ART = {
  arm: solid(
    { d: 4, r: 0.5, w: 35 - (PRESS_X - 2), x: PRESS_X - 2, y: CHIP_Y },
    PHONES[1].dockTop + 12,
    2.4,
    2,
    0.3,
  ),
  label: topMatrix([0, CHIP_Y - 3], PHONES[1].dockTop, P, 'x'),
  post: solid(
    { d: 3, r: 0.5, w: 3, x: 32, y: CHIP_Y - 1 },
    PHONES[1].dockTop,
    12,
    2,
    0.3,
  ),
};
export const PRESS_X_AT = PRESS_X;
