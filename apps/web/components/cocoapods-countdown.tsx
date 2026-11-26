import { Badge } from '@weshipit/ui';
import { useEffect, useState } from 'react';
import {
  COCOAPODS_READ_ONLY_URL,
  countdownLabel,
} from '../utils/cocoapods-deadline';

export { COCOAPODS_READ_ONLY_URL };

/**
 * A small pill linking the CocoaPods announcement. It renders after mount:
 * the page is static, so a count baked in at build time would go stale.
 */
export function CocoaPodsCountdown() {
  const [countdown, setCountdown] = useState<ReturnType<
    typeof countdownLabel
  > | null>(null);

  useEffect(() => {
    setCountdown(countdownLabel(Date.now()));
  }, []);

  if (!countdown) return null;

  return (
    <a
      href={COCOAPODS_READ_ONLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
    >
      <Badge size="sm" variant={countdown.isPast ? 'gray' : 'orange'}>
        <span
          aria-hidden="true"
          className={
            countdown.isPast
              ? 'size-1.5 rounded-full bg-slate-500'
              : 'size-1.5 animate-pulse rounded-full bg-orange-500'
          }
        />
        <span className="tabular-nums">{countdown.label}</span>
      </Badge>
    </a>
  );
}

export default CocoaPodsCountdown;
