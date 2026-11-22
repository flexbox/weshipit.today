import { magnetFormSchema, subscribeSchema } from './schemas';

describe('subscribeSchema', () => {
  it('normalizes the email and applies defaults', () => {
    const result = subscribeSchema.parse({ email: '  Jane@Example.COM ' });
    expect(result).toEqual({
      email: 'jane@example.com',
      locale: 'fr',
      marketing_consent: false,
      source: 'r-page',
    });
  });

  it('drops empty optional fields instead of storing empty strings', () => {
    const result = subscribeSchema.parse({
      email: 'jane@example.com',
      first_name: '   ',
      utm_source: '',
    });
    expect(result.first_name).toBeUndefined();
    expect(result.utm_source).toBeUndefined();
  });

  it('rejects an invalid email', () => {
    expect(subscribeSchema.safeParse({ email: 'nope' }).success).toBe(false);
  });

  it('rejects a slug or source with unexpected characters', () => {
    expect(
      subscribeSchema.safeParse({ email: 'a@b.co', magnet: '../admin' })
        .success,
    ).toBe(false);
    expect(
      subscribeSchema.safeParse({ email: 'a@b.co', source: 'Robert"); --' })
        .success,
    ).toBe(false);
  });

  it('accepts a quiz score in meta and caps the number of keys', () => {
    expect(
      subscribeSchema.parse({
        email: 'a@b.co',
        meta: { score: 72 },
        source: 'audit:security',
      }).meta,
    ).toEqual({ score: 72 });
    const tooMany = Object.fromEntries(
      Array.from({ length: 11 }, (_, index) => [`k${index}`, index]),
    );
    expect(
      subscribeSchema.safeParse({ email: 'a@b.co', meta: tooMany }).success,
    ).toBe(false);
  });
});

describe('magnetFormSchema', () => {
  const base = {
    content_md: '- [ ] Item',
    pitch: 'Une promesse',
    slug: 'Checklist-Stabilite',
    title: 'Checklist',
  };

  it('splits bullets by line, lowercases the slug and reads the checkbox', () => {
    const result = magnetFormSchema.parse({
      ...base,
      bullets: 'Un\r\n\n  Deux  \n',
      id: '',
      published: 'on',
    });
    expect(result).toMatchObject({
      bullets: ['Un', 'Deux'],
      id: undefined,
      published: true,
      slug: 'checklist-stabilite',
    });
  });

  it('treats a missing checkbox as unpublished', () => {
    expect(magnetFormSchema.parse(base).published).toBe(false);
  });

  it('rejects a slug that is not URL-safe', () => {
    expect(
      magnetFormSchema.safeParse({ ...base, slug: 'avec espace' }).success,
    ).toBe(false);
  });
});
