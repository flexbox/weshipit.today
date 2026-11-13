/**
 * Language of each page, for <html lang>. Everything is English except the
 * podcast (Le Cross Platform Show) and the French landing pages.
 *
 * Keys are Next.js page routes (router.pathname / __NEXT_DATA__.page), so
 * dynamic routes are written with their brackets.
 */
const FRENCH_PAGES = new Set([
  '/agentic-sprint',
  '/audit-gratuit',
  '/avis-incubateur-solopreneur',
  '/bonjour',
  '/code-reduction-solopreneur',
  '/flavie-prevot-avis',
  '/incubateur-solopreneur-vs-marketing-mania',
  '/partenaires',
  '/sprint-solo-saas',
]);

export type PageLang = 'en' | 'fr';

export function langForPage(page: string): PageLang {
  if (page === '/podcast' || page.startsWith('/podcast/')) return 'fr';
  return FRENCH_PAGES.has(page) ? 'fr' : 'en';
}
