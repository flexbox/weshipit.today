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
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf } from '../parts';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 104, r: 10, w: 284, x: -152, y: -72 };

/** JS station, left. */
const JS: Plan = { d: 50, r: 3, w: 40, x: -142, y: -58 };
const JS_TOP = 34;
const JS_FRONT = JS.y + JS.d;

/** Native station, right. */
const NAT: Plan = { d: 56, r: 3, w: 46, x: 64, y: -60 };
const NAT_TOP = 42;
const NAT_FRONT = NAT.y + NAT.d;

/** Two belts between them: out (JS → native) at the back, back (native → JS) in front. */
export const BELT_X0 = -98;
export const BELT_X1 = 60;
export const OUT_Y = -38;
export const BACK_Y = -16;
const BELT_HALF = 7;
const BED_TOP = 6;
export const BELT_Z = BED_TOP + 0.8;
const RAIL_TOP = BED_TOP + 3.4;

/** Packets: one JSON message each, built at x = 0 on a belt. */
export const PACKET = { d: 9, h: 2.2, w: 10, wide: 18 };

/** Serialiser press over the start of the out belt. */
export const PRESS_X = -84;
const PRESS_COL: Plan = {
  d: 5,
  r: 0.8,
  w: 10,
  x: PRESS_X - 5,
  y: OUT_Y - BELT_HALF - 7,
};
const PRESS_TOP = 40;
export const RAM_UP = 22;
export const RAM_DOWN = BELT_Z + PACKET.h + 0.4;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(NAT, 0, NAT_TOP + 2),
    ...boxCorners(JS, 0, PRESS_TOP + 2),
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
  label: { d: 13, r: 2, w: 50, x: 70, y: 12 },
  ruler: { d: 6, r: 1, w: 180, x: -136, y: 18 },
});

/* ---------- Stations ---------- */

const station = (plan: Plan, top: number) => ({
  body: solid(plan, 3, top - 3, 4, 1),
  groove: planOutline(insetPlan(plan, 2.4), top, P, 3),
  plinth: solid(insetPlan(plan, -1.5), 0, 3, 4, 0.5),
  screws: corners(plan, 4).map(([x, y]) => at([x, y, top])),
  seam: sideSeam(plan, 9, P, 4),
});

export const JS_ART = {
  ...station(JS, JS_TOP),
  /** A small code window on the front face, with rule lines for source. */
  intake: F.rectOnX(
    JS.x + JS.w,
    BACK_Y - 5,
    BACK_Y + 5,
    BELT_Z - 0.4,
    BELT_Z + 4,
  ),
  lamp: at([JS.x + 9, JS_FRONT, 10]),
  lampRing: F.circleOnY(JS.x + 9, JS_FRONT, 10, 1.6, 14),
  vents: [0, 1, 2, 3]
    .map((row) =>
      F.rectOnX(
        JS.x + JS.w,
        JS.y + 6,
        JS.y + JS.d - 6,
        10 + row * 3,
        11.3 + row * 3,
      ),
    )
    .join(''),
  window: F.rectOnY(JS_FRONT, JS.x + 5, JS.x + JS.w - 5, 16, 29),
  windowFace: sideMatrix([JS.x + 5, JS_FRONT], 29, P, 'left'),
};
export const JS_WINDOW = { h: 13, w: JS.w - 10 };

export const NAT_ART = {
  ...station(NAT, NAT_TOP),
  vents: [0, 1, 2, 3, 4]
    .map((row) =>
      F.rectOnX(
        NAT.x + NAT.w,
        NAT.y + 8,
        NAT.y + NAT.d - 8,
        14 + row * 3.4,
        15.4 + row * 3.4,
      ),
    )
    .join(''),
  /** A strip of six frame lamps on the front face: the UI frames going by. */
  bay: F.rectOnY(NAT_FRONT, NAT.x + 6, NAT.x + 28, 9, 19),
  bayRules: [12, 16]
    .map((z) => F.lineOnY(NAT_FRONT, NAT.x + 8, NAT.x + 20, z))
    .join(''),
  frameRings: Array.from({ length: 6 }, (_, i) =>
    F.circleOnY(NAT.x + 9 + i * 5.6, NAT_FRONT, 29, 1.6, 14),
  ).join(''),
  frames: Array.from({ length: 6 }, (_, i) =>
    at([NAT.x + 9 + i * 5.6, NAT_FRONT, 29]),
  ),
  frameStrip: F.rectOnY(NAT_FRONT, NAT.x + 6, NAT.x + 40, 26, 32),
  lamp: at([NAT.x + 37, NAT_FRONT, 12]),
  lampRing: F.circleOnY(NAT.x + 37, NAT_FRONT, 12, 1.6, 14),
};

/* ---------- Belts ---------- */

