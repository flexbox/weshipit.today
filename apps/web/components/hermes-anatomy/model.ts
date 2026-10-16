/**
 * The truth the figure moves by.
 *
 * JavaScriptCore receives the bundle as source text and has to parse and
 * compile it every time the app starts. Hermes runs the same compile step
 * (`hermesc`) once, at build time, and ships bytecode inside the app, so a
 * launch only loads that bytecode and starts executing. Same work, moved out
 * of the user's wait. Hermes has no JIT: the bytecode is interpreted.
 */

export type Engine = 'hermes' | 'jsc';

/** Cards in the deck: chunks of the JavaScript bundle. */
export const CARDS = 5;

/** Figure seconds per step. The ratio, not the unit, is the point. */
export const STEP = {
  toPress: 0.5,
  punch: 0.45,
  toHopper: 0.55,
  feed: 0.42,
} as const;

/** Full scale of the launch dial, in figure seconds. */
export const DIAL_SPAN = 8;

export const readouts = {
  rest: (engine: Engine) =>
    engine === 'hermes'
      ? 'Hermes · bytecode precompiled at build'
      : 'JSC · source text, parsed at launch',
  building: (done: number) =>
    `build · hermesc compiles ${done}/${CARDS} to bytecode`,
  built: () => `build done · ${CARDS} bytecode cards in the app`,
  launching: (engine: Engine, parsed: number, run: number) =>
    engine === 'hermes'
      ? `Hermes launch · 0 parsed · ${run}/${CARDS} run`
      : `JSC launch · ${parsed}/${CARDS} parsed · ${run}/${CARDS} run`,
  ready: (engine: Engine, seconds: number) =>
    engine === 'hermes'
      ? `Hermes ready · dial ${seconds.toFixed(1)} · nothing parsed at launch`
      : `JSC ready · dial ${seconds.toFixed(1)} · ${CARDS} cards parsed at launch`,
};
