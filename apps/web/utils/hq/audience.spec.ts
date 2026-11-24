import { audienceFor } from './audience';

describe('audienceFor', () => {
  it('sends the davidl.fr newsletter form to Newsletter', () => {
    expect(audienceFor('davidl-newsletter')).toBe('newsletter');
  });

  it('sends lead magnets and self-audits to Leads', () => {
    expect(audienceFor('r-page')).toBe('leads');
    expect(audienceFor('audit:security')).toBe('leads');
  });
});
