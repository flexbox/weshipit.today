import type { NextApiRequest, NextApiResponse } from 'next';
import { removeFromAudiences } from '../../../utils/hq/audience';
import { getOwner } from '../../../utils/hq/require-owner';
import { getHqAdmin } from '../../../utils/hq/supabase';

/** Only HQ pages, so the redirect can't be pointed somewhere else. */
function safeReturnTo(value: unknown): string {
  return typeof value === 'string' && /^\/hq(\/|\?|$)/.test(value)
    ? value
    : '/hq/leads';
}

/**
 * The delete button in the leads tables posts here, mostly to clean up my
 * own test signups. It removes that one row from HQ (one row per email and
 * magnet). When it was the last row for that email, the address is also
 * removed from the Shipmail audiences, so the same address can test the
 * forms again.
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
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id)) {
    return back('Requête invalide.');
  }

  const db = getHqAdmin();
  const { data: deleted, error } = await db
    .from('leads')
    .delete()
    .eq('id', id)
    .select('email')
    .maybeSingle();
  if (error) {
    console.error('[hq] delete-lead: delete failed', error);
    return back('Suppression impossible, réessaie.');
  }
  if (!deleted) return back();

  const { count } = await db
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('email', deleted.email);
  if (count === 0) {
    try {
      await removeFromAudiences(deleted.email);
    } catch (audienceError) {
      console.error('[hq] delete-lead: Shipmail removal failed', audienceError);
      return back('Lead supprimé, mais pas de Shipmail. Retire-le à la main.');
    }
  }
  return back();
}
