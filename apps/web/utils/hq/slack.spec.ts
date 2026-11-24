import { escapeSlack, newLeadMessage } from './slack';

describe('newLeadMessage', () => {
  it('shows the resource, source and email, then links to HQ', () => {
    const { text } = newLeadMessage({
      email: 'jane@example.com',
      hqUrl: 'https://weshipit.today/hq/leads',
      magnetTitle: 'Checklist',
      source: 'r-page',
    });
    expect(text).toBe(
      [
        'Nouveau lead: *Checklist*',
        'Source: *r-page*',
        'Ressource: *Checklist*',
        'Email: *jane@example.com*',
        '',
        '<https://weshipit.today/hq/leads|Tous les leads>',
      ].join('\n'),
    );
  });

  it('falls back to the source when there is no resource', () => {
    const { text } = newLeadMessage({
      email: 'a@b.co',
      hqUrl: 'https://weshipit.today/hq/leads',
      source: 'davidl-newsletter',
    });
    expect(text.startsWith('Nouveau lead: *davidl-newsletter*')).toBe(true);
    expect(text).toContain('Ressource: *—*');
  });

  it('escapes what the visitor typed', () => {
    const { text } = newLeadMessage({
      email: '<!channel>@b.co',
      hqUrl: 'https://weshipit.today/hq/leads',
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
