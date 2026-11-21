import type { IncomingHttpHeaders } from 'node:http';

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/**
 * Absolute origin for links in emails and auth redirects. `HQ_SITE_URL` wins,
 * so production links never depend on a request header; previews and local
 * dev fall back to the request host.
 */
export function baseUrl(
  headers: IncomingHttpHeaders,
  siteUrl = process.env.HQ_SITE_URL,
): string {
  if (siteUrl) return siteUrl.replace(/\/+$/, '');
  const host =
    first(headers['x-forwarded-host']) ?? headers.host ?? 'weshipit.today';
  const isLocal = /^(localhost|127\.0\.0\.1)(:|$)/.test(host);
  const proto =
    first(headers['x-forwarded-proto']) ?? (isLocal ? 'http' : 'https');
  return `${proto}://${host}`;
}
