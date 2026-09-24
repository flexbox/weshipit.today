import { createHmac, timingSafeEqual } from 'node:crypto';

import { parse, serialize } from 'cookie';
import type { IncomingMessage, ServerResponse } from 'node:http';

export const ADMIN_COOKIE_NAME = 'weshipit_testimonials_admin';

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    throw new Error('ADMIN_SECRET is not set');
  }

  return secret;
}

function equals(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

function signSession(expiresAt: number): string {
  return createHmac('sha256', getSecret())
    .update(String(expiresAt))
    .digest('hex');
}

/** Constant-time check of the password typed on the moderation page. */
export function isValidAdminPassword(candidate: string): boolean {
  if (!candidate) {
    return false;
  }

  return equals(candidate, getSecret());
}

export function createAdminSessionCookie(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;

  return serialize(
    ADMIN_COOKIE_NAME,
    `${expiresAt}.${signSession(expiresAt)}`,
    {
      httpOnly: true,
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    },
  );
}

export function clearAdminSessionCookie(): string {
  return serialize(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Verified next to every read/write it protects — never in middleware, so a
 * routing mistake can never leak a pending testimonial.
 */
export function isAdminRequest(request: IncomingMessage): boolean {
  const raw = parse(request.headers.cookie ?? '')[ADMIN_COOKIE_NAME];

  if (!raw) {
    return false;
  }

  const [expiresAt, signature] = raw.split('.');

  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
    return false;
  }

  return equals(signature, signSession(Number(expiresAt)));
}

export function setAdminCookie(response: ServerResponse, cookie: string): void {
  response.setHeader('Set-Cookie', cookie);
}
