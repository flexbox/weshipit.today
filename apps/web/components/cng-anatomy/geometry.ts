import {
  corners,
  cylinder,
  depthOf,
  insetPlan,
  knurl,
  lineOnTop,
  pathOf,
  planOutline,
  radialTicks,
  ring,
  sideArc,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
  type SolidPaths,
} from '../anatomy/kit/iso-kit';
import {
  ANDROID,
  BASE,
  BASE_H,
  BIN,
  BIN_TOP,
  BIN_WALL,
  COLUMN,
  COLUMN_TOP,
  DIAL_R,
  DIAL_STEPS,
  DIAL_TOP,
  DIAL_X,
  DIAL_Y,
  DIE_DX,
  DIE_H,
  DIE_Y0,
  DIE_Y1,
  FLOOR_Z,
  FOOT_H,
  HUB,
  IOS,
  LEVER,
  LIP_Z,
  MAG_CAP_Z,
  MAG_LAYERS,
  MAG_TOP,
  MAG_X,
  P,
  PLATE_H,
  PLATE_HALF,
  PLATE_TOP,
  PRESS_X,
  RAM,
  RAM_H,
  RAM_UP,
  STRIPPER_H,
  TRACK_X0,
  TRACK_X1,
  TRACK_Y0,
  TRACK_Y1,
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
const shift = (plan: Plan, dx: number, dy = 0): Plan => ({
  ...plan,
  x: plan.x + dx,
  y: plan.y + dy,
});

/** A closed slot on the vertical face at x, spanning y. */
function slotOnX(x: number, y0: number, y1: number, z0: number, z1: number) {
  return pathOf(
    [at([x, y0, z0]), at([x, y1, z0]), at([x, y1, z1]), at([x, y0, z1])],
    true,
  );
}

function hull(points: Flat[]): Flat[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Flat, a: Flat, b: Flat) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list: Flat[]) => {
    const out: Flat[] = [];
    for (const point of list) {
      while (
        out.length >= 2 &&
        cross(out[out.length - 2], out[out.length - 1], point) <= 0
      )
        out.pop();
      out.push(point);
    }
    return out;
  };
  const lower = half(sorted);
  const upper = half([...sorted].reverse());
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/** A round boss standing off a face at x: its axis runs along +x. */
function bossOnX(
  [x, y, z]: Point3,
  radius: number,
  depth: number,
  steps = 32,
): SolidPaths {
  const circle = (along: number) =>
    Array.from({ length: steps }, (_, step) => {
      const angle = (step / steps) * Math.PI * 2;
      return at([
        along,
        y + radius * Math.cos(angle),
        z + radius * Math.sin(angle),
      ]);
    });
  const back = circle(x);
  const face = circle(x + depth);
  const outline = pathOf(hull([...back, ...face]), true);
  return {
    fill: outline,
    outline,
    crease: '',
    top: pathOf(face, true),
    shades: ['', pathOf(hull([...back, ...face]), true), '', ''],
  };
}

/* ---------- Bench ---------- */

const RULER: Plan = { x: -160, y: 34, w: 220, d: 6, r: 1 };
const LABEL: Plan = { x: 96, y: 32, w: 60, d: 12, r: 2 };
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
  halo: solid(BASE, -BASE_H - FOOT_H, BASE_H).fill,
  feet: byDepth(corners(BASE, 22)).map(([x, y]) => [
    post(x, y, 7, -BASE_H - FOOT_H, 1.6, 28),
    post(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, 28),
  ]),
  slab: solid(BASE, -BASE_H, BASE_H, 8, 1.6),
  groove: planOutline(insetPlan(BASE, 5), 0, P),
  screwRings: join(
    corners(BASE, 10).map(([x, y]) => ring(x, y, 2.2, 0, P, 16)),
  ),
  screws: corners(BASE, 10).map(([x, y]) => at([x, y, 0])),
  ruler: solid(RULER, 0, 0.6, 3),
  ticksMinor: TICKS.minor,
  ticksMajor: TICKS.major,
  label: solid(LABEL, 0, 0.8, 4),
  labelLine: planOutline(insetPlan(LABEL, 1.6), 0.8, P),
  labelRules: [0, 1, 2].map((row) =>
    lineOnTop(
      [LABEL.x + 8, LABEL.y + 3.6 + row * 2.4],
      [LABEL.x + [46, 34, 40][row], LABEL.y + 3.6 + row * 2.4],
      0.8,
      P,
    ),
  ),
  labelScrews: [
    at([LABEL.x + 3.6, LABEL.y + LABEL.d / 2, 0.8]),
    at([LABEL.x + LABEL.w - 3.6, LABEL.y + LABEL.d / 2, 0.8]),
  ],
};

