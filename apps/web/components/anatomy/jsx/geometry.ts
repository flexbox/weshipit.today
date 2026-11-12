import {
  boxCorners,
  fitProjection,
  iso,
  lineOnTop,
  pathOf,
  planOutline,
  sideSeam,
  slabOf,
  topMatrix,
  type Flat,
  type Plan,
  type Point3,
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, phoneOf, routeOf } from '../parts';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 104, r: 10, w: 262, x: -150, y: -64 };

/** The feed track the card rides along x. */
const TRACK: Plan = { d: 32, r: 2, w: 168, x: -142, y: -40 };
const TRACK_TOP = 4;
export const CARD_Z = TRACK_TOP + 0.4;
const CARD: Plan = { d: 24, r: 1.4, w: 46, x: -23, y: -36 };
const CARD_H = 1.6;
export const SLOT = { in: -112, out: 0, press: -58 } as const;

/** The press: two side cheeks, a crossbar and a roller just above the card. */
export const PRESS_X = SLOT.press;
const ROLLER_Z = CARD_Z + CARD_H + 2.4;
const ROLLER_R = 2.4;
const CHEEK = (y: number): Plan => ({ d: 4, r: 0.6, w: 12, x: PRESS_X - 6, y });

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 52, y: -50 }, 0, 80),
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
  label: { d: 13, r: 2, w: 44, x: 50, y: 22 },
  ruler: { d: 6, r: 1, w: 150, x: -136, y: 26 },
});

export const PHONE_ART = phoneOf(P, { sh: 58, sw: 32, x: 52, y: -50 });
export const DOCK_SOCKET = PHONE_ART.socketAt(58);

export const TRACK_ART = {
  bays: [SLOT.in, SLOT.out]
    .map((x) =>
      planOutline(
        { ...CARD, d: CARD.d + 2, w: 48, x: x - 24, y: CARD.y - 1 },
        TRACK_TOP,
        P,
        2,
      ),
    )
    .join(''),
  body: solid(TRACK, 0, TRACK_TOP, 4, 0.8),
  guides: [TRACK.y + 1.6, TRACK.y + TRACK.d - 1.6]
    .map((y) =>
      lineOnTop([TRACK.x + 3, y], [TRACK.x + TRACK.w - 3, y], TRACK_TOP, P),
    )
    .join(''),
  seam: sideSeam(TRACK, 1.8, P, 4),
  socket: solid(
    { d: 7, r: 0.6, w: 3, x: TRACK.x + TRACK.w + 3, y: TRACK.y + 8 },
    1.4,
    5.2,
    3,
    0.3,
  ),
  stop: solid(
    { d: TRACK.d, r: 1, w: 3, x: TRACK.x + TRACK.w, y: TRACK.y },
    0,
    TRACK_TOP + 4,
    3,
    0.4,
  ),
};

export const PRESS_ART = {
  bar: solid(
    { d: TRACK.d + 8, r: 0.8, w: 12, x: PRESS_X - 6, y: TRACK.y - 4 },
    ROLLER_Z + 12,
    4,
    3,
    0.5,
  ),
  barScrews: [TRACK.y - 2, TRACK.y + TRACK.d + 2].map((y) =>
    at([PRESS_X, y, ROLLER_Z + 16]),
  ),
  cheekBack: solid(CHEEK(TRACK.y - 4), 0, ROLLER_Z + 12, 3, 0.5),
  cheekFront: solid(CHEEK(TRACK.y + TRACK.d), 0, ROLLER_Z + 12, 3, 0.5),
  hub: at([PRESS_X, TRACK.y + TRACK.d, ROLLER_Z]),
  lamp: at([PRESS_X, TRACK.y + TRACK.d + 4, ROLLER_Z + 8]),
  lampRing: F.circleOnY(PRESS_X, TRACK.y + TRACK.d + 4, ROLLER_Z + 8, 1.5, 14),
};

/** The roller: a drum along y with a stripe that turns by `phase`. */
export function rollerOf(phase: number) {
  const y0 = TRACK.y - 1;
  const y1 = TRACK.y + TRACK.d + 1;
  const ring = (y: number): Flat[] =>
    Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return iso(
        [
          PRESS_X + ROLLER_R * Math.cos(a),
          y,
          ROLLER_Z + ROLLER_R * Math.sin(a),
        ],
        P,
      );
    });
  const back = ring(y0);
  const front = ring(y1);
  const all = [...back, ...front];
  // Silhouette: the convex hull of both end rings.
  const hull = hullOf(all);
  const stripe = (offset: number): Point3[] => {
    const a = phase + offset;
    return [
      [PRESS_X + ROLLER_R * Math.cos(a), y0, ROLLER_Z + ROLLER_R * Math.sin(a)],
      [PRESS_X + ROLLER_R * Math.cos(a), y1, ROLLER_Z + ROLLER_R * Math.sin(a)],
    ];
  };
  const visible = (offset: number) =>
    Math.sin(phase + offset) > -0.2 && Math.cos(phase + offset) > -0.6;
  return {
    body: pathOf(hull, true),
    end: pathOf(front, true),
    stripes: [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
      .filter(visible)
      .map((offset) => pathOf(stripe(offset).map(at)))
      .join(''),
  };
}

function hullOf(points: Flat[]): Flat[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Flat, a: Flat, b: Flat) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: Flat[] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper: Flat[] = [];
  for (const p of [...sorted].reverse()) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/** A code card, built at x = 0; translated along x. */
export const CARD_ART = {
  body: solid(CARD, CARD_Z, CARD_H, 3, 0.3),
  face: topMatrix([CARD.x + 2.4, CARD.y + 3.6], CARD_Z + CARD_H, P, 'x'),
  gutter: lineOnTop(
    [CARD.x + 1.6, CARD.y + 1.6],
    [CARD.x + 1.6, CARD.y + CARD.d - 1.6],
    CARD_Z + CARD_H,
    P,
  ),
};

const cablePoints: Point3[] = [
  [TRACK.x + TRACK.w + 6, TRACK.y + 11.5, 4],
  [TRACK.x + TRACK.w + 11, TRACK.y + 11.5, 1.3],
  [TRACK.x + TRACK.w + 11, -14, 1.3],
  [58, -14, 1.3],
  DOCK_SOCKET.end,
];
export const CABLE = routeOf(P, cablePoints, 4);
