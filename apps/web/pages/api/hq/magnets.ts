import type { NextApiRequest, NextApiResponse } from 'next';
import { getOwner } from '../../../utils/hq/require-owner';
import { magnetFormSchema } from '../../../utils/hq/schemas';
import { getHqAdmin } from '../../../utils/hq/supabase';

const UNIQUE_VIOLATION = '23505';

/** Creates or updates a magnet from the HQ form, then goes back to it. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  if (!(await getOwner(req, res))) return res.status(401).end();

  const back = (id: string, query: string) =>
    res.redirect(303, `/hq/magnets/${id}?${query}`);
  const formId =
    typeof req.body?.id === 'string' && /^[0-9a-f-]{36}$/i.test(req.body.id)
      ? req.body.id
      : 'new';

  const parsed = magnetFormSchema.safeParse(req.body);
  if (!parsed.success) {
    const fields = [
      ...new Set(parsed.error.issues.map((issue) => issue.path[0])),
    ];
    return back(
      formId,
      `error=${encodeURIComponent(`Champs invalides : ${fields.join(', ')}`)}`,
    );
  }

  const { id, ...values } = parsed.data;
  const db = getHqAdmin();
  const result = id
    ? await db
        .from('lead_magnets')
        .update({ ...values, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('id')
        .single()
    : await db.from('lead_magnets').insert(values).select('id').single();

  if (result.error) {
    const message =
      result.error.code === UNIQUE_VIOLATION
        ? 'Ce slug est déjà utilisé.'
        : 'Enregistrement impossible.';
    if (result.error.code !== UNIQUE_VIOLATION) {
      console.error('[hq] magnets: save failed', result.error);
    }
    return back(formId, `error=${encodeURIComponent(message)}`);
  }
  return back(result.data.id, 'saved=1');
}
