import { format } from 'date-fns';

export interface SpotLeftProps {
  spotsLeft: number;
  invert?: boolean;
}

export const SPOT_AVAILABILITY = {
  team: 2,
  kickstart: 1,
  essential: 0,
  growth: 0,
  enterprise: 1,
} as const;

export function SpotLeft({ spotsLeft = 2, invert = false }: SpotLeftProps) {
  const currentDate = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentDate.getMonth() + 1);
  const nextMonthInText = format(nextMonth, 'MMMM');

  const wrapperClass = invert
    ? 'inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-gray-200'
    : 'inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-neutral-200';

  if (spotsLeft <= 0) {
    return (
      <div className="shrink-0">
        <div className={wrapperClass}>
          <span className="flex items-center">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Fully booked for {nextMonthInText}
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left in {nextMonthInText}{' '}
          ✨
        </span>
      </div>
    </div>
  );
}

export default SpotLeft;
