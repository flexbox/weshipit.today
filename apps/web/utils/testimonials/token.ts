import { createHmac, timingSafeEqual } from 'node:crypto';

import type { InvitePayload } from './types';

const INVITE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.TESTIMONIAL_INVITE_SECRET;

  if (!secret) {
    throw new Error('TESTIMONIAL_INVITE_SECRET is not set');
  }

  return secret;
}

function toBase64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

function sign(payload: string): string {
  return toBase64Url(
    createHmac('sha256', getSecret()).update(payload).digest(),
  );
}

/**
 * Builds the `<payload>.<signature>` token that gates `/testimonial/[token]`.
 * Stateless on purpose: no storage, and the link expires on its own.
 */
export function createInviteToken({
  company,
  name,
  ttlMs = INVITE_TTL_MS,
}: {
  company: string;
  name: string;
  ttlMs?: number;
}): string {
  const payload: InvitePayload = {
    company,
    exp: Date.now() + ttlMs,
    name,
  };
  const encoded = toBase64Url(JSON.stringify(payload));

  return `${encoded}.${sign(encoded)}`;
}

/**
 * Returns the payload for a valid, unexpired token, otherwise `null`.
 * Never throws on malformed input — callers turn `null` into a 404.
 */
export function verifyInviteToken(token: string): InvitePayload | null {
  const [encoded, signature] = (token ?? '').split('.');

  if (!encoded || !signature) {
    return null;
  }

  const expected = Buffer.from(sign(encoded));
  const received = Buffer.from(signature);

  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      fromBase64Url(encoded).toString('utf8'),
    ) as InvitePayload;

    if (typeof payload?.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
