/**
 * The truth the figure moves by.
 *
 * Fast Refresh: when a file is saved, Metro sends just that module to the
 * running app, which re-renders in well under a second. If the module only
 * exports React components, their state is preserved. If it exports a hook
 * or anything that is not a component, the module re-runs and the state of
 * the components using it resets. A syntax or runtime error shows a red
 * screen, and saving the fixed file recovers on its own.
 */

export type Kind = 'component' | 'hook';

export const MODULES = [
  { file: 'App.tsx', kind: 'component', tag: 'App' },
  { file: 'Counter.tsx', kind: 'component', tag: 'Counter' },
  { file: 'useCount.ts', kind: 'hook', tag: 'useCount' },
] as const;

export const COUNTER = 1;
export const HOOK = 2;

/** Beads on the abacus: the most the counter state can hold here. */
export const MOST = 6;
export const FIRST_COUNT = 3;

export const readouts = {
  broken: (file: string) => `${file} has a syntax error · red screen`,
  fixed: (count: number) => `fixed and saved · recovered · count ${count} kept`,
  full: () => `count ${MOST} · the abacus is full`,
  kept: (file: string, count: number) =>
    `${file} swapped in · count ${count} kept`,
  reset: (file: string) => `${file} is a hook · module re-ran · count reset`,
  rest: (count: number) => `count ${count} · edit a file and save`,
  sending: (file: string) => `${file} saved · Metro sends 1 module`,
  tapped: (count: number) => `tap +1 · count ${count}`,
};
