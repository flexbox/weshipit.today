import type { NextApiRequest, NextApiResponse } from 'next';

import {
  createAdminSessionCookie,
  isAdminRequest,
  isValidAdminPassword,
} from '../../../utils/testimonials/admin';
import {
  buildAvailableSlug,
  getPendingRecord,
  publishRecord,
  rejectRecord,
  savePendingRecord,
} from '../../../utils/testimonials/store';
import { createInviteToken } from '../../../utils/testimonials/token';

type Action = 'approve' | 'invite' | 'login' | 'reject';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const action = request.body?.action as Action;

  if (action === 'login') {
    if (!isValidAdminPassword(String(request.body?.password ?? ''))) {
      return response.status(401).json({ error: 'Wrong password' });
    }

    response.setHeader('Set-Cookie', createAdminSessionCookie());

    return response.status(200).json({ ok: true });
  }

  // Every other action re-verifies the cookie right here, next to the mutation.
  if (!isAdminRequest(request)) {
    return response.status(401).json({ error: 'Not authorized' });
  }

  if (action === 'invite') {
    const company = String(request.body?.company ?? '').trim();
    const name = String(request.body?.name ?? '').trim();

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    return response
      .status(200)
      .json({ token: createInviteToken({ company, name }) });
  }

  const id = String(request.body?.id ?? '');
  const record = await getPendingRecord(id);

  if (!record) {
    return response.status(404).json({ error: 'Not found' });
  }

  try {
    if (action === 'reject') {
      await rejectRecord(record);

      return response.status(200).json({ ok: true });
    }

    if (action === 'approve') {
      const edited = {
        ...record,
        pullQuote: String(request.body?.pullQuote ?? record.pullQuote),
        review: String(request.body?.review ?? record.review),
      };

      await savePendingRecord(edited);

      const slug = await buildAvailableSlug(edited.fullName, edited.company);
      const published = await publishRecord(edited, slug);

      return response.status(200).json({ slug: published.slug });
    }

    return response.status(400).json({ error: 'Unknown action' });
  } catch (error) {
    console.error('moderate -> error', error);

    return response.status(500).json({ error: 'Moderation failed' });
  }
}
