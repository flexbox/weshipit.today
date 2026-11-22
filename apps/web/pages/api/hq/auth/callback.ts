import type { NextApiRequest, NextApiResponse } from 'next';
import { isOwnerEmail } from '../../../../utils/hq/require-owner';
import { createHqAuthClient } from '../../../../utils/hq/supabase';

/** Magic-link landing: trades the one-time code for session cookies. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = typeof req.query.code === 'string' ? req.query.code : null;
  if (!code) return res.redirect(303, '/hq/login?error=1');

  const supabase = createHqAuthClient(req, res);
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !isOwnerEmail(data.user?.email)) {
    if (error) console.error('[hq] callback: code exchange failed', error);
    await supabase.auth.signOut();
    return res.redirect(303, '/hq/login?error=1');
  }
  return res.redirect(303, '/hq');
}
