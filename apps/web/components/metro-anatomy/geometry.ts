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
  ring,
  segment,
  sideMatrix,
  sideRing,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
} from '../anatomy/kit/iso-kit';
import { EDGES, FILES } from './model';
import {
  ARM,
  ARM_TOP,
  ARM_Z,
  BASE,
  BASE_H,
  CABINET,
  CABINET_TOP,
  CARD,
  CARD_H,
  COLUMN,
  COLUMN_TOP,
  DECK,
  DOCK,
  DOCK_TOP,
  FACE_Y,
  FLOOR_Z,
  FOOT_H,
  HEAD,
  HEAD_Z,
  LANE_X0,
  LANE_X1,
  LANE_Y0,
  LANE_Y1,
  LIP_Z,
  P,
  PANEL_Y,
  PHONE,
  PHONE_TOP,
  PHONE_Z,
  SCREEN,
  SCREEN_Y,
  SERVER,
  SERVER_TOP,
  SOCKET,
  SX,
  TRAY_XS,
  TRAY_Y,
  TX,
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
  steps = 24,
) => cylinder(x, y, r, z, h, P, steps);
const join = (paths: string[]) => paths.join('');
const byDepth = (points: Plane[]) =>
  [...points].sort(
    (a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P),
  );
/** A closed slot on a face of constant x. */
const slotOnX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
  pathOf(
    [at([x, y0, z0]), at([x, y1, z0]), at([x, y1, z1]), at([x, y0, z1])],
    true,
  );
/** A closed rectangle on a face of constant y. */
const rectOnY = (y: number, x0: number, x1: number, z0: number, z1: number) =>
  pathOf(
    [at([x0, y, z0]), at([x1, y, z0]), at([x1, y, z1]), at([x0, y, z1])],
    true,
  );
const lineOnY = (y: number, x0: number, x1: number, z: number) =>
  segment([x0, y, z], [x1, y, z], P);

/* ---------- Bench ---------- */

const RULER: Plan = { d: 6, r: 1, w: 168, x: -150, y: 34 };
const LABEL: Plan = { d: 12, r: 2, w: 46, x: 98, y: 27 };
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
      [LABEL.x + 8, LABEL.y + 3.8 + row * 2.6],
      [LABEL.x + [40, 28, 34][row], LABEL.y + 3.8 + row * 2.6],
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

/* ---------- Deck, trays and lane ---------- */

const LANE_W = LANE_X1 - LANE_X0;
const TRAY = (x: number): Plan => ({
  d: 18,
  r: 1.5,
  w: 22,
  x: x - 11,
  y: TRAY_Y - 9,
});

export const DECK_ART = {
  seam: sideSeam(DECK, 2.4, P, 4),
  slab: solid(DECK, 0, FLOOR_Z, 4, 0.8),
  trays: join(TRAY_XS.map((x) => planOutline(TRAY(x), FLOOR_Z, P, 3))),
  /** Back corner pegs that square a sheet in its tray. */
  back: solid({ d: 2, r: 0.5, w: 80, x: -4, y: LANE_Y0 - 2 }, 0, LIP_Z, 2, 0.3),
  front: solid(
    { d: 2, r: 0.5, w: LANE_W, x: LANE_X0, y: LANE_Y1 },
    0,
    LIP_Z,
    2,
    0.3,
  ),
  frontScrews: [-150, -110, -70, -30, 10, 40, 68].map((x) =>
    at([x, LANE_Y1 + 1, LIP_Z]),
  ),
  laneGrooves: join(
    [LANE_Y0 + 0.6, LANE_Y1 - 0.6].map((y) =>
      lineOnTop([LANE_X0, y], [LANE_X1, y], FLOOR_Z, P),
    ),
  ),
  pegs: TRAY_XS.flatMap((x) =>
    [x - 10.4, x + 10.4].map((px) =>
      post(px, TRAY_Y - 8.2, 1, FLOOR_Z, 3.4, 14),
    ),
  ),
  pegTops: TRAY_XS.flatMap((x) =>
    [x - 10.4, x + 10.4].map((px) => at([px, TRAY_Y - 8.2, FLOOR_Z + 3.4])),
  ),
  stopLeft: solid(
    { d: 22, r: 0.8, w: 3, x: LANE_X0 - 3, y: LANE_Y0 - 2 },
    0,
    14,
    3,
    0.4,
  ),
  stopRight: solid(
    { d: 22, r: 0.8, w: 3, x: LANE_X1, y: LANE_Y0 - 2 },
    0,
    14,
    3,
    0.4,
  ),
  stopScrews: [LANE_X0 - 1.5, LANE_X1 + 1.5].flatMap((x) => [
    at([x, LANE_Y0 + 1, 14]),
    at([x, LANE_Y1 - 1, 14]),
  ]),
};

