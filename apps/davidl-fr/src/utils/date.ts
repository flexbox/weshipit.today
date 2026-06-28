import { format } from 'date-fns';

export function humanReadableDate(date: Date): string {
  const result = format(new Date(date), 'dd MMMM yyyy');
  return result;
}
