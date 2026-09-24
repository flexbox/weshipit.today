import { del, get, list, put } from '@vercel/blob';

import { isSafeKey } from './keys';
import { slugify } from '../slugify';
import type { TestimonialRecord } from './types';

const PENDING_PREFIX = 'testimonials/pending/';
const PUBLISHED_PREFIX = 'testimonials/published/';

/** `/testimonials/moderation` is a real page, so it can never be a slug. */
const RESERVED_SLUGS = new Set(['moderation']);

export const MEDIA_PREFIX = 'testimonials/media/';

export function pendingPathname(id: string): string {
  return `${PENDING_PREFIX}${id}.json`;
}

export function publishedPathname(slug: string): string {
  return `${PUBLISHED_PREFIX}${slug}.json`;
}

export function mediaPathname(
  id: string,
  kind: 'audio' | 'photo',
  extension: string,
): string {
  return `${MEDIA_PREFIX}${id}/${kind}.${extension}`;
}

async function readRecord(pathname: string): Promise<TestimonialRecord | null> {
  const result = await get(pathname, { access: 'private' });

  if (result?.statusCode !== 200) {
    return null;
  }

  const text = await new Response(result.stream).text();

  return JSON.parse(text) as TestimonialRecord;
}

async function writeRecord(
  pathname: string,
  record: TestimonialRecord,
): Promise<void> {
  await put(pathname, JSON.stringify(record, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export async function getPendingRecord(
  id: string,
): Promise<TestimonialRecord | null> {
  if (!isSafeKey(id)) {
    return null;
  }

  return readRecord(pendingPathname(id));
}

export async function getPublishedRecord(
  slug: string,
): Promise<TestimonialRecord | null> {
  if (!isSafeKey(slug)) {
    return null;
  }

  return readRecord(publishedPathname(slug));
}

export async function savePendingRecord(
  record: TestimonialRecord,
): Promise<void> {
  await writeRecord(pendingPathname(record.id), record);
}

export async function listPendingRecords(): Promise<TestimonialRecord[]> {
  const { blobs } = await list({ prefix: PENDING_PREFIX });
  const records = await Promise.all(
    blobs.map((blob) => readRecord(blob.pathname)),
  );

  return records
    .filter((record): record is TestimonialRecord => record !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listPublishedRecords(): Promise<TestimonialRecord[]> {
  const { blobs } = await list({ prefix: PUBLISHED_PREFIX });
  const records = await Promise.all(
    blobs.map((blob) => readRecord(blob.pathname)),
  );

  return records
    .filter((record): record is TestimonialRecord => record !== null)
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
}

/**
 * Media blobs keep their `testimonials/media/<id>/…` path forever, so
 * publishing only moves the JSON — nothing to copy, nothing to re-upload.
 */
export async function publishRecord(
  record: TestimonialRecord,
  slug: string,
): Promise<TestimonialRecord> {
  const published: TestimonialRecord = {
    ...record,
    publishedAt: new Date().toISOString(),
    slug,
    status: 'published',
  };

  await writeRecord(publishedPathname(slug), published);
  await del(pendingPathname(record.id));

  return published;
}

export async function rejectRecord(record: TestimonialRecord): Promise<void> {
  await del([
    pendingPathname(record.id),
    record.audioPathname,
    ...(record.photoPathname ? [record.photoPathname] : []),
  ]);
}

/**
 * Derives a slug that is free, reserved-word safe, and stable enough to be a
 * public URL. Falls back to a numeric suffix on collision.
 */
export async function buildAvailableSlug(
  fullName: string,
  company: string,
): Promise<string> {
  const base = slugify(`${fullName} ${company}`.trim()) || 'testimonial';
  let candidate = RESERVED_SLUGS.has(base) ? `${base}-testimonial` : base;
  let suffix = 1;

  while (await getPublishedRecord(candidate)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  return candidate;
}
