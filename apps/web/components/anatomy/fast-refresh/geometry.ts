import {
  boxCorners,
  corners,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  sideMatrix,
  sideSeam,
  slabOf,
  type Plan,
  type Point3,
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, routeOf } from '../parts';
import { MOST, MODULES } from './model';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 132, r: 10, w: 266, x: -150, y: -72 };

/* ---------- World layout ---------- */

/** Module rack (the bundle Metro serves): a block with one slot per file. */
const RACK: Plan = { d: 24, r: 2.5, w: 122, x: -138, y: -60 };
const RACK_TOP = 12;
const RACK_FRONT = RACK.y + RACK.d;
export const CARD_XS = [-114, -78, -42];
const CARD_W = 26;
const CARD_D = 4;
const CARD_Y = -50;
const CARD_H = 30;

/** Dock and phone (the running app), screen facing +y. */
const DOCK: Plan = { d: 34, r: 3, w: 64, x: 8, y: -62 };
const DOCK_TOP = 9;
const DOCK_FRONT = DOCK.y + DOCK.d;
const PHONE: Plan = { d: 5, r: 2, w: 36, x: 22, y: -54 };
const PHONE_Z = DOCK_TOP + 2;
const PHONE_TOP = 92;
const SCREEN_Y = PHONE.y + PHONE.d;
const SCREEN = { x0: 24.5, x1: 55.5, z0: 18, z1: 85 };

/** Abacus in front: the component's state, one bead per count. */
const ABACUS: Plan = { d: 24, r: 2.5, w: 104, x: -122, y: 12 };
const ABACUS_TOP = 3.5;
const ROD_Y = ABACUS.y + ABACUS.d / 2;
const ROD_Z = 12;
const POST_W = 5;
const ROD_X0 = ABACUS.x + 4 + POST_W;
const ROD_X1 = ABACUS.x + ABACUS.w - 4 - POST_W;
const BEAD_W = 7;
const BEAD_GAP = 0.6;

/** Cable from the rack's front socket to the dock's. */
const RACK_SOCKET_X = -26;
const DOCK_SOCKET_X = 16;
const SOCKET_Z = 4;
const CABLE_Z = 1.3;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(PHONE, 0, PHONE_TOP + 1),
    ...boxCorners(RACK, 0, RACK_TOP + CARD_H + 12),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 54, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 13, r: 2, w: 50, x: 54, y: 40 },
  ruler: { d: 6, r: 1, w: 150, x: -134, y: 48 },
});

/* ---------- Rack and cards ---------- */

export const RACK_ART = {
  body: solid(RACK, 2.5, RACK_TOP - 2.5, 4, 1),
  groove: planOutline(insetPlan(RACK, 2.4), RACK_TOP, P, 3),
  plinth: solid(insetPlan(RACK, -1.5), 0, 2.5, 4, 0.4),
  screws: corners(RACK, 4).map(([x, y]) => at([x, y, RACK_TOP])),
  seam: sideSeam(RACK, 6, P, 4),
  slots: CARD_XS.map((x) =>
    planOutline(
      {
        d: CARD_D + 2,
        r: 0.6,
        w: CARD_W + 2,
        x: x - CARD_W / 2 - 1,
        y: CARD_Y - 1,
      },
      RACK_TOP,
      P,
      2,
    ),
  ).join(''),
  /** A status lamp under each slot on the front face. */
  lampRings: CARD_XS.map((x) => F.circleOnY(x, RACK_FRONT, 6.4, 1.5, 14)).join(
    '',
  ),
  lamps: CARD_XS.map((x) => at([x, RACK_FRONT, 6.4])),
  socket: solid(
    { d: 3, r: 0.6, w: 7, x: RACK_SOCKET_X - 3.5, y: RACK_FRONT },
    SOCKET_Z - 2.6,
    5.2,
    3,
    0.3,
  ),
  socketMouth: F.rectOnY(
    RACK_FRONT + 3,
    RACK_SOCKET_X - 2,
    RACK_SOCKET_X + 2,
    SOCKET_Z - 1,
    SOCKET_Z + 1,
  ),
  vents: [0, 1, 2]
    .map((row) =>
      F.rectOnX(
        RACK.x + RACK.w,
        RACK.y + 5,
        RACK.y + RACK.d - 5,
        4 + row * 2.4,
        5 + row * 2.4,
      ),
    )
    .join(''),
};

