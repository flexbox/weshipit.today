import type { NextApiRequest, NextApiResponse } from 'next';
import { createHqAuthClient } from '../../../utils/hq/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  await createHqAuthClient(req, res).auth.signOut();
  return res.redirect(303, '/hq/login');
}
