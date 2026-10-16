/**
 * The truth the figure moves by.
 *
 * An Expo app ships as two parts: a native binary (built with EAS Build and
 * released through the stores) and a JavaScript bundle (shipped over the air
 * with EAS Update). An update only reaches a binary whose runtime version
 * matches. With the `fingerprint` runtime policy that version is a hash of the
 * native project, so installing a native module changes it, and every update
 * published after that needs a new build before it can land.
 */

/** Native modules in install order. The first four ship in the starting binary. */
export const MODULES = [
  'expo-router',
  'expo-camera',
  'expo-notifications',
  'expo-sqlite',
  'expo-haptics',
  'expo-location',
] as const;

export const FIRST_MODULES = 4;
export const MOST_MODULES = MODULES.length;

/** Short fingerprint for each native module set (4, 5 and 6 modules). */
const FINGERPRINTS = ['a41c', '7e09', 'c3d2'] as const;

export const fingerprintOf = (modules: number) =>
  FINGERPRINTS[
    Math.min(Math.max(modules - FIRST_MODULES, 0), FINGERPRINTS.length - 1)
  ];

/** Pin heights (world units) cut from the fingerprint: one pin per hex digit. */
export function keyOf(fingerprint: string): number[] {
  return fingerprint
    .split('')
    .map((digit) => 1.6 + (parseInt(digit, 16) % 4) * 2);
}

export const versionOf = (patch: number) => `1.0.${patch}`;

export const readouts = {
  rest: (patch: number, fp: string) =>
    `bundle ${versionOf(patch)} · runtime ${fp}`,
  shipped: (patch: number, fp: string) =>
    `OTA ${versionOf(patch)} · runtime ${fp} · no store review`,
  blocked: (patch: number, wants: string, has: string) =>
    `${versionOf(patch)} wants ${wants} · binary is ${has}`,
  added: (name: string, from: string, to: string) =>
    `+ ${name} · fingerprint ${from} → ${to}`,
  built: (build: number, fp: string) =>
    `EAS Build #${build} · runtime ${fp} · store release`,
  current: (fp: string) => `binary already on runtime ${fp}`,
  full: () => `all ${MOST_MODULES} module slots are full`,
};