/** One cartridge, built at x = 0 standing in its slot; moved by translate. */
export const cardArt = (index: number) => {
  const x = CARD_XS[index];
  const plan: Plan = {
    d: CARD_D,
    r: 0.6,
    w: CARD_W,
    x: x - CARD_W / 2,
    y: CARD_Y,
  };
  const face = CARD_Y + CARD_D;
  const z0 = RACK_TOP - 3;
  const z1 = z0 + CARD_H;
  const hook = MODULES[index].kind === 'hook';
  return {
    body: solid(plan, z0, CARD_H, 3, 0.4),
    chip: F.rectOnY(face, x - 8, x + 2, z0 + 8, z0 + 15),
    grip: F.lineOnY(face, x - 6, x + 6, z1 - 3),
    /** A hook module carries a round tag, a component a square one. */
    contacts: Array.from({ length: 7 }, (_, step) =>
      at([x - 9 + step * 3, face, z0 + 4.4]),
    ),
    label: sideMatrix([x - 10.5, face], z0 + 22, P, 'left'),
    tag: hook
      ? F.circleOnY(x + 7, face, z0 + 11.5, 2.4, 16)
      : F.rectOnY(face, x + 4.6, x + 9.4, z0 + 9.1, z0 + 13.9),
  };
};

export const CARD_LIFT = 12;

/* ---------- Dock and phone ---------- */

export const PHONE_ART = {
  bezel: F.rectOnY(
    SCREEN_Y,
    SCREEN.x0 - 0.8,
    SCREEN.x1 + 0.8,
    SCREEN.z0 - 0.8,
    SCREEN.z1 + 0.8,
  ),
  body: solid(PHONE, PHONE_Z - 2, PHONE_TOP - PHONE_Z + 2, 6, 0.6),
  camera: at([SCREEN.x1 - 4, SCREEN_Y, (SCREEN.z1 + PHONE_TOP) / 2]),
  dock: solid(DOCK, 0, DOCK_TOP, 6, 1),
  dockGroove: planOutline(insetPlan(DOCK, 2.4), DOCK_TOP, P, 4),
  dockScrews: corners(DOCK, 4).map(([x, y]) => at([x, y, DOCK_TOP])),
  dockSeam: sideSeam(DOCK, 3, P, 6),
  glass: F.rectOnY(SCREEN_Y, SCREEN.x0, SCREEN.x1, SCREEN.z0, SCREEN.z1),
  lip: solid(
    { d: 3, r: 1, w: PHONE.w + 4, x: PHONE.x - 2, y: SCREEN_Y + 0.4 },
    DOCK_TOP,
    4.5,
    3,
    0.4,
  ),
  lipScrews: [PHONE.x + 2, PHONE.x + PHONE.w - 2].map((x) =>
    at([x, SCREEN_Y + 1.9, DOCK_TOP + 4.5]),
  ),
  rest: solid(
    { d: 3, r: 1, w: PHONE.w - 8, x: PHONE.x + 4, y: PHONE.y - 4 },
    DOCK_TOP,
    36,
    3,
    0.4,
  ),
  sideButton: solid(
    { d: 2, r: 0.2, w: 0.7, x: PHONE.x + PHONE.w, y: PHONE.y + 1.5 },
    68,
    8,
    2,
  ),
  speaker: F.lineOnY(SCREEN_Y, 37, 43, (SCREEN.z1 + PHONE_TOP) / 2),
  /** Refresh lamp on the dock ledge. */
  lamp: at([64, DOCK_FRONT, 5]),
  lampRing: F.circleOnY(64, DOCK_FRONT, 5, 1.5, 14),
  screen: sideMatrix([SCREEN.x0, SCREEN_Y], SCREEN.z1, P, 'left'),
  socket: solid(
    { d: 3, r: 0.6, w: 7, x: DOCK_SOCKET_X - 3.5, y: DOCK_FRONT },
    SOCKET_Z - 2.6,
    5.2,
    3,
    0.3,
  ),
  socketMouth: F.rectOnY(
    DOCK_FRONT + 3,
    DOCK_SOCKET_X - 2,
    DOCK_SOCKET_X + 2,
    SOCKET_Z - 1,
    SOCKET_Z + 1,
  ),
};

