import { escapeSlack, newLeadMessage } from './slack';

describe('newLeadMessage', () => {
  it('lists the lead and links back to HQ', () => {
    const { text } = newLeadMessage({
      email: 'jane@example.com',
      firstName: 'Jane',
      hqUrl: 'https://weshipit.today/hq/leads',
      magnetTitle: 'Checklist',
      marketingConsent: true,
      source: 'r-page',
      utm: { medium: 'video', source: 'youtube' },
    });
    expect(text.startsWith('*Nouveau lead · Checklist*')).toBe(true);
    expect(text).toContain('*UTM* : youtube / video');
    expect(text).toContain('*Accepte les emails* : oui');
    expect(text).toContain('<mailto:jane@example.com|Lui répondre>');
    expect(text).toContain('<https://weshipit.today/hq/leads|Tous les leads>');
  });

  it('falls back to the source and shows the quiz score', () => {
    const { text } = newLeadMessage({
      email: 'a@b.co',
      hqUrl: 'https://weshipit.today/hq/leads',
      marketingConsent: false,
      score: 40,
      source: 'audit:security',
    });
    expect(text.startsWith('*Nouveau lead · audit:security*')).toBe(true);
    expect(text).toContain('*Score* : 40/100');
  });

  it('escapes what the visitor typed', () => {
    const { text } = newLeadMessage({
      email: 'a@b.co',
      firstName: '<!channel>',
      hqUrl: 'https://weshipit.today/hq/leads',
      marketingConsent: false,
      source: 'r-page',
    });
    expect(text).not.toContain('<!channel>');
    expect(text).toContain('&lt;!channel&gt;');
  });
});

describe('escapeSlack', () => {
  it('escapes &, < and >', () => {
    expect(escapeSlack('a & <b>')).toBe('a &amp; &lt;b&gt;');
  });
});
