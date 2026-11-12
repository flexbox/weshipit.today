import {
  boxCorners,
  corners,
  fitProjection,
  insetPlan,
  planOutline,
  sideMatrix,
  sideSeam,
  slabOf,
  type Plan,
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf } from '../parts';
import { DEVICES } from './model';

export const WIDTH = 640;
export const HEIGHT = 400;

/** One world unit is 10 points on screen. */
export const PT = 0.1;

const BASE: Plan = { d: 92, r: 10, w: 190, x: -110, y: -58 };
const DOCK: Plan = { d: 30, r: 3, w: 146, x: -88, y: -50 };
const DOCK_TOP = 8;
const DOCK_FRONT = DOCK.y + DOCK.d;
const PHONE_D = 5;
const PHONE_Y = -42;
const SCREEN_Y = PHONE_Y + PHONE_D;
const PHONE_Z = DOCK_TOP + 2;

/** Each phone: body plan, screen rectangle (x0, z top) and extras. */
const PHONES = [
  { bezelBottom: 2.2, bezelTop: 2.2, side: 1.8, x0: -78 },
  { bezelBottom: 11, bezelTop: 10, side: 2.4, x0: 4 },
].map(({ bezelBottom, bezelTop, side, x0 }, index) => {
  const device = DEVICES[index];
  const sw = device.w * PT;
  const sh = device.h * PT;
  const plan: Plan = {
    d: PHONE_D,
    r: index ? 2 : 3,
    w: sw + side * 2,
    x: x0,
    y: PHONE_Y,
  };
  const z0 = PHONE_Z + bezelBottom;
  const z1 = z0 + sh;
  return { bezelTop, plan, sh, sw, top: z1 + bezelTop, x: x0 + side, z0, z1 };
});

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...PHONES.map((phone) => boxCorners(phone.plan, 0, phone.top + 1)).flat(),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 62, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 24, y: 14 },
  ruler: { d: 6, r: 1, w: 110, x: -96, y: 22 },
});

export const DOCK_ART = {
  body: solid(DOCK, 0, DOCK_TOP, 6, 1),
  groove: planOutline(insetPlan(DOCK, 2.4), DOCK_TOP, P, 4),
  screws: corners(DOCK, 4).map(([x, y]) => at([x, y, DOCK_TOP])),
  seam: sideSeam(DOCK, 3, P, 6),
  /** A point scale standing between the phones, ruled every 10 pt. */
  feet: PHONES.map((phone) =>
    solid(
      {
        d: 4,
        r: 1,
        w: phone.plan.w + 4,
        x: phone.plan.x - 2,
        y: SCREEN_Y + 0.4,
      },
      DOCK_TOP,
      3,
      3,
      0.4,
    ),
  ),
  lampRings: PHONES.map((phone) =>
    F.circleOnY(phone.plan.x + phone.plan.w / 2, DOCK_FRONT, 4, 1.4, 14),
  ).join(''),
  scale: solid(
    { d: 3, r: 0.5, w: 6, x: -12, y: PHONE_Y + 1 },
    DOCK_TOP,
    90,
    2,
    0.3,
  ),
  scaleTicks: Array.from({ length: 18 }, (_, i) =>
    F.lineOnY(
      PHONE_Y + 4,
      -12,
      -12 + (i % 5 === 0 ? 4.2 : 2.4),
      DOCK_TOP + 2 + i * 5,
    ),
  ).join(''),
};

export const PHONE_ART = PHONES.map((phone, index) => ({
  body: solid(phone.plan, PHONE_Z - 2, phone.top - PHONE_Z + 2, 6, 0.6),
  rest: solid(
    { d: 3, r: 1, w: phone.plan.w - 10, x: phone.plan.x + 5, y: PHONE_Y - 4 },
    DOCK_TOP,
    40,
    3,
    0.4,
  ),
  sideButton: solid(
    { d: 2, r: 0.2, w: 0.7, x: phone.plan.x + phone.plan.w, y: PHONE_Y + 1.5 },
    phone.z1 - 18,
    8,
    2,
  ),
  /** iPhone SE: a home button below the screen and a speaker slot above it. */
  homeButton: index
    ? F.circleOnY(phone.x + phone.sw / 2, SCREEN_Y, phone.z0 - 5.5, 3.6, 28)
    : '',
  screen: sideMatrix([phone.x, SCREEN_Y], phone.z1, P, 'left'),
  screenFrame: F.rectOnY(
    SCREEN_Y,
    phone.x - 0.6,
    phone.x + phone.sw + 0.6,
    phone.z0 - 0.6,
    phone.z1 + 0.6,
  ),
  speaker: index
    ? F.lineOnY(
        SCREEN_Y,
        phone.x + phone.sw / 2 - 4,
        phone.x + phone.sw / 2 + 4,
        phone.z1 + 5,
      )
    : '',
}));
