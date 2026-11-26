export const COCOAPODS_READ_ONLY_URL =
  'https://blog.cocoapods.org/CocoaPods-Specs-Repo/';

/** CocoaPods trunk stops accepting new podspecs on December 2, 2026. */
const READ_ONLY_AT = Date.UTC(2026, 11, 2);
const DAY = 24 * 60 * 60 * 1000;

/**
 * Days left before trunk goes read-only, then days since. Exported so the
 * wording around the switch can be tested.
 */
export function countdownLabel(now: number): {
  label: string;
  isPast: boolean;
} {
  if (now < READ_ONLY_AT) {
    const days = Math.ceil((READ_ONLY_AT - now) / DAY);
    return {
      isPast: false,
      label: `${days} day${days === 1 ? '' : 's'} until CocoaPods goes read-only`,
    };
  }
  const days = Math.floor((now - READ_ONLY_AT) / DAY);
  return {
    isPast: true,
    label:
      days === 0
        ? 'CocoaPods went read-only today'
        : `CocoaPods read-only for ${days} day${days === 1 ? '' : 's'}`,
  };
}
