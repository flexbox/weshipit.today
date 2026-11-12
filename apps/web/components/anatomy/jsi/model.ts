/**
 * The truth the figure moves by.
 *
 * JSI (JavaScript Interface) is a small C++ API between the JavaScript engine
 * and native code. Native code exposes a HostObject, JavaScript holds a real
 * reference to it and calls it like an ordinary object: no JSON, no queue,
 * and a synchronous return value when one is wanted, which is what lets
 * Fabric read layout synchronously and TurboModules be called directly. JSI
 * abstracts the engine, so React Native runs on Hermes or JavaScriptCore
 * behind the same interface.
 */

export const ENGINES = ['Hermes', 'JSC'] as const;
export type Engine = (typeof ENGINES)[number];

/** View widths the native side lays out, in figure units. */
export const WIDTHS = [32, 22, 38] as const;
export const FIRST_WIDTH = 0;

export const readouts = {
  measured: (width: number) =>
    `measure(view) → ${width} · returned in the same call`,
  resized: (width: number) => `native layout changed · view is now ${width}`,
  rest: (engine: Engine) => `${engine} ⇄ native · one JSI reference`,
  swapped: (engine: Engine, width: number) =>
    `engine → ${engine} · same JSI coupling · still reads ${width}`,
};
