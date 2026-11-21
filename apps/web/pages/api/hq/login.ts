import type { NextApiRequest, NextApiResponse } from 'next';
import { baseUrl } from '../../../utils/hq/base-url';
import { isOwnerEmail } from '../../../utils/hq/require-owner';
import { createHqAuthClient } from '../../../utils/hq/supabase';

/**
 * Sends the magic link, only to HQ_OWNER_EMAIL. Any other address gets the
 * same "check your inbox" answer, so the form doesn't reveal the owner.
 * The PKCE verifier lands in a cookie here, so open the link in this browser.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const email =
    typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  if (isOwnerEmail(email)) {
    const { error } = await createHqAuthClient(req, res).auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl(req.headers)}/api/hq/auth/callback`,
        shouldCreateUser: false,
      },
    });
    if (error) console.error('[hq] login: magic link failed', error);
  }

  return res.redirect(303, '/hq/login?sent=1');
}
