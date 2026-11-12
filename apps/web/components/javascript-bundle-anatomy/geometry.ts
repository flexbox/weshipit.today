import {
  boxCorners,
  fitProjection,
  planOutline,
  sideMatrix,
  slabOf,
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

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 100, r: 10, w: 270, x: -150, y: -62 };

/** Input pad with the stack of source sheets. */
export const PAD: Plan = { d: 24, r: 2, w: 30, x: -140, y: -42 };
const PAD_TOP = 2;
export const SHEET: Plan = { d: 18, r: 0.8, w: 24, x: PAD.x + 3, y: PAD.y + 3 };
export const SHEET_H = 0.9;
export const STACK_Z = PAD_TOP;

/** Metro: a press housing at the back with a ram over the bed in front. */
const PRESS: Plan = { d: 22, r: 3, w: 38, x: -100, y: -58 };
const PRESS_TOP = 34;
const BED: Plan = { d: 26, r: 2, w: 38, x: -100, y: -36 };
const BED_TOP = 3;
export const BLOCK: Plan = { d: 16, r: 1.2, w: 22, x: -92, y: -31 };
export const BLOCK_Z = BED_TOP;
const RAM: Plan = { d: 20, r: 1, w: 28, x: -95, y: -33 };
export const RAM_UP = 26;
const RAM_H = 3;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 24, y: -48 }, 0, 76),
    ...boxCorners(PRESS, 0, PRESS_TOP + 2),
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
  label: { d: 11, r: 2, w: 40, x: 64, y: 22 },
  ruler: { d: 5, r: 1, w: 130, x: -136, y: 28 },
});

export const PHONE_ART = phoneOf(P, { sh: 54, sw: 28, x: 24, y: -48 });
export const DOCK_SOCKET = PHONE_ART.socketAt(30);
/** Where a release bundle sits: a slot on the dock ledge beside the phone. */
export const SLOT_AT: Point3 = [40, -30, PHONE_ART.dockTop];

export const PAD_ART = {
  body: solid(PAD, 0, PAD_TOP, 3, 0.4),
  inner: planOutline(
    { ...PAD, d: PAD.d - 4, w: PAD.w - 4, x: PAD.x + 2, y: PAD.y + 2 },
    PAD_TOP,
    P,
    2,
  ),
  label: sideMatrix([PAD.x + 2, PAD.y + PAD.d], 0.6, P, 'left'),
};

export const PRESS_ART = {
  ...housingOf(P, PRESS, PRESS_TOP),
  arm: solid(
    { d: 22, r: 1, w: 10, x: -86, y: PRESS.y + PRESS.d },
    PRESS_TOP - 6,
    5,
    3,
    0.4,
  ),
  bed: solid(BED, 0, BED_TOP, 3, 0.5),
  bedInner: planOutline(
    {
      ...BLOCK,
      d: BLOCK.d + 3,
      w: BLOCK.w + 3,
      x: BLOCK.x - 1.5,
      y: BLOCK.y - 1.5,
    },
    BED_TOP,
    P,
    2,
  ),
  label: sideMatrix([PRESS.x + 3, PRESS.y + PRESS.d], PRESS_TOP - 4, P, 'left'),
  lamp: at([PRESS.x + PRESS.w - 5, PRESS.y + PRESS.d, 24]),
  lampRing: F.circleOnY(PRESS.x + PRESS.w - 5, PRESS.y + PRESS.d, 24, 1.4, 12),
  socket: solid(
    { d: 7, r: 0.6, w: 3, x: PRESS.x + PRESS.w, y: -48 },
    2,
    5,
    3,
    0.3,
  ),
  vents: [0, 1, 2]
    .map((row) =>
      F.rectOnX(
        PRESS.x + PRESS.w,
        PRESS.y + 4,
        PRESS.y + PRESS.d - 4,
        8 + row * 3,
        9.3 + row * 3,
      ),
    )
    .join(''),
};

export const RAM_ART = {
  body: solid(RAM, RAM_UP, RAM_H, 3, 0.4),
  rod: F.lineOnY(RAM.y + RAM.d / 2, -81, -81, RAM_UP + RAM_H, PRESS_TOP - 6),
};

const GAUGE: Plan = { d: 22, r: 2.5, w: 26, x: 86, y: -40 };
export const GAUGE_ART = {
  ...housingOf(P, GAUGE, 24),
  dial: sideMatrix([GAUGE.x + GAUGE.w / 2, GAUGE.y + GAUGE.d], 13, P, 'left'),
  label: sideMatrix([GAUGE.x + 3, GAUGE.y + GAUGE.d], 3.4, P, 'left'),
};

const cablePoints: Point3[] = [
  [PRESS.x + PRESS.w + 3, -44.5, 4.5],
  [PRESS.x + PRESS.w + 8, -44.5, 1.3],
  [-50, -44.5, 1.3],
  [-50, -6, 1.3],
  [30, -6, 1.3],
  DOCK_SOCKET.end,
];
export const CABLE = routeOf(P, cablePoints, 4);

/** The bundle block at height h, built on the bed. */
export const blockOf = (h: number) =>
  solid(BLOCK, BLOCK_Z, Math.max(0.6, h), 3, 0.4);
export const blockTop = (h: number) =>
  planOutline(
    {
      ...BLOCK,
      d: BLOCK.d - 3,
      w: BLOCK.w - 3,
      x: BLOCK.x + 1.5,
      y: BLOCK.y + 1.5,
    },
    BLOCK_Z + h,
    P,
    2,
  );
export const blockFace = (h: number) =>
  sideMatrix(
    [BLOCK.x + 1.6, BLOCK.y + BLOCK.d],
    BLOCK_Z + h / 2 - 1,
    P,
    'left',
  );
export const BLOCK_CENTER: Point3 = [
  BLOCK.x + BLOCK.w / 2,
  BLOCK.y + BLOCK.d / 2,
  BLOCK_Z,
];