const beltOf = (y: number) => {
  const bed: Plan = {
    d: BELT_HALF * 2 + 4,
    r: 1.5,
    w: BELT_X1 - BELT_X0,
    x: BELT_X0,
    y: y - BELT_HALF - 2,
  };
  const rail = (ry: number): Plan => ({
    d: 1.6,
    r: 0.4,
    w: BELT_X1 - BELT_X0,
    x: BELT_X0,
    y: ry,
  });
  return {
    band: planOutline(
      {
        d: BELT_HALF * 2,
        r: 0.5,
        w: BELT_X1 - BELT_X0 - 6,
        x: BELT_X0 + 3,
        y: y - BELT_HALF,
      },
      BED_TOP + 0.1,
      P,
      2,
    ),
    bed: solid(bed, 0, BED_TOP, 3, 0.5),
    bedSeam: sideSeam(bed, 2.4, P, 3),
    drum: F.circleOnX(BELT_X1, y, BED_TOP - 2.4, 2.2, 18),
    drumHub: at([BELT_X1, y, BED_TOP - 2.4]),
    railBack: solid(
      rail(y - BELT_HALF - 1.6),
      BED_TOP,
      RAIL_TOP - BED_TOP,
      2,
      0.2,
    ),
    railFront: solid(rail(y + BELT_HALF), BED_TOP, RAIL_TOP - BED_TOP, 2, 0.2),
    railScrews: [-80, -40, 0, 40].map((x) =>
      at([x, y + BELT_HALF + 0.8, RAIL_TOP]),
    ),
  };
};

export const BELTS = { back: beltOf(BACK_Y), out: beltOf(OUT_Y) };

const CLEAT_GAP = 8;

/** Cleats across a belt, slid by `phase` world units. */
export function cleatsOf(y: number, phase: number) {
  const out: string[] = [];
  const shift = ((phase % CLEAT_GAP) + CLEAT_GAP) % CLEAT_GAP;
  for (let x = BELT_X0 + 4 + shift; x < BELT_X1 - 3; x += CLEAT_GAP)
    out.push(
      lineOnTop(
        [x, y - BELT_HALF + 1],
        [x, y + BELT_HALF - 1],
        BED_TOP + 0.1,
        P,
      ),
    );
  return out.join('');
}

/* ---------- Packets ---------- */

/** A packet built centred on x = 0 at a belt's y; moved along x. */
export function packetOf(y: number, wide: boolean) {
  const w = wide ? PACKET.wide : PACKET.w;
  const plan: Plan = { d: PACKET.d, r: 0.8, w, x: -w / 2, y: y - PACKET.d / 2 };
  const top = BELT_Z + PACKET.h;
  const rows = wide ? [0.8, 0.6, 0.9, 0.5] : [0.7, 0.5, 0.8];
  return {
    body: solid(plan, BELT_Z, PACKET.h, 3, 0.3),
    braces: [
      lineOnTop(
        [-w / 2 + 1.2, plan.y + 1.4],
        [-w / 2 + 1.2, plan.y + PACKET.d - 1.4],
        top,
        P,
      ),
      lineOnTop(
        [w / 2 - 1.2, plan.y + 1.4],
        [w / 2 - 1.2, plan.y + PACKET.d - 1.4],
        top,
        P,
      ),
    ].join(''),
    rules: rows
      .map((share, row) =>
        lineOnTop(
          [-w / 2 + 2.6, plan.y + 2 + row * (wide ? 1.7 : 2.2)],
          [
            -w / 2 + 2.6 + (w - 4.4) * share,
            plan.y + 2 + row * (wide ? 1.7 : 2.2),
          ],
          top,
          P,
        ),
      )
      .join(''),
  };
}

/* ---------- Press ---------- */

export const PRESS_ART = {
  arm: solid(
    { d: 10, r: 0.8, w: 8, x: PRESS_X - 4, y: PRESS_COL.y + PRESS_COL.d },
    PRESS_TOP - 7,
    5,
    3,
    0.4,
  ),
  cap: solid(
    { d: 7, r: 1, w: 12, x: PRESS_X - 6, y: PRESS_COL.y - 1 },
    PRESS_TOP,
    2.4,
    3,
    0.4,
  ),
  capScrews: [PRESS_X - 3.6, PRESS_X + 3.6].map((x) =>
    at([x, PRESS_COL.y + 2.5, PRESS_TOP + 2.4]),
  ),
  column: solid(PRESS_COL, 0, PRESS_TOP, 3, 0.6),
  columnSeam: sideSeam(PRESS_COL, 6, P, 3),
  /** Guide rod from the arm down to the ram. */
  armBottom: PRESS_TOP - 7,
  rodX: PRESS_X,
  rodY: OUT_Y - 2,
};

const RAM: Plan = { d: 11, r: 1, w: 12, x: PRESS_X - 6, y: OUT_Y - 5.5 };
const RAM_H = 4;

/** Ram built at its rest height; translated down by the stroke. */
export const RAM_ART = {
  body: solid(RAM, RAM_UP, RAM_H, 3, 0.5),
  seam: sideSeam(RAM, RAM_UP + RAM_H / 2, P, 3),
};

/** The ram's guide rod, from the arm to the ram top at height z. */
export const rodOf = (z: number) =>
  F.lineOnY(
    PRESS_ART.rodY + 2,
    PRESS_X,
    PRESS_X,
    PRESS_ART.armBottom,
    z + RAM_H,
  );
