/**
 * One Slack message per new lead, through an incoming webhook
 * (HQ_SLACK_WEBHOOK_URL). It replaces the old "Nouveau lead" email to me.
 */

export interface NewLeadInput {
  email: string;
  hqUrl: string;
  source: string;
  magnetTitle?: string | null;
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
  const bold = (value: string) => `*${escapeSlack(value)}*`;
  return {
    text: [
      `Nouveau lead: ${bold(input.magnetTitle || input.source)}`,
      `Source: ${bold(input.source)}`,
      `Ressource: ${bold(input.magnetTitle || '—')}`,
      `Email: ${bold(input.email)}`,
      '',
      `<${input.hqUrl}|Tous les leads>`,
    ].join('\n'),
  };
}

/**
 * Posts the message. Without HQ_SLACK_WEBHOOK_URL (local dev) it logs it
 * instead. Throws on a failed post so the caller can log it.
 */
export async function notifySlack(payload: { text: string }): Promise<void> {
  const url = process.env.HQ_SLACK_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Slack is not configured (HQ_SLACK_WEBHOOK_URL)');
    }
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
