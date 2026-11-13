/**
 * The truth the figure moves by.
 *
 * Metro collapses your code and every npm dependency into one bundle. In
 * development it is served over HTTP by Metro and fetched at launch; in a
 * release build it is written into the binary (main.jsbundle on iOS,
 * index.android.bundle on Android) and precompiled to Hermes bytecode.
 * Everything in it is loaded at launch, so an unused dependency still costs
 * startup. Sizes and the startup scale here are illustrative.
 */

export const SIZES = { app: 0.3, heavy: 2, modules: 1.2 };
export type Mode = 'dev' | 'release';

export const sizeOf = (heavy: boolean) =>
  SIZES.app + SIZES.modules + (heavy ? SIZES.heavy : 0);

/** Startup work on a 0–1 dial: bytecode loads faster than parsing source. */
export const startupOf = (size: number, mode: Mode) =>
  Math.min(1, size * (mode === 'dev' ? 0.24 : 0.12) + 0.05);

const mb = (n: number) => `${n.toFixed(1)} MB`;

export const readouts = {
  added: () => `+ a 2 MB dependency · rebuild to see what it costs`,
  built: (size: number, mode: Mode) =>
    `Metro bundled ${mb(size)} · ${mode === 'dev' ? 'served over HTTP' : 'main.jsbundle → Hermes bytecode'}`,
  launch: (size: number, mode: Mode) =>
    mode === 'dev'
      ? `launch · fetch ${mb(size)} from Metro · startup ${Math.round(startupOf(size, mode) * 100)}`
      : `launch · bytecode inside the binary · startup ${Math.round(startupOf(size, mode) * 100)}`,
  removed: () => `dependency removed · rebuild`,
  rest: () => `your code + node_modules → one bundle`,
  stale: () => `sources changed · build the bundle first`,
};
