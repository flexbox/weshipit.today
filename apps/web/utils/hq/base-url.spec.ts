import { baseUrl } from './base-url';

describe('baseUrl', () => {
  it('prefers the configured site URL and trims its trailing slash', () => {
    expect(baseUrl({ host: 'evil.example' }, 'https://weshipit.today/')).toBe(
      'https://weshipit.today',
    );
  });

  it('uses the forwarded host and protocol behind a proxy', () => {
    expect(
      baseUrl(
        {
          host: 'internal',
          'x-forwarded-host': 'preview.vercel.app',
          'x-forwarded-proto': 'https',
        },
        '',
      ),
    ).toBe('https://preview.vercel.app');
  });

  it('uses http for localhost', () => {
    expect(baseUrl({ host: 'localhost:4200' }, '')).toBe(
      'http://localhost:4200',
    );
  });
});
