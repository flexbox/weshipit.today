import { Readable } from 'node:stream';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';

import { get } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';

import { isAdminRequest } from '../../../utils/testimonials/admin';
import {
  getPendingRecord,
  getPublishedRecord,
} from '../../../utils/testimonials/store';
import type { TestimonialRecord } from '../../../utils/testimonials/types';

/**
 * The only way to reach a private blob. Authorization is resolved here, right
 * next to the `get()`, so a routing or middleware mistake can never expose a
 * pending recording.
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const kind = request.query.kind === 'photo' ? 'photo' : 'audio';
  const id = typeof request.query.id === 'string' ? request.query.id : '';
  const slug = typeof request.query.slug === 'string' ? request.query.slug : '';

  let record: TestimonialRecord | null = null;

  if (slug) {
    record = await getPublishedRecord(slug);
  } else if (id && isAdminRequest(request)) {
    record = await getPendingRecord(id);
  }

  if (!record) {
    return response.status(404).send('Not found');
  }

  const pathname =
    kind === 'photo' ? record.photoPathname : record.audioPathname;

  if (!pathname) {
    return response.status(404).send('Not found');
  }

  const result = await get(pathname, {
    access: 'private',
    ifNoneMatch: (request.headers['if-none-match'] as string) ?? undefined,
  });

  if (!result) {
    return response.status(404).send('Not found');
  }

  response.setHeader('Cache-Control', 'private, no-cache');
  response.setHeader('ETag', result.blob.etag);
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (result.statusCode === 304) {
    return response.status(304).end();
  }

  response.setHeader('Content-Type', result.blob.contentType);
  // The SDK types the stream as a DOM ReadableStream; `fromWeb` wants the
  // node:stream/web one. Same object at runtime.
  Readable.fromWeb(result.stream as unknown as NodeReadableStream).pipe(
    response,
  );
}
