import * as React from 'react';

/**
 * Timed steps and an idle tour for a figure. Call `step(dt)` at the top of
 * the tick; it runs due steps and returns whether any are still pending.
 */
export function useScheduler() {
  const state = React.useRef({
    clock: 0,
    idle: 0,
    plan: [] as Array<{ at: number; run: () => void }>,
    touched: false,
    tour: 0,
  });
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  return React.useMemo(
    () => ({
      busy,
      /** Run `run` after `seconds` of figure time. */
      later(seconds: number, run: () => void) {
        const s = state.current;
        s.plan.push({ at: s.clock + seconds, run });
      },
      get pending() {
        return state.current.plan.length > 0;
      },
      step(dt: number) {
        const s = state.current;
        s.clock += dt;
        const due = s.plan.filter((item) => item.at <= s.clock);
        if (due.length) {
          s.plan = s.plan.filter((item) => item.at > s.clock);
          due.forEach((item) => item.run());
        }
        const pending = s.plan.length > 0;
        if (pending !== busyRef.current) {
          busyRef.current = pending;
          setBusy(pending);
        }
        return pending;
      },
      touch() {
        state.current.touched = true;
      },
      get touched() {
        return state.current.touched;
      },
      /** Advance the idle tour; returns true while touring. */
      tourStep(
        dt: number,
        idle: boolean,
        calm: boolean,
        wait: number,
        run: (index: number) => void,
      ) {
        const s = state.current;
        const touring = !s.touched && !calm;
        if (touring && idle) {
          s.idle += dt;
          if (s.idle > wait) {
            s.idle = 0;
            run(s.tour);
            s.tour += 1;
          }
        }
        return touring;
      },
    }),
    // busy changes re-create the object so buttons see it; the ref keeps state.
    [busy],
  );
}
