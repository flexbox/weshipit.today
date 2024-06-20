import { Badge } from '../badge/badge';
import { format } from 'date-fns';

export interface SpotLeftProps {
  spotsLeft: number;
}

function FreeSpot() {
  return <div className="size-3 rounded-full bg-blue-500"></div>;
}
function BusySpot() {
  return (
    <div className="size-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
  );
}

export function SpotLeft({ spotsLeft = 2 }: SpotLeftProps) {
  const currentDate = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentDate.getMonth() + 1);
  const nextMonthInText = format(nextMonth, 'MMMM');

  // Calculate the number of FreeSpot and BusySpot components to render
  const freeSpots = spotsLeft;
  const busySpots = 2 - spotsLeft;

  return (
    <div className="shrink-0">
      <Badge variant="blue" className="flex gap-2">
        {Array.from({ length: busySpots }, (_, index) => (
          <BusySpot key={`busy-spot-${index}`} />
        ))}
        {Array.from({ length: freeSpots }, (_, index) => (
          <FreeSpot key={`free-spot-${index}`} />
        ))}
        <div>
          {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left in {nextMonthInText}{' '}
          ✨
        </div>
      </Badge>
    </div>
  );
}

export default SpotLeft;
