import {
  boxCorners,
  depthOf,
  fitProjection,
  iso,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 380;
const AZIMUTH = 54;

/** Bench plate. */
export const BASE: Plan = { d: 138, r: 10, w: 262, x: -144, y: -74 };
export const BASE_H = 9;
export const FOOT_H = 5;

/** Dock at the back: the development build's host. Its front face is y = DOCK_FRONT. */
export const DOCK: Plan = { d: 36, r: 3, w: 84, x: -62, y: -62 };
export const DOCK_TOP = 9;
export const DOCK_FRONT = DOCK.y + DOCK.d;

/** The phone stands on the dock, screen facing +y. */
export const PHONE: Plan = { d: 5, r: 2, w: 36, x: -38, y: -54 };
export const PHONE_Z = DOCK_TOP + 2;
export const PHONE_TOP = 94;
export const SCREEN_Y = PHONE.y + PHONE.d;
export const SCREEN = { x0: -35.5, x1: -4.5, z0: 18, z1: 87 };

/** Build switch and DEV lamp on the dock ledge in front of the phone. */
export const SWITCH_AT: [number, number] = [10, -38];
export const LAMP_AT: [number, number] = [-52, -38];

/** Sockets on the dock front, one per cable. */
export const SOCKET_X = { keys: -46, metro: 8, shake: -18 } as const;
export const SOCKET_Z = 3.2;

/** Keypad front-left: the simulator keyboard, ⌘ and D. */
export const KEYPAD: Plan = { d: 28, r: 3, w: 50, x: -128, y: 10 };
export const KEYPAD_TOP = 6;
export const KEY_W = 17;
export const KEY_XS = [-122, -101];
export const KEY_Y = 15.5;
export const KEY_DIP = 2.2;

/** Shake sled front-centre: a carriage on a rod between two posts. */
export const SHAKER: Plan = { d: 32, r: 2.5, w: 48, x: -44, y: 16 };
export const SHAKER_TOP = 4;
export const ROD_Y = SHAKER.y + SHAKER.d / 2;
export const ROD_Z = 10;
export const POST_X = [SHAKER.x + 3, SHAKER.x + SHAKER.w - 7];
export const POST_W = 4;
export const SLED_W = 14;
export const SLED_X = SHAKER.x + SHAKER.w / 2 - SLED_W / 2;

/** Metro dev server, back-right. */
export const SERVER: Plan = { d: 34, r: 2.5, w: 40, x: 62, y: -54 };
export const SERVER_TOP = 46;
export const SERVER_FRONT = SERVER.y + SERVER.d;
export const SERVER_SOCKET: Point3 = [SERVER.x + 7, SERVER_FRONT, 9];

/** Cables lie on the bench at this height. */
export const CABLE_Z = 1.3;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(PHONE, 0, PHONE_TOP + 1),
    ...boxCorners(SERVER, 0, SERVER_TOP + 3),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: AZIMUTH, pad: 18 },
);

export const at = (point: Point3) => iso(point, P);
export const depth = (x: number, y: number, z: number) => depthOf([x, y, z], P);
