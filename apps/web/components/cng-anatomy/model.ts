/**
 * The truth the figure moves by.
 *
 * With Continuous Native Generation the `ios/` and `android/` folders are
 * build output. `npx expo prebuild --clean` throws them away and regenerates
 * both from the SDK's native template plus every config plugin listed in
 * app.json. The same inputs always give the same folders, so a hand edit made
 * inside them is lost on the next run, and an SDK upgrade is a fresh template
 * with the plugins re-applied rather than a merge.
 */

/** Config plugins in the order they are added to app.json. The first two ship at rest. */
export const PLUGINS = [
  'expo-router',
  'expo-font',
  'expo-camera',
  'expo-location',
  'expo-notifications',
  'expo-build-properties',
] as const;

export const FIRST_PLUGINS = 2;
export const MOST_PLUGINS = PLUGINS.length;

/** Expo SDK templates the blanks are cut from, with their React Native version. */
export const SDKS = [
  { sdk: 54, rn: '0.81' },
  { sdk: 55, rn: '0.83' },
] as const;

export const sdkOf = (index: number) => SDKS[Math.min(index, SDKS.length - 1)];

export const readouts = {
  rest: (plugins: number, sdk: number) =>
    `ios/ + android/ · ${plugins} plugins · SDK ${sdk}`,
  generated: (plugins: number) =>
    `prebuild --clean · ${plugins} plugins → ios/ + android/`,
  same: () => `same app.json → same ios/ + android/`,
  lost: () => `prebuild --clean · hand edit overwritten`,
  upgraded: (sdk: number, plugins: number) =>
    `SDK ${sdk} template · ${plugins} plugins re-applied`,
  added: (name: string) => `+ ${name} in app.json · run prebuild`,
  edited: () => `hand edit in ios/Info.plist · not in app.json`,
  bumped: (from: number, to: number, rn: string) =>
    `SDK ${from} → ${to} · RN ${rn} · nothing to merge`,
  full: () => `all ${MOST_PLUGINS} plugin sockets are full`,
  latest: (sdk: number) => `already on the SDK ${sdk} template`,
};