/* ---------- Press column (back) ---------- */

const COL_FACE_X = COLUMN.x + COLUMN.w;
const COL_FRONT = COLUMN.y + COLUMN.d;
const CAP_Z = COLUMN_TOP - 3;
const GIB_XS = [PRESS_X - 23, PRESS_X + 20];

export const COLUMN_ART = {
  plinth: solid(insetPlan(COLUMN, -2), 0, 4, 4, 0.6),
  plinthScrews: corners(insetPlan(COLUMN, -2), 2.2).map(([x, y]) =>
    at([x, y, 4]),
  ),
  block: solid(COLUMN, 4, CAP_Z - 4, 4, 1),
  seams: sideSeam(COLUMN, 16, P, 4) + sideSeam(COLUMN, CAP_Z - 8, P, 4),
  vents: join(
    [24, 28, 32, 36, 40].map((z) =>
      slotOnX(COL_FACE_X, COLUMN.y + 4, COLUMN.y + 16, z, z + 1.6),
    ),
  ),
  gibs: GIB_XS.map((x) =>
    solid({ x, y: COL_FRONT, w: 3, d: 2, r: 0.4 }, 12, CAP_Z - 20, 2, 0.3),
  ),
  gibScrews: GIB_XS.flatMap((x) =>
    [20, 44, 68].map((z) => at([x + 1.5, COL_FRONT + 2, z])),
  ),
  cap: solid(insetPlan(COLUMN, -1.4), CAP_Z, 3, 4, 0.8),
  capScrews: corners(COLUMN, 3.4).map(([x, y]) => at([x, y, COLUMN_TOP])),
  hubBoss: bossOnX(HUB, 7, 3),
  hubCollar: bossOnX([HUB[0] + 3, HUB[1], HUB[2]], 4.4, 2.2),
};

/* Run counter dial on the column top. */
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

export const DIAL_ART = {
  puck: post(DIAL_X, DIAL_Y, DIAL_R, COLUMN_TOP, 3, 48),
  knurl: knurl(DIAL_X, DIAL_Y, DIAL_R, COLUMN_TOP, DIAL_TOP, 40, P, 0.3),
  band: sideArc(DIAL_X, DIAL_Y, DIAL_R, COLUMN_TOP + 1, P, 32),
  bezel: ring(DIAL_X, DIAL_Y, DIAL_R - 0.9, DIAL_TOP, P, 48),
  minor: DIAL_TICKS.minor,
  major: DIAL_TICKS.major,
  hub: at([DIAL_X, DIAL_Y, DIAL_TOP]),
};

