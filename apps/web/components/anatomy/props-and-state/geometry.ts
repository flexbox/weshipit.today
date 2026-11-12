import {
  boxCorners,
  cylinder,
  fitProjection,
  lineOnTop,
  ring,
  sideMatrix,
  slabOf,
  topMatrix,
  type Plan,
  type Point3,
} from '../kit/iso-kit';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  housingOf,
  knurlOf,
  routeOf,
} from '../parts';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 108, r: 10, w: 250, x: -140, y: -68 };

const PARENT: Plan = { d: 22, r: 3, w: 70, x: -50, y: -60 };
const PARENT_TOP = 28;
const PARENT_FRONT = PARENT.y + PARENT.d;
const CHILD_TOP = 18;
const CHILDREN: Plan[] = [
  { d: 20, r: 3, w: 52, x: -122, y: -8 },
  { d: 20, r: 3, w: 52, x: 36, y: -8 },
];

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(PARENT, 0, PARENT_TOP + 8),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 68, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 12, r: 2, w: 44, x: -24, y: 22 },
  ruler: { d: 6, r: 1, w: 90, x: -128, y: 26 },
});

/** A window on a front face, with a matrix for the text in it. */
const windowOf = (
  y: number,
  x0: number,
  x1: number,
  z0: number,
  z1: number,
) => ({
  caption: sideMatrix([x0, y], z1 + 3.2, P, 'left'),
  frame: F.rectOnY(y, x0, x1, z0, z1),
  text: sideMatrix([x0 + 1.4, y], (z0 + z1) / 2 - 1.2, P, 'left'),
});

const KNOB: [number, number] = [PARENT.x + PARENT.w - 10, PARENT.y + 11];

export const PARENT_ART = {
  ...housingOf(P, PARENT, PARENT_TOP),
  count: windowOf(PARENT_FRONT, PARENT.x + 36, PARENT.x + 60, 12, 19),
  knob: cylinder(KNOB[0], KNOB[1], 4.4, PARENT_TOP, 4, P, 32, 0.6),
  knobCap: ring(KNOB[0], KNOB[1], 2.8, PARENT_TOP + 4, P, 24),
  knobKnurl: knurlOf(
    P,
    KNOB[0],
    KNOB[1],
    4.4,
    PARENT_TOP,
    PARENT_TOP + 4,
    30,
    0,
  ),
  label: topMatrix([PARENT.x + 6, PARENT.y + PARENT.d - 6], PARENT_TOP, P, 'x'),
  lamp: at([PARENT.x + PARENT.w - 5, PARENT_FRONT, 24]),
  lampRing: F.circleOnY(PARENT.x + PARENT.w - 5, PARENT_FRONT, 24, 1.4, 14),
  name: windowOf(PARENT_FRONT, PARENT.x + 6, PARENT.x + 30, 12, 19),
  sockets: [PARENT.x + 14, PARENT.x + 56].map((x) => ({
    mouth: F.rectOnY(PARENT_FRONT + 3, x - 2, x + 2, 2.6, 4.6),
    shell: solid(
      { d: 3, r: 0.6, w: 7, x: x - 3.5, y: PARENT_FRONT },
      1,
      5.2,
      3,
      0.3,
    ),
  })),
};

export const knobPointer = (angle: number) =>
  lineOnTop(
    KNOB,
    [KNOB[0] + Math.sin(angle) * 3.6, KNOB[1] - Math.cos(angle) * 3.6],
    PARENT_TOP + 4.05,
    P,
  );

export const CHILD_ART = CHILDREN.map((plan) => {
  const front = plan.y + plan.d;
  const sx = plan.x + plan.w / 2;
  return {
    ...housingOf(P, plan, CHILD_TOP),
    label: topMatrix([plan.x + 4, plan.y + plan.d - 5], CHILD_TOP, P, 'x'),
    lamp: at([plan.x + plan.w - 5, front, CHILD_TOP - 3.4]),
    lampRing: F.circleOnY(plan.x + plan.w - 5, front, CHILD_TOP - 3.4, 1.4, 14),
    prop: windowOf(front, plan.x + 4, plan.x + 24, 6, 12),
    state: windowOf(front, plan.x + 28, plan.x + 48, 6, 12),
    /** A padlock ring on the prop window: read-only. */
    lock: F.circleOnY(plan.x + 22, front, 13.6, 1, 12),
    /** The cable enters the child's back face, low down. */
    socketEnd: [sx, plan.y + 2, 3] as Point3,
  };
});

const cableOf = (index: number): Point3[] => {
  const sx = PARENT.x + (index ? 56 : 14);
  const end = CHILD_ART[index].socketEnd;
  return [
    [sx, PARENT_FRONT + 3, 3.6],
    [sx, PARENT_FRONT + 8, 1.3],
    [sx, -22, 1.3],
    [end[0], -22, 1.3],
    [end[0], -12, 1.3],
    end,
  ];
};

export const CABLES = [routeOf(P, cableOf(0), 4), routeOf(P, cableOf(1), 4)];