/* ---------- File cabinet (the project on disk) ---------- */

const DRAWER_Z0 = 3;
const DRAWER_Z1 = 23;
const LAMP_Z = 20;

/** Import panel staples: how far behind the posts each edge runs. */
const STAPLE_BACK = [2.2, 2.2, 2.2, 4.6, 7.2];

export const CABINET_ART = {
  body: solid(CABINET, 2, CABINET_TOP - 2, 4, 1),
  drawers: TRAY_XS.map((x) => {
    const front: Plan = { d: 1.2, r: 0.4, w: 21, x: x - 10.5, y: FACE_Y };
    const y = FACE_Y + 1.2;
    return {
      front: solid(front, DRAWER_Z0, DRAWER_Z1 - DRAWER_Z0, 2, 0.3),
      handle: solid({ d: 1.4, r: 0.6, w: 9, x: x - 4.5, y }, 6.2, 1.4, 3, 0.2),
      lamp: at([x, y, LAMP_Z]),
      lampRing: sideRing([x, y, LAMP_Z], 1.6, 'y', P, 18),
      rules: [0, 1].map((row) =>
        lineOnY(y, x - 5.2, x + [3.6, 0.4][row], 14.6 - row * 2.2),
      ),
      window: rectOnY(y, x - 7, x + 7, 10.5, 16.5),
    };
  }),
  plinth: solid(insetPlan(CABINET, -1.5), 0, 2, 4, 0.4),
  seam: sideSeam(CABINET, CABINET_TOP - 3, P, 4),
  topGroove: planOutline(insetPlan(CABINET, 2.4), CABINET_TOP, P, 3),
  topScrews: corners(CABINET, 1.4).map(([x, y]) => at([x, y, CABINET_TOP])),
  /** Terminal posts on the panel, one per file. */
  posts: TRAY_XS.map((x) => post(x, PANEL_Y, 1.3, CABINET_TOP, 1.6, 16)),
  postTops: TRAY_XS.map((x) => at([x, PANEL_Y, CABINET_TOP + 1.6])),
  /** One staple per import edge, routed behind the posts on the panel. */
  edges: EDGES.map(([from, to], index) => {
    const back = PANEL_Y - STAPLE_BACK[index];
    const x0 = TRAY_XS[from];
    const x1 = TRAY_XS[to];
    return onTop(
      [
        [x0, PANEL_Y - 1.7],
        [x0, back],
        [x1, back],
        [x1, PANEL_Y - 1.7],
      ],
      CABINET_TOP,
      P,
    );
  }),
  /** Solder points where each staple meets its post. */
  joints: EDGES.flatMap(([from, to]) =>
    [from, to].map((file) => at([TRAY_XS[file], PANEL_Y - 1.7, CABINET_TOP])),
  ),
  /** The entry point: a second ring on index.js's post. */
  entryRing: ring(TRAY_XS[0], PANEL_Y, 2.6, CABINET_TOP, P, 20),
};

/* ---------- Transformer (Babel) ---------- */

const FOOT = insetPlan(COLUMN, -2.2);
const KNOB: Plane = [TX, COLUMN.y + COLUMN.d / 2];
const CACHE_Y = 15;
export const CACHE_XS = FILES.map((_, index) => TX - 7.5 + index * 3);

