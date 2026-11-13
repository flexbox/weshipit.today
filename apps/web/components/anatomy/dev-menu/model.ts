/**
 * The truth the figure moves by.
 *
 * The dev menu is compiled into development builds only (`__DEV__`). A
 * keyboard shortcut in the simulator (Cmd+D on iOS, Cmd+M on Android), a
 * shake of a physical device, or `adb shell input keyevent 82` all send the
 * same signal to the app, which opens the menu. Reload asks Metro on port
 * 8081 for the bundle again and runs it from the top. The Performance
 * Monitor is an overlay of the JS and UI frame rates. A release build strips
 * the menu out, so the same signal arrives and nothing opens.
 */

export const PORT = 8081;

/** Menu rows, top to bottom, as React Native shows them. */
export const ROWS = [
  'Reload',
  'Open DevTools',
  'Element Inspector',
  'Performance Monitor',
  'Fast Refresh',
] as const;

export const ROW = {
  inspector: 2,
  perf: 3,
  reload: 0,
} as const;

export type Trigger = 'keys' | 'shake';
export type Build = 'debug' | 'release';

/** Figure seconds. The ratio, not the unit, is the point. */
export const STEP = {
  /** Signal down a trigger cable. */
  signal: 0.85,
  /** Request up, and bundle back down, the Metro cable. */
  bundle: 1.1,
  request: 0.8,
  /** Menu sheet slides in or out. */
  sheet: 0.35,
};

export const readouts = {
  asking: () => `Reload · GET bundle from Metro :${PORT}`,
  debug: () => `development build · dev menu compiled in`,
  opened: (trigger: Trigger) =>
    trigger === 'keys'
      ? `⌘D in the simulator · dev menu open`
      : `device shaken · dev menu open`,
  perfOff: () => `Performance Monitor hidden`,
  perfOn: () => `Performance Monitor · JS 60 fps · UI 60 fps`,
  release: () => `release build · dev menu stripped out`,
  reloaded: () => `bundle re-fetched · app restarted from the top`,
  rest: () => `development build · ⌘D or shake to open`,
  stripped: (trigger: Trigger) =>
    `${trigger === 'keys' ? '⌘D' : 'shake'} · release build has no dev menu`,
};
