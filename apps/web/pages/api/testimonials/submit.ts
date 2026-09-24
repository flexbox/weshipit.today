import type { NextApiRequest, NextApiResponse } from 'next';

import {
  MEDIA_PREFIX,
  savePendingRecord,
} from '../../../utils/testimonials/store';
import { verifyInviteToken } from '../../../utils/testimonials/token';
import type { TestimonialRecord } from '../../../utils/testimonials/types';

const MAX_REVIEW_LENGTH = 4000;
const MAX_FIELD_LENGTH = 200;

function clamp(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function notify(record: TestimonialRecord): Promise<void> {
  const webhookUrl = process.env.TESTIMONIAL_NOTIFY_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      body: JSON.stringify({
        text: `New testimonial from ${record.fullName} (${record.company}) — review it at /testimonials/moderation`,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  } catch (error) {
    // A missed notification must never fail the client's submission.
    console.error('submit -> notify failed', error);
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const body = request.body ?? {};

  if (!body.inviteToken || !verifyInviteToken(body.inviteToken)) {
    return response.status(403).json({ error: 'Invalid invite' });
  }

  const audioPathname = clamp(body.audioPathname, MAX_FIELD_LENGTH);
  const fullName = clamp(body.fullName, MAX_FIELD_LENGTH);
  const review = clamp(body.review, MAX_REVIEW_LENGTH);

  if (!audioPathname.startsWith(MEDIA_PREFIX) || !fullName || !review) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const photoPathname = clamp(body.photoPathname, MAX_FIELD_LENGTH);

  const record: TestimonialRecord = {
    audioPathname,
    company: clamp(body.company, MAX_FIELD_LENGTH),
    createdAt: new Date().toISOString(),
    durationInSeconds:
      typeof body.durationInSeconds === 'number'
        ? body.durationInSeconds
        : null,
    fullName,
    id: clamp(body.id, MAX_FIELD_LENGTH),
    jobTitle: clamp(body.jobTitle, MAX_FIELD_LENGTH),
    photoPathname: photoPathname.startsWith(MEDIA_PREFIX)
      ? photoPathname
      : null,
    publishedAt: null,
    pullQuote: clamp(body.pullQuote, MAX_FIELD_LENGTH * 2),
    rawTranscript: clamp(body.rawTranscript, MAX_REVIEW_LENGTH * 2),
    review,
    slug: '',
    status: 'pending',
  };

  if (!record.id) {
    return response.status(400).json({ error: 'Missing id' });
  }

  try {
    await savePendingRecord(record);
    await notify(record);

    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error('submit -> error', error);

    return response.status(500).json({ error: 'Could not save testimonial' });
  }
}
