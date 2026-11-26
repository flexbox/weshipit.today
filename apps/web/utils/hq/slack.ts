import { SELF_AUDITS, selfAuditIdFrom } from '../audits/registry';

/**
 * One Slack message per new lead, through an incoming webhook
 * (HQ_SLACK_WEBHOOK_URL). It replaces the old "Nouveau lead" email to me.
 */

export interface NewLeadInput {
  email: string;
  hqUrl: string;
  source: string;
  magnetTitle?: string | null;
  /** Quiz score out of 100, for self-audit leads. */
  score?: number | null;
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
  // Self-Audit sources are `audit:<id>`; Slack shows them as "audit".
  const auditId = selfAuditIdFrom(input.source);
  const source = auditId === null ? input.source : 'audit';
  const resource =
    input.magnetTitle ||
    (auditId === null ? null : (SELF_AUDITS[auditId]?.name ?? auditId));
  return {
    text: [
      `Nouveau lead: ${bold(resource || source)}`,
      `Source: ${bold(source)}`,
      `Ressource: ${bold(resource || '—')}`,
      ...(typeof input.score === 'number'
        ? [`Score: ${bold(`${input.score}/100`)}`]
        : []),
      `Email: ${bold(input.email)}`,
      '',
      `<${input.hqUrl}|Tous les leads>`,
    ].join('\n'),
  };
}

/**
 * Pure: an alert when a lead was saved but its email or its Shipmail
 * audience add failed, so I can fix it by hand.
 */
export function failureMessage(input: {
  email: string;
  failed: 'email' | 'audience';
  reason: unknown;
  hqUrl: string;
}): { text: string } {
  const what =
    input.failed === 'email'
      ? 'Email not sent'
      : 'Not added to the Shipmail audience';
  const reason =
    input.reason instanceof Error ? input.reason.message : String(input.reason);
  return {
    text: [
      `:warning: ${what} · ${escapeSlack(input.email)}`,
      `Reason: ${escapeSlack(reason.slice(0, 300))}`,
      `<${input.hqUrl}|Open HQ leads>`,
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
