import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { SLUG_PATTERN } from '../../../utils/hq/schemas';
import { getHqAdmin } from '../../../utils/hq/supabase';

const bodySchema = z.object({ slug: z.string().max(80).regex(SLUG_PATTERN) });

/** Counts one capture-page view. Unpublished or unknown slugs are ignored. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).end();

  const { error } = await getHqAdmin().rpc('increment_views', {
    p_slug: parsed.data.slug,
  });
  if (error) console.error('[hq] view: increment failed', error);
  return res.status(204).end();
}
