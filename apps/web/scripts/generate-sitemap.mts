#!/usr/bin/env node
/**
 * Writes apps/web/public/sitemap.xml before `next build`.
 *
 * Why not next-sitemap: it runs *after* the build and writes into public/,
 * but Vercel has already collected public/ by then, so production kept
 * serving a stale, hand-committed sitemap (and its index listed itself).
 * Generating first means the file ships like any other static asset.
 *
 * Every route comes from the same sources the pages read in
 * getStaticPaths, so a new tool, glossary term or episode lands in the
 * sitemap automatically. New top-level pages are picked up from pages/;
 * add them to EXCLUDED_PAGES if they must stay out of the index.
 *
 * Run with: node apps/web/scripts/generate-sitemap.mts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { podcastEpisodes } from '../fixtures/podcast-episodes.fixture.ts';
import { tools } from '../fixtures/tools.fixture.ts';

const SITE_URL = 'https://weshipit.today';
const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(appDir, 'pages');

/**
 * Pages that exist but must not be indexed. Each of them also renders
 * `noindex`, so keep both in sync (the unit test checks it).
 */
export const EXCLUDED_PAGES = [
  '/404',
  '/brand',
  '/home',
  '/og-preview',
  '/onboarding',
  // Server-side redirect to the latest weekly plan.
  '/plan',
  '/qr',
];

interface SitemapEntry {
  loc: string;
  /** YYYY-MM-DD content date. Omitted when we have no real date. */
  lastmod?: string;
}

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime()))
    return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))
    return value.slice(0, 10);
  return undefined;
}

/** Sunday of an ISO week (`2026-W21`): the plan is complete by then. */
function isoWeekEnd(slug: string): string | undefined {
  const match = slug.match(/^(\d{4})-W(\d{1,2})$/i);
  if (!match) return undefined;
  const jan4 = new Date(Date.UTC(Number(match[1]), 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(
    jan4.getUTCDate() - (jan4.getUTCDay() || 7) + 1 + (Number(match[2]) - 1) * 7
  );
  monday.setUTCDate(monday.getUTCDate() + 6);
  return monday.toISOString().slice(0, 10);
}

/** Static routes: pages/foo.tsx → /foo, pages/foo/index.tsx → /foo. */
export function staticPageRoutes(): string[] {
  const routes: string[] = [];
  for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    if (entry.isFile() && /\.tsx$/.test(entry.name)) {
      const name = entry.name.replace(/\.tsx$/, '');
      if (name.startsWith('_') || name.startsWith('[')) continue;
      routes.push(name === 'index' ? '/' : `/${name}`);
    } else if (
      entry.isDirectory() &&
      entry.name !== 'api' &&
      fs.existsSync(path.join(pagesDir, entry.name, 'index.tsx'))
    ) {
      routes.push(`/${entry.name}`);
    }
  }
  return routes.filter((route) => !EXCLUDED_PAGES.includes(route));
}

function glossaryEntries(): SitemapEntry[] {
  const dir = path.join(appDir, 'content/glossary');
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        lastmod: toIsoDate(data.updated),
        loc: `/react-native-glossary/${file.replace(/\.md$/, '')}`,
      };
    });
}

function podcastEntries(): SitemapEntry[] {
  const transcriptsDir = path.join(appDir, 'public/podcast-transcripts');
  const transcripts = new Set(
    fs.existsSync(transcriptsDir) ? fs.readdirSync(transcriptsDir) : []
  );
  return podcastEpisodes.flatMap((episode) => {
    const lastmod = toIsoDate(episode.published_at);
    const entries: SitemapEntry[] = [
      { lastmod, loc: `/podcast/${episode.slug}` },
    ];
    if (transcripts.has(`${episode.slug}.txt`))
      entries.push({ lastmod, loc: `/podcast/${episode.slug}/transcript` });
    return entries;
  });
}

function planEntries(): SitemapEntry[] {
  return fs
    .readdirSync(path.join(pagesDir, 'plan'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      return { lastmod: isoWeekEnd(slug), loc: `/plan/${slug}` };
    });
}

export function sitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    ...staticPageRoutes().map((loc) => ({ loc })),
    ...tools.map((tool) => ({ loc: `/react-native-tools/${tool.slug}` })),
    ...glossaryEntries(),
    ...podcastEntries(),
    ...planEntries(),
  ];
  const seen = new Set<string>();
  return entries
    .filter((entry) => !seen.has(entry.loc) && seen.add(entry.loc))
    .sort((a, b) => a.loc.localeCompare(b.loc));
}

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries.map(({ lastmod, loc }) => {
    const url = escapeXml(`${SITE_URL}${loc === '/' ? '' : loc}`);
    return `  <url><loc>${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const entries = sitemapEntries();
  const out = path.join(appDir, 'public/sitemap.xml');
  fs.writeFileSync(out, renderSitemap(entries));
  console.log(`sitemap: ${entries.length} URLs → ${path.relative(process.cwd(), out)}`);
}
