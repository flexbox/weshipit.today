/**
 * The truth the figure moves by.
 *
 * Reanimated runs animation logic as worklets on the UI thread, driven by
 * shared values, so the style is recomputed natively every frame. An
 * animation driven by setState lives on the JavaScript thread instead: while
 * JavaScript is busy (parsing a large response, say) it cannot produce new
 * frames, so the motion stalls and then jumps.
 */

/** One full back-and-forth of the animation, in seconds. */
export const PERIOD = 2.4;
/** How long parsing a large response keeps the JS thread busy. */
export const BUSY = 2.8;
/** While busy, JS gets a frame out only between chunks of work. */
export const BUSY_FRAME = 0.4;
export const FPS = 60;

export const readouts = {
  busy: () => `JS parsing a large response · setState view stalls`,
  done: (dropped: number) =>
    `JS free again · setState dropped ${dropped} frames · worklet dropped 0`,
  paused: () => `animation paused`,
  rest: () => `both views animating · JS thread idle`,
};
