import {
  boxCorners,
  fitProjection,
  lineOnTop,
  planOutline,
  sideMatrix,
  sideSeam,
  slabOf,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  phoneOf,
  routeOf,
} from '../anatomy/parts';
import { FILES, FOLDER } from './model';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 108, r: 10, w: 262, x: -150, y: -64 };

/** The app/ tray: a slot per file, the layout plate behind them all. */
const TRAY: Plan = { d: 24, r: 2.5, w: 132, x: -140, y: -52 };
const TRAY_TOP = 6;
export const CARD_XS = FILES.map((_, i) => -122 + i * 32);
const CARD_W = 24;
const CARD_D = 3;
const CARD_Y = -40;
const CARD_FACE = CARD_Y + CARD_D;
const CARD_TOP = TRAY_TOP + 26;
export const CARD_LIFT = 8;
const LAYOUT: Plan = { d: 3, r: 0.6, w: 128, x: -138, y: -50 };

/** Rail and router carriage in front. */
const RAIL: Plan = { d: 8, r: 1.2, w: 132, x: -140, y: -22 };
const RAIL_TOP = 4;
const CAR: Plan = { d: 10, r: 1.2, w: 22, x: -11, y: -23 };
const CAR_TOP = 16;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 36, x: 40, y: -54 }, 0, 82),
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
  label: { d: 13, r: 2, w: 44, x: 60, y: 24 },
  ruler: { d: 6, r: 1, w: 150, x: -136, y: 28 },
});

export const PHONE_ART = phoneOf(P, { sh: 60, sw: 32, x: 40, y: -52 });
const SOCKET = PHONE_ART.socketAt(46);
export const DOCK_SOCKET = SOCKET;

export const TRAY_ART = {
  body: solid(TRAY, 0, TRAY_TOP, 4, 0.8),
  layout: solid(LAYOUT, TRAY_TOP, 30, 2, 0.4),
  layoutLabel: sideMatrix(
    [LAYOUT.x + 3, LAYOUT.y + LAYOUT.d],
    TRAY_TOP + 27,
    P,
    'left',
  ),
  seam: sideSeam(TRAY, 2.4, P, 4),
  slots: CARD_XS.map((x) =>
    planOutline(
      {
        d: CARD_D + 2,
        r: 0.5,
        w: CARD_W + 2,
        x: x - CARD_W / 2 - 1,
        y: CARD_Y - 1,
      },
      TRAY_TOP,
      P,
      2,
    ),
  ).join(''),
  /** The post/ folder: a sleeve around its card's slot. */
  folder: solid(
    {
      d: CARD_D + 6,
      r: 1,
      w: CARD_W + 6,
      x: CARD_XS[FOLDER] - CARD_W / 2 - 3,
      y: CARD_Y - 3,
    },
    TRAY_TOP,
    8,
    3,
    0.4,
  ),
  folderLabel: sideMatrix(
    [CARD_XS[FOLDER] - CARD_W / 2 - 2, CARD_Y + CARD_D + 3],
    TRAY_TOP + 6,
    P,
    'left',
  ),
  screws: [TRAY.x + 3, TRAY.x + TRAY.w - 3].map((x) =>
    at([x, TRAY.y + TRAY.d - 3, TRAY_TOP]),
  ),
  socket: solid(
    { d: 7, r: 0.6, w: 3, x: TRAY.x + TRAY.w, y: -44 },
    1,
    5.2,
    3,
    0.3,
  ),
  socketMouth: F.rectOnX(TRAY.x + TRAY.w + 3, -42.5, -38.5, 2.6, 4.6),
};

/** A file card, built at x = 0 standing in its slot. */
const CARD: Plan = { d: CARD_D, r: 0.5, w: CARD_W, x: -CARD_W / 2, y: CARD_Y };
export const CARD_ART = {
  body: solid(CARD, TRAY_TOP - 2, CARD_TOP - TRAY_TOP + 2, 3, 0.4),
  file: sideMatrix([-10.4, CARD_FACE], CARD_TOP - 2.6, P, 'left'),
  rules: [0, 1]
    .map((row) =>
      F.lineOnY(CARD_FACE, -10, -10 + [14, 10][row], TRAY_TOP + 6 + row * 2.4),
    )
    .join(''),
  seam: sideSeam(CARD, CARD_TOP - 7, P, 3),
  url: sideMatrix([-10.4, CARD_FACE], CARD_TOP - 11, P, 'left'),
};

export const RAIL_ART = {
  body: solid(RAIL, 0, RAIL_TOP, 3, 0.5),
  marks: CARD_XS.map((x) =>
    lineOnTop(
      [x, RAIL.y + RAIL.d - 0.6],
      [x, RAIL.y + RAIL.d - 2.4],
      RAIL_TOP,
      P,
    ),
  ).join(''),
  seam: sideSeam(RAIL, 1.6, P, 3),
  slot: lineOnTop(
    [RAIL.x + 3, RAIL.y + RAIL.d / 2],
    [RAIL.x + RAIL.w - 3, RAIL.y + RAIL.d / 2],
    RAIL_TOP,
    P,
  ),
};

/** The router carriage, built at x = 0; its window shows the URL. */
export const CAR_ART = {
  body: solid(CAR, RAIL_TOP, CAR_TOP - RAIL_TOP, 4, 0.8),
  face: sideMatrix([-8.2, CAR.y + CAR.d], 11.7, P, 'left'),
  pointer: lineOnTop([0, CAR.y], [0, CAR.y - 4], CAR_TOP - 1, P),
  seam: sideSeam(CAR, RAIL_TOP + 3, P, 4),
  window: F.rectOnY(CAR.y + CAR.d, -9, 9, 8, 13.4),
};

const cablePoints: Point3[] = [
  [TRAY.x + TRAY.w + 3, -40.5, 3.6],
  [TRAY.x + TRAY.w + 7, -40.5, 1.3],
  [14, -40.5, 1.3],
  [14, -16, 1.3],
  [46, -16, 1.3],
  SOCKET.end,
];
export const CABLE = routeOf(P, cablePoints, 4);
