/**
 * The truth the figure moves by.
 *
 * Metro starts at the entry file and follows every import (resolve), runs
 * each file through Babel (transform, cached per file on disk, keyed by its
 * contents), and concatenates the modules into one bundle (serialize). In
 * development it serves that bundle on port 8081 and keeps a socket open to
 * the app. When a file is saved, only that file is transformed again and only
 * that module is sent down the socket: Fast Refresh swaps it in place and the
 * component keeps its state. Platform extensions are resolved per build, so
 * an iOS bundle takes `Button.ios.tsx` and never sees `Button.android.tsx`.
 */

export type Platform = 'ios' | 'android';

export const PORT = 8081;

/** Files on disk, in tray order from left to right. */
export const FILES = [
  'index.js',
  'App.tsx',
  'Header.tsx',
  'Button.ios.tsx',
  'Button.android.tsx',
  'logo.png',
] as const;

export const BUTTON_FILE: Record<Platform, number> = { ios: 3, android: 4 };

/** Import edges, as tray indexes. Header imports './Button', which forks. */
export const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [1, 5],
];

/** Depth-first from index.js: the order Metro resolves the graph in. */
export const resolveOrder = (platform: Platform) => [
  0,
  1,
  2,
  BUTTON_FILE[platform],
  5,
];

/** The edge that leads to each file, or -1 for the entry. */
export const edgeInto = (file: number) =>
  EDGES.findIndex(([, to]) => to === file);

export const MODULES = 5;

/** Figure seconds per step. The ratio, not the unit, is the point. */
export const STEP = {
  resolve: 0.32,
  toLane: 0.45,
  toHead: 0.55,
  transform: 0.55,
  cached: 0.12,
  toStack: 0.5,
  send: 0.9,
} as const;

const name = (file: number) => FILES[file];

export const readouts = {
  rest: (platform: Platform) =>
    `metro · :${PORT} · ${platform} · waiting for the app`,
  resolving: (file: number, found: number) =>
    `resolve ${name(file)} · ${found}/${MODULES} modules`,
  transforming: (file: number, cached: boolean) =>
    cached
      ? `${name(file)} · transform cache hit`
      : `babel ${name(file)} · transformed, cached`,
  serving: (fresh: number) =>
    `bundle · ${MODULES} modules · ${fresh} transformed · ${MODULES - fresh} cached`,
  ready: (platform: Platform, fresh: number) =>
    `${platform} bundle on :${PORT} · ${fresh}/${MODULES} transformed · socket open`,
  saved: (file: number) => `save ${name(file)} · cache entry stale`,
  refreshed: (file: number, count: number) =>
    `Fast Refresh · 1 module sent · ${MODULES - 1} untouched · count ${count} kept`,
  tapped: (count: number) => `tap · count ${count} · state lives in the app`,
  cleared: () => `--clear · transform cache emptied`,
  needsBundle: () => `no app connected · open it first`,
  platform: (platform: Platform) =>
    `${platform} · resolves ${name(BUTTON_FILE[platform])}`,
};
