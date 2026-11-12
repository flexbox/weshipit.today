/**
 * The truth the figure moves by.
 *
 * React Navigation nests navigators. A bottom tab navigator keeps one stack
 * per tab, and each tab's stack keeps its own history: push adds a screen on
 * top (sliding in with the platform's native animation in a Native Stack),
 * back pops it, and switching tabs shows another stack exactly as you left it.
 */

export const TABS = ['Home', 'Search', 'Profile'] as const;
export type Tab = 0 | 1 | 2;

/** The screens each tab can push, in order; the first is the tab's root. */
export const ROUTES: string[][] = [
  ['Feed', 'Post', 'Comments'],
  ['Search', 'Results', 'Product'],
  ['Profile', 'Settings', 'Account'],
];

export const pathOf = (tab: number, depth: number) =>
  ROUTES[tab].slice(0, depth).join(' › ');

export const readouts = {
  full: (tab: number) => `${TABS[tab]} stack is full here`,
  pop: (tab: number, depth: number) =>
    `back · ${TABS[tab]} stack: ${pathOf(tab, depth)}`,
  push: (tab: number, depth: number) =>
    `push · ${TABS[tab]} stack: ${pathOf(tab, depth)}`,
  rest: () => `Home stack: Feed · push, go back or switch tab`,
  root: (tab: number) => `${TABS[tab]} stack is at its root`,
  tab: (tab: number, depth: number) =>
    `${TABS[tab]} tab · its stack kept: ${pathOf(tab, depth)}`,
};
