import type { NextApiRequest, NextApiResponse } from 'next';
import { baseUrl } from '../../../utils/hq/base-url';
import { followupEmail, type FollowupStatus } from '../../../utils/hq/emails';
import { getOwner } from '../../../utils/hq/require-owner';
import { sendEmail } from '../../../utils/hq/shipmail';
import { getHqAdmin } from '../../../utils/hq/supabase';

const ACTIONS = ['send', 'replied'] as const;
type Action = (typeof ACTIONS)[number];

/** Only HQ pages, so the redirect can't be pointed somewhere else. */
function safeReturnTo(value: unknown): string {
  return typeof value === 'string' && /^\/hq(\/|\?|$)/.test(value)
    ? value
    : '/hq/leads';
}

/**
 * The follow-up column in the leads tables posts here:
 * - send: sends the "Merci !" email, then marks the lead `sent`
 * - replied: marks the lead `replied`, by hand, once they answer
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  if (!(await getOwner(req, res))) return res.status(401).end();

  const returnTo = safeReturnTo(req.body?.returnTo);
  const back = (error?: string) => {
    if (!error) return res.redirect(303, returnTo);
    const url = new URL(returnTo, 'http://hq');
    url.searchParams.set('error', error);
    return res.redirect(303, `${url.pathname}${url.search}`);
  };

  const id = req.body?.id;
  const action = req.body?.action as Action;
  if (
    typeof id !== 'string' ||
    !/^[0-9a-f-]{36}$/i.test(id) ||
    !ACTIONS.includes(action)
  ) {
    return back('Requête invalide.');
  }

  const db = getHqAdmin();
  const { data: lead, error } = await db
    .from('leads')
    .select(
      'id, email, first_name, followup_status, unsubscribed_at, unsubscribe_token, lead_magnets(title)',
    )
    .eq('id', id)
    .single();
  if (error || !lead) return back('Lead introuvable.');

  let update: { followup_status: FollowupStatus; followup_sent_at?: string };

  if (action === 'send') {
    if (lead.unsubscribed_at) return back('Ce lead s’est désabonné.');
    if (lead.followup_status !== 'to_contact') {
      return back('Relance déjà envoyée.');
    }
    const unsubscribeUrl = `${baseUrl(req.headers)}/api/lm/unsubscribe?t=${lead.unsubscribe_token}`;
    try {
      await sendEmail({
        ...followupEmail({
          firstName: lead.first_name,
          magnetTitle: lead.lead_magnets?.title,
        }),
        // One follow-up per lead, even on a double click.
        idempotencyKey: `followup:${lead.id}`,
        metadata: { kind: 'followup', lead_id: lead.id },
        to: { address: lead.email, name: lead.first_name ?? undefined },
        unsubscribeUrl,
      });
    } catch (sendError) {
      console.error('[hq] followup: send failed', sendError);
      return back('Envoi impossible, réessaie.');
    }
    update = {
      followup_sent_at: new Date().toISOString(),
      followup_status: 'sent',
    };
  } else {
    update = { followup_status: 'replied' };
  }

  const result = await db.from('leads').update(update).eq('id', id);
  if (result.error) {
    console.error('[hq] followup: update failed', result.error);
    return back('Statut non enregistré.');
  }
  return back();
}
