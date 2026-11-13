/**
 * The truth the figure moves by.
 *
 * FlatList mounts only the rows inside its render window, around the
 * viewport, and recycles them as the user scrolls, so the number of mounted
 * views stays flat however long the data is. A ScrollView mounts every child
 * up front: a thousand-row list allocates a thousand native views. (The real
 * default window, `windowSize: 21`, is 21 viewports tall; the figure shrinks
 * it so the edge where rows recycle stays in view.)
 */

export const ROWS = 1000;
export type Mode = 'flatlist' | 'scrollview';

export const readouts = {
  flat: (mounted: number, row: number) =>
    `FlatList · ${mounted} rows mounted of ${ROWS.toLocaleString('en')} · row ${row} on screen`,
  rest: () =>
    `FlatList · ${ROWS.toLocaleString('en')} rows · scroll to see recycling`,
  scroll: (row: number) =>
    `ScrollView · all ${ROWS.toLocaleString('en')} rows mounted · row ${row} on screen`,
};
