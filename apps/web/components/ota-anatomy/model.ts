/**
 * The truth the figure moves by.
 *
 * An over-the-air update ships a new JavaScript bundle and its assets to
 * installed apps without store review. The app downloads it and runs it on
 * the next launch. Anything outside the bundle (adding a native module,
 * upgrading React Native, permissions, the app icon) needs a new store build
 * and review instead.
 */

export type Change = 'js' | 'asset' | 'native';

export const CHANGES: Record<Change, { label: string; ota: boolean }> = {
  asset: { label: 'new image', ota: true },
  js: { label: 'bug fix', ota: true },
  native: { label: 'native module', ota: false },
};

export const FIRST_PATCH = 3;
export const versionOf = (patch: number) => `1.0.${patch}`;

export const readouts = {
  blocked: () => `native module does not fit the bundle · new store build`,
  current: (patch: number) => `relaunched · already on ${versionOf(patch)}`,
  downloaded: (patch: number) =>
    `${versionOf(patch)} downloaded · runs on next launch`,
  passes: (change: Change, patch: number) =>
    `${CHANGES[change].label} fits the bundle · EAS Update publishes ${versionOf(patch)}`,
  relaunched: (patch: number) => `relaunched · running ${versionOf(patch)}`,
  rest: (patch: number) => `running ${versionOf(patch)} · no update pending`,
  review: () => `waiting for store review · OTA can't ship it`,
};
