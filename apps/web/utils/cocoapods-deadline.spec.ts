import { countdownLabel } from './cocoapods-deadline';

describe('countdownLabel', () => {
  it('counts the days left, rounding a partial day up', () => {
    expect(countdownLabel(Date.UTC(2026, 10, 26, 12))).toEqual({
      isPast: false,
      label: '6 days until CocoaPods goes read-only',
    });
    expect(countdownLabel(Date.UTC(2026, 11, 1, 23)).label).toBe(
      '1 day until CocoaPods goes read-only',
    );
  });

  it('switches to the days since once the date has passed', () => {
    expect(countdownLabel(Date.UTC(2026, 11, 2, 9))).toEqual({
      isPast: true,
      label: 'CocoaPods went read-only today',
    });
    expect(countdownLabel(Date.UTC(2026, 11, 3, 9)).label).toBe(
      'CocoaPods read-only for 1 day',
    );
    expect(countdownLabel(Date.UTC(2027, 0, 1)).label).toBe(
      'CocoaPods read-only for 30 days',
    );
  });
});
