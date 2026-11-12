/**
 * The truth the figure moves by.
 *
 * React matches list items between renders by key. With a stable id, an item
 * keeps its component state (the text typed into its input) wherever it
 * moves. With the array index as key, React matches by position: insert a
 * row at the top and the state stays at its index, so it lands on whichever
 * row is now there.
 */

export type KeyMode = 'id' | 'index';

export const FIRST_IDS = [17, 23, 42, 8];
export const INSERTS = [91, 55];
export const SLOTS = FIRST_IDS.length + INSERTS.length;
/** The row the tour types into. */
export const TYPED_ROW = 1;

export const readouts = {
  full: () => `list is full · reset to start again`,
  keptAtIndex: (inserted: number, slot: number, wrong: number, owner: number) =>
    `inserted user ${inserted} · input stayed at row ${slot}, now on user ${wrong}, not ${owner}`,
  keptWithId: (inserted: number, id: number, slot: number) =>
    `inserted user ${inserted} at the top · input moved with user ${id} to row ${slot}`,
  rest: (mode: KeyMode) =>
    `key={${mode === 'id' ? 'user.id' : 'index'}} · type in a row, then insert at the top`,
  typed: (id: number, slot: number) => `typed into row ${slot} · user ${id}`,
};
