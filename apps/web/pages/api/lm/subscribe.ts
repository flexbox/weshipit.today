import type { NextApiRequest, NextApiResponse } from 'next';
import { baseUrl } from '../../../utils/hq/base-url';
import { consentLabelFor } from '../../../utils/hq/consent';
import type { Lead } from '../../../utils/hq/types';
import { addToAudience } from '../../../utils/hq/audience';
import { parseGaps } from '../../../utils/audits/answers';
import { SELF_AUDITS, selfAuditIdFrom } from '../../../utils/audits/registry';
import {
  type EmailContent,
  NEWSLETTER_SOURCE,
  newsletterEmail,
  selfAuditReportEmail,
  visitorEmail,
} from '../../../utils/hq/emails';
import { subscribeSchema } from '../../../utils/hq/schemas';
import { sendEmail } from '../../../utils/hq/shipmail';
import {
  failureMessage,
  newLeadMessage,
  notifySlack,
} from '../../../utils/hq/slack';
import { getHqAdmin } from '../../../utils/hq/supabase';

type Response =
  { ok: true; token: string | null } | { error: string; code?: 'email_failed' };

const UNIQUE_VIOLATION = '23505';

/**
 * Every capture form posts here: /r/[slug] pages, the self-audit quizzes and
 * the davidl.fr newsletter. It stores the lead, emails the visitor, pings me
 * on Slack when the lead is new, adds opted-in leads to the Shipmail
 * newsletter audience and returns the access token when there is a magnet.
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

  // Honeypot filled: pretend it worked and store nothing. Logged, because a
  // browser autofilling the field would drop a real signup the same way.
  if (input.website) {
    console.warn(`[hq] subscribe: honeypot filled, dropped (${input.source})`);
    return res.status(200).json({ ok: true, token: null });
  }

  const db = getHqAdmin();
  const consentLabel = consentLabelFor(input.source, input.locale);

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
      // The locale is kept so later emails (the HQ follow-up) match it.
      meta: { ...input.meta, locale: input.locale },
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

    // Keep the first name a returning visitor gives us if we had none.
    if (input.first_name && !lead.first_name) {
      await db
        .from('leads')
        .update({ first_name: input.first_name })
        .eq('id', lead.id);
    }

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

  const auditId = selfAuditIdFrom(input.source);
  const audit = auditId ? SELF_AUDITS[auditId] : undefined;
  // Pages cached before the Report shipped send no answers: an empty plan
  // would wrongly say "nothing to fix", so those get the score email.
  const answers = input.meta?.answers;

  let content: EmailContent;
  if (lead.source === NEWSLETTER_SOURCE && !magnet) {
    content = newsletterEmail({ unsubscribeUrl });
  } else if (audit && score !== null && typeof answers === 'string') {
    // The Report is built here from the Check ids: the browser only sends
    // which answers weren't Yes, never the copy (docs/adr/0001).
    content = selfAuditReportEmail({
      audit,
      gaps: parseGaps(answers),
      origin,
      score,
      unsubscribeUrl,
    });
  } else {
    if (auditId) {
      console.warn(
        `[hq] subscribe: no Report for ${input.source} (${
          audit ? 'no answers sent' : 'unknown Self-Audit'
        }), sent the score email`,
      );
    }
    content = visitorEmail({
      locale: input.locale,
      magnet: magnet && accessUrl ? { accessUrl, title: magnet.title } : null,
      score,
      unsubscribeUrl,
    });
  }

  const hqUrl = `${origin}/hq/leads`;
  const emailSend = sendEmail({
    ...content,
    idempotencyKey: `visitor-${lead.id}`,
    metadata: { kind: 'visitor', lead_id: lead.id },
    to: { address: lead.email, name: lead.first_name ?? undefined },
    unsubscribeUrl,
  });
  // Shipmail never re-adds someone who left the audience, so this is safe to
  // repeat for a known lead.
  const audienceAdd = input.marketing_consent
    ? addToAudience({
        email: lead.email,
        firstName: lead.first_name,
        source: lead.source,
      })
    : Promise.resolve();
  const slackPing = isNew
    ? notifySlack(
        newLeadMessage({
          email: lead.email,
          hqUrl,
          magnetTitle: magnet?.title,
          score,
          source: lead.source,
        }),
      )
    : Promise.resolve();

  const [email, audience, slack] = await Promise.allSettled([
    emailSend,
    audienceAdd,
    slackPing,
  ]);
  if (slack.status === 'rejected') {
    console.error('[hq] subscribe: Slack ping failed', slack.reason);
  }
  // A failed email or audience add is logged and pinged to me on Slack.
  for (const [failed, result] of [
    ['email', email],
    ['audience', audience],
  ] as const) {
    if (result.status === 'rejected') {
      console.error(`[hq] subscribe: ${failed} failed`, result.reason);
      await notifySlack(
        failureMessage({
          email: lead.email,
          failed,
          hqUrl,
          reason: result.reason,
        }),
      ).catch((error) =>
        console.error('[hq] subscribe: Slack alert failed', error),
      );
    }
  }

  // With a magnet the visitor sees the resource on the page anyway. Without
  // one (audits, newsletter) the email is the deliverable, so the form must
  // say it failed. The lead is kept: a retry reuses it and sends again.
  if (email.status === 'rejected' && !magnet) {
    return res
      .status(502)
      .json({ code: 'email_failed', error: 'The email could not be sent' });
  }

  return res
    .status(200)
    .json({ ok: true, token: magnet ? lead.access_token : null });
}