export const TRANSFORMER = {
  arm: solid(ARM, ARM_Z, ARM_TOP - ARM_Z, 4, 0.8),
  armScrews: [
    at([ARM.x + 3, ARM.y + 3, ARM_TOP]),
    at([ARM.x + ARM.w - 3, ARM.y + 3, ARM_TOP]),
  ],
  armSeam: sideSeam(ARM, ARM_Z + 2.6, P, 4),
  column: solid(COLUMN, FLOOR_Z + 2, COLUMN_TOP - FLOOR_Z - 2, 4, 0.8),
  columnSeam: sideSeam(COLUMN, 12, P, 4),
  foot: solid(FOOT, FLOOR_Z, 2, 4, 0.5),
  footScrews: corners(FOOT, 1.6).map(([x, y]) => at([x, y, FLOOR_Z + 2])),
  vents: join(
    [14, 17, 20, 23, 26].map((z) =>
      slotOnX(COLUMN.x + COLUMN.w, COLUMN.y + 2.5, COLUMN.y + 9.5, z, z + 1.4),
    ),
  ),
  /** A plate on the arm that carries the cache lamps. */
  cacheLamps: CACHE_XS.map((x) => at([x, CACHE_Y, ARM_TOP + 0.5])),
  cachePlate: solid(
    { d: 5.2, r: 1, w: 17.4, x: TX - 9.5 + 0.8, y: CACHE_Y - 2.6 },
    ARM_TOP,
    0.5,
    3,
  ),
  cacheRings: join(
    CACHE_XS.map((x) => ring(x, CACHE_Y, 1.05, ARM_TOP + 0.5, P, 14)),
  ),
  head: solid(HEAD, HEAD_Z, ARM_Z - HEAD_Z, 3, 0.4),
  headLamp: at([TX, HEAD.y + HEAD.d, 18.4]),
  headLampRing: sideRing([TX, HEAD.y + HEAD.d, 18.4], 1.4, 'y', P, 16),
  headSeam: sideSeam(HEAD, HEAD_Z + 2.4, P, 3),
  knob: post(KNOB[0], KNOB[1], 4.2, COLUMN_TOP + 1.2, 2.6, 36),
  knobHub: post(KNOB[0], KNOB[1], 1.8, COLUMN_TOP, 1.2, 16),
  knobKnurl: knurl(
    KNOB[0],
    KNOB[1],
    4.2,
    COLUMN_TOP + 1.2,
    COLUMN_TOP + 3.8,
    30,
    P,
    0.3,
  ),
  knobMark: lineOnTop(
    [KNOB[0], KNOB[1]],
    [KNOB[0] + 2.6, KNOB[1] + 1],
    COLUMN_TOP + 3.8,
    P,
  ),
  knobRing: ring(KNOB[0], KNOB[1], 3.2, COLUMN_TOP + 3.8, P, 30),
  /** Rollers on the lane floor either side of the head. */
  rollers: [TX - 8, TX + 8].map((x) => post(x, -1, 1.3, LIP_Z, 2.6, 16)),
};

/* ---------- Bundle stack and dev server ---------- */

const HOLDER_BACK: Plan = { d: 4, r: 1, w: 24, x: SX - 12, y: LANE_Y0 - 6 };
const SWITCH: Plane = [SERVER.x + 24, SERVER.y + 9];
const SWITCH_Z = SERVER_TOP + 0.6;

export const STACK_ART = {
  back: solid(HOLDER_BACK, 0, 22, 3, 0.5),
  backScrews: [at([SX - 8, LANE_Y0 - 4, 22]), at([SX + 8, LANE_Y0 - 4, 22])],
  backSeam: sideSeam(HOLDER_BACK, 17, P, 3),
  postCaps: [SX - 12, SX + 12].map((px) => at([px, LANE_Y1 + 3.5, 13])),
  posts: [SX - 13.5, SX + 10.5].map((px) =>
    solid({ d: 3, r: 0.8, w: 3, x: px, y: LANE_Y1 + 2 }, 0, 13, 2, 0.3),
  ),
};

