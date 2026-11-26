import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fontClassName } from '../utils/fonts';

import '../styles/globals.css';

/**
 * `<html>` and `<body>` of every App Router page. The site has two root
 * layouts, `app/(en)` and `app/(fr)`, so that the language is right in the
 * HTML the server sends; this is everything they share.
 */
export function RootDocument({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: 'en' | 'fr';
}) {
  return (
    <html lang={lang} className="bg-background">
      <body className={fontClassName}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
