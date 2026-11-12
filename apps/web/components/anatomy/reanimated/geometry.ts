import {
  boxCorners,
  corners,
  cylinder,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  ring,
  sideSeam,
  slabOf,
  topTicks,
  type Plan,
} from '../kit/iso-kit';
import { BASE_H, FOOT_H, benchOf, facesOf } from '../parts';

export const WIDTH = 640;
export const HEIGHT = 380;

const BASE: Plan = { d: 116, r: 10, w: 172, x: -150, y: -70 };

export const LANE_Y = { js: -28, ui: 10 } as const;
export type Lane = keyof typeof LANE_Y;

/** Crank housing at each lane start; the wheel sits on its front face. */
const HOUSE_X = -140;
const HOUSE_W = 40;
const HOUSE_D = 20;
const HOUSE_TOP = 32;
export const WHEEL_X = HOUSE_X + HOUSE_W / 2;
export const WHEEL_Z = 18;
export const CRANK = 12;
export const ROD_LEN = 56;
const RAIL_X0 = -96;
const RAIL_X1 = -22;
const RAIL_TOP = 5;
const CAR_W = 18;
const CAR_D = 12;
const CAR_TOP = 26;

/** Tape reader on top of the JS housing: two spools and the tape between. */
const SPOOLS = [HOUSE_X + 9, HOUSE_X + HOUSE_W - 9];
const SPOOL_R = 4.6;
const SPOOL_H = 5;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(
      { d: 60, r: 0, w: 40, x: HOUSE_X, y: -50 },
      0,
      HOUSE_TOP + SPOOL_H + 2,
    ),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 50, pad: 20 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 13, r: 2, w: 42, x: -30, y: 28 },
  ruler: { d: 6, r: 1, w: 96, x: -136, y: 34 },
});

/** Where the carriage's hinge sits for crank angle θ (slider-crank). */
export const hingeX = (theta: number) =>
  WHEEL_X +
  CRANK * Math.cos(theta) +
  Math.sqrt(ROD_LEN * ROD_LEN - (CRANK * Math.sin(theta)) ** 2);
export const HINGE_REST = hingeX(0);

export function laneOf(lane: Lane) {
  const y0 = LANE_Y[lane];
  const house: Plan = {
    d: HOUSE_D,
    r: 2.5,
    w: HOUSE_W,
    x: HOUSE_X,
    y: y0 - HOUSE_D - 2,
  };
  const face = y0 - 2;
  const rail: Plan = {
    d: 10,
    r: 1.4,
    w: RAIL_X1 - RAIL_X0,
    x: RAIL_X0,
    y: y0 - 5,
  };
  const stop: Plan = { d: 12, r: 1, w: 5, x: RAIL_X1, y: y0 - 6 };
  const car: Plan = {
    d: CAR_D,
    r: 1.4,
    w: CAR_W,
    x: HINGE_REST,
    y: y0 - CAR_D / 2,
  };
  const ticks = topTicks(
    RAIL_X0 + 3,
    RAIL_X1 - 3,
    3,
    5,
    y0 + 5,
    RAIL_TOP,
    [-1.4, -2.6],
    P,
  );
  return {
    face,
    groove: planOutline(insetPlan(house, 2.4), HOUSE_TOP, P, 3),
    house: solid(house, 3, HOUSE_TOP - 3, 4, 1),
    houseSeam: sideSeam(house, 9, P, 4),
    hub: at([WHEEL_X, face, WHEEL_Z]),
    lamp: at([HOUSE_X + 5, face, 7]),
    lampRing: F.circleOnY(HOUSE_X + 5, face, 7, 1.5, 14),
    plinth: solid(insetPlan(house, -1.5), 0, 3, 4, 0.5),
    rail: solid(rail, 0, RAIL_TOP, 3, 0.6),
    railSeam: sideSeam(rail, 2, P, 3),
    screws: corners(house, 3.4).map(([x, y]) => at([x, y, HOUSE_TOP])),
    slot: lineOnTop([RAIL_X0 + 3, y0], [RAIL_X1 - 3, y0], RAIL_TOP, P),
    stop: solid(stop, 0, 12, 3, 0.4),
    stopLamp: at([RAIL_X1 + 5, y0, 8]),
    stopLampRing: F.circleOnX(RAIL_X1 + 5, y0, 8, 1.5, 14),
    stopScrew: at([RAIL_X1 + 2.5, y0, 12]),
    ticksMajor: ticks.major,
    ticksMinor: ticks.minor,
    vents: [0, 1, 2]
      .map((row) =>
        F.rectOnX(
          HOUSE_X + HOUSE_W,
          house.y + 4,
          house.y + HOUSE_D - 4,
          8 + row * 3,
          9.3 + row * 3,
        ),
      )
      .join(''),
    wheel: F.circleOnY(WHEEL_X, face, WHEEL_Z, CRANK + 3, 40),
    wheelRing: F.circleOnY(WHEEL_X, face, WHEEL_Z, CRANK + 1, 40),
    /** The carriage (the Animated.View), built with its hinge at rest. */
    car: solid(car, RAIL_TOP, CAR_TOP - RAIL_TOP, 4, 0.8),
    carPin: at([HINGE_REST, face + 1, WHEEL_Z]),
    carRules: [0, 1, 2]
      .map((row) =>
        lineOnTop(
          [car.x + 3, car.y + 3 + row * 3],
          [
            car.x + 3 + (CAR_W - 6) * [0.8, 0.5, 0.65][row],
            car.y + 3 + row * 3,
          ],
          CAR_TOP,
          P,
        ),
      )
      .join(''),
    carSeam: sideSeam(car, RAIL_TOP + 3, P, 4),
  };
}

export const LANES = { js: laneOf('js'), ui: laneOf('ui') };

/** Crank pin and connecting rod for one lane at angle θ. */
export function crankOf(lane: Lane, theta: number) {
  const y = LANES[lane].face + 1;
  const px = WHEEL_X + CRANK * Math.cos(theta);
  const pz = WHEEL_Z + CRANK * Math.sin(theta);
  const pin = at([px, y, pz]);
  const hinge = at([hingeX(theta), y, WHEEL_Z]);
  const arm = F.lineOnY(y - 0.5, WHEEL_X, px, WHEEL_Z, pz);
  return {
    arm,
    hinge,
    pin,
    rod: `M${pin[0].toFixed(2)} ${pin[1].toFixed(2)}L${hinge[0].toFixed(2)} ${hinge[1].toFixed(2)}`,
  };
}

const TAPE_Y = LANE_Y.js - 12;

export const READER = {
  hubs: SPOOLS.map((x) => ring(x, TAPE_Y, 1.4, HOUSE_TOP + SPOOL_H, P, 14)),
  spools: SPOOLS.map((x) =>
    cylinder(x, TAPE_Y, SPOOL_R, HOUSE_TOP, SPOOL_H, P, 28, 0.4),
  ),
  tape: [TAPE_Y - SPOOL_R, TAPE_Y + SPOOL_R]
    .map((y) => lineOnTop([SPOOLS[0], y], [SPOOLS[1], y], HOUSE_TOP + 3, P))
    .join(''),
  /** The front run of tape, where the punched holes travel. */
  run: lineOnTop(
    [SPOOLS[0], TAPE_Y + SPOOL_R],
    [SPOOLS[1], TAPE_Y + SPOOL_R],
    HOUSE_TOP + 3,
    P,
  ),
};
