import {
  AUDIT_NOTICE_LABELS,
  consentLabelFor,
  MARKETING_CONSENT_LABELS,
} from './consent';

describe('consentLabelFor', () => {
  it('quotes the notice shown under the self-audit forms, in their language', () => {
    expect(consentLabelFor('audit:spm-readiness', 'en')).toContain(
      AUDIT_NOTICE_LABELS.en,
    );
    expect(consentLabelFor('audit:security', 'fr')).toContain(
      AUDIT_NOTICE_LABELS.fr,
    );
  });

  it('keeps the checkbox sentence for lead magnets', () => {
    expect(consentLabelFor('r-page', 'fr')).toBe(MARKETING_CONSENT_LABELS.fr);
  });

  it('describes the form for the davidl.fr newsletter', () => {
    expect(consentLabelFor('davidl-newsletter', 'en')).toMatch(/davidl\.fr/);
  });
});