export const SERVER_ART = {
  body: solid(SERVER, FLOOR_Z, SERVER_TOP - FLOOR_Z, 4, 1),
  screws: corners(SERVER, 3.4).map(([x, y]) => at([x, y, SERVER_TOP])),
  seam: sideSeam(SERVER, FLOOR_Z + 4, P, 4),
  topGroove: planOutline(insetPlan(SERVER, 2.2), SERVER_TOP, P, 3),
  vents: join(
    [11, 14, 17, 20, 23, 26].map((z) =>
      slotOnX(SERVER.x + SERVER.w, SERVER.y + 3, SERVER.y + 8, z, z + 1.3),
    ),
  ),
  /** The one engraved label: the port the bundle is served on. */
  detents: [-1, 1].map((side) =>
    at([SWITCH[0] + side * 3.4, SWITCH[1] - 2.9, SWITCH_Z]),
  ),
  port: topMatrix([SERVER.x + 9, SERVER.y + 18.5], SERVER_TOP, P, 'x'),
  socket: solid(
    { d: 7, r: 0.6, w: 2.4, x: SOCKET[0], y: SOCKET[1] - 3.5 },
    SOCKET[2] - 3,
    6,
    2,
    0.2,
  ),
  socketLamp: at([SERVER.x + SERVER.w - 4, SERVER.y + 22, SERVER_TOP]),
  socketLampRing: ring(
    SERVER.x + SERVER.w - 4,
    SERVER.y + 22,
    1.5,
    SERVER_TOP,
    P,
    16,
  ),
  switchKnob: post(SWITCH[0], SWITCH[1], 2.6, SWITCH_Z, 2.4, 24),
  switchKnurl: knurl(
    SWITCH[0],
    SWITCH[1],
    2.6,
    SWITCH_Z,
    SWITCH_Z + 2.4,
    20,
    P,
    0.3,
  ),
  switchPlate: solid(
    { d: 8, r: 1.5, w: 10, x: SWITCH[0] - 5, y: SWITCH[1] - 4 },
    SERVER_TOP,
    0.6,
    3,
  ),
};

/** Platform switch pointer: -1 points at iOS (left detent), +1 at Android. */
export function switchOf(side: number) {
  const angle = side * 0.75;
  const z = SWITCH_Z + 2.4;
  return lineOnTop(
    SWITCH,
    [SWITCH[0] + Math.sin(angle) * 2.2, SWITCH[1] - Math.cos(angle) * 2.2],
    z,
    P,
  );
}

/* ---------- Cable (the dev socket) ---------- */

const CABLE_FROM: Point3 = [SOCKET[0] + 2.4, SOCKET[1], SOCKET[2]];
const CABLE_TO: Point3 = [DOCK.x, DOCK.y + 8, 3.6];
const SAG = 7;

/** A point on the cable, t in [0, 1]. */
export function cableAt(t: number): Point3 {
  const [x0, y0, z0] = CABLE_FROM;
  const [x1, y1, z1] = CABLE_TO;
  return [
    x0 + (x1 - x0) * t,
    y0 + (y1 - y0) * t,
    z0 + (z1 - z0) * t - SAG * 4 * t * (1 - t),
  ];
}

export const CABLE = {
  from: at(CABLE_FROM),
  to: at(CABLE_TO),
  via: Array.from({ length: 15 }, (_, step) => at(cableAt((step + 1) / 16))),
};

/* ---------- Dock and phone (the app) ---------- */

