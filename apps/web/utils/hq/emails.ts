/**
 * The HQ emails, as plain data. No sending here, so the copy is easy to
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

/**
 * Every email gets straight to the point: no greeting, no signature.
 * People's time matters more than politeness padding.
 */
function wrapHtml(
  paragraphs: string[],
  footer?: string,
  lang: 'fr' | 'en' = 'fr',
): string {
  const body = paragraphs
    .map((paragraph) => `<p style="margin:0 0 16px">${paragraph}</p>`)
    .join('');
  const foot = footer
    ? `<p style="margin:32px 0 0;font-size:13px;color:#64748b">${footer}</p>`
    : '';
  return `<!doctype html><html lang="${lang}"><body style="margin:0;padding:24px;background:#ffffff"><div style="max-width:560px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#0f172a">${body}${foot}</div></body></html>`;
}

const link = (url: string, label = url) =>
  `<a href="${escapeHtml(url)}" style="color:#2563eb">${escapeHtml(label)}</a>`;

export type EmailLocale = 'fr' | 'en';

/** Visitor-facing copy, in the language of the form they filled in. */
const COPY = {
  en: {
    ask: 'Questions? Reply to this email.',
    done: 'Thanks, got it.',
    doneSubject: 'Thanks, got it',
    followupAudit: 'Thanks for taking the audit. Did your score surprise you?',
    followupMagnet: (title: string) =>
      `Thanks for downloading “${title}”. What did you think?`,
    followupOther: 'Thanks for subscribing. What made you sign up?',
    followupSubject: 'Thanks!',
    here: (title: string) => `Here’s “${title}”:`,
    open: 'Open the resource',
    resourceSubject: (title: string) => `Your resource: ${title}`,
    score: (score: number) => `Your score: ${score}/100.`,
    scoreSubject: (score: number) => `Your audit: ${score}/100`,
    unsubscribe: 'Unsubscribe',
    unsubscribeLine: (url: string) => `Unsubscribe: ${url}`,
  },
  fr: {
    ask: 'Une question ? Réponds à cet email.',
    done: 'Merci, c’est noté.',
    doneSubject: 'Merci, c’est noté',
    followupAudit: 'Merci d’avoir fait l’audit. Ton score t’a surpris ?',
    followupMagnet: (title: string) =>
      `Merci d’avoir téléchargé « ${title} ». Qu’est-ce que tu en as pensé ?`,
    followupOther: 'Merci de t’être inscrit. Qu’est-ce qui t’a amené ici ?',
    followupSubject: 'Merci !',
    here: (title: string) => `Voici « ${title} » :`,
    open: 'Ouvrir la ressource',
    resourceSubject: (title: string) => `Ta ressource : ${title}`,
    score: (score: number) => `Ton score : ${score}/100.`,
    scoreSubject: (score: number) => `Ton audit : ${score}/100`,
    unsubscribe: 'Ne plus recevoir d’emails',
    unsubscribeLine: (url: string) => `Ne plus recevoir d’emails : ${url}`,
  },
} satisfies Record<EmailLocale, unknown>;

export interface VisitorEmailInput {
  /** Language of the form they filled in. Defaults to French. */
  locale?: EmailLocale;
  /** Set when the lead came from a magnet: the email carries its link. */
  magnet?: { title: string; accessUrl: string } | null;
  /** Quiz score out of 100, when the lead came from a self-audit. */
  score?: number | null;
  unsubscribeUrl: string;
}

/** Sent to every lead: the resource link, or a short thank-you. */
export function visitorEmail({
  locale = 'fr',
  magnet,
  score,
  unsubscribeUrl,
}: VisitorEmailInput): EmailContent {
  const copy = COPY[locale];
  const footer = link(unsubscribeUrl, copy.unsubscribe);

  if (magnet) {
    const text = [
      copy.here(magnet.title),
      magnet.accessUrl,
      '',
      copy.ask,
      '',
      copy.unsubscribeLine(unsubscribeUrl),
    ].join('\n');
    const html = wrapHtml(
      [
        `${escapeHtml(copy.here(magnet.title))}<br>${link(magnet.accessUrl, copy.open)}`,
        escapeHtml(copy.ask),
      ],
      footer,
      locale,
    );
    return { html, subject: copy.resourceSubject(magnet.title), text };
  }

  const hasScore = typeof score === 'number';
  const subject = hasScore ? copy.scoreSubject(score) : copy.doneSubject;
  const first = hasScore ? copy.score(score) : copy.done;
  const text = [
    first,
    '',
    copy.ask,
    '',
    copy.unsubscribeLine(unsubscribeUrl),
  ].join('\n');
  const html = wrapHtml(
    [escapeHtml(first), escapeHtml(copy.ask)],
    footer,
    locale,
  );
  return { html, subject, text };
}

