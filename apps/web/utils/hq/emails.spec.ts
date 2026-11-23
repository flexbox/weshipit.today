import { escapeHtml, followupEmail, ownerEmail, visitorEmail } from './emails';

const unsubscribeUrl = 'https://weshipit.today/api/lm/unsubscribe?t=abc';

describe('visitorEmail', () => {
  it('links the resource and the unsubscribe page', () => {
    const email = visitorEmail({
      firstName: 'Jane',
      magnet: {
        accessUrl: 'https://weshipit.today/r/checklist/tok',
        title: 'Checklist',
      },
      unsubscribeUrl,
    });
    expect(email.subject).toBe('Ta ressource : Checklist');
    expect(email.text).toContain('https://weshipit.today/r/checklist/tok');
    expect(email.text).toContain(unsubscribeUrl);
    expect(email.html).toContain(
      'href="https://weshipit.today/r/checklist/tok"',
    );
    expect(email.text.startsWith('Bonjour Jane,')).toBe(true);
  });

  it('escapes a first name typed by the visitor', () => {
    const email = visitorEmail({
      firstName: '<img src=x onerror=alert(1)>',
      unsubscribeUrl,
    });
    expect(email.html).not.toContain('<img');
    expect(email.html).toContain('&lt;img');
  });

  it('thanks quiz leads with their score when there is no magnet', () => {
    const email = visitorEmail({ score: 72, unsubscribeUrl });
    expect(email.subject).toBe('Ton audit : 72/100');
    expect(email.text).toContain('Ton score : 72/100.');
    expect(email.text.startsWith('Bonjour,')).toBe(true);
  });
});

describe('ownerEmail', () => {
  it('lists the lead and links back to HQ', () => {
    const email = ownerEmail({
      email: 'jane@example.com',
      firstName: 'Jane',
      hqUrl: 'https://weshipit.today/hq/leads',
      magnetTitle: 'Checklist',
      marketingConsent: true,
      source: 'r-page',
      utm: { medium: 'video', source: 'youtube' },
    });
    expect(email.subject).toBe('Nouveau lead · Checklist');
    expect(email.text).toContain('UTM : youtube / video');
    expect(email.text).toContain('Accepte les emails : oui');
    expect(email.text).toContain('mailto:jane@example.com');
  });

  it('falls back to the source when there is no magnet', () => {
    expect(
      ownerEmail({
        email: 'a@b.co',
        hqUrl: 'https://weshipit.today/hq/leads',
        marketingConsent: false,
        score: 40,
        source: 'audit:security',
      }).subject,
    ).toBe('Nouveau lead · audit:security');
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
    const email = followupEmail({
      firstName: 'Jane',
      magnetTitle: 'Checklist',
    });
    expect(email.subject).toBe('Merci !');
    expect(email.text).toBe(
      'Hello Jane,\n\nMerci d’avoir téléchargé « Checklist ». Dis-moi, qu’est-ce que tu en as pensé ?',
    );
    expect(email.html).not.toContain('Ne plus recevoir');
  });

  it('falls back to a generic thank-you without a magnet', () => {
    const email = followupEmail({});
    expect(email.text.startsWith('Hello,')).toBe(true);
    expect(email.text).toContain('qu’est-ce qui t’a amené ici ?');
  });

  it('escapes the first name and the title', () => {
    const email = followupEmail({ firstName: '<b>x</b>', magnetTitle: '<i>' });
    expect(email.html).not.toContain('<b>x</b>');
    expect(email.html).not.toContain('<i>');
  });
});
