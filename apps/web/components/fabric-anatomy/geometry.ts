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

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 100, r: 10, w: 296, x: -150, y: -64 };

/** React element tree on a pegboard. */
const BOARD: Plan = { d: 44, r: 2.5, w: 44, x: -142, y: -48 };
const BOARD_TOP = 4;
export const TREE = {
  children: [-132, -120, -108].map((x) => [x, -16] as [number, number]),
  root: [-120, -38] as [number, number],
};
const NODE = 7;

/** The C++ forme: a tray whose inner floor is the screen, laid out by Yoga. */
const FORME: Plan = { d: 56, r: 2, w: 40, x: -80, y: -50 };
const FORME_TOP = 3;
const WALL = 1.6;
export const FORME_INNER = insetPlan(FORME, WALL + 1);
export const BLOCK_H = 3;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 80, x: 0, y: -46 }, 0, 66),
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
  label: { d: 11, r: 2, w: 40, x: 86, y: 20 },
  ruler: { d: 5, r: 1, w: 120, x: -136, y: 29 },
});

export const PHONES = [
  phoneOf(P, { margin: 6, sh: 46, sw: 24, x: 0, y: -46 }),
  phoneOf(P, { margin: 6, sh: 46, sw: 24, x: 46, y: -46 }),
];
export const SOCKETS = [PHONES[0].socketAt(8), PHONES[1].socketAt(54)];
export const DOCK_LABELS = [
  sideMatrix([-4, PHONES[0].dockFront], 4.6, P, 'left'),
  sideMatrix([42, PHONES[1].dockFront], 4.6, P, 'left'),
];

export const BOARD_ART = {
  body: solid(BOARD, 0, BOARD_TOP, 4, 0.8),
  edges: TREE.children
    .map((child) => lineOnTop(TREE.root, child, BOARD_TOP, P))
    .join(''),
  label: topMatrix([BOARD.x + 4, BOARD.y + BOARD.d - 4], BOARD_TOP, P, 'x'),
  screws: [
    [BOARD.x + 3, BOARD.y + 3],
    [BOARD.x + BOARD.w - 3, BOARD.y + BOARD.d - 3],
  ].map(([x, y]) => at([x, y, BOARD_TOP])),
  seam: sideSeam(BOARD, 1.8, P, 4),
  socket: solid(
    { d: 3, r: 0.6, w: 7, x: -113.5, y: BOARD.y + BOARD.d },
    0.4,
    4,
    3,
    0.3,
  ),
};

const nodePlan = ([x, y]: [number, number]): Plan => ({
  d: NODE,
  r: 1.2,
  w: NODE,
  x: x - NODE / 2,
  y: y - NODE / 2,
});
export const NODE_ART = {
  children: TREE.children.map((c) => solid(nodePlan(c), BOARD_TOP, 4, 3, 0.6)),
  root: solid(nodePlan(TREE.root), BOARD_TOP, 4, 3, 0.6),
};

export const FORME_ART = {
  back: solid({ ...FORME, d: WALL }, FORME_TOP, 3, 2, 0.2),
  base: solid(insetPlan(FORME, -1.5), 0, FORME_TOP, 4, 0.6),
  floor: planOutline(insetPlan(FORME, WALL), FORME_TOP, P, 2),
  front: solid(
    { ...FORME, d: WALL, y: FORME.y + FORME.d - WALL },
    FORME_TOP,
    3,
    2,
    0.2,
  ),
  label: sideMatrix([FORME.x + 2, FORME.y + FORME.d], 1.8, P, 'left'),
  left: solid({ ...FORME, w: WALL }, FORME_TOP, 3, 2, 0.2),
  right: solid(
    { ...FORME, w: WALL, x: FORME.x + FORME.w - WALL },
    FORME_TOP,
    3,
    2,
    0.2,
  ),
  sockets: [-62, -50, -44].map((x) =>
    solid(
      { d: 3, r: 0.6, w: 5, x: x - 2.5, y: FORME.y + FORME.d },
      0.6,
      2.4,
      3,
      0.3,
    ),
  ),
};

/** A layout block inside the forme for a box in layout units (y down from the top). */
export const blockOf = (y: number, h: number) =>
  slabOf(
    {
      d: Math.max(1, h),
      r: 0.8,
      w: FORME_INNER.w,
      x: FORME_INNER.x,
      y: FORME_INNER.y + y,
    },
    FORME_TOP,
    BLOCK_H,
    P,
    3,
    0.3,
  );

const route = (points: Point3[]) => routeOf(P, points, 4);
const formeFront = FORME.y + FORME.d + 3;
export const CABLES = [
  route([
    [-110, BOARD.y + BOARD.d + 3, 2.4],
    [-110, BOARD.y + BOARD.d + 8, 1.3],
    [-110, 14, 1.3],
    [-62, 14, 1.3],
    [-62, formeFront + 2, 1.3],
    [-62, formeFront, 2],
  ]),
  route([
    [-50, formeFront, 1.8],
    [-50, formeFront + 4, 1.3],
    [-50, 20, 1.3],
    [8, 20, 1.3],
    [8, SOCKETS[0].end[1] + 5, 1.3],
    SOCKETS[0].end,
  ]),
  route([
    [-44, formeFront, 1.8],
    [-44, formeFront + 4, 1.3],
    [-44, 25, 1.3],
    [54, 25, 1.3],
    [54, SOCKETS[1].end[1] + 5, 1.3],
    SOCKETS[1].end,
  ]),
];
