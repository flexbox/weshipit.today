import {
  boxCorners,
  fitProjection,
  iso,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 330;
const AZIMUTH = 58;

/** Bench plate. */
export const BASE: Plan = { x: -172, y: -74, w: 344, d: 138, r: 10 };
export const BASE_H = 9;
export const FOOT_H = 5;

/** The track every cartridge rides: a floor between two lips, along x. */
export const FLOOR_Z = 8;
export const LIP_Z = 12;
export const TRACK_Y0 = 0;
export const TRACK_Y1 = 20;

/** Chassis: the native binary. A back block, the bay floor and a front block. */
export const CH_X0 = -62;
export const CH_X1 = 62;
export const BACK: Plan = { x: CH_X0, y: -50, w: CH_X1 - CH_X0, d: 48, r: 1.5 };
export const BACK_TOP = 34;
export const BAY: Plan = { x: CH_X0, y: -2, w: CH_X1 - CH_X0, d: 24, r: 0 };
export const FRONT: Plan = { x: CH_X0, y: 22, w: CH_X1 - CH_X0, d: 18, r: 1.5 };
export const FRONT_TOP = 18;

/** Backplane and module cards on top of the back block. */
export const SOCKET_XS = [-45, -27, -9, 9, 27, 45];
export const PLANE_TOP = BACK_TOP + 2;
export const SOCKET_TOP = PLANE_TOP + 3;
export const CARD_TOP = SOCKET_TOP + 18;

/** Cartridge: the JS bundle. Built at x = 0, moved along the track. */
export const CART_HALF = 17;
export const CART: Plan = {
  x: -CART_HALF,
  y: 1,
  w: CART_HALF * 2,
  d: 18,
  r: 2,
};
export const CART_TOP = FLOOR_Z + 16;
export const PIN_YS = [4.4, 8.2, 12, 15.8];
export const CART_PIN_X = -11;

/** The keyed pawl at the bay entrance. */
export const PAWL_X = 52;
export const PAWL: Plan = { x: PAWL_X - 2.5, y: 1.5, w: 5, d: 17, r: 0.8 };
export const PAWL_TOP = 30;
export const PAWL_DROP = PAWL_TOP - FLOOR_Z;

/** Where a cartridge sits. */
export const SLOT_X = {
  gone: -150,
  tray: -112,
  bay: 0,
  stop: PAWL_X + 2.5 + CART_HALF + 0.4,
  feed: 104,
} as const;
export const DROP_Z = 34;

/** Rails outside the chassis. */
export const TRAY_X0 = -162;
export const TRAY_X1 = CH_X0 - 1;
export const FEED_X0 = CH_X1 + 1;
export const FEED_X1 = 146;

/** Update server rack. */
export const RACK: Plan = { x: 110, y: -68, w: 46, d: 52, r: 3 };
export const RACK_TOP = 68;

/** Build counter dial on the front block. */
export const DIAL_X = 16;
export const DIAL_Y = 31;
export const DIAL_R = 6.4;
export const DIAL_TOP = FRONT_TOP + 3;
export const DIAL_STEPS = 10;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(RACK, 0, RACK_TOP + 3),
    ...boxCorners({ x: -54, y: -44, w: 108, d: 34, r: 0 }, 0, CARD_TOP + 2),
  ],
  WIDTH,
  HEIGHT,
  { pad: 20, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);
