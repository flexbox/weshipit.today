import {
  boxCorners,
  cylinder,
  fitProjection,
  insetPlan,
  lineOnTop,
  planOutline,
  ring,
  sideMatrix,
  sideSeam,
  slabOf,
  topMatrix,
  type Plan,
} from '../anatomy/kit/iso-kit';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  housingOf,
  knurlOf,
} from '../anatomy/parts';

export const WIDTH = 640;
export const HEIGHT = 360;

const BASE: Plan = { d: 100, r: 10, w: 188, x: -112, y: -60 };

/** Feed track along x, a gate housing, the bundle bin and a scrap tray in front. */
const TRACK: Plan = { d: 22, r: 2, w: 86, x: -100, y: -40 };
const TRACK_TOP = 6;
export const TRACK_Y = TRACK.y + TRACK.d / 2;
export const FEED_X = -84;
export const GATE_X = -6;
const GATE: Plan = { d: 10, r: 2, w: 26, x: GATE_X - 13, y: TRACK.y - 12 };
const GATE_TOP = 30;
const BIN: Plan = { d: 30, r: 2, w: 34, x: 22, y: -44 };
const BIN_H = 7;
const WALL = 1.6;
export const BIN_X = BIN.x + BIN.w / 2;
export const BIN_Y = BIN.y + BIN.d / 2;
const SCRAP: Plan = { d: 20, r: 2, w: 30, x: -24, y: -6 };
export const SCRAP_X = SCRAP.x + SCRAP.w / 2;
export const SCRAP_Y = SCRAP.y + SCRAP.d / 2;
export const CARD_H = 1.6;

const DIAL: [number, number] = [GATE_X + 6, GATE.y + 5];

export const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners(GATE, 0, GATE_TOP + 5),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 52, pad: 18 },
);

const F = facesOf(P);
const { at } = F;
const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
  slabOf(plan, z, h, P, steps, bevel);

export const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 12, r: 2, w: 40, x: 26, y: 22 },
  ruler: { d: 6, r: 1, w: 70, x: -98, y: 28 },
});

export const TRACK_ART = {
  body: solid(TRACK, 0, TRACK_TOP, 4, 0.8),
  guides: [TRACK.y + 1.4, TRACK.y + TRACK.d - 1.4]
    .map((y) =>
      lineOnTop([TRACK.x + 3, y], [TRACK.x + TRACK.w - 3, y], TRACK_TOP, P),
    )
    .join(''),
  hopper: planOutline(
    { d: 18, r: 1, w: 22, x: FEED_X - 11, y: TRACK_Y - 9 },
    TRACK_TOP,
    P,
    2,
  ),
  seam: sideSeam(TRACK, 2.4, P, 4),
  /** A chute from the gate down into the scrap tray. */
  chute: solid(
    { d: 12, r: 1, w: 14, x: SCRAP_X - 7, y: TRACK.y + TRACK.d },
    0,
    TRACK_TOP - 1,
    3,
    0.4,
  ),
};

export const GATE_ART = {
  ...housingOf(P, GATE, GATE_TOP),
  detents: [-0.8, 0.8]
    .map((a) =>
      lineOnTop(
        [DIAL[0] + Math.sin(a) * 4.6, DIAL[1] - Math.cos(a) * 4.6],
        [DIAL[0] + Math.sin(a) * 6, DIAL[1] - Math.cos(a) * 6],
        GATE_TOP,
        P,
      ),
    )
    .join(''),
  dial: cylinder(DIAL[0], DIAL[1], 3.6, GATE_TOP, 3, P, 28, 0.5),
  dialCap: ring(DIAL[0], DIAL[1], 2.2, GATE_TOP + 3, P, 20),
  dialKnurl: knurlOf(P, DIAL[0], DIAL[1], 3.6, GATE_TOP, GATE_TOP + 3, 26, 0),
  osLabels: [
    topMatrix([DIAL[0] - 10, DIAL[1] - 1], GATE_TOP, P, 'x'),
    topMatrix([DIAL[0] - 10, DIAL[1] + 3], GATE_TOP, P, 'x'),
  ],
  /** The gate's flap hangs over the track under the housing's front. */
  flapPivot: at([GATE_X, TRACK.y - 2, TRACK_TOP + 10]),
};

export const dialPointer = (side: number) =>
  lineOnTop(
    DIAL,
    [
      DIAL[0] + Math.sin(side * 0.8) * 2.8,
      DIAL[1] - Math.cos(side * 0.8) * 2.8,
    ],
    GATE_TOP + 3.05,
    P,
  );

/** The flap: a plate across the track that swings toward the bin (0) or the chute (1). */
export const flapOf = (open: number) => {
  const a = open * 1.0;
  const len = TRACK.d - 2;
  const y0 = TRACK.y + 1;
  const y1 = y0 + Math.cos(a) * len;
  const x1 = GATE_X + Math.sin(a) * len * 0.8;
  return [
    at([GATE_X, y0, TRACK_TOP]),
    at([x1, y1, TRACK_TOP]),
    at([x1, y1, TRACK_TOP + 8]),
    at([GATE_X, y0, TRACK_TOP + 8]),
  ];
};

export const BIN_ART = {
  back: solid({ ...BIN, d: WALL }, 2, BIN_H - 2, 2, 0.2),
  floor: solid(BIN, 0, 2, 3, 0.3),
  front: solid(
    { ...BIN, d: WALL, y: BIN.y + BIN.d - WALL },
    2,
    BIN_H - 2,
    2,
    0.2,
  ),
  inner: planOutline(insetPlan(BIN, WALL), 2, P, 2),
  label: sideMatrix([BIN.x + 3, BIN.y + BIN.d], 4.4, P, 'left'),
  left: solid({ ...BIN, w: WALL }, 2, BIN_H - 2, 2, 0.2),
  right: solid(
    { ...BIN, w: WALL, x: BIN.x + BIN.w - WALL },
    2,
    BIN_H - 2,
    2,
    0.2,
  ),
};
export const BIN_FLOOR = 2;

export const SCRAP_ART = {
  body: solid(SCRAP, 0, 2.4, 3, 0.4),
  inner: planOutline(insetPlan(SCRAP, 2), 2.4, P, 2),
  label: topMatrix([SCRAP.x + 3, SCRAP.y + SCRAP.d - 3], 2.4, P, 'x'),
};
export const SCRAP_FLOOR = 2.4;

/** A file card, built centred at (0, 0) lying flat at z = 0; translated. */
const CARD: Plan = { d: 14, r: 1, w: 20, x: -10, y: -7 };
export const CARD_ART = {
  body: solid(CARD, 0, CARD_H, 3, 0.3),
  face: topMatrix([CARD.x + 1.6, CARD.y + 4], CARD_H, P, 'x'),
};
export const TRACK_SURFACE = TRACK_TOP;
