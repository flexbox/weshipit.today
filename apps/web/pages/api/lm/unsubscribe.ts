import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { unsubscribeFromAudience } from '../../../utils/hq/audience';
import { getHqAdmin } from '../../../utils/hq/supabase';

const tokenSchema = z.uuid();

/**
 * GET: the link in the email footer → redirect to /desabonnement.
 * POST: one-click unsubscribe from the mail client (RFC 8058).
 * Unsubscribing applies to every row with the same email, and to the
 * Shipmail newsletter audience.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  }

  const token = tokenSchema.safeParse(req.query.t);
  if (token.success) {
    const db = getHqAdmin();
    const { data: lead } = await db
      .from('leads')
      .select('email')
      .eq('unsubscribe_token', token.data)
      .maybeSingle();
    if (lead) {
      const { error } = await db
        .from('leads')
        .update({
          marketing_consent: false,
          unsubscribed_at: new Date().toISOString(),
        })
        .eq('email', lead.email)
        .is('unsubscribed_at', null);
      if (error) console.error('[hq] unsubscribe: update failed', error);
      await unsubscribeFromAudience(lead.email).catch((audienceError) =>
        console.error(
          '[hq] unsubscribe: audience update failed',
          audienceError,
        ),
      );
    }
  }

  // Same answer for unknown tokens, so the endpoint can't be used to probe.
  if (req.method === 'POST') return res.status(200).end();
  return res.redirect(303, '/desabonnement');
}
