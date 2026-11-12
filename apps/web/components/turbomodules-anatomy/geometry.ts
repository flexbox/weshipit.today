import {
  boxCorners,
  fitProjection,
  lineOnTop,
  planOutline,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf, housingOf } from '../anatomy/parts';
import { MODULES } from './model';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 104, r: 10, w: 270, x: -150, y: -66 };

/** Backplane with one module per slot along x. */
const PLANE: Plan = { d: 22, r: 2, w: 204, x: -142, y: -58 };
const PLANE_TOP = 6;
const MOD_W = 20;
const MOD_D = 15;
export const MOD_Y = -55;
const MOD_FRONT = MOD_Y + MOD_D;
const MOD_TOP = 28;
export const MOD_XS = MODULES.map((_, i) => -130 + i * 24);
export const SOCKET_Z = 14;

/** Rail and the JS carriage in front of the rack. */
const RAIL: Plan = { d: 8, r: 1.2, w: 204, x: -142, y: -28 };
const RAIL_TOP = 4;
const CAR: Plan = { d: 12, r: 1.4, w: 16, x: -8, y: -30 };
const CAR_TOP = 18;
const CAR_BACK = CAR.y;
export const PLUNGER_REACH = CAR_BACK - MOD_FRONT;

/** Startup gauge on the right. */
const GAUGE: Plan = { d: 32, r: 3, w: 34, x: 74, y: -52 };
const GAUGE_TOP = 30;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(PLANE, 0, MOD_TOP + 2),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 50, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 13, r: 2, w: 48, x: 66, y: 18 },
  ruler: { d: 6, r: 1, w: 180, x: -136, y: 26 },
});

export const PLANE_ART = {
  body: solid(PLANE, 0, PLANE_TOP, 4, 0.6),
  screws: [PLANE.x + 3, PLANE.x + PLANE.w - 3].map((x) =>
    at([x, PLANE.y + 20, PLANE_TOP]),
  ),
  seam: sideSeam(PLANE, 2.4, P, 4),
  traces: [0, 1, 2]
    .map((row) =>
      lineOnTop(
        [PLANE.x + 4, PLANE.y + 18 + row * 1.2],
        [PLANE.x + PLANE.w - 4, PLANE.y + 18 + row * 1.2],
        PLANE_TOP,
        P,
      ),
    )
    .join(''),
};

export const MODULE_ART = MOD_XS.map((x) => {
  const plan: Plan = { d: MOD_D, r: 1.4, w: MOD_W, x: x - MOD_W / 2, y: MOD_Y };
  return {
    body: solid(plan, PLANE_TOP, MOD_TOP - PLANE_TOP, 3, 0.6),
    fins: [0, 1, 2]
      .map((k) => F.lineOnY(MOD_FRONT, x - 8, x + 1, 19 + k * 2))
      .join(''),
    label: sideMatrix([x - 8.4, MOD_FRONT], 9, P, 'left'),
    lamp: at([x + 6, MOD_FRONT, 22]),
    lampRing: F.circleOnY(x + 6, MOD_FRONT, 22, 1.4, 14),
    lid: planOutline(
      { ...plan, d: MOD_D - 4, w: MOD_W - 4, x: plan.x + 2, y: plan.y + 2 },
      MOD_TOP,
      P,
      2,
    ),
    seam: sideSeam(plan, MOD_TOP - 4, P, 3),
    socket: F.rectOnY(
      MOD_FRONT,
      x - 2.4,
      x + 2.4,
      SOCKET_Z - 2.4,
      SOCKET_Z + 2.4,
    ),
  };
});

export const RAIL_ART = {
  body: solid(RAIL, 0, RAIL_TOP, 3, 0.5),
  marks: MOD_XS.map((x) =>
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

/** The JS carriage, built at x = 0; translated along x. */
export const CAR_ART = {
  body: solid(CAR, RAIL_TOP, CAR_TOP - RAIL_TOP, 4, 0.8),
  face: topMatrix([0, CAR.y + CAR.d / 2], CAR_TOP, P, 'x'),
  screws: [
    at([CAR.x + 2, CAR.y + 2, CAR_TOP]),
    at([CAR.x + CAR.w - 2, CAR.y + 2, CAR_TOP]),
  ],
  seam: sideSeam(CAR, RAIL_TOP + 3, P, 4),
};

/** The plunger: a rod from the carriage's back face toward the module socket. */
export const plungerOf = (reach: number) =>
  solid(
    {
      d: Math.max(0.5, reach),
      r: 0.3,
      w: 3,
      x: -1.5,
      y: CAR_BACK - Math.max(0.5, reach),
    },
    SOCKET_Z - 1.5,
    3,
    2,
  );

export const GAUGE_ART = {
  ...housingOf(P, GAUGE, GAUGE_TOP),
  dial: sideMatrix([GAUGE.x + GAUGE.w / 2, GAUGE.y + GAUGE.d], 16, P, 'left'),
  lamp: at([GAUGE.x + 6, GAUGE.y + GAUGE.d, 26]),
  lampRing: F.circleOnY(GAUGE.x + 6, GAUGE.y + GAUGE.d, 26, 1.4, 14),
  vents: [0, 1, 2, 3]
    .map((row) =>
      F.rectOnX(
        GAUGE.x + GAUGE.w,
        GAUGE.y + 5,
        GAUGE.y + GAUGE.d - 5,
        8 + row * 3.2,
        9.4 + row * 3.2,
      ),
    )
    .join(''),
};
