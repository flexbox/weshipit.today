import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AppNotFoundError,
  inspectAndroidApp,
} from '../../utils/is-react-native/inspect-android-app';
import { isValidPackageId } from '../../utils/is-react-native/parse-store-url';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = typeof req.query.id === 'string' ? req.query.id : '';

  if (!isValidPackageId(id)) {
    return res.status(400).json({ error: 'Invalid package id' });
  }

  try {
    const result = await inspectAndroidApp(id);
    // Apps rarely switch frameworks: cache at the edge for a day.
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=604800',
    );
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppNotFoundError) {
      return res.status(404).json({ error: 'App not found' });
    }
    console.error('is-react-native -> error', id, error);
    return res.status(502).json({ error: 'Could not inspect this app' });
  }
}
