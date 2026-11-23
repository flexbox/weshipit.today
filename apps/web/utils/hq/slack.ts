/**
 * One Slack message per new lead, through an incoming webhook
 * (HQ_SLACK_WEBHOOK_URL). It replaces the old "Nouveau lead" email to me.
 */

export interface NewLeadInput {
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

/** Slack mrkdwn treats &, < and > as control characters. */
export function escapeSlack(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Pure: the webhook payload for one new lead. */
export function newLeadMessage(input: NewLeadInput): { text: string } {
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
  const title = `*Nouveau lead · ${escapeSlack(input.magnetTitle || input.source)}*`;
  const lines = rows.map(
    ([label, value]) => `*${label}* : ${escapeSlack(value)}`,
  );
  const links = `<mailto:${escapeSlack(input.email)}|Lui répondre> · <${input.hqUrl}|Tous les leads>`;
  return { text: [title, ...lines, links].join('\n') };
}

/**
 * Posts the message. Without HQ_SLACK_WEBHOOK_URL (local dev) it logs it
 * instead. Throws on a failed post so the caller can log it.
 */
export async function notifySlack(payload: { text: string }): Promise<void> {
  const url = process.env.HQ_SLACK_WEBHOOK_URL;
  if (!url) {
    console.info(`[hq] Slack not configured, message:\n${payload.text}`);
    return;
  }
  const response = await fetch(url, {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Slack webhook answered ${response.status}`);
  }
}
