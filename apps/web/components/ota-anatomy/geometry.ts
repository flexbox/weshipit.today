import {
  boxCorners,
  corners,
  cylinder,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  ring,
  sideMatrix,
  sideSeam,
  slabOf,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, routeOf } from '../anatomy/parts';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 118, r: 10, w: 266, x: -150, y: -70 };

/* ---------- Layout ---------- */

/** Track the changes ride, along x. */
export const TRACK_Y = 4;
const TRACK_HALF = 7;
const TRACK_X0 = -138;
export const TRACK_X1 = -30;
export const TRACK_Z = 4;
const LIP_Z = 7;

/** The gate: a bar the height of the bundle slot, across the track. */
export const GATE_X = -84;
const BAR_Z = 10;
const POST_D = 3;

/** Store-review bin in front of the gate. */
const BIN: Plan = {
  d: 22,
  r: 1.5,
  w: 26,
  x: GATE_X - 18,
  y: TRACK_Y + TRACK_HALF + 6,
};
const BIN_H = 12;
const BIN_WALL = 1.6;
export const BIN_Y = BIN.y + BIN.d / 2 - TRACK_Y;
export const BIN_X = BIN.x + BIN.w / 2;

/** Pusher behind the track at the gate. */
export const PUSH_STROKE = 8;

/** Update server where the track ends. */
const SERVER: Plan = { d: 32, r: 2.5, w: 34, x: TRACK_X1, y: TRACK_Y - 18 };
const SERVER_TOP = 36;
const SERVER_X1 = SERVER.x + SERVER.w;

/** Dock and phone, back right. */
const DOCK: Plan = { d: 40, r: 3, w: 64, x: 40, y: -64 };
const DOCK_TOP = 9;
const DOCK_FRONT = DOCK.y + DOCK.d;
const PHONE: Plan = { d: 5, r: 2, w: 30, x: 50, y: -58 };
const PHONE_Z = DOCK_TOP + 2;
const PHONE_TOP = 84;
const SCREEN_Y = PHONE.y + PHONE.d;
const SCREEN = { x0: 52.5, x1: 77.5, z0: 18, z1: 77 };

/** Two bundle slots on the ledge: the one running, and the one for next launch. */
export const SLOT_X = { active: 54, pending: 74 } as const;
const SLOT_Y = -44;
const CARD: Plan = { d: 8, r: 0.8, w: 12, x: -6, y: SLOT_Y - 4 };
const CARD_H = 2.4;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(PHONE, 0, PHONE_TOP + 1),
    ...boxCorners(SERVER, 0, SERVER_TOP + 2),
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
  label: { d: 13, r: 2, w: 48, x: 56, y: 30 },
  ruler: { d: 6, r: 1, w: 100, x: -70, y: 42 },
});

/* ---------- Track and gate ---------- */

const trackBed: Plan = {
  d: TRACK_HALF * 2 + 4,
  r: 1.5,
  w: TRACK_X1 - TRACK_X0,
  x: TRACK_X0,
  y: TRACK_Y - TRACK_HALF - 2,
};
const lip = (y: number): Plan => ({
  d: 2,
  r: 0.5,
  w: TRACK_X1 - TRACK_X0,
  x: TRACK_X0,
  y,
});
const post = (y: number): Plan => ({
  d: POST_D,
  r: 0.6,
  w: 4,
  x: GATE_X - 2,
  y,
});
const BAR: Plan = {
  d: TRACK_HALF * 2 + 4 + POST_D * 2,
  r: 0.6,
  w: 4,
  x: GATE_X - 2,
  y: TRACK_Y - TRACK_HALF - 2 - POST_D,
};

