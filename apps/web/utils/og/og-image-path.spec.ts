import {
  buildOgImagePath,
  buildPodcastOgImagePath,
  OG_IMAGE_VERSION,
} from './og-image-path';

const paramsOf = (path: string) =>
  new URLSearchParams(path.slice(path.indexOf('?') + 1));

describe('buildOgImagePath', () => {
  it('keeps characters that encodeURI would leak into the query string', () => {
    const title = 'R&D: C++ #1? 100% sûr';
    const path = buildOgImagePath({ title });

    expect(path.startsWith('/api/og?')).toBe(true);
    expect(paramsOf(path).get('title')).toBe(title);
  });

  it('sends every option and the cache-busting version', () => {
    const params = paramsOf(
      buildOgImagePath({
        kicker: 'Free tool',
        lang: 'fr',
        path: '/audit-gratuit',
        subline: '1 490 € HT',
        title: 'Audit',
      }),
    );

    expect(Object.fromEntries(params)).toEqual({
      kicker: 'Free tool',
      lang: 'fr',
      path: '/audit-gratuit',
      subline: '1 490 € HT',
      title: 'Audit',
      v: OG_IMAGE_VERSION,
    });
  });

  it('omits empty options', () => {
    const params = paramsOf(buildOgImagePath({ subline: '', title: 'Hi' }));

    expect(params.has('subline')).toBe(false);
    expect(params.has('kicker')).toBe(false);
  });
});

describe('buildPodcastOgImagePath', () => {
  it('encodes the episode data', () => {
    const params = paramsOf(
      buildPodcastOgImagePath({
        episode: 42,
        guest: 'Ana & Léo',
        title: 'Expo + Skia',
        type: 'transcript',
      }),
    );

    expect(params.get('guest')).toBe('Ana & Léo');
    expect(params.get('title')).toBe('Expo + Skia');
    expect(params.get('episode')).toBe('42');
    expect(params.get('type')).toBe('transcript');
  });
});
