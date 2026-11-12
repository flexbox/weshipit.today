/**
 * The truth the figure moves by.
 *
 * The legacy bridge: every call between JavaScript and native code was
 * serialised to JSON, put on a queue and handled asynchronously on the other
 * side, one message at a time. There were no synchronous reads, so even
 * measuring a view meant sending a message and waiting for a reply message.
 * A burst of events (a fast scroll) filled the queue, and messages behind it
 * arrived late. Bridgeless mode, the default since React Native 0.76,
 * replaced it with JSI.
 */

/** Figure seconds. The ratios, not the units, are the point. */
export const TIMING = {
  /** Serialise a normal call, and a large payload. */
  stringify: 0.35,
  stringifyLarge: 1.1,
  /** Belt speed in world units per second. */
  belt: 46,
  /** One message parsed per this many seconds at the far end. */
  parse: 0.32,
};

/** Scroll events sent by one fast scroll. */
export const SCROLL_EVENTS = 8;

export const readouts = {
  answered: () => `JS: reply arrived · two queue trips after asking`,
  big: () => `large payload · serialising takes longer`,
  call: () => `call → JSON.stringify → queued`,
  late: (late: number, n: number) =>
    `${late} of ${n} events waited in the queue · frames late`,
  measure: () => `measure(view) · no sync answer · reply queued`,
  parsed: () => `native: JSON.parse · call runs`,
  rest: () => `JS ⇄ native · one async JSON queue each way`,
  scroll: (n: number) => `scroll · ${n} events queued for JS`,
};
