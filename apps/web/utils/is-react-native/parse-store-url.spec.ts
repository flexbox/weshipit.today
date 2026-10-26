import { parseStoreUrl } from './parse-store-url';

describe('parseStoreUrl', () => {
  it('reads the package id from a Google Play link', () => {
    expect(
      parseStoreUrl(
        'https://play.google.com/store/apps/details?id=com.planet.centerparcs&hl=fr',
      ),
    ).toEqual({ packageId: 'com.planet.centerparcs', platform: 'android' });
  });

  it('accepts a link without protocol', () => {
    expect(
      parseStoreUrl('play.google.com/store/apps/details?id=com.discord'),
    ).toEqual({ packageId: 'com.discord', platform: 'android' });
  });

  it('accepts a bare package id', () => {
    expect(parseStoreUrl('  com.spotify.music ')).toEqual({
      packageId: 'com.spotify.music',
      platform: 'android',
    });
  });

  it('flags App Store links as unsupported', () => {
    expect(
      parseStoreUrl('https://apps.apple.com/fr/app/center-parcs/id1234567890'),
    ).toEqual({ error: 'ios-not-supported' });
  });

  it.each([
    'https://example.com/?id=com.discord',
    'https://play.google.com/store/apps/details',
    'https://play.google.com/store/apps/details?id=../etc',
    'not a link',
  ])('rejects %s', (input) => {
    expect(parseStoreUrl(input)).toEqual({ error: 'invalid' });
  });
});