/** The dial needle, pointing at a run count. */
export function needleOf(runs: number) {
  const angle = (runs / DIAL_STEPS) * Math.PI * 2;
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

/** The lever on the pinion hub, at an angle in the y–z plane (0 points forward). */
export function leverOf(angle: number) {
  const x = HUB[0] + 5.2;
  const end: Point3 = [
    x,
    HUB[1] + Math.cos(angle) * LEVER,
    HUB[2] + Math.sin(angle) * LEVER,
  ];
  return {
    arm: segment([x, HUB[1], HUB[2]], end),
    knob: at(end),
  };
}

export const HUB_DOT = at([HUB[0] + 5.2, HUB[1], HUB[2]]);

/* ---------- Ram: app.json, with its config plugin dies. Built at RAM_UP. ---------- */

const STRIPPER = insetPlan(RAM, 2.5);
const RAM_Z = RAM_UP + STRIPPER_H;
const RAM_TOP = RAM_Z + RAM_H;
const SLIDER: Plan = {
  x: GIB_XS[0] + 3,
  y: COL_FRONT,
  w: GIB_XS[1] - GIB_XS[0] - 3,
  d: RAM.y - COL_FRONT,
  r: 0,
};
const SLIDER_TOP = RAM_TOP + 22;
const RAM_FRONT = RAM.y + RAM.d;
/** Guide pins sit just outside the plates, so a stroke never touches them. */
const GUIDE_XS = [RAM.x + 2.2, RAM.x + RAM.w - 2.2];
const GUIDE_Y = RAM_FRONT - 4;
const GUIDE_DROP = RAM_UP - FLOOR_Z + 2;

export const RAM_ART = {
  stripper: solid(STRIPPER, RAM_UP, STRIPPER_H, 4, 0.4),
  slider: solid(SLIDER, RAM_Z, SLIDER_TOP - RAM_Z, 2, 0.4),
  rack: join(
    Array.from({ length: 9 }, (_, index) => RAM_TOP + 2.4 + index * 2.2).map(
      (z) =>
        segment(
          [SLIDER.x + 1, SLIDER.y + SLIDER.d, z],
          [SLIDER.x + SLIDER.w - 1, SLIDER.y + SLIDER.d, z],
        ),
    ),
  ),
  block: solid(RAM, RAM_Z, RAM_H, 4, 1),
  seam: sideSeam(RAM, RAM_Z + 3, P, 4),
  screws: corners(RAM, 3.6).map(([x, y]) => at([x, y, RAM_TOP])),
  label: sideMatrix([PRESS_X - 4, RAM_FRONT], RAM_Z + 6.6, P, 'left'),
  /** Die sockets: a slot per plugin across the ram top, with a clamp screw at each end. */
  sockets: join(
    DIE_DX.map((dx) =>
      planOutline(
        {
          x: PRESS_X + dx - 2.6,
          y: DIE_Y0 - 1.6,
          w: 5.2,
          d: DIE_Y1 - DIE_Y0 + 3.2,
          r: 1.2,
        },
        RAM_TOP,
        P,
        3,
      ),
    ),
  ),
  socketScrews: DIE_DX.flatMap((dx) => [
    at([PRESS_X + dx, DIE_Y0 - 4, RAM_TOP]),
    at([PRESS_X + dx, DIE_Y1 + 4, RAM_TOP]),
  ]),
  /** Guide bushings at the front corners. */
  bushings: GUIDE_XS.map((x) => post(x, GUIDE_Y, 2.4, RAM_TOP, 2, 20)),
  bushingDots: GUIDE_XS.map((x) => at([x, GUIDE_Y, RAM_TOP + 2])),
  /** Guide pins hanging from the ram into bores in the bed. */
  pins: GUIDE_XS.map((x) =>
    post(x, GUIDE_Y, 1.4, RAM_UP - GUIDE_DROP, GUIDE_DROP, 16),
  ),
};

/** The bores in the bed, and the region above them the pins may show in. */
export const GUIDES = {
  bores: join(GUIDE_XS.map((x) => ring(x, GUIDE_Y, 2.2, FLOOR_Z, P, 20))),
  clip: join(GUIDE_XS.map((x) => post(x, GUIDE_Y, 1.8, FLOOR_Z, 120, 20).fill)),
};

/** One plugin die, built in its socket. */
export const DIES = DIE_DX.map((dx) => {
  const x = PRESS_X + dx;
  const bar: Plan = {
    x: x - 1.6,
    y: DIE_Y0,
    w: 3.2,
    d: DIE_Y1 - DIE_Y0,
    r: 0.8,
  };
  return {
    bar: solid(bar, RAM_TOP, DIE_H, 3, 0.4),
    ridge: lineOnTop([x, DIE_Y0 + 3], [x, DIE_Y1 - 3], RAM_TOP + DIE_H, P),
    tab: solid(
      { x: x - 2.2, y: DIE_Y1 - 1, w: 4.4, d: 3, r: 0.6 },
      RAM_TOP,
      DIE_H + 2,
      3,
      0.3,
    ),
    led: at([x, DIE_Y1 + 0.5, RAM_TOP + DIE_H + 2]),
  };
});

/* ---------- Track ---------- */

const ANVIL: Plan = {
  x: PRESS_X - 32,
  y: TRACK_Y0 + 2,
  w: 64,
  d: TRACK_Y1 - TRACK_Y0 - 4,
  r: 1.5,
};

const ROLLER_XS = [-96, -88, -80, 0, 8, 16, 84, 90];

export const TRACK = {
  floor: solid(
    {
      x: TRACK_X0,
      y: TRACK_Y0,
      w: TRACK_X1 - TRACK_X0,
      d: TRACK_Y1 - TRACK_Y0,
      r: 0,
    },
    0,
    FLOOR_Z,
    2,
  ),
  back: solid(
    { x: TRACK_X0, y: TRACK_Y0 - 3, w: TRACK_X1 - TRACK_X0, d: 3, r: 0.6 },
    0,
    LIP_Z,
    2,
    0.4,
  ),
  front: solid(
    { x: TRACK_X0, y: TRACK_Y1, w: TRACK_X1 - TRACK_X0, d: 3, r: 0.6 },
    0,
    LIP_Z,
    2,
    0.4,
  ),
  frontScrews: [-150, -110, -60, -20, 28, 60].map((x) =>
    at([x, TRACK_Y1 + 1.5, LIP_Z]),
  ),
  backScrews: [-150, 20, 60, 86].map((x) => at([x, TRACK_Y0 - 1.5, LIP_Z])),
  grooves: join(
    [TRACK_Y0 + 1, TRACK_Y1 - 1].map((y) =>
      lineOnTop([TRACK_X0, y], [TRACK_X1, y], FLOOR_Z, P),
    ),
  ),
  anvil: planOutline(ANVIL, FLOOR_Z, P, 3),
  /** Rollers between the stations: each one a pair of lines from lip to lip. */
  rollers: join(
    ROLLER_XS.flatMap((x) =>
      [x - 0.7, x + 0.7].map((rx) =>
        lineOnTop([rx, TRACK_Y0], [rx, TRACK_Y1], FLOOR_Z, P),
      ),
    ),
  ),
  axles: ROLLER_XS.map((x) => at([x, TRACK_Y1 + 1.5, LIP_Z])),
  anvilScrews: corners(ANVIL, 2.6).map(([x, y]) => at([x, y, FLOOR_Z])),
  /** The tray where the current ios/ and android/ wait. */
  trayMarks: join(
    [-PLATE_HALF, PLATE_HALF].flatMap((dx) =>
      [TRACK_Y0, TRACK_Y1].map((y) =>
        lineOnTop(
          [50 + dx, y + (y === TRACK_Y0 ? 1 : -1)],
          [50 + dx, y + (y === TRACK_Y0 ? 4 : -4)],
          FLOOR_Z,
          P,
        ),
      ),
    ),
  ),
};

/* ---------- Magazine of blanks (the SDK template) ---------- */

const MAG_POSTS: Plane[] = [
  [MAG_X - PLATE_HALF - 3, TRACK_Y0 - 3],
  [MAG_X + PLATE_HALF, TRACK_Y0 - 3],
  [MAG_X - PLATE_HALF - 3, TRACK_Y1],
  [MAG_X + PLATE_HALF, TRACK_Y1],
];
const magPost = ([x, y]: Plane) =>
  solid({ x, y, w: 3, d: 3, r: 0.5 }, LIP_Z, MAG_CAP_Z - LIP_Z, 2, 0.3);
const MAG_CAP: Plan = {
  x: MAG_X - PLATE_HALF - 3,
  y: TRACK_Y0 - 3,
  w: PLATE_HALF * 2 + 6,
  d: TRACK_Y1 - TRACK_Y0 + 6,
  r: 1.5,
};
const MAG_WINDOW = insetPlan(MAG_CAP, 6);

export const MAGAZINE = {
  backPosts: MAG_POSTS.slice(0, 2).map(magPost),
  frontPosts: MAG_POSTS.slice(2).map(magPost),
  /** Blank pairs stacked above the one being fed. */
  layers: Array.from({ length: MAG_LAYERS }, (_, layer) => {
    const z = FLOOR_Z + (layer + 1) * PLATE_H;
    return [IOS, ANDROID].map((plan) =>
      solid(shift(plan, MAG_X), z, PLATE_H, 4, 0.3),
    );
  }),
  weight: solid(
    insetPlan(shift({ ...IOS, d: ANDROID.y + ANDROID.d - IOS.y }, MAG_X), 6),
    MAG_TOP - 1,
    4,
    4,
    0.5,
  ),
  frame: solid(MAG_CAP, MAG_CAP_Z, 2.4, 4, 0.5),
  window: planOutline(MAG_WINDOW, MAG_CAP_Z + 2.4, P, 4),
  capScrews: MAG_POSTS.map(([x, y]) => at([x + 1.5, y + 1.5, MAG_CAP_Z + 2.4])),
  label: topMatrix(
    [MAG_X, MAG_CAP.y + MAG_CAP.d - 1.4],
    MAG_CAP_Z + 2.4,
    P,
    'x',
  ),
};

/* ---------- A plate pair (ios/ + android/), built at x = 0 ---------- */

const MARK_Y = 9;
const MARK_D = 12;

const plateParts = (plan: Plan) => ({
  body: solid(plan, FLOOR_Z, PLATE_H, 4, 0.5),
  groove: planOutline(insetPlan(plan, 1.6), PLATE_TOP, P, 4),
  holes: join(
    corners(plan, 3.4).map(([x, y]) => ring(x, y, 1, PLATE_TOP, P, 12)),
  ),
  label: topMatrix([plan.x + 4, plan.y + 6.4], PLATE_TOP, P, 'x'),
  sdk: topMatrix([plan.x + plan.w - 4, plan.y + 6.4], PLATE_TOP, P, 'x'),
  /** The impression each plugin die leaves. */
  marks: DIE_DX.map((dx) =>
    planOutline(
      { x: dx - 1.4, y: plan.y + MARK_Y, w: 2.8, d: MARK_D, r: 1.2 },
      PLATE_TOP,
      P,
      3,
    ),
  ),
  markDots: DIE_DX.map((dx) =>
    at([dx, plan.y + MARK_Y + MARK_D / 2, PLATE_TOP]),
  ),
});

export const PLATES = { ios: plateParts(IOS), android: plateParts(ANDROID) };

/** A hand edit: a shim screwed onto ios/ by hand. */
const SHIM: Plan = { x: 2, y: IOS.y + 2.4, w: 12, d: 4.4, r: 0.8 };
export const SHIM_ART = {
  body: solid(SHIM, PLATE_TOP, 1.4, 3, 0.3),
  screws: [
    at([SHIM.x + 2, SHIM.y + SHIM.d / 2, PLATE_TOP + 1.4]),
    at([SHIM.x + SHIM.w - 2, SHIM.y + SHIM.d / 2, PLATE_TOP + 1.4]),
  ],
};

export const PAIR_SHADOW = solid(
  insetPlan({ ...IOS, d: ANDROID.y + ANDROID.d - IOS.y }, 2),
  FLOOR_Z,
  0.1,
).fill;

/* ---------- Scrap bin ---------- */

const wall = (plan: Plan, h = BIN_TOP) => solid(plan, 0, h, 2, 0.3);

export const BIN_ART = {
  floor: solid(insetPlan(BIN, BIN_WALL), 0, 2.5, 2),
  back: wall({ x: BIN.x, y: BIN.y, w: BIN.w, d: BIN_WALL, r: 0.6 }),
  /** The wall the track feeds over is only as tall as the track floor. */
  left: wall({ x: BIN.x, y: BIN.y, w: BIN_WALL, d: BIN.d, r: 0.6 }, FLOOR_Z),
  right: wall({
    x: BIN.x + BIN.w - BIN_WALL,
    y: BIN.y,
    w: BIN_WALL,
    d: BIN.d,
    r: 0.6,
  }),
  front: wall({
    x: BIN.x,
    y: BIN.y + BIN.d - BIN_WALL,
    w: BIN.w,
    d: BIN_WALL,
    r: 0.6,
  }),
  /** A closed hand slot and two rivets on the front face. */
  handle: pathOf(
    [
      at([BIN.x + 24, BIN.y + BIN.d, 9]),
      at([BIN.x + 40, BIN.y + BIN.d, 9]),
      at([BIN.x + 40, BIN.y + BIN.d, 12]),
      at([BIN.x + 24, BIN.y + BIN.d, 12]),
    ],
    true,
  ),
  rivets: [BIN.x + 6, BIN.x + BIN.w - 6].flatMap((x) => [
    at([x, BIN.y + BIN.d, 4]),
    at([x, BIN.y + BIN.d, 12]),
  ]),
  rimScrews: [
    at([BIN.x + BIN.w - BIN_WALL / 2, BIN.y + 6, BIN_TOP]),
    at([BIN.x + BIN.w - BIN_WALL / 2, BIN.y + BIN.d - 6, BIN_TOP]),
    at([BIN.x + 8, BIN.y + BIN.d - BIN_WALL / 2, BIN_TOP]),
    at([BIN.x + BIN.w - 8, BIN.y + BIN.d - BIN_WALL / 2, BIN_TOP]),
  ],
};
