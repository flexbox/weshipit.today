import type { NextApiRequest, NextApiResponse } from 'next';
import { baseUrl } from '../../../utils/hq/base-url';
import { MARKETING_CONSENT_LABELS } from '../../../utils/hq/consent';
import type { Lead } from '../../../utils/hq/types';
import { ownerEmail, visitorEmail } from '../../../utils/hq/emails';
import { subscribeSchema } from '../../../utils/hq/schemas';
import { sendEmail } from '../../../utils/hq/shipmail';
import { getHqAdmin } from '../../../utils/hq/supabase';

type Response = { ok: true; token: string | null } | { error: string };

const UNIQUE_VIOLATION = '23505';

/**
 * Every capture form posts here: /r/[slug] pages, the self-audit quizzes and
 * the davidl.fr newsletter. It stores the lead, emails the visitor (and me
 * when the lead is new) and returns the access token when there is a magnet.
 * The answer is the same whether or not the email was already known.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = subscribeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const input = parsed.data;

  // Honeypot filled: pretend it worked and store nothing.
  if (input.website) return res.status(200).json({ ok: true, token: null });

  const db = getHqAdmin();
  const consentLabel = MARKETING_CONSENT_LABELS[input.locale];

  const { data: magnet } = input.magnet
    ? await db
        .from('lead_magnets')
        .select('id, slug, title')
        .eq('slug', input.magnet)
        .eq('published', true)
        .maybeSingle()
    : { data: null };

  const inserted = await db
    .from('leads')
    .insert({
      consent_text: input.marketing_consent ? consentLabel : null,
      email: input.email,
      first_name: input.first_name ?? null,
      lead_magnet_id: magnet?.id ?? null,
      marketing_consent: input.marketing_consent,
      meta: input.meta ?? {},
      referrer: req.headers.referer?.slice(0, 500) ?? null,
      source: input.source,
      utm_campaign: input.utm_campaign ?? null,
      utm_medium: input.utm_medium ?? null,
      utm_source: input.utm_source ?? null,
    })
    .select('*')
    .single();

  let lead: Lead;
  let isNew = true;

  if (inserted.error?.code === UNIQUE_VIOLATION) {
    isNew = false;
    const existingQuery = db.from('leads').select('*').eq('email', input.email);
    const existing = await (
      magnet
        ? existingQuery.eq('lead_magnet_id', magnet.id)
        : existingQuery.is('lead_magnet_id', null)
    ).single();
    if (existing.error) {
      console.error(
        '[hq] subscribe: existing lead lookup failed',
        existing.error,
      );
      return res.status(500).json({ error: 'Something went wrong' });
    }
    lead = existing.data;

    // A fresh, explicit opt-in overrides an earlier refusal or unsubscribe.
    if (input.marketing_consent && !lead.marketing_consent) {
      await db
        .from('leads')
        .update({
          consent_text: consentLabel,
          marketing_consent: true,
        })
        .eq('id', lead.id);
      await db
        .from('leads')
        .update({ unsubscribed_at: null })
        .eq('email', input.email);
    }
  } else if (inserted.error) {
    console.error('[hq] subscribe: insert failed', inserted.error);
    return res.status(500).json({ error: 'Something went wrong' });
  } else {
    lead = inserted.data;
  }

  const origin = baseUrl(req.headers);
  const unsubscribeUrl = `${origin}/api/lm/unsubscribe?t=${lead.unsubscribe_token}`;
  const accessUrl = magnet
    ? `${origin}/r/${magnet.slug}/${lead.access_token}`
    : null;
  const score = typeof input.meta?.score === 'number' ? input.meta.score : null;

  const sends: Promise<void>[] = [
    sendEmail({
      ...visitorEmail({
        firstName: lead.first_name,
        magnet: magnet && accessUrl ? { accessUrl, title: magnet.title } : null,
        score,
        unsubscribeUrl,
      }),
      idempotencyKey: `visitor-${lead.id}`,
      metadata: { kind: 'visitor', lead_id: lead.id },
      to: { address: lead.email, name: lead.first_name ?? undefined },
      unsubscribeUrl,
    }),
  ];

  const ownerAddress = process.env.HQ_OWNER_EMAIL;
  if (isNew && ownerAddress) {
    sends.push(
      sendEmail({
        ...ownerEmail({
          email: lead.email,
          firstName: lead.first_name,
          hqUrl: `${origin}/hq/leads`,
          magnetTitle: magnet?.title,
          marketingConsent: lead.marketing_consent,
          score,
          source: lead.source,
          utm: {
            campaign: lead.utm_campaign,
            medium: lead.utm_medium,
            source: lead.utm_source,
          },
        }),
        idempotencyKey: `notify-${lead.id}`,
        metadata: { kind: 'notify', lead_id: lead.id },
        to: { address: ownerAddress },
      }),
    );
  }

  // The visitor already sees the resource on the page, so a failed email is
  // logged, not returned as an error.
  for (const result of await Promise.allSettled(sends)) {
    if (result.status === 'rejected') {
      console.error('[hq] subscribe: email failed', result.reason);
    }
  }

  return res
    .status(200)
    .json({ ok: true, token: magnet ? lead.access_token : null });
}
