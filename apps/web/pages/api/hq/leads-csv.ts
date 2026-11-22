import type { NextApiRequest, NextApiResponse } from 'next';
import { toCsv } from '../../../utils/hq/csv';
import { getOwner } from '../../../utils/hq/require-owner';
import { getHqAdmin } from '../../../utils/hq/supabase';

const HEADERS = [
  'email',
  'first_name',
  'source',
  'magnet',
  'marketing_consent',
  'unsubscribed_at',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'meta',
  'created_at',
];

/**
 * Leads as CSV, with the same filters as /hq/leads. Unsubscribed leads are
 * left out unless `all=1`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(await getOwner(req, res))) return res.status(401).end();

  let query = getHqAdmin()
    .from('leads')
    .select(
      'email, first_name, source, marketing_consent, unsubscribed_at, utm_source, utm_medium, utm_campaign, meta, created_at, lead_magnets(slug)',
    )
    .order('created_at', { ascending: false });
  if (
    typeof req.query.magnet === 'string' &&
    /^[0-9a-f-]{36}$/i.test(req.query.magnet)
  ) {
    query = query.eq('lead_magnet_id', req.query.magnet);
  }
  if (typeof req.query.source === 'string' && req.query.source) {
    query = query.eq('source', req.query.source);
  }
  if (req.query.all !== '1') query = query.is('unsubscribed_at', null);

  const { data, error } = await query;
  if (error) {
    console.error('[hq] leads-csv: query failed', error);
    return res.status(500).end();
  }

  const csv = toCsv(
    HEADERS,
    data.map((lead) => [
      lead.email,
      lead.first_name,
      lead.source,
      lead.lead_magnets?.slug,
      lead.marketing_consent,
      lead.unsubscribed_at,
      lead.utm_source,
      lead.utm_medium,
      lead.utm_campaign,
      JSON.stringify(lead.meta),
      lead.created_at,
    ]),
  );
  const date = new Date().toISOString().slice(0, 10);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="leads-${date}.csv"`,
  );
  res.setHeader('Cache-Control', 'private, no-store');
  // BOM so spreadsheets read the accents as UTF-8.
  return res.status(200).send(`\uFEFF${csv}`);
}
