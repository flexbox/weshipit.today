import { escapeSlack, failureMessage, newLeadMessage } from './slack';

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

describe('newLeadMessage for self-audits', () => {
  it('shows "audit" as the source, the audit name and the score', () => {
    const { text } = newLeadMessage({
      email: 'jane@example.com',
      hqUrl: 'https://weshipit.today/hq/leads',
      score: 58,
      source: 'audit:spm-readiness',
    });
    expect(text).toBe(
      [
        'Nouveau lead: *SPM readiness check*',
        'Source: *audit*',
        'Ressource: *SPM readiness check*',
        'Score: *58/100*',
        'Email: *jane@example.com*',
        '',
        '<https://weshipit.today/hq/leads|Tous les leads>',
      ].join('\n'),
    );
  });

  it('falls back to the quiz id for an audit it does not know', () => {
    const { text } = newLeadMessage({
      email: 'jane@example.com',
      hqUrl: 'https://weshipit.today/hq/leads',
      source: 'audit:new-quiz',
    });
    expect(text).toContain('Source: *audit*');
    expect(text).toContain('Ressource: *new-quiz*');
    expect(text).not.toContain('Score:');
  });
});

describe('failureMessage', () => {
  it('names what failed, the address and the reason', () => {
    const { text } = failureMessage({
      email: 'ada@example.com',
      failed: 'audience',
      hqUrl: 'https://weshipit.today/hq/leads',
      reason: new Error('Shipmail answered 403'),
    });
    expect(text).toContain('Not added to the Shipmail audience');
    expect(text).toContain('ada@example.com');
    expect(text).toContain('Shipmail answered 403');
  });

  it('escapes the reason', () => {
    const { text } = failureMessage({
      email: 'ada@example.com',
      failed: 'email',
      hqUrl: 'https://weshipit.today/hq/leads',
      reason: '<b>boom</b>',
    });
    expect(text).toContain('Email not sent');
    expect(text).not.toContain('<b>');
  });
});
