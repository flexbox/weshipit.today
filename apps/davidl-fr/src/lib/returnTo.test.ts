import {
  consumeReturnTo,
  DEFAULT_RETURN_TO,
  saveReturnTo,
} from '~/lib/returnTo';

describe('returnTo', () => {
  beforeEach(() => localStorage.clear());

  it('returns the saved workshop path once', () => {
    saveReturnTo('/workshop/challenges/foundation-03');

    expect(consumeReturnTo()).toBe('/workshop/challenges/foundation-03');
    expect(consumeReturnTo()).toBe(DEFAULT_RETURN_TO);
  });

  it('falls back to the profile when nothing was saved', () => {
    expect(consumeReturnTo()).toBe(DEFAULT_RETURN_TO);
  });

  it.each([
    'https://evil.com/workshop',
    '//evil.com/workshop',
    '/blog/react-native',
    '/workshop/login',
    '/workshop/auth/callback#access_token=x',
  ])('ignores unsafe or auth path %s', (path) => {
    saveReturnTo(path);

    expect(consumeReturnTo()).toBe(DEFAULT_RETURN_TO);
  });
});
