import {
  coil,
  corners,
  cylinder,
  depthOf,
  insetPlan,
  knurl,
  lineOnTop,
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
import {
  BASE,
  BASE_H,
  CABLE_Z,
  DOCK,
  DOCK_FRONT,
  DOCK_TOP,
  FOOT_H,
  KEY_W,
  KEY_XS,
  KEY_Y,
  KEYPAD,
  KEYPAD_TOP,
  LAMP_AT,
  P,
  PHONE,
  PHONE_TOP,
  PHONE_Z,
  POST_W,
  POST_X,
  ROD_Y,
  ROD_Z,
  SCREEN,
  SCREEN_Y,
  SERVER,
  SERVER_FRONT,
  SERVER_SOCKET,
  SERVER_TOP,
  SHAKER,
  SHAKER_TOP,
  SLED_W,
  SLED_X,
  SOCKET_X,
  SOCKET_Z,
  SWITCH_AT,
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
/** A circle on a face of constant y. */
const circleOnY = (cx: number, y: number, cz: number, r: number, steps = 20) =>
  pathOf(
    Array.from({ length: steps }, (_, step) => {
      const angle = (step / steps) * Math.PI * 2;
      return at([cx + r * Math.cos(angle), y, cz + r * Math.sin(angle)]);
    }),
    true,
  );

/* ---------- Bench ---------- */

const RULER: Plan = { d: 6, r: 1, w: 150, x: -130, y: 54 };
const LABEL: Plan = { d: 13, r: 2, w: 50, x: 48, y: 44 };
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
      [LABEL.x + 8, LABEL.y + 4 + row * 2.6],
      [LABEL.x + [42, 30, 36][row], LABEL.y + 4 + row * 2.6],
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

/* ---------- Dock and phone (the development build) ---------- */

const SWITCH_Z = DOCK_TOP + 1.8;

export const DOCK_ART = {
  body: solid(DOCK, 0, DOCK_TOP, 6, 1),
  footGroove: planOutline(
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
  groove: planOutline(insetPlan(DOCK, 2.4), DOCK_TOP, P, 4),
  screws: corners(DOCK, 4).map(([x, y]) => at([x, y, DOCK_TOP])),
  seam: sideSeam(DOCK, 3, P, 6),
  /** Back rest the phone leans on. */
  rest: solid(
    { d: 3, r: 1, w: PHONE.w - 8, x: PHONE.x + 4, y: PHONE.y - 4 },
    DOCK_TOP,
    36,
    3,
    0.4,
  ),
  /** DEV lamp: a bezel ring with a jewel in it. */
  lamp: at([LAMP_AT[0], LAMP_AT[1], DOCK_TOP + 1.3]),
  lampBezel: post(LAMP_AT[0], LAMP_AT[1], 2.6, DOCK_TOP, 1.2, 20),
  lampRing: ring(LAMP_AT[0], LAMP_AT[1], 1.6, DOCK_TOP + 1.2, P, 16),
  /** Build switch: a puck with a pointer and two detents. */
  detents: join(
    [-0.8, 0.8].map((angle) =>
      lineOnTop(
        [
          SWITCH_AT[0] + Math.sin(angle) * 5.2,
          SWITCH_AT[1] - Math.cos(angle) * 5.2,
        ],
        [
          SWITCH_AT[0] + Math.sin(angle) * 6.8,
          SWITCH_AT[1] - Math.cos(angle) * 6.8,
        ],
        DOCK_TOP,
        P,
      ),
    ),
  ),
  switchKnurl: knurl(SWITCH_AT[0], SWITCH_AT[1], 4, DOCK_TOP, SWITCH_Z, 36, P),
  switchPuck: post(SWITCH_AT[0], SWITCH_AT[1], 4, DOCK_TOP, 1.8, 28),
  switchRing: ring(SWITCH_AT[0], SWITCH_AT[1], 2.8, SWITCH_Z, P, 24),
  /** One socket shell per cable on the dock front. */
  sockets: Object.values(SOCKET_X).map((x) => ({
    mouth: rectOnY(DOCK_FRONT + 3, x - 2, x + 2, SOCKET_Z - 1, SOCKET_Z + 1),
    screws: [
      at([x - 2.4, DOCK_FRONT + 1.5, 6]),
      at([x + 2.4, DOCK_FRONT + 1.5, 6]),
    ],
    shell: solid(
      { d: 3, r: 0.6, w: 7, x: x - 3.5, y: DOCK_FRONT },
      0.4,
      5.6,
      3,
      0.3,
    ),
  })),
};

/** Switch pointer: -1 points at the debug detent, +1 at release. */
export function switchOf(side: number) {
  const angle = side * 0.8;
  return lineOnTop(
    SWITCH_AT,
    [
      SWITCH_AT[0] + Math.sin(angle) * 2.6,
      SWITCH_AT[1] - Math.cos(angle) * 2.6,
    ],
    SWITCH_Z + 0.1,
    P,
  );
}
export const SWITCH_HUB = at([SWITCH_AT[0], SWITCH_AT[1], SWITCH_Z + 0.1]);

export const PHONE_ART = {
  bezel: rectOnY(
    SCREEN_Y,
    SCREEN.x0 - 0.8,
    SCREEN.x1 + 0.8,
    SCREEN.z0 - 0.8,
    SCREEN.z1 + 0.8,
  ),
  body: solid(PHONE, PHONE_Z - 2, PHONE_TOP - PHONE_Z + 2, 6, 0.6),
  camera: at([SCREEN.x1 - 4, SCREEN_Y, (SCREEN.z1 + PHONE_TOP) / 2]),
  glass: rectOnY(SCREEN_Y, SCREEN.x0, SCREEN.x1, SCREEN.z0, SCREEN.z1),
  sideButtons: [
    solid(
      { d: 2, r: 0.2, w: 0.7, x: PHONE.x + PHONE.w, y: PHONE.y + 1.5 },
      70,
      8,
      2,
    ),
    solid(
      { d: 2, r: 0.2, w: 0.7, x: PHONE.x + PHONE.w, y: PHONE.y + 1.5 },
      60,
      5,
      2,
    ),
  ],
  speaker: segment(
    [(SCREEN.x0 + SCREEN.x1) / 2 - 3, SCREEN_Y, (SCREEN.z1 + PHONE_TOP) / 2],
    [(SCREEN.x0 + SCREEN.x1) / 2 + 3, SCREEN_Y, (SCREEN.z1 + PHONE_TOP) / 2],
    P,
  ),
  /** Front lip of the dock, in front of the phone's foot. */
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

/* ---------- Metro dev server ---------- */

const SX1 = SERVER.x + SERVER.w;

export const SERVER_ART = {
  body: solid(SERVER, 3, SERVER_TOP - 3, 4, 1),
  plinth: solid(insetPlan(SERVER, -1.5), 0, 3, 4, 0.5),
  screws: corners(SERVER, 4).map(([x, y]) => at([x, y, SERVER_TOP])),
  seam: sideSeam(SERVER, 8, P, 4),
  topGroove: planOutline(insetPlan(SERVER, 2.4), SERVER_TOP, P, 3),
  vents: join(
    [0, 1, 2, 3, 4, 5].flatMap((row) =>
      [0, 1].map((column) =>
        slotOnX(
          SX1,
          SERVER.y + 5 + column * 13,
          SERVER.y + 15 + column * 13,
          20 + row * 3.6,
          21.4 + row * 3.6,
        ),
      ),
    ),
  ),
  /** Two drive bays and a power ring on the front face. */
  bayRules: join(
    [36, 30].map((z) =>
      segment(
        [SERVER.x + 7, SERVER_FRONT, z + 2],
        [SERVER.x + 17, SERVER_FRONT, z + 2],
        P,
      ),
    ),
  ),
  bays: join(
    [36, 30].map((z) =>
      rectOnY(SERVER_FRONT, SERVER.x + 5, SERVER.x + 27, z, z + 4),
    ),
  ),
  power: circleOnY(SERVER.x + 33, SERVER_FRONT, 38, 2.2),
  /** Engraved port number, in the plane of the front face. */
  label: sideMatrix([SERVER.x + 5, SERVER_FRONT], 24, P, 'left'),
  lamp: at([SX1 - 7, SERVER_FRONT - 6, SERVER_TOP + 0.1]),
  lampRing: ring(SX1 - 7, SERVER_FRONT - 6, 1.8, SERVER_TOP, P, 16),
  socket: solid(
    {
      d: 3,
      r: 0.6,
      w: 7,
      x: SERVER_SOCKET[0] - 3.5,
      y: SERVER_FRONT,
    },
    SERVER_SOCKET[2] - 3,
    6,
    3,
    0.3,
  ),
  socketMouth: rectOnY(
    SERVER_FRONT + 3,
    SERVER_SOCKET[0] - 2,
    SERVER_SOCKET[0] + 2,
    SERVER_SOCKET[2] - 1,
    SERVER_SOCKET[2] + 1,
  ),
};

/* ---------- Keypad (the simulator's keyboard) ---------- */

const KEY_TOP = KEYPAD_TOP + 6;

const keyPlan = (x: number): Plan => ({
  d: KEY_W,
  r: 2.4,
  w: KEY_W,
  x,
  y: KEY_Y,
});

export const KEYPAD_ART = {
  body: solid(KEYPAD, 0, KEYPAD_TOP, 4, 1),
  keys: KEY_XS.map((x) => ({
    cap: solid(
      keyPlan(x),
      KEYPAD_TOP + 0.6,
      KEY_TOP - KEYPAD_TOP - 0.6,
      4,
      1.2,
    ),
    dish: planOutline(insetPlan(keyPlan(x), 2.6), KEY_TOP, P, 4),
    face: topMatrix([x + KEY_W / 2, KEY_Y + KEY_W / 2], KEY_TOP, P, 'x'),
  })),
  led: at([KEYPAD.x + KEYPAD.w - 5, KEYPAD.y + 5, KEYPAD_TOP]),
  ledRing: ring(KEYPAD.x + KEYPAD.w - 5, KEYPAD.y + 5, 1.4, KEYPAD_TOP, P, 14),
  screws: corners(KEYPAD, 3).map(([x, y]) => at([x, y, KEYPAD_TOP])),
  seam: sideSeam(KEYPAD, 2.2, P, 4),
  wells: join(
    KEY_XS.map((x) => planOutline(insetPlan(keyPlan(x), -1), KEYPAD_TOP, P, 4)),
  ),
};

/* ---------- Shake sled (a physical device being shaken) ---------- */

const SLED: Plan = { d: 14, r: 1.4, w: SLED_W, x: SLED_X, y: ROD_Y - 7 };
const SLED_Z = SHAKER_TOP + 1.6;
const SLED_TOP = SLED_Z + 8;
const HANDSET: Plan = { d: 11, r: 1.2, w: 7, x: SLED_X + 2.5, y: ROD_Y - 5.5 };
const POST_TOP = ROD_Z + 5;

const postPlan = (x: number): Plan => ({
  d: 12,
  r: 0.8,
  w: POST_W,
  x,
  y: ROD_Y - 6,
});

export const SHAKER_ART = {
  base: solid(SHAKER, 0, SHAKER_TOP, 4, 0.8),
  posts: POST_X.map((x) =>
    solid(postPlan(x), SHAKER_TOP, POST_TOP - SHAKER_TOP, 3, 0.4),
  ),
  postScrews: POST_X.map((x) => at([x + POST_W / 2, ROD_Y - 3.4, POST_TOP])),
  rail: join(
    [ROD_Y - 3, ROD_Y + 3].map((y) =>
      lineOnTop([POST_X[0] + POST_W, y], [POST_X[1], y], SHAKER_TOP, P),
    ),
  ),
  rodEnds: POST_X.map((x, index) =>
    sideRing([index ? x : x + POST_W, ROD_Y, ROD_Z], 0.9, 'x', P, 14),
  ),
  screws: corners(SHAKER, 2.6).map(([x, y]) => at([x, y, SHAKER_TOP])),
  seam: sideSeam(SHAKER, 1.8, P, 4),
  /** Sled, built at rest; it moves along x. */
  bushing: sideRing([SLED.x + SLED.w, ROD_Y, ROD_Z], 1.6, 'x', P, 16),
  handset: solid(HANDSET, SLED_TOP, 1.3, 3, 0.3),
  handsetGlass: planOutline(insetPlan(HANDSET, 1), SLED_TOP + 1.3, P, 3),
  sled: solid(SLED, SLED_Z, SLED_TOP - SLED_Z, 3, 0.6),
  sledSeam: sideSeam(SLED, SLED_Z + 2, P, 3),
};

/** Rod and coil springs for a sled displaced by dx: the parts that stretch. */
export function springsOf(dx: number) {
  const left0 = POST_X[0] + POST_W;
  const left1 = SLED_X + dx;
  const right0 = SLED_X + SLED_W + dx;
  const right1 = POST_X[1];
  const left = coil(left0, left1, [ROD_Y, ROD_Z], 2.6, 5, 'x', P, 14);
  const right = coil(right0, right1, [ROD_Y, ROD_Z], 2.6, 5, 'x', P, 14);
  return {
    leftBack: left.back,
    leftFront: left.front,
    rightBack: right.back,
    rightFront: right.front,
    rodLeft: segment([left0, ROD_Y, ROD_Z], [left1 + 1, ROD_Y, ROD_Z], P),
    rodRight: segment([right0, ROD_Y, ROD_Z], [right1, ROD_Y, ROD_Z], P),
  };
}

/* ---------- Cables (the line paths a signal runs along) ---------- */

/** Round every corner of a 3D route with a quadratic bend, then project it. */
function routeOf(points: Point3[], radius: number): Flat[] {
  const out: Point3[] = [points[0]];
  const lerp = (a: Point3, b: Point3, t: number): Point3 => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
  const length = (a: Point3, b: Point3) =>
    Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  for (let index = 1; index < points.length - 1; index++) {
    const [a, b, c] = [points[index - 1], points[index], points[index + 1]];
    const cutIn = Math.min(radius, length(a, b) / 2) / length(a, b);
    const cutOut = Math.min(radius, length(b, c) / 2) / length(b, c);
    const p0 = lerp(b, a, cutIn);
    const p2 = lerp(b, c, cutOut);
    for (let step = 0; step <= 10; step++) {
      const t = step / 10;
      out.push(lerp(lerp(p0, b, t), lerp(b, p2, t), t));
    }
  }
  out.push(points[points.length - 1]);
  return out.map(at);
}

const socketEnd = (x: number): Point3 => [x, DOCK_FRONT + 3, SOCKET_Z];

/** Each route runs from its source to its dock socket. */
export const CABLES = {
  keys: routeOf(
    [
      [-104, KEYPAD.y + 2, CABLE_Z],
      [-104, -6, CABLE_Z],
      [SOCKET_X.keys, -6, CABLE_Z],
      [SOCKET_X.keys, DOCK_FRONT + 8, CABLE_Z],
      socketEnd(SOCKET_X.keys),
    ],
    6,
  ),
  metro: routeOf(
    [
      [SERVER_SOCKET[0], SERVER_FRONT + 3, SERVER_SOCKET[2]],
      [SERVER_SOCKET[0], SERVER_FRONT + 7, SERVER_SOCKET[2]],
      [SERVER_SOCKET[0], SERVER_FRONT + 11, CABLE_Z],
      [SOCKET_X.metro, SERVER_FRONT + 11, CABLE_Z],
      [SOCKET_X.metro, DOCK_FRONT + 8, CABLE_Z],
      socketEnd(SOCKET_X.metro),
    ],
    6,
  ),
  shake: routeOf(
    [
      [SOCKET_X.shake, SHAKER.y + 2, CABLE_Z],
      [SOCKET_X.shake, DOCK_FRONT + 8, CABLE_Z],
      socketEnd(SOCKET_X.shake),
    ],
    4,
  ),
};

export type Cable = keyof typeof CABLES;

export const cablePath = (cable: Cable) => pathOf(CABLES[cable]);

/** Clips that hold each cable to the bench, drawn over it. */
const clipAcross = (x: number, y: number, along: 'x' | 'y') => {
  const plan: Plan =
    along === 'x'
      ? { d: 7, r: 0.6, w: 3.2, x: x - 1.6, y: y - 3.5 }
      : { d: 3.2, r: 0.6, w: 7, x: x - 3.5, y: y - 1.6 };
  const feet: Plane[] =
    along === 'x'
      ? [
          [x, y - 2.5],
          [x, y + 2.5],
        ]
      : [
          [x - 2.5, y],
          [x + 2.5, y],
        ];
  return {
    body: solid(plan, 0, CABLE_Z + 1.6, 3, 0.3),
    screws: feet.map(([fx, fy]) => at([fx, fy, CABLE_Z + 1.6])),
  };
};

export const CLIPS = [
  clipAcross(-76, -6, 'x'),
  clipAcross(SOCKET_X.shake, 2, 'y'),
  clipAcross(38, SERVER_FRONT + 11, 'x'),
];
