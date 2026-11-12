import {
  boxCorners,
  fitProjection,
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

const BASE: Plan = { d: 104, r: 10, w: 240, x: -132, y: -64 };

const JS: Plan = { d: 30, r: 3, w: 40, x: -122, y: -52 };
const JS_TOP = 24;
const UI: Plan = { d: 30, r: 3, w: 44, x: 48, y: -52 };
const UI_TOP = 30;
const UI_FRONT = UI.y + UI.d;

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 36, x: -24, y: -50 }, 0, 84),
    ...boxCorners(UI, 0, UI_TOP + 26),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 60, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 12, r: 2, w: 42, x: 50, y: 18 },
  ruler: { d: 6, r: 1, w: 110, x: -118, y: 26 },
});

export const PHONE_ART = phoneOf(P, { sh: 60, sw: 32, x: -24, y: -48 });
export const DOCK_SOCKET = PHONE_ART.socketAt(-18);

export const JS_ART = {
  ...housingOf(P, JS, JS_TOP),
  label: sideMatrix([JS.x + 4, JS.y + JS.d], JS_TOP - 4, P, 'left'),
  lamp: at([JS.x + JS.w - 6, JS.y + JS.d, 8]),
  lampRing: F.circleOnY(JS.x + JS.w - 6, JS.y + JS.d, 8, 1.5, 14),
  socket: solid(
    { d: 3, r: 0.6, w: 7, x: JS.x + JS.w - 13.5, y: JS.y + JS.d },
    1,
    5.2,
    3,
    0.3,
  ),
  vents: [0, 1, 2]
    .map((row) =>
      F.rectOnY(JS.y + JS.d, JS.x + 4, JS.x + 24, 6 + row * 3, 7.3 + row * 3),
    )
    .join(''),
};

export const UI_ART = {
  ...housingOf(P, UI, UI_TOP),
  dial: sideMatrix([UI.x + UI.w / 2, UI_FRONT], 15, P, 'left'),
  frameRings: Array.from({ length: 8 }, (_, i) =>
    F.circleOnY(UI.x + 6 + i * 4.6, UI_FRONT, 4.6, 1.5, 12),
  ).join(''),
  frames: Array.from({ length: 8 }, (_, i) =>
    at([UI.x + 6 + i * 4.6, UI_FRONT, 4.6]),
  ),
  label: sideMatrix([UI.x + 4, UI_FRONT], UI_TOP - 3, P, 'left'),
  /** The metronome on top: a tower and a pendulum pivot. */
  arc: Array.from({ length: 9 }, (_, i) => {
    const a = -0.5 + i * 0.125;
    const r = 16;
    return F.lineOnY(
      UI.y + 16,
      UI.x + UI.w / 2 + Math.sin(a) * r,
      UI.x + UI.w / 2 + Math.sin(a) * (r + (i % 4 ? 1.2 : 2.2)),
      UI_TOP + 24 - Math.cos(a) * r,
      UI_TOP + 24 - Math.cos(a) * (r + (i % 4 ? 1.2 : 2.2)),
    );
  }).join(''),
  pivot: [UI.x + UI.w / 2, UI.y + 16, UI_TOP + 24] as Point3,
  post: F.lineOnY(
    UI.y + 12,
    UI.x + UI.w / 2,
    UI.x + UI.w / 2,
    UI_TOP + 4,
    UI_TOP + 24,
  ),
  tower: solid(
    { d: 8, r: 1, w: 12, x: UI.x + UI.w / 2 - 6, y: UI.y + 8 },
    UI_TOP,
    4,
    3,
    0.4,
  ),
};

/** Pendulum rod and bob at angle a, swinging in the x-z plane. */
export function pendulumOf(a: number) {
  const [x, y, z] = UI_ART.pivot;
  const r = 15;
  const tip = at([x + Math.sin(a) * r, y, z - Math.cos(a) * r]);
  const pivot = at([x, y, z]);
  return {
    bob: at([x + Math.sin(a) * r * 0.7, y, z - Math.cos(a) * r * 0.7]),
    rod: `M${pivot[0].toFixed(2)} ${pivot[1].toFixed(2)}L${tip[0].toFixed(2)} ${tip[1].toFixed(2)}`,
  };
}

const cablePoints: Point3[] = [
  [JS.x + JS.w - 10, JS.y + JS.d + 3, 3.6],
  [JS.x + JS.w - 10, JS.y + JS.d + 8, 1.3],
  [JS.x + JS.w - 10, -10, 1.3],
  [-18, -10, 1.3],
  DOCK_SOCKET.end,
];
export const CABLE = routeOf(P, cablePoints, 4);
export const JS_SOCKET_MOUTH = F.rectOnY(
  JS.y + JS.d + 3,
  JS.x + JS.w - 12,
  JS.x + JS.w - 8,
  2.6,
  4.6,
);