export const SCREEN_W = SCREEN.x1 - SCREEN.x0;
export const SCREEN_H = SCREEN.z1 - SCREEN.z0;

/* ---------- Cable ---------- */

const cablePoints: Point3[] = [
  [RACK_SOCKET_X, RACK_FRONT + 3, SOCKET_Z],
  [RACK_SOCKET_X, RACK_FRONT + 8, CABLE_Z],
  [RACK_SOCKET_X, -14, CABLE_Z],
  [DOCK_SOCKET_X, -14, CABLE_Z],
  [DOCK_SOCKET_X, DOCK_FRONT + 7, CABLE_Z],
  [DOCK_SOCKET_X, DOCK_FRONT + 3, SOCKET_Z],
];
export const CABLE = routeOf(P, cablePoints, 4);

/* ---------- Abacus ---------- */

const postPlan = (x: number): Plan => ({
  d: 12,
  r: 0.8,
  w: POST_W,
  x,
  y: ROD_Y - 6,
});

export const ABACUS_ART = {
  base: solid(ABACUS, 0, ABACUS_TOP, 4, 0.8),
  postLeft: solid(
    postPlan(ROD_X0 - POST_W),
    ABACUS_TOP,
    ROD_Z + 6 - ABACUS_TOP,
    3,
    0.4,
  ),
  postRight: solid(
    postPlan(ROD_X1),
    ABACUS_TOP,
    ROD_Z + 6 - ABACUS_TOP,
    3,
    0.4,
  ),
  postScrews: [ROD_X0 - POST_W / 2, ROD_X1 + POST_W / 2].map((x) =>
    at([x, ROD_Y - 3.4, ROD_Z + 6]),
  ),
  rod: F.lineOnY(ROD_Y, ROD_X0, ROD_X1, ROD_Z),
  screws: corners(ABACUS, 2.8).map(([x, y]) => at([x, y, ABACUS_TOP])),
  seam: sideSeam(ABACUS, 1.6, P, 4),
  /** Count scale on the base front edge: one tick per bead from the right. */
  ticks: Array.from({ length: MOST + 1 }, (_, n) => {
    const x = ROD_X1 - n * (BEAD_W + BEAD_GAP);
    return lineOnTop(
      [x, ABACUS.y + ABACUS.d - 1],
      [x, ABACUS.y + ABACUS.d - (n % 3 ? 2.6 : 4)],
      ABACUS_TOP,
      P,
    );
  }).join(''),
  zero: lineOnTop(
    [ROD_X1, ABACUS.y + ABACUS.d - 1],
    [ROD_X1, ABACUS.y + ABACUS.d - 4],
    ABACUS_TOP,
    P,
  ),
};

/** A bead built at the left end of the rod; translated along x. */
export const BEAD = (() => {
  const plan: Plan = { d: 9, r: 2.2, w: BEAD_W, x: ROD_X0, y: ROD_Y - 4.5 };
  return {
    body: solid(plan, ROD_Z - 4.5, 9, 6, 1.2),
    seam: sideSeam(plan, ROD_Z, P, 6),
  };
})();

/** Where bead i (0 = leftmost) sits: counted beads are pushed to the right end. */
export const beadX = (index: number, counted: boolean) =>
  counted
    ? ROD_X1 - (MOST - index) * (BEAD_W + BEAD_GAP) - ROD_X0
    : index * (BEAD_W + BEAD_GAP);
