import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Database } from './database.types';

/**
 * Server-side Supabase access for HQ. Import only from API routes and
 * getServerSideProps: Next strips those imports from the browser bundle. The
 * `server-only` package can't guard this file, because it only works in the
 * App Router, so the guard below does it at runtime instead.
 */
if (typeof window !== 'undefined') {
  throw new Error('utils/hq/supabase is server-only');
}

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

let admin: SupabaseClient<Database> | undefined;

/**
 * Client with the secret key. RLS has no policies, so this is the only way
 * to read or write HQ data. Never expose what it returns without filtering.
 */
export function getHqAdmin(): SupabaseClient<Database> {
  admin ??= createClient<Database>(
    env('NEXT_PUBLIC_SUPABASE_URL'),
    env('SUPABASE_SECRET_KEY'),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  return admin;
}

/**
 * Per-request client with the publishable key, reading and writing the auth
 * cookies. Used only for the owner's session, never for data.
 */
export function createHqAuthClient(req: IncomingMessage, res: ServerResponse) {
  return createServerClient<Database>(
    env('NEXT_PUBLIC_SUPABASE_URL'),
    env('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
    {
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.cookie ?? '').map(
            ({ name, value }) => ({ name, value: value ?? '' }),
          );
        },
        setAll(cookiesToSet, headers) {
          const previous = res.getHeader('Set-Cookie');
          const kept = Array.isArray(previous)
            ? previous
            : previous
              ? [String(previous)]
              : [];
          res.setHeader('Set-Cookie', [
            ...kept,
            ...cookiesToSet.map(({ name, options, value }) =>
              serializeCookieHeader(name, value, options),
            ),
          ]);
          for (const [key, value] of Object.entries(headers ?? {})) {
            res.setHeader(key, value);
          }
        },
      },
    },
  );
}
