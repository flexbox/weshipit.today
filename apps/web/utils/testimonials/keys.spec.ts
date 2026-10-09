import { isSafeKey } from './keys';

describe('isSafeKey', () => {
  it('accepts ids and slugs we generate', () => {
    expect(isSafeKey('marie-dupont-doctolib')).toBe(true);
    expect(isSafeKey('7f3b1c2e-9a4d-4f11-8c2b-1e5d9a0f3b77')).toBe(true);
  });

  it('rejects anything that could escape the blob prefix', () => {
    expect(isSafeKey('../published/other')).toBe(false);
    expect(isSafeKey('a/b')).toBe(false);
    expect(isSafeKey('a.json')).toBe(false);
    expect(isSafeKey('')).toBe(false);
    expect(isSafeKey('-leading-dash')).toBe(false);
    expect(isSafeKey('a'.repeat(129))).toBe(false);
  });
});
