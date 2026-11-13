#!/usr/bin/env node
/**
 * SEO and internal-link audit of the built site.
 *
 * Reads every prerendered page in the `next build` output and reports:
 *   errors   – internal links to 404s, to redirects, or carrying `?id=`,
 *              missing/relative/query-string canonicals, pages that aren't
 *              exactly one <h1> (indexable pages only)
 *   warnings – title > 60 chars, meta description outside 120–155 chars,
 *              duplicate titles/descriptions across indexable pages
 *
 * Usage (from the repo root, after `yarn web:build`):
 *   node apps/web/scripts/check-seo.mjs            # errors fail the run
 *   node apps/web/scripts/check-seo.mjs --warnings # also list warnings
 *   node apps/web/scripts/check-seo.mjs --json     # machine-readable report
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const ORIGIN = 'https://weshipit.today';
const here = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(here, '..');
const repoRoot = path.resolve(appDir, '../..');
const distDir = path.join(repoRoot, 'dist/apps/web/.next');
const pagesDir = path.join(distDir, 'server/pages');
const publicDir = path.join(appDir, 'public');

const args = new Set(process.argv.slice(2));
const showWarnings = args.has('--warnings');
const asJson = args.has('--json');

if (!fs.existsSync(pagesDir)) {
  console.error(
    `No build output at ${pagesDir}. Run \`yarn web:build\` first.`,
  );
  process.exit(2);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const routeOf = (file) => {
  const rel = path.relative(pagesDir, file).replace(/\.html$/, '');
  if (rel === 'index') return '/';
  return `/${rel.replace(/\/index$/, '')}`;
};

const htmlFiles = walk(pagesDir).filter(
  (file) => file.endsWith('.html') && !/\/(404|500)\.html$/.test(file),
);
const pageRoutes = new Set(htmlFiles.map(routeOf));

// Server-rendered routes (getServerSideProps / API) have no .html file.
const routesManifest = JSON.parse(
  fs.readFileSync(path.join(distDir, 'routes-manifest.json'), 'utf8'),
);
const prerenderManifest = JSON.parse(
  fs.readFileSync(path.join(distDir, 'prerender-manifest.json'), 'utf8'),
);
const pagesManifest = JSON.parse(
  fs.readFileSync(path.join(distDir, 'server/pages-manifest.json'), 'utf8'),
);
const serverRoutes = new Set(Object.keys(pagesManifest));
// Dynamic SSG routes are `fallback: false`, so every valid path already has
// an .html file. Only dynamic routes rendered on demand need a pattern match.
const onDemandRoutes = (routesManifest.dynamicRoutes ?? [])
  .filter((route) => !(route.page in (prerenderManifest.dynamicRoutes ?? {})))
  .map((route) => new RegExp(route.regex));

const publicFiles = new Set(
  walk(publicDir).map((file) => `/${path.relative(publicDir, file)}`),
);

// Redirect sources from next.config.js (in the routes manifest) and vercel.json.
const vercelJson = JSON.parse(
  fs.readFileSync(path.join(appDir, 'vercel.json'), 'utf8'),
);
const redirectMatchers = [
  ...(routesManifest.redirects ?? [])
    .filter((redirect) => !redirect.internal)
    .map((redirect) => ({
      has: redirect.has,
      regex: new RegExp(redirect.regex),
      source: redirect.source,
    })),
  ...(vercelJson.redirects ?? []).map((redirect) => ({
    regex: new RegExp(
      `^${redirect.source.replace(/:\w+\*?/g, '[^/]+').replace(/\//g, '\\/')}$`,
    ),
    source: redirect.source,
  })),
];

function isRedirect(pathname, searchParams) {
  return redirectMatchers.some(({ has, regex }) => {
    if (!regex.test(pathname)) return false;
    if (!has) return true;
    return has.every(
      (condition) =>
        condition.type !== 'query' || searchParams.has(condition.key),
    );
  });
}

function resolves(pathname) {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (pageRoutes.has(clean) || publicFiles.has(clean)) return true;
  if (serverRoutes.has(clean)) return true;
  if (clean.startsWith('/_next/')) return true;
  return onDemandRoutes.some((regex) => regex.test(clean));
}

const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const pages = [];

for (const file of htmlFiles) {
  const route = routeOf(file);
  const { document } = new JSDOM(fs.readFileSync(file, 'utf8')).window;
  const robots =
    document.querySelector('meta[name="robots"]')?.getAttribute('content') ??
    'index,follow';
  const indexable = !/noindex/i.test(robots);
  const title = document.querySelector('title')?.textContent?.trim() ?? '';
  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content')
      ?.trim() ?? '';
  const canonical =
    document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  const canonicalCount = document.querySelectorAll(
    'link[rel="canonical"]',
  ).length;
  const h1Count = document.querySelectorAll('h1').length;
  const lang = document.documentElement.getAttribute('lang') ?? '';
  pages.push({
    canonical,
    description,
    h1Count,
    indexable,
    lang,
    route,
    title,
  });

  const report = (list, kind, detail) => list.push({ detail, kind, route });

  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/.test(href))
      continue;
    let url;
    try {
      url = new URL(href, `${ORIGIN}${route}`);
    } catch {
      report(errors, 'invalid-link', href);
      continue;
    }
    if (url.origin !== ORIGIN) continue;
    if (
      url.pathname.startsWith('/react-native-tools') &&
      url.searchParams.has('id')
    )
      report(errors, 'link-with-id-param', href);
    if (isRedirect(url.pathname, url.searchParams)) {
      report(errors, 'link-to-redirect', href);
    } else if (!resolves(decodeURIComponent(url.pathname))) {
      report(errors, 'broken-link', href);
    }
  }

  if (!indexable) continue;

  if (canonicalCount > 1)
    report(errors, 'multiple-canonicals', `${canonicalCount} tags`);
  if (!canonical) report(errors, 'missing-canonical', '');
  else if (!canonical.startsWith(ORIGIN))
    report(errors, 'relative-canonical', canonical);
  else if (/[?#]/.test(canonical))
    report(errors, 'canonical-with-query', canonical);
  else if (canonical !== `${ORIGIN}${route === '/' ? '' : route}`)
    report(warnings, 'canonical-not-self', canonical);

  if (h1Count !== 1) report(errors, 'h1-count', `${h1Count} <h1>`);
  if (!lang) report(errors, 'missing-lang', '');

  if (title.length > 60)
    report(warnings, 'title-too-long', `${title.length}: ${title}`);
  if (description.length < 120 || description.length > 155)
    report(
      warnings,
      'description-length',
      `${description.length}: ${description}`,
    );

  titles.set(title, [...(titles.get(title) ?? []), route]);
  descriptions.set(description, [
    ...(descriptions.get(description) ?? []),
    route,
  ]);
}

// The sitemap must list exactly the indexable pages.
const sitemapFile = path.join(publicDir, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  errors.push({
    detail: 'public/sitemap.xml missing',
    kind: 'sitemap',
    route: '-',
  });
} else {
  const sitemapRoutes = new Set(
    [
      ...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
    ].map(([, loc]) => new URL(loc).pathname.replace(/\/$/, '') || '/'),
  );
  const indexableRoutes = new Set(
    pages.filter((page) => page.indexable).map((page) => page.route),
  );
  for (const route of indexableRoutes)
    if (!sitemapRoutes.has(route))
      errors.push({
        detail: 'indexable page missing from sitemap',
        kind: 'sitemap',
        route,
      });
  // getServerSideProps pages have no .html to audit; trust the sitemap there.
  const serverRendered = [...serverRoutes].filter(
    (route) =>
      !route.startsWith('/api') &&
      !route.startsWith('/_') &&
      !route.includes('[') &&
      !pageRoutes.has(route),
  );
  for (const route of sitemapRoutes)
    if (!indexableRoutes.has(route) && !serverRendered.includes(route))
      errors.push({
        detail: 'sitemap lists a non-indexable or missing page',
        kind: 'sitemap',
        route,
      });
}

for (const [title, routes] of titles) {
  if (routes.length > 1)
    warnings.push({
      detail: `"${title}" on ${routes.join(', ')}`,
      kind: 'duplicate-title',
      route: routes[0],
    });
}
for (const [description, routes] of descriptions) {
  if (routes.length > 1 && description)
    warnings.push({
      detail: `${routes.length} pages: ${routes.slice(0, 5).join(', ')}`,
      kind: 'duplicate-description',
      route: routes[0],
    });
}

if (asJson) {
  console.log(JSON.stringify({ errors, pages, warnings }, null, 2));
} else {
  const group = (list) =>
    Object.entries(
      list.reduce((acc, item) => {
        (acc[item.kind] ??= []).push(item);
        return acc;
      }, {}),
    );
  const print = (label, list) => {
    for (const [kind, items] of group(list)) {
      console.log(`\n${label} ${kind} (${items.length})`);
      for (const item of items) console.log(`  ${item.route}  ${item.detail}`);
    }
  };
  print('✖', errors);
  if (showWarnings) print('⚠', warnings);
  console.log(
    `\n${pages.length} pages checked, ${pages.filter((p) => p.indexable).length} indexable: ${errors.length} errors, ${warnings.length} warnings${showWarnings ? '' : ' (use --warnings to list)'}.`,
  );
}

// exitCode, not exit(): exit() can cut off a large --json report when piped.
process.exitCode = errors.length ? 1 : 0;
