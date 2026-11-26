import type { Metadata, Viewport } from 'next';
import { NotFoundContent } from '../components/not-found-content';
import { PageShell } from '../components/page-shell';
import { RootDocument } from '../components/root-document';
import { baseMetadata, baseViewport } from '../utils/seo/metadata';

/**
 * 404 for a URL that matches no route.
 *
 * The site has two root layouts, `(en)` and `(fr)`, so there is no single
 * layout a root `not-found.tsx` could render in. This file is the documented
 * answer: Next.js returns it as a whole document, which is why it renders
 * `<html>` itself. It needs `experimental.globalNotFound` in next.config.js.
 * Next.js adds `noindex` to every 404 response.
 */
export const metadata: Metadata = {
  ...baseMetadata,
  description: 'We are sorry but the page you are looking for does not exist.',
  title: { absolute: '404 : Page not found — weshipit.today' },
};
export const viewport: Viewport = baseViewport;

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <PageShell withHeader withContainer withFooter>
        <NotFoundContent />
      </PageShell>
    </RootDocument>
  );
}