export const TRACK_ART = {
  bed: solid(trackBed, 0, TRACK_Z, 3, 0.5),
  bedSeam: sideSeam(trackBed, 1.8, P, 3),
  floor: planOutline(insetPlan(trackBed, 2), TRACK_Z, P, 2),
  lipBack: solid(
    lip(TRACK_Y - TRACK_HALF - 2),
    TRACK_Z,
    LIP_Z - TRACK_Z,
    2,
    0.2,
  ),
  /** The front lip stops short of the gate so a token can leave sideways. */
  bar: solid(BAR, BAR_Z, 3, 2, 0.4),
  barScrews: [BAR.y + 1.5, BAR.y + BAR.d - 1.5].map((y) =>
    at([GATE_X, y, BAR_Z + 3]),
  ),
  lipFrontA: solid(
    { ...lip(TRACK_Y + TRACK_HALF), w: GATE_X - 16 - TRACK_X0 },
    TRACK_Z,
    LIP_Z - TRACK_Z,
    2,
    0.2,
  ),
  lipFrontB: solid(
    { ...lip(TRACK_Y + TRACK_HALF), w: TRACK_X1 - GATE_X - 4, x: GATE_X + 4 },
    TRACK_Z,
    LIP_Z - TRACK_Z,
    2,
    0.2,
  ),
  lipScrews: [-126, -110, -60, -42].map((x) =>
    at([x, TRACK_Y + TRACK_HALF + 1, LIP_Z]),
  ),
  postBack: solid(
    post(TRACK_Y - TRACK_HALF - 2 - POST_D),
    0,
    BAR_Z + 3,
    2,
    0.3,
  ),
  postFront: solid(post(TRACK_Y + TRACK_HALF + 2), 0, BAR_Z + 3, 2, 0.3),
};

/** Pusher plate, behind the track at the gate; slides +y by the stroke. */
const PUSHER: Plan = {
  d: 2,
  r: 0.4,
  w: 12,
  x: GATE_X - 18,
  y: TRACK_Y - TRACK_HALF + 0.4,
};
export const PUSHER_ART = {
  housing: solid(
    { d: 6, r: 0.8, w: 10, x: GATE_X - 17, y: TRACK_Y - TRACK_HALF - 8 },
    0,
    12,
    3,
    0.4,
  ),
  plate: solid(PUSHER, TRACK_Z + 0.4, 9, 2, 0.3),
  rod: F.lineOnY(PUSHER.y - 0.5, GATE_X - 12, GATE_X - 12, TRACK_Z + 5),
};
/** Where a stopped native token waits, in front of the gate. */
export const STOP_X = GATE_X - 10;

/* ---------- Tokens (one change each), built at x = 0 on the track ---------- */

const tokenPlan = (w: number, d: number): Plan => ({
  d,
  r: 1,
  w,
  x: -w / 2,
  y: TRACK_Y - d / 2,
});

export const TOKENS = {
  asset: {
    body: cylinder(0, TRACK_Y, 4.2, TRACK_Z, 3, P, 32, 0.4),
    mark: ring(0, TRACK_Y, 2.2, TRACK_Z + 3, P, 20),
  },
  js: {
    body: solid(tokenPlan(9, 9), TRACK_Z, 3, 3, 0.4),
    mark: [0, 1, 2]
      .map((row) =>
        lineOnTop(
          [-2.6, TRACK_Y - 2.4 + row * 2.4],
          [-2.6 + [5.4, 3.6, 4.6][row], TRACK_Y - 2.4 + row * 2.4],
          TRACK_Z + 3,
          P,
        ),
      )
      .join(''),
  },
  native: {
    body: solid(tokenPlan(9, 9), TRACK_Z, 13, 3, 0.6),
    mark: ring(0, TRACK_Y, 2.4, TRACK_Z + 13, P, 6),
  },
};
export const TOKEN_START = TRACK_X0 + 8;

/* ---------- Store-review bin ---------- */

const inner = insetPlan(BIN, BIN_WALL);
export const BIN_ART = {
  back: solid({ ...BIN, d: BIN_WALL }, 2, BIN_H - 2, 2, 0.2),
  floor: solid(BIN, 0, 2, 3, 0.3),
  front: solid(
    { ...BIN, d: BIN_WALL, y: BIN.y + BIN.d - BIN_WALL },
    2,
    BIN_H - 2,
    2,
    0.2,
  ),
  inner: planOutline(inner, 2, P, 2),
  left: solid({ ...BIN, w: BIN_WALL }, 2, BIN_H - 2, 2, 0.2),
  right: solid(
    { ...BIN, w: BIN_WALL, x: BIN.x + BIN.w - BIN_WALL },
    2,
    BIN_H - 2,
    2,
    0.2,
  ),
  /** Review clock on the bin front, in the face plane. */
  dial: sideMatrix([BIN.x + BIN.w / 2, BIN.y + BIN.d], 7, P, 'left'),
  screws: [
    at([BIN.x + 2, BIN.y + BIN.d, BIN_H - 1.4]),
    at([BIN.x + BIN.w - 2, BIN.y + BIN.d, BIN_H - 1.4]),
  ],
};
/** Height the token drops by when it lands in the bin. */
export const BIN_DROP = TRACK_Z - 2;

