'use client';

import { useSyncExternalStore } from 'react';

export interface SpotLeftProps {
  spotsLeft: number;
  invert?: boolean;
}

export const SPOT_AVAILABILITY = {
  team: 0,
  kickstart: 0,
  essential: 0,
  growth: 0,
  enterprise: 0,
} as const;

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

function nextMonthName() {
  const today = new Date();
  // Day 1, so a 31st does not overflow past the next month.
  return monthFormatter.format(
    new Date(today.getFullYear(), today.getMonth() + 1, 1),
  );
}

const subscribe = () => () => undefined;
const isServer = typeof window === 'undefined';

/**
 * Pages are prerendered, so the month in the HTML is the month of the last
 * build. Hydrating with today's month would be a text mismatch, which makes
 * React throw away the server HTML and render the whole page again. Hydrate
 * with an empty month instead (the server text stays on screen, see
 * `suppressHydrationWarning` below) and let React write today's month in the
 * same pass.
 */
function useNextMonthName() {
  return useSyncExternalStore(subscribe, nextMonthName, () =>
    isServer ? nextMonthName() : '',
  );
}

export function SpotLeft({ spotsLeft = 2, invert = false }: SpotLeftProps) {
  const nextMonthInText = useNextMonthName();

  const wrapperClass = invert
    ? 'inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-gray-200'
    : 'inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-neutral-200';

  if (spotsLeft <= 0) {
    return (
      <div className="shrink-0">
        <div className={wrapperClass}>
          <span className="flex items-center">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {/* One text node: the parent is a flex row, where a nested
                element would become its own item and lose the space. */}
            <span suppressHydrationWarning>
              {`Fully booked for ${nextMonthInText}`}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0">
      <div className={wrapperClass}>
        <span className="flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span suppressHydrationWarning>
            {`${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left in ${nextMonthInText} ✨`}
          </span>
        </span>
      </div>
    </div>
  );
}

export default SpotLeft;
