/**
 * The three HQ emails, as plain data. No sending here, so the copy is easy to
 * test and to change. Everything a visitor typed is escaped before it goes
 * into HTML.
 */

export interface EmailContent {
  html: string;
  text: string;
  subject: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SIGNATURE = ['David', 'weshipit.today'];

function wrapHtml(paragraphs: string[], footer?: string): string {
  const body = paragraphs
    .map((paragraph) => `<p style="margin:0 0 16px">${paragraph}</p>`)
    .join('');
  const foot = footer
    ? `<p style="margin:32px 0 0;font-size:13px;color:#64748b">${footer}</p>`
    : '';
  return `<!doctype html><html lang="fr"><body style="margin:0;padding:24px;background:#ffffff"><div style="max-width:560px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#0f172a">${body}${foot}</div></body></html>`;
}

const link = (url: string, label = url) =>
  `<a href="${escapeHtml(url)}" style="color:#2563eb">${escapeHtml(label)}</a>`;

const greeting = (firstName?: string | null) =>
  firstName ? `Bonjour ${firstName},` : 'Bonjour,';

export interface VisitorEmailInput {
  firstName?: string | null;
  /** Set when the lead came from a magnet: the email carries its link. */
  magnet?: { title: string; accessUrl: string } | null;
  /** Quiz score out of 100, when the lead came from a self-audit. */
  score?: number | null;
  unsubscribeUrl: string;
}

/** Sent to every lead: the resource link, or a short thank-you. */
export function visitorEmail({
  firstName,
  magnet,
  score,
  unsubscribeUrl,
}: VisitorEmailInput): EmailContent {
  const hello = greeting(firstName);
  const ask =
    'Une question ? Réponds simplement à cet email, je lis tout moi-même.';
  const unsubscribe = 'Ne plus recevoir d’emails';

  if (magnet) {
    const subject = `Ta ressource : ${magnet.title}`;
    const text = [
      hello,
      '',
      `Voici ta ressource « ${magnet.title} » :`,
      magnet.accessUrl,
      '',
      'Tu peux la garder ouverte, l’imprimer ou l’enregistrer en PDF.',
      ask,
      '',
      ...SIGNATURE,
      '',
      `${unsubscribe} : ${unsubscribeUrl}`,
    ].join('\n');
    const html = wrapHtml(
      [
        escapeHtml(hello),
        `Voici ta ressource « ${escapeHtml(magnet.title)} » :<br>${link(magnet.accessUrl, 'Ouvrir la ressource')}`,
        'Tu peux la garder ouverte, l’imprimer ou l’enregistrer en PDF.',
        escapeHtml(ask),
        SIGNATURE.join('<br>'),
      ],
      link(unsubscribeUrl, unsubscribe),
    );
    return { html, subject, text };
  }

  const hasScore = typeof score === 'number';
  const subject = hasScore ? `Ton audit : ${score}/100` : 'Merci, c’est noté';
  const scoreLine = hasScore ? `Ton score : ${score}/100.` : null;
  const text = [
    hello,
    '',
    'Merci, c’est bien noté.',
    ...(scoreLine ? [scoreLine] : []),
    ask,
    '',
    ...SIGNATURE,
    '',
    `${unsubscribe} : ${unsubscribeUrl}`,
  ].join('\n');
  const html = wrapHtml(
    [
      escapeHtml(hello),
      ['Merci, c’est bien noté.', scoreLine].filter(Boolean).join('<br>'),
      escapeHtml(ask),
      SIGNATURE.join('<br>'),
    ],
    link(unsubscribeUrl, unsubscribe),
  );
  return { html, subject, text };
}

export interface OwnerEmailInput {
  email: string;
  hqUrl: string;
  source: string;
  score?: number | null;
  firstName?: string | null;
  marketingConsent: boolean;
  magnetTitle?: string | null;
  utm?: {
    source?: string | null;
    medium?: string | null;
    campaign?: string | null;
  };
}

/** Sent to me for each new lead, so I can write back by hand. */
export function ownerEmail(input: OwnerEmailInput): EmailContent {
  const utm = [input.utm?.source, input.utm?.medium, input.utm?.campaign]
    .filter(Boolean)
    .join(' / ');
  const rows: [string, string][] = [
    ['Email', input.email],
    ['Prénom', input.firstName || '—'],
    ['Source', input.source],
    ['Ressource', input.magnetTitle || '—'],
    ['UTM', utm || '—'],
    ...(typeof input.score === 'number'
      ? ([['Score', `${input.score}/100`]] as [string, string][])
      : []),
    ['Accepte les emails', input.marketingConsent ? 'oui' : 'non'],
  ];
  const subject = `Nouveau lead · ${input.magnetTitle || input.source}`;
  const mailto = `mailto:${input.email}`;
  const text = [
    ...rows.map(([label, value]) => `${label} : ${value}`),
    '',
    `Lui répondre : ${mailto}`,
    `Tous les leads : ${input.hqUrl}`,
  ].join('\n');
  const html = wrapHtml([
    rows
      .map(
        ([label, value]) =>
          `<strong>${escapeHtml(label)}</strong> : ${escapeHtml(value)}`,
      )
      .join('<br>'),
    `${link(mailto, 'Lui répondre')} · ${link(input.hqUrl, 'Tous les leads')}`,
  ]);
  return { html, subject, text };
}

export interface FollowupEmailInput {
  firstName?: string | null;
  /** The magnet they downloaded; null for newsletter and quiz leads. */
  magnetTitle?: string | null;
}

/**
 * The three-line "Merci !" I send by hand from HQ, within 24 hours of a
 * signup. It must read like a personal note, so no layout and no visible
 * footer: unsubscribing goes through the List-Unsubscribe header.
 */
export function followupEmail({
  firstName,
  magnetTitle,
}: FollowupEmailInput): EmailContent {
  const hello = firstName ? `Hello ${firstName},` : 'Hello,';
  const ask = magnetTitle
    ? `Merci d’avoir téléchargé « ${magnetTitle} ». Dis-moi, qu’est-ce que tu en as pensé ?`
    : 'Merci de t’être inscrit. Dis-moi, qu’est-ce qui t’a amené ici ?';
  const text = [hello, '', ask, '', '--David'].join('\n');
  const html = wrapHtml([escapeHtml(hello), escapeHtml(ask), '--David']);
  return { html, subject: 'Merci !', text };
}

export const FOLLOWUP_STATUSES = ['to_contact', 'sent', 'replied'] as const;
export type FollowupStatus = (typeof FOLLOWUP_STATUSES)[number];
