import {
  boxCorners,
  depthOf,
  fitProjection,
  iso,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 330;
const AZIMUTH = 56;

/** Bench plate. */
export const BASE: Plan = { x: -136, y: -42, w: 272, d: 98, r: 10 };
export const BASE_H = 9;
export const FOOT_H = 5;

/** The card track, along x: a floor between two lips. */
export const TRACK_X0 = -120;
export const TRACK_X1 = 120;
export const FLOOR_Z = 6;
export const LIP_Z = 9;
export const TRACK_Y0 = 0;
export const TRACK_Y1 = 18;
export const MID_Y = 9;

/** A punch card, built at x = 0 lying on the floor. */
export const CARD_HALF = 12;
export const CARD: Plan = {
  x: -CARD_HALF,
  y: 1,
  w: CARD_HALF * 2,
  d: 16,
  r: 1,
};
export const CARD_H = 1.2;
export const STACK = 1.7;

/** Stations along the track (card centre x). */
export const AT = {
  source: -98,
  press: -52,
  hopper: 0,
  head: 50,
  out: 96,
} as const;

/** C-frame press. */
export const PRESS_X = AT.press;
export const COLUMN: Plan = { x: PRESS_X - 11, y: -24, w: 22, d: 16, r: 2 };
export const COLUMN_TOP = 42;
export const ARM: Plan = { x: PRESS_X - 10, y: -8, w: 20, d: 24, r: 2 };
export const ARM_Z = 34;
export const RAM_R = 3;
export const RAM_UP = 16;
export const RAM_DOWN = FLOOR_Z + CARD_H + 0.2;
export const RAM_LEN = 19;
export const HOUSING_Z = 26;

/** Card reader: back block with the read head arm, front block with the dial. */
export const READER_BACK: Plan = {
  x: AT.head - 24,
  y: -26,
  w: 48,
  d: 24,
  r: 2,
};
export const READER_BACK_TOP = 28;
export const HEAD_ARM: Plan = { x: AT.head - 8, y: -2, w: 16, d: 16, r: 1.5 };
export const HEAD: Plan = { x: AT.head - 4, y: 3, w: 8, d: 12, r: 1.2 };
export const HEAD_Z = 10;
export const READER_FRONT: Plan = {
  x: AT.head - 24,
  y: 20,
  w: 48,
  d: 14,
  r: 2,
};
export const READER_FRONT_TOP = 14;
export const DIAL_X = AT.head - 12;
export const DIAL_Y = 27;
export const DIAL_R = 5.6;
export const DIAL_TOP = READER_FRONT_TOP + 2.6;
export const LAMP_X = AT.head + 4;
export const SWITCH_X = AT.head + 15;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(COLUMN, 0, COLUMN_TOP + 4),
    ...boxCorners(READER_BACK, 0, READER_BACK_TOP + 2),
  ],
  WIDTH,
  HEIGHT,
  { pad: 22, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);
export const depth = (x: number, z: number) => depthOf([x, MID_Y, z], P);