/* ---------- Server ---------- */

export const SERVER_ART = {
  body: solid(SERVER, 3, SERVER_TOP - 3, 4, 1),
  groove: planOutline(insetPlan(SERVER, 2.4), SERVER_TOP, P, 3),
  plinth: solid(insetPlan(SERVER, -1.5), 0, 3, 4, 0.5),
  screws: corners(SERVER, 4).map(([x, y]) => at([x, y, SERVER_TOP])),
  seam: sideSeam(SERVER, 9, P, 4),
  /** Intake mouth on the front face, where the track enters. */
  bayRules: [26, 20]
    .map((z) =>
      F.lineOnY(SERVER.y + SERVER.d, SERVER.x + 8, SERVER.x + 16, z + 2),
    )
    .join(''),
  bays: [26, 20]
    .map((z) =>
      F.rectOnY(SERVER.y + SERVER.d, SERVER.x + 6, SERVER.x + 24, z, z + 4),
    )
    .join(''),
  lamp: at([SERVER.x + 29, SERVER.y + SERVER.d, 28]),
  lampRing: F.circleOnY(SERVER.x + 29, SERVER.y + SERVER.d, 28, 1.6, 14),
  socket: solid(
    { d: 7, r: 0.6, w: 3, x: SERVER_X1, y: TRACK_Y + 2.5 },
    6.4,
    6,
    3,
    0.3,
  ),
  socketMouth: F.rectOnX(SERVER_X1 + 3, TRACK_Y + 4, TRACK_Y + 8, 8.4, 10.4),
  vents: [0, 1, 2, 3]
    .map((row) =>
      F.rectOnX(
        SERVER_X1,
        SERVER.y + 5,
        SERVER.y + 14,
        14 + row * 3.4,
        15.4 + row * 3.4,
      ),
    )
    .join(''),
};

/* ---------- Cable ---------- */

const DOCK_SOCKET_X = 48;
const cablePoints: Point3[] = [
  [SERVER_X1 + 3, TRACK_Y + 6, 9.4],
  [SERVER_X1 + 8, TRACK_Y + 6, 9.4],
  [SERVER_X1 + 12, TRACK_Y + 6, 1.3],
  [DOCK_SOCKET_X, TRACK_Y + 6, 1.3],
  [DOCK_SOCKET_X, DOCK_FRONT + 7, 1.3],
  [DOCK_SOCKET_X, DOCK_FRONT + 3, 3.4],
];
export const CABLE = routeOf(P, cablePoints, 4);

/* ---------- Dock, phone and bundle slots ---------- */

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
  rest: solid(
    { d: 3, r: 1, w: PHONE.w - 8, x: PHONE.x + 4, y: PHONE.y - 4 },
    DOCK_TOP,
    32,
    3,
    0.4,
  ),
  screen: sideMatrix([SCREEN.x0, SCREEN_Y], SCREEN.z1, P, 'left'),
  sideButton: solid(
    { d: 2, r: 0.2, w: 0.7, x: PHONE.x + PHONE.w, y: PHONE.y + 1.5 },
    60,
    7,
    2,
  ),
  slots: Object.values(SLOT_X)
    .map((x) =>
      planOutline({ ...insetPlan(CARD, -1.2), x: x - 7.2 }, DOCK_TOP, P, 2),
    )
    .join(''),
  socket: solid(
    { d: 3, r: 0.6, w: 7, x: DOCK_SOCKET_X - 3.5, y: DOCK_FRONT },
    0.8,
    5.2,
    3,
    0.3,
  ),
  socketMouth: F.rectOnY(
    DOCK_FRONT + 3,
    DOCK_SOCKET_X - 2,
    DOCK_SOCKET_X + 2,
    2.4,
    4.4,
  ),
};
export const SCREEN_W = SCREEN.x1 - SCREEN.x0;
export const SCREEN_H = SCREEN.z1 - SCREEN.z0;

/** A bundle card, built at x = 0 in the slot row; moved along x. */
export const CARD_ART = {
  body: solid(CARD, DOCK_TOP, CARD_H, 3, 0.3),
  rules: [0, 1]
    .map((row) =>
      lineOnTop(
        [-3.6, SLOT_Y - 1.6 + row * 3],
        [-3.6 + [7, 5][row], SLOT_Y - 1.6 + row * 3],
        DOCK_TOP + CARD_H,
        P,
      ),
    )
    .join(''),
};
export const CARD_RISE = 18;
