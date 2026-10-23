import {
  boxCorners,
  depthOf,
  fitProjection,
  iso,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 340;
const AZIMUTH = 56;

/** Bench plate. */
export const BASE: Plan = { x: -172, y: -64, w: 330, d: 112, r: 10 };
export const BASE_H = 9;
export const FOOT_H = 5;

/** The deck the trays and the lane sit on. */
export const DECK: Plan = { x: -160, y: -40, w: 236, d: 58, r: 2 };
export const FLOOR_Z = 6;
export const LIP_Z = 9;

/** The lane every card rides to the bundle, along x. */
export const LANE_X0 = -160;
export const LANE_X1 = 76;
export const LANE_Y0 = 0;
export const LANE_Y1 = 18;
export const LANE_Y = 9;

/** File trays: one per source file, along the back of the deck. */
export const TRAY_XS = [-140, -116, -92, -68, -44, -20];
export const TRAY_Y = -26;

/** A card (one module), built centred on the origin, lying flat. */
export const CARD: Plan = { x: -9, y: -7, w: 18, d: 14, r: 1 };
export const CARD_H = 1.2;
export const STACK = 1.7;

/** The file cabinet behind the trays, with the import panel on top. */
export const CABINET: Plan = { x: -154, y: -58, w: 148, d: 16, r: 1.5 };
export const CABINET_TOP = 26;
export const FACE_Y = CABINET.y + CABINET.d;
export const PANEL_Y = -47;

/** Transformer (Babel): a C-frame over the lane. */
export const TX = 12;
export const COLUMN: Plan = { x: TX - 10, y: -18, w: 20, d: 12, r: 1.5 };
export const COLUMN_TOP = 34;
export const ARM: Plan = { x: TX - 9, y: -6, w: 18, d: 27, r: 1.5 };
export const ARM_Z = 22;
export const ARM_TOP = 30;
export const HEAD: Plan = { x: TX - 6, y: 2, w: 12, d: 14, r: 1 };
export const HEAD_Z = 14;

/** The bundle stack (serializer) and the dev server behind it. */
export const SX = 50;
export const SERVER: Plan = { x: 34, y: -38, w: 34, d: 26, r: 2 };
export const SERVER_TOP = 30;
export const SOCKET: Point3 = [SERVER.x + SERVER.w, -25, 16];

/** Phone on a dock: the app. Screen faces +y. */
export const DOCK: Plan = { x: 98, y: -6, w: 40, d: 24, r: 3 };
export const DOCK_TOP = 7;
export const PHONE: Plan = { x: 104, y: 2, w: 28, d: 4, r: 1.6 };
export const PHONE_Z = 9;
export const PHONE_TOP = 66;
export const SCREEN_Y = PHONE.y + PHONE.d;
export const SCREEN = { x0: 106, x1: 130, z0: 14, z1: 61 };

/** Where a card sits. */
export const AT = {
  head: TX,
  stack: SX,
} as const;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(CABINET, 0, CABINET_TOP + 3),
    ...boxCorners(PHONE, 0, PHONE_TOP + 1),
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: AZIMUTH },
);

export const at = (point: Point3) => iso(point, P);
export const depth = (x: number, y: number, z: number) => depthOf([x, y, z], P);
