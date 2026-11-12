/**
 * The truth the figure moves by.
 *
 * Codegen reads one TypeScript spec and generates the C++, Java and
 * Objective-C bindings a TurboModule or Fabric component must implement, at
 * build time. Under the legacy architecture those bindings were written by
 * hand on each side, so a rename that missed one side compiled fine and
 * crashed on device ("undefined is not a function").
 */

export const PLATES = ['spec.ts', 'C++', 'Java', 'Obj-C'] as const;
export const FORGOTTEN = 2;

export const VERSIONS = [
  {
    name: 'getBatteryLevel',
    path: [
      [3, 12],
      [6, 5],
      [9, 12],
      [12, 5],
      [15, 12],
      [18, 8.5],
      [23, 8.5],
    ],
  },
  {
    name: 'getBatteryState',
    path: [
      [3, 8.5],
      [7, 4],
      [11, 13],
      [15, 4],
      [19, 13],
      [23, 7],
    ],
  },
  {
    name: 'batteryLevel',
    path: [
      [3, 5],
      [8, 13],
      [13, 5],
      [18, 13],
      [23, 10],
    ],
  },
] as const;

export type Mode = 'codegen' | 'hand';

export const readouts = {
  codegen: (name: string) =>
    `Codegen: ${name}() in spec.ts → C++, Java, Obj-C generated · all match`,
  crash: (name: string) =>
    `runs on Android: ${name} is not a function · crash on device`,
  hand: (name: string) => `renamed to ${name}() by hand · Java side missed`,
  rest: () => `one spec · three native bindings`,
  same: () => `every binding matches the spec`,
};
