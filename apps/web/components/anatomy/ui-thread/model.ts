/**
 * The truth the figure moves by.
 *
 * The UI (main) thread lays out and draws native views. Each frame has a
 * budget: 1000 / 60 ≈ 16.7 ms at 60 Hz, 8.3 ms at 120 Hz. If drawing takes
 * longer, the frame is dropped (UI-thread jank, even with JavaScript idle).
 * If the JavaScript thread is busy, the UI thread keeps scrolling but new
 * content is described too late and arrives blank (JS-thread jank).
 */

export const BUDGET = { 120: 1000 / 120, 60: 1000 / 60 } as const;
export type Hz = keyof typeof BUDGET;

/** Paint cost per frame for light and heavy view trees, in ms. */
export const PAINT = { heavy: 12, light: 6 };
/** Rows JavaScript describes per frame, idle and busy. */
export const DESCRIBE = { busy: 1 / 6, idle: 1 };

export const readouts = {
  state: (hz: Hz, heavy: boolean, busy: boolean) => {
    const paint = heavy ? PAINT.heavy : PAINT.light;
    const budget = BUDGET[hz];
    const ui =
      paint > budget
        ? `paint ${paint} ms > ${budget.toFixed(1)} ms · frames dropped`
        : `paint ${paint} ms ≤ ${budget.toFixed(1)} ms`;
    return `${hz} Hz · ${ui}${busy ? ' · JS busy, new rows blank' : ''}`;
  },
};
