import { format } from 'date-fns';

export interface SpotLeftProps {
  spotsLeft: number;
}

export function SpotLeft({ spotsLeft = 2 }: SpotLeftProps) {
  const currentDate = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentDate.getMonth() + 1);
  const nextMonthInText = format(nextMonth, 'MMMM');

  if (spotsLeft <= 0) {
    return null;
  }

  return (
    <div className="shrink-0">
      <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-neutral-200">
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