export interface NewsletterLink {
  label: string;
  url: string;
  /** What they'll find there, shown after the link. */
  note: string;
}

export const NEWSLETTER_LINKS: Record<'podcast' | 'youtube', NewsletterLink> = {
  podcast: {
    label: 'Le Cross-Platform Show',
    note: 'my podcast with people who ship mobile apps (in French)',
    url: 'https://weshipit.today/podcast',
  },
  youtube: {
    label: 'YouTube',
    note: 'talks, workshops and live coding',
    url: 'https://www.youtube.com/channel/UCO0X5b0mQ4eIHitXHXSFUyw?sub_confirmation=1',
  },
};

/** Source sent by the davidl.fr newsletter form (English speakers). */
export const NEWSLETTER_SOURCE = 'davidl-newsletter';

export interface NewsletterEmailInput {
  unsubscribeUrl: string;
}

/**
 * Welcome email for the davidl.fr newsletter form. The form is in English,
 * so this one is too.
 */
export function newsletterEmail({
  unsubscribeUrl,
}: NewsletterEmailInput): EmailContent {
  const subject = 'Welcome to the newsletter';
  const intro =
    'You’re in. New articles and resources from real React Native projects land here first.';
  const meanwhile = 'In the meantime:';
  const items = [NEWSLETTER_LINKS.podcast, NEWSLETTER_LINKS.youtube];
  const ask = 'What are you building right now? Hit reply, I read every email.';
  const unsubscribe = 'Unsubscribe';

  const text = [
    intro,
    '',
    meanwhile,
    ...items.map(({ label, note, url }) => `- ${label}, ${note}: ${url}`),
    '',
    ask,
    '',
    `${unsubscribe}: ${unsubscribeUrl}`,
  ].join('\n');

  const list = `<ul style="margin:0 0 16px;padding-left:20px">${items
    .map(
      ({ label, note, url }) =>
        `<li style="margin:0 0 8px">${link(url, label)}, ${escapeHtml(note)}</li>`,
    )
    .join('')}</ul>`;
  const html = wrapHtml(
    [
      escapeHtml(intro),
      `${escapeHtml(meanwhile)}</p>${list}<p style="margin:0 0 16px">${escapeHtml(ask)}`,
    ],
    link(unsubscribeUrl, unsubscribe),
    'en',
  );
  return { html, subject, text };
}

export interface FollowupEmailInput {
  /** Language of the form they filled in. Defaults to French. */
  locale?: EmailLocale;
  /** The magnet they downloaded; null for newsletter and quiz leads. */
  magnetTitle?: string | null;
  /** Where the lead came from: picks the question. */
  source?: string | null;
}

/**
 * The one-line "Merci !" I send by hand from HQ, within 24 hours of a
 * signup. It must read like a personal note, so no layout and no visible
 * footer: unsubscribing goes through the List-Unsubscribe header.
 */
export function followupEmail({
  locale = 'fr',
  magnetTitle,
  source,
}: FollowupEmailInput): EmailContent {
  const copy = COPY[locale];
  const ask = magnetTitle
    ? copy.followupMagnet(magnetTitle)
    : source?.startsWith('audit:')
      ? copy.followupAudit
      : copy.followupOther;
  return {
    html: wrapHtml([escapeHtml(ask)], undefined, locale),
    subject: copy.followupSubject,
    text: ask,
  };
}

/**
 * Language of a stored lead: the locale saved in its meta at signup, or a
 * best guess for leads saved before that (the newsletter form is English).
 */
export function leadLocale(lead: {
  meta: unknown;
  source: string;
}): EmailLocale {
  const saved =
    lead.meta && typeof lead.meta === 'object'
      ? (lead.meta as Record<string, unknown>).locale
      : undefined;
  if (saved === 'en' || saved === 'fr') return saved;
  return lead.source === NEWSLETTER_SOURCE ? 'en' : 'fr';
}

export const FOLLOWUP_STATUSES = ['to_contact', 'sent', 'replied'] as const;
export type FollowupStatus = (typeof FOLLOWUP_STATUSES)[number];
