import type { User } from '@supabase/supabase-js';
import type { GetServerSidePropsContext } from 'next';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createHqAuthClient } from './supabase';

export function isOwnerEmail(email: string | null | undefined): boolean {
  const owner = process.env.HQ_OWNER_EMAIL?.trim().toLowerCase();
  return Boolean(owner && email && email.trim().toLowerCase() === owner);
}

/**
 * The signed-in owner, or null. `getUser()` checks the session with Supabase
 * Auth instead of trusting the cookie, so call this in every HQ page and
 * every /api/hq route.
 */
export async function getOwner(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<User | null> {
  const supabase = createHqAuthClient(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user && isOwnerEmail(user.email) ? user : null;
}

/** getServerSideProps guard: redirects to the login page when needed. */
export async function requireOwnerPage(ctx: GetServerSidePropsContext) {
  const owner = await getOwner(ctx.req, ctx.res);
  if (!owner) {
    return {
      redirect: { destination: '/hq/login', permanent: false },
    } as const;
  }
  ctx.res.setHeader('Cache-Control', 'private, no-store');
  return null;
}