export const PHONE_ART = {
  dock: solid(DOCK, 0, DOCK_TOP, 6, 1),
  dockGroove: planOutline(
    {
      d: PHONE.d + 2.8,
      r: 1.6,
      w: PHONE.w + 2.8,
      x: PHONE.x - 1.4,
      y: PHONE.y - 1.4,
    },
    DOCK_TOP,
    P,
    3,
  ),
  dockScrews: corners(DOCK, 3).map(([x, y]) => at([x, y, DOCK_TOP])),
  dockSeam: sideSeam(DOCK, 2.6, P, 6),
  /** Back rest the phone leans on. */
  body: solid(PHONE, PHONE_Z - 2, PHONE_TOP - PHONE_Z + 2, 6, 0.6),
  rest: solid(
    { d: 3, r: 1, w: PHONE.w - 6, x: PHONE.x + 3, y: PHONE.y - 4 },
    DOCK_TOP,
    30,
    3,
    0.4,
  ),
  sideButtons: [
    solid(
      { d: 2, r: 0.2, w: 0.6, x: PHONE.x + PHONE.w, y: PHONE.y + 1 },
      48,
      6,
      2,
    ),
    solid(
      { d: 2, r: 0.2, w: 0.6, x: PHONE.x + PHONE.w, y: PHONE.y + 1 },
      40,
      4,
      2,
    ),
  ],
  /** Front lip of the dock, in front of the phone's foot. */
  bezel: rectOnY(
    SCREEN_Y,
    SCREEN.x0 - 0.8,
    SCREEN.x1 + 0.8,
    SCREEN.z0 - 0.8,
    SCREEN.z1 + 0.8,
  ),
  camera: at([
    (PHONE.x * 2 + PHONE.w) / 2,
    SCREEN_Y,
    (SCREEN.z1 + PHONE_TOP) / 2,
  ]),
  glass: rectOnY(SCREEN_Y, SCREEN.x0, SCREEN.x1, SCREEN.z0, SCREEN.z1),
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
  /** Screen plane: u along +x, v down from the top edge of the glass. */
  screen: sideMatrix([SCREEN.x0, SCREEN_Y], SCREEN.z1, P, 'left'),
};

export const SCREEN_W = SCREEN.x1 - SCREEN.x0;
export const SCREEN_H = SCREEN.z1 - SCREEN.z0;

/* ---------- Cards (one module each) ---------- */

/** Source text: irregular rule lines, like code in an editor. */
const SOURCE_ROWS = [
  [0, 11],
  [2, 9],
  [2, 13],
  [4, 6],
  [0, 4],
];

export const CARD_ART = {
  body: solid(CARD, 0, CARD_H, 3, 0.3),
  fold: pathOf([
    at([CARD.x + CARD.w - 3, CARD.y, CARD_H]),
    at([CARD.x + CARD.w, CARD.y + 3, CARD_H]),
  ]),
  seam: sideSeam(CARD, CARD_H / 2, P, 3),
  source: SOURCE_ROWS.map(([indent, length], row) =>
    lineOnTop(
      [CARD.x + 2.6 + indent, CARD.y + 2.6 + row * 2.2],
      [CARD.x + 2.6 + indent + length, CARD.y + 2.6 + row * 2.2],
      CARD_H,
      P,
    ),
  ),
  /** Transformed: plain JavaScript, dense and even. */
  built: [0, 1, 2, 3, 4].map((row) =>
    lineOnTop(
      [CARD.x + 2.6, CARD.y + 2.6 + row * 2.2],
      [CARD.x + CARD.w - 2.6, CARD.y + 2.6 + row * 2.2],
      CARD_H,
      P,
    ),
  ),
  /** An image asset: a frame with a mountain in it. */
  picture: join([
    planOutline(
      { d: 9.2, r: 0.4, w: 12, x: CARD.x + 3, y: CARD.y + 2.4 },
      CARD_H,
      P,
      1,
    ),
    onTop(
      [
        [CARD.x + 4.4, CARD.y + 11.6],
        [CARD.x + 8, CARD.y + 6],
        [CARD.x + 10.2, CARD.y + 8.4],
        [CARD.x + 11.6, CARD.y + 7.2],
        [CARD.x + 13.6, CARD.y + 11.6],
      ],
      CARD_H,
      P,
    ),
  ]),
  sun: at([CARD.x + 12.2, CARD.y + 4.4, CARD_H]),
  /** Registered asset: a stamp in the corner. */
  stamp: ring(CARD.x + 3.4, CARD.y + CARD.d - 2.6, 1, CARD_H, P, 12),
};

export const sheetAt = (file: number): Point3 => [
  TRAY_XS[file],
  TRAY_Y,
  FLOOR_Z,
];
