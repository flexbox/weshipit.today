import { track } from '@vercel/analytics';

interface ConversionEvent {
  name: string;
  data: Record<string, string>;
}

// Maps an outbound destination to a conversion event so every
// cal.com / affiliate / form / checkout link is tracked without
// per-component wiring. Add new destinations here.
function classifyConversion(url: URL): ConversionEvent | null {
  const host = url.hostname;

  if (host === 'cal.com' || host.endsWith('.cal.com')) {
    const slug = url.pathname.split('/').filter(Boolean).pop() ?? '';
    return { name: 'book_call_click', data: { slug } };
  }
  if (host.endsWith('.systeme.io')) {
    return { name: 'affiliate_click', data: { partner: host.split('.')[0] } };
  }
  if (host === 'airtable.com') {
    return { name: 'form_click', data: { destination: 'airtable' } };
  }
  if (host.endsWith('.notion.site')) {
    return { name: 'form_click', data: { destination: 'notion' } };
  }
  if (host === 'buy.stripe.com') {
    return { name: 'checkout_click', data: { provider: 'stripe' } };
  }
  return null;
}

export function listenForConversionClicks(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const anchor = target?.closest?.('a[href]');
    if (!anchor) {
      return;
    }

    let url: URL;
    try {
      url = new URL(anchor.getAttribute('href') ?? '', window.location.href);
    } catch {
      return;
    }

    const conversion = classifyConversion(url);
    if (conversion) {
      track(conversion.name, {
        ...conversion.data,
        page: window.location.pathname,
      });
    }
  };

  // Capture phase so the event fires before the browser navigates away
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
