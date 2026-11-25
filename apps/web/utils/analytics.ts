import type { PostHog } from 'posthog-js';

/**
 * Conversion tracking. Vercel Analytics handles traffic (pageviews,
 * referrers); PostHog only records the moments a visitor converts.
 *
 * Cookieless on purpose: no cookie or localStorage, so no consent banner.
 * Events go through the `/wsi` rewrite in next.config.js so ad blockers
 * (common in a dev audience) don't drop them.
 */
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export type ConversionEvent =
  'audit_requested' | 'book_call_clicked' | 'checkout_clicked';

/**
 * posthog-js is about 120 kB gzipped, more than React and Next.js together.
 * It loads in its own chunk once the page is idle, so it never delays
 * hydration. Events tracked before it arrives wait on this promise.
 */
let posthogReady: Promise<PostHog> | null = null;

function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => resolve(), { timeout: 3000 });
    } else {
      window.setTimeout(resolve, 200);
    }
  });
}

async function loadPostHog(key: string): Promise<PostHog> {
  await whenIdle();
  const { default: posthog } = await import('posthog-js');

  posthog.init(key, {
    api_host: '/wsi',
    autocapture: false,
    capture_pageleave: false,
    // Pageviews stay on so funnels can start from a landing page.
    capture_pageview: 'history_change',
    cookieless_mode: 'always',
    defaults: '2026-08-30',
    disable_session_recording: true,
    disable_surveys: true,
    ui_host: 'https://eu.posthog.com',
  });

  return posthog;
}

export function initAnalytics() {
  if (posthogReady || !POSTHOG_KEY || typeof window === 'undefined') return;
  posthogReady = loadPostHog(POSTHOG_KEY);
  // A blocked or failed chunk must not surface as an unhandled rejection.
  posthogReady.catch(() => undefined);

  document.addEventListener('click', trackOutboundConversion, {
    capture: true,
  });
}

export function track(
  event: ConversionEvent,
  properties?: Record<string, string>,
) {
  posthogReady
    ?.then((posthog) => posthog.capture(event, properties))
    .catch(() => undefined);
}

/**
 * Every conversion ends on another site (Cal, Stripe, Gumroad), and the
 * links live in many components, some in libs/ui. One delegated listener
 * catches them all instead of wiring each CTA by hand.
 */
function trackOutboundConversion(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return;

  const conversion = conversionForUrl(link.href);
  if (conversion) track(conversion.event, conversion.properties);
}

export function conversionForUrl(href: string): {
  event: ConversionEvent;
  properties: Record<string, string>;
} | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const slug = url.pathname.split('/').filter(Boolean).pop() ?? '';

  if (url.hostname === 'cal.com') {
    return { event: 'book_call_clicked', properties: { calendar: slug } };
  }
  if (url.hostname === 'buy.stripe.com') {
    return {
      event: 'checkout_clicked',
      properties: { product: `stripe_${slug}` },
    };
  }
  if (url.hostname === 'gumroad.com' || url.hostname.endsWith('.gumroad.com')) {
    return {
      event: 'checkout_clicked',
      properties: { product: `gumroad_${slug}` },
    };
  }
  return null;
}
