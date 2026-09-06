import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { isMediaPathname } from '../../../utils/testimonials/keys';
import { verifyInviteToken } from '../../../utils/testimonials/token';

const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

const AUDIO_CONTENT_TYPES = [
  'audio/mp4',
  'audio/mpeg',
  'audio/ogg',
  'audio/webm',
];
const PHOTO_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Issues short-lived tokens so the browser can upload straight to Blob,
 * bypassing the 4.5 MB request-body cap on Functions. The invite is
 * re-verified here: without it, anyone could fill the store.
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: request.body as HandleUploadBody,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!clientPayload || !verifyInviteToken(clientPayload)) {
          throw new Error('Invalid invite');
        }

        if (!isMediaPathname(pathname)) {
          throw new Error('Unexpected pathname');
        }

        const isPhoto = pathname.includes('/photo.');

        return {
          addRandomSuffix: false,
          allowOverwrite: true,
          allowedContentTypes: isPhoto
            ? PHOTO_CONTENT_TYPES
            : AUDIO_CONTENT_TYPES,
          maximumSizeInBytes: isPhoto ? MAX_PHOTO_BYTES : MAX_AUDIO_BYTES,
        };
      },
      // Intentionally a no-op: this callback never fires on localhost, so the
      // record is written by /api/testimonials/submit instead.
      onUploadCompleted: async () => undefined,
      request,
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: (error as Error).message });
  }
}
