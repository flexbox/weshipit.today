import {
  escapeHtml,
  followupEmail,
  leadLocale,
  newsletterEmail,
  NEWSLETTER_LINKS,
  spmPlanEmail,
  visitorEmail,
  type EmailContent,
} from './emails';
import { parseAnswerGaps } from '../audits/spm-readiness';

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

describe('spmPlanEmail', () => {
  const base = {
    auditUrl: 'https://weshipit.today/audit',
    unsubscribeUrl: 'https://weshipit.today/api/lm/unsubscribe?t=abc',
  };

  it('groups the gaps by effort, upgrade first, with their commands', () => {
    const email = spmPlanEmail({
      ...base,
      gaps: parseAnswerGaps('d3:n,p3:n,r1:n,c1:u'),
      score: 58,
    });
    expect(email.subject).toBe('Your SPM migration plan (58/100)');
    expect(email.text).toContain('Score: 58/100. Ready for a spike.');
    expect(email.text).toContain('Already OK: 8 of 12 checks.');
    const order = [
      'START HERE',
      '1. Upgrade to React Native 0.87',
      'QUICK FIXES',
      '2. Scaffold a Package.swift for local pods',
      '$ npx react-native spm scaffold',
      '3. Check first: Make a fresh clone build without Pods/',
      'WAITING ON UPSTREAM',
      '4. Check your Swift + C++ libraries',
    ].map((line) => email.text.indexOf(line));
    expect(order.every((position) => position >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(email.text).not.toContain('LIBRARY CHANGES');
    expect(email.html).toContain('<li value="4"');
    expect(email.text).toContain(base.auditUrl);
    expect(email.html).toContain(base.unsubscribeUrl);
    expectStraightToThePoint(email);
  });

  it('says there is nothing left when every answer is Yes', () => {
    const email = spmPlanEmail({
      ...base,
      gaps: parseAnswerGaps(''),
      score: 100,
    });
    expect(email.text).toContain('No blockers left.');
    expect(email.text).not.toContain('Your plan, in order:');
  });

  it('ignores unknown ids and codes', () => {
    const gaps = parseAnswerGaps('zz:n,r1:x,<b>:n,r2:u');
    expect([...gaps.entries()]).toEqual([
      ['zz', 'no'],
      ['<b>', 'no'],
      ['r2', 'unknown'],
    ]);
    const email = spmPlanEmail({ ...base, gaps, score: 90 });
    expect(email.text).not.toContain('<b>');
    expect(email.text).toContain('1. Check first: Stop patching');
    expect(email.text).toContain('Already OK: 11 of 12 checks.');
  });
});
