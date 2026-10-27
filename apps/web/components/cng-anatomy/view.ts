import {
  boxCorners,
  fitProjection,
  iso,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 350;
const AZIMUTH = 56;

/** Bench plate. */
export const BASE: Plan = { x: -178, y: -82, w: 356, d: 130, r: 10 };
export const BASE_H = 9;
export const FOOT_H = 5;

/** The track every plate pair rides, along x: a floor between two lips. */
export const FLOOR_Z = 8;
export const LIP_Z = 10;
export const TRACK_Y0 = -36;
export const TRACK_Y1 = 22;
export const TRACK_X0 = -164;
export const TRACK_X1 = 94;

/** A generated plate pair: ios/ at the back, android/ in front. Built at x = 0. */
export const PLATE_H = 3;
export const PLATE_TOP = FLOOR_Z + PLATE_H;
export const PLATE_HALF = 28;
export const IOS: Plan = {
  x: -PLATE_HALF,
  y: -33,
  w: PLATE_HALF * 2,
  d: 24,
  r: 1.5,
};
export const ANDROID: Plan = {
  x: -PLATE_HALF,
  y: -5,
  w: PLATE_HALF * 2,
  d: 24,
  r: 1.5,
};

/** Where a plate pair sits along the track. */
export const SLOT_X = {
  magazine: -130,
  press: -40,
  tray: 50,
  bin: 128,
} as const;
export const BIN_FLOOR = 2.5;

/** Magazine of blanks: the SDK's native template. */
export const MAG_X = SLOT_X.magazine;
export const MAG_LAYERS = 4;
export const MAG_TOP = FLOOR_Z + MAG_LAYERS * PLATE_H + 1;
export const MAG_CAP_Z = MAG_TOP + 12;

/** Press column, at the back. */
export const COLUMN: Plan = { x: -80, y: -72, w: 80, d: 24, r: 2 };
export const COLUMN_TOP = 94;

/** Ram (app.json): a die holder that rides the column on a slider. */
export const PRESS_X = SLOT_X.press;
export const RAM: Plan = { x: PRESS_X - 32, y: -43, w: 64, d: 62, r: 2 };
export const RAM_H = 9;
export const STRIPPER_H = 3;
/** Ram underside (the stripper's lower face) at rest and at the bottom of the stroke. */
export const RAM_UP = 42;
export const RAM_DOWN = PLATE_TOP + 0.4;

/** Config plugin dies, one bar per plugin, across both plates. */
export const DIE_DX = [-25, -15, -5, 5, 15, 25];
export const DIE_Y0 = -32;
export const DIE_Y1 = 17;
export const DIE_H = 7;

/** Lever hub on the column's right face, and its swing. */
export const HUB: Point3 = [COLUMN.x + COLUMN.w, -60, 74];
export const LEVER = 30;
export const LEVER_REST = 0.95;
export const LEVER_SWING = 1.25;

/** Run counter dial on the column top. */
export const DIAL_X = -18;
export const DIAL_Y = -60;
export const DIAL_R = 6.4;
export const DIAL_TOP = COLUMN_TOP + 3;
export const DIAL_STEPS = 10;

/** Scrap bin for the folders a run replaces. */
export const BIN: Plan = { x: 96, y: -40, w: 64, d: 66, r: 2 };
export const BIN_WALL = 2.5;
export const BIN_TOP = 16;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(COLUMN, 0, DIAL_TOP + 1),
    ...boxCorners(RAM, 0, RAM_UP + STRIPPER_H + RAM_H + DIE_H + 2),
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);
