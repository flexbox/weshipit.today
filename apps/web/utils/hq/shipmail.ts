import { ShipmailClient } from 'shipmail';
import type { EmailContent } from './emails';

let client: ShipmailClient | undefined;

/** One shared client; null when SHIPMAIL_API_KEY isn't set (local dev). */
export function getShipmail(): ShipmailClient | null {
  const apiKey = process.env.SHIPMAIL_API_KEY;
  if (!apiKey) return null;
  client ??= new ShipmailClient({ apiKey });
  return client;
}

interface SendInput extends EmailContent {
  to: { address: string; name?: string };
  /** Same key → Shipmail returns the first send instead of sending again. */
  idempotencyKey: string;
  /** One-click unsubscribe target for the List-Unsubscribe headers. */
  unsubscribeUrl?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

/**
 * Sends one email from the transactional sender. Without SHIPMAIL_API_KEY
 * (local dev) it logs the email instead, so the flow can be tried end to end
 * before Shipmail is set up.
 */
export async function sendEmail(input: SendInput): Promise<void> {
  const shipmail = getShipmail();
  const from = process.env.HQ_FROM_EMAIL;
  if (!shipmail || !from) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'Shipmail is not configured (SHIPMAIL_API_KEY, HQ_FROM_EMAIL)',
      );
    }
    console.info(
      `[hq] email not sent (Shipmail not configured) → ${input.to.address}\n` +
        `Subject: ${input.subject}\n${input.text}`,
    );
    return;
  }

  await shipmail.messages.send(
    {
      // A transactional sender takes its bare address; Shipmail adds the
      // display name and the Reply-To mailbox configured on the sender.
      from,
      headers: input.unsubscribeUrl
        ? [
            { name: 'List-Unsubscribe', value: `<${input.unsubscribeUrl}>` },
            {
              name: 'List-Unsubscribe-Post',
              value: 'List-Unsubscribe=One-Click',
            },
          ]
        : undefined,
      html: input.html,
      metadata: input.metadata,
      subject: input.subject,
      text: input.text,
      to: [input.to],
    },
    { idempotencyKey: input.idempotencyKey },
  );
}
