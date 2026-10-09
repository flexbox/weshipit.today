import { createInviteToken, verifyInviteToken } from './token';

describe('invite tokens', () => {
  const originalSecret = process.env.TESTIMONIAL_INVITE_SECRET;

  beforeAll(() => {
    process.env.TESTIMONIAL_INVITE_SECRET = 'test-secret';
  });

  afterAll(() => {
    process.env.TESTIMONIAL_INVITE_SECRET = originalSecret;
  });

  it('round-trips the payload', () => {
    const token = createInviteToken({ company: 'Doctolib', name: 'Marie' });

    expect(verifyInviteToken(token)).toMatchObject({
      company: 'Doctolib',
      name: 'Marie',
    });
  });

  it('rejects a tampered payload', () => {
    const [encoded, signature] = createInviteToken({
      company: 'Doctolib',
      name: 'Marie',
    }).split('.');
    const tampered = Buffer.from(
      JSON.stringify({
        company: 'Evil Corp',
        exp: Date.now() + 1000,
        name: 'Mallory',
      }),
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    expect(encoded).not.toEqual(tampered);
    expect(verifyInviteToken(`${tampered}.${signature}`)).toBeNull();
  });

  it('rejects an expired token', () => {
    const token = createInviteToken({
      company: 'Doctolib',
      name: 'Marie',
      ttlMs: -1,
    });

    expect(verifyInviteToken(token)).toBeNull();
  });

  it('rejects malformed input without throwing', () => {
    expect(verifyInviteToken('')).toBeNull();
    expect(verifyInviteToken('nope')).toBeNull();
    expect(verifyInviteToken('a.b.c')).toBeNull();
  });
});
