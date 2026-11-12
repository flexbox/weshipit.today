/**
 * The truth the figure moves by.
 *
 * Expo Go is a prebuilt app with a fixed set of native modules (the Expo
 * SDK). A development build is a debug build of your own app, with your
 * native dependencies plus the dev client, loading JavaScript from Metro.
 * A JavaScript-only package needs no rebuild in either. A native module that
 * is not compiled in (react-native-mmkv is not in Expo Go) fails until a
 * development build is rebuilt with it; Expo Go can never add it.
 */

export const EXPO_GO_CHIPS = [
  'camera',
  'location',
  'haptics',
  'sqlite',
  'router',
];
export const DEV_CHIPS = ['camera', 'haptics', 'router'];
export const NATIVE = 'mmkv';

export const readouts = {
  js: () => `+ date-fns (JavaScript only) · reloads in both · no rebuild`,
  native: () => `+ react-native-mmkv (native) · not compiled into either app`,
  rebuilt: () =>
    `rebuilt the development build with mmkv · works · Expo Go still can't`,
  reset: () => `back to the starting app`,
  rest: () => `both apps load your JavaScript from Metro`,
};
