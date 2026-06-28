import type { NextApiRequest, NextApiResponse } from 'next';
import { magic } from '~/lib/magic-admin';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const didToken = magic.utils.parseAuthorizationHeader(
      req.headers.authorization || '',
    );
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    const err = error as { status?: number; message?: string };
    console.error('[api/login] failed:', err);
    res.status(err.status || 500).json({ error: err.message });
  }
}
