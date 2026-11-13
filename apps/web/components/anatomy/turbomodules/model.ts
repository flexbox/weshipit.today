/**
 * The truth the figure moves by.
 *
 * Legacy native modules were all initialised at startup, used or not, and
 * called asynchronously over the bridge. A TurboModule is instantiated the
 * first time JavaScript touches it, so launch only pays for what the app
 * uses, and calls go directly over JSI. Codegen generates the typed bindings
 * from one TypeScript spec.
 */

export const MODULES = [
  'Camera',
  'Location',
  'Haptics',
  'Storage',
  'Share',
  'Contacts',
  'Audio',
  'Maps',
] as const;

/** The modules this app actually calls. */
export const CALLED = [0, 1, 2] as const;

export type Mode = 'turbo' | 'legacy';

export const readouts = {
  again: (name: string) => `${name} already loaded · direct JSI call`,
  first: (name: string, loaded: number) =>
    `${name} touched for the first time · initialised now · ${loaded} of ${MODULES.length} loaded`,
  launchLegacy: () =>
    `legacy modules · launch initialised all ${MODULES.length}, used or not`,
  launchTurbo: () =>
    `TurboModules · launch initialised 0 of ${MODULES.length} · loaded on first use`,
  legacyCall: (name: string) =>
    `${name} ready since launch · async call over the bridge`,
  rest: () => `TurboModules · launch initialised 0 of ${MODULES.length}`,
};
