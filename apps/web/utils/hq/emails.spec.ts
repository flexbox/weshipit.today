import {
  escapeHtml,
  followupEmail,
  leadLocale,
  newsletterEmail,
  NEWSLETTER_LINKS,
  visitorEmail,
  type EmailContent,
} from './emails';

const unsubscribeUrl = 'https://weshipit.today/api/lm/unsubscribe?t=abc';

/** Every email gets straight to the point: no greeting, no signature. */
function expectStraightToThePoint(email: EmailContent) {
  expect(email.text).not.toMatch(/^(Bonjour|Hello|Hi)\b/);
  expect(email.text).not.toMatch(/^David$/m);
}

describe('visitorEmail', () => {
  it('links the resource and the unsubscribe page', () => {
    const email = visitorEmail({
      magnet: {
        accessUrl: 'https://weshipit.today/r/checklist/tok',
        title: 'Checklist',
      },
      unsubscribeUrl,
    });
    expect(email.subject).toBe('Ta ressource : Checklist');
    expect(email.text.startsWith('Voici « Checklist » :')).toBe(true);
    expect(email.text).toContain('https://weshipit.today/r/checklist/tok');
    expect(email.text).toContain(unsubscribeUrl);
    expect(email.html).toContain(
      'href="https://weshipit.today/r/checklist/tok"',
    );
    expectStraightToThePoint(email);
  });

  it('escapes a magnet title', () => {
    const email = visitorEmail({
      magnet: { accessUrl: 'https://x.co', title: '<img src=x>' },
      unsubscribeUrl,
    });
    expect(email.html).not.toContain('<img');
    expect(email.html).toContain('&lt;img');
  });

  it('opens with the score for quiz leads', () => {
    const email = visitorEmail({ score: 72, unsubscribeUrl });
    expect(email.subject).toBe('Ton audit : 72/100');
    expect(email.text.startsWith('Ton score : 72/100.')).toBe(true);
    expectStraightToThePoint(email);
  });
});

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
  });
});

describe('followupEmail', () => {
  it('asks what they thought of the magnet', () => {
    const email = followupEmail({ magnetTitle: 'Checklist' });
    expect(email.subject).toBe('Merci !');
    expect(email.text).toBe(
      'Merci d’avoir téléchargé « Checklist ». Qu’est-ce que tu en as pensé ?',
    );
    expect(email.html).not.toContain('Ne plus recevoir');
  });

  it('falls back to a generic thank-you without a magnet', () => {
    const email = followupEmail({});
    expect(email.text).toBe(
      'Merci de t’être inscrit. Qu’est-ce qui t’a amené ici ?',
    );
  });

  it('asks newsletter subscribers in English', () => {
    const email = followupEmail({ locale: 'en', source: 'davidl-newsletter' });
    expect(email.subject).toBe('Thanks!');
    expect(email.text).toBe('Thanks for subscribing. What made you sign up?');
    expect(email.html).toContain('lang="en"');
  });

  it('asks quiz leads about their score', () => {
    const email = followupEmail({ source: 'audit:security' });
    expect(email.text).toContain('l’audit');
  });

  it('escapes the title', () => {
    const email = followupEmail({ magnetTitle: '<i>' });
    expect(email.html).not.toContain('<i>');
  });
});

describe('newsletterEmail', () => {
  it('welcomes in English and links the podcast and YouTube', () => {
    const email = newsletterEmail({ unsubscribeUrl });
    expect(email.subject).toBe('Welcome to the newsletter');
    expect(email.text.startsWith('You’re in.')).toBe(true);
    for (const { url } of Object.values(NEWSLETTER_LINKS)) {
      expect(email.text).toContain(url);
      expect(email.html).toContain(`href="${url}"`);
    }
    expect(email.text).not.toContain('davidl.fr/blog');
    expect(email.text).toContain(unsubscribeUrl);
    expect(email.html).toContain('lang="en"');
    expectStraightToThePoint(email);
  });
});

describe('visitorEmail in English', () => {
  it('sends the resource in the language of the form', () => {
    const email = visitorEmail({
      locale: 'en',
      magnet: { accessUrl: 'https://x.co/r', title: 'Checklist' },
      unsubscribeUrl,
    });
    expect(email.subject).toBe('Your resource: Checklist');
    expect(email.text.startsWith('Here’s “Checklist”:')).toBe(true);
    expect(email.text).toContain(`Unsubscribe: ${unsubscribeUrl}`);
    expect(email.html).toContain('lang="en"');
    expect(email.text).not.toContain('Voici');
    expectStraightToThePoint(email);
  });
});

describe('leadLocale', () => {
  it('uses the locale saved at signup', () => {
    expect(leadLocale({ meta: { locale: 'en' }, source: 'r-page' })).toBe('en');
  });

  it('guesses English for older newsletter leads and French otherwise', () => {
    expect(leadLocale({ meta: {}, source: 'davidl-newsletter' })).toBe('en');
    expect(leadLocale({ meta: null, source: 'audit:security' })).toBe('fr');
  });
});
