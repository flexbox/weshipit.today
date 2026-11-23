import type { NextApiRequest, NextApiResponse } from 'next';

const HQ_SUBSCRIBE_URL = 'https://weshipit.today/api/lm/subscribe';

/**
 * The newsletter form forwards here, and this route forwards to weshipit.today
 * HQ, which stores the lead and adds it to the Shipmail newsletter audience.
 * Server to server, so the form needs no CORS. Signing up to a newsletter is
 * the opt-in.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = typeof req.body?.email === 'string' ? req.body.email : '';
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await fetch(HQ_SUBSCRIBE_URL, {
      body: JSON.stringify({
        email,
        locale: 'en',
        marketing_consent: true,
        source: 'davidl-newsletter',
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    if (!response.ok) throw new Error(`HQ answered ${response.status}`);
    return res.status(201).json({ error: '' });
  } catch (error) {
    console.error('[newsletter] forward to HQ failed', error);
    return res.status(500).json({
      error:
        'Hm, couldn’t add you to the newsletter - ping me directly at david@weshipit.today and I’ll add you to this list!',
    });
  }
}
