#!/usr/bin/env node
/**
 * JavaScript a page really loads, gzipped. Works for both routers.
 *
 * `build-manifest.json` only describes Pages Router routes, so this script
 * asks a browser instead: it serves the production build, opens each route
 * in Chrome and adds up the scripts the page executed: its own chunks and
 * the ones it imports lazily while idle.
 *
 * Link prefetching is switched off for the measurement (the browser reports
 * Save-Data). Otherwise the Pages Router also loads the chunks of every page
 * linked from the viewport, and the number describes the neighbours rather
 * than the page.
 *
 * Usage (from the repo root, after `yarn web:build`):
 *   node apps/web/scripts/measure-js.mjs                  # the sample routes
 *   node apps/web/scripts/measure-js.mjs /pricing /audit  # your own list
 *   node apps/web/scripts/measure-js.mjs --json
 *
 * Needs Google Chrome: Playwright's own browser build is not downloaded in
 * this repo, so the script launches the installed Chrome.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import { chromium } from 'playwright';

const SAMPLE_ROUTES = [
  '/',
  '/plan/2026-W42',
  '/react-native-glossary/hermes',
  '/audit',
  '/pricing',
];
const PORT = 4310;
const ORIGIN = `http://localhost:${PORT}`;

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(appDir, '../..');
const args = process.argv.slice(2);
const asJson = args.includes('--json');
const routes = args.filter((arg) => arg.startsWith('/'));
if (!routes.length) routes.push(...SAMPLE_ROUTES);

async function waitForServer() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      await fetch(ORIGIN, { method: 'HEAD' });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error(`next start did not answer on ${ORIGIN}`);
}

const server = spawn(
  path.join(repoRoot, 'node_modules/.bin/next'),
  ['start', appDir, '-p', String(PORT)],
  { stdio: ['ignore', 'ignore', 'inherit'] },
);

const sizes = new Map();
async function gzipSize(url) {
  if (!sizes.has(url)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} for ${url}`);
    const body = Buffer.from(await response.arrayBuffer());
    sizes.set(url, zlib.gzipSync(body).length);
  }
  return sizes.get(url);
}

const results = [];
let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ channel: 'chrome' });

  for (const route of routes) {
    const context = await browser.newContext();
    // Nothing leaves the machine: no analytics event, no third-party script.
    await context.route(
      (url) => url.origin !== ORIGIN || url.pathname.startsWith('/wsi'),
      (request) => request.abort(),
    );
    await context.route('**/_vercel/**', (request) => request.abort());
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '4g', saveData: true },
      });
    });
    const page = await context.newPage();
    const response = await page.goto(`${ORIGIN}${route}`, {
      waitUntil: 'networkidle',
    });
    // Chunks requested when the browser is idle (lazy figures, analytics).
    await page.waitForTimeout(1500);

    const page_ = await page.evaluate(() => ({
      router: '__NEXT_DATA__' in window ? 'pages' : 'app',
      scripts: [...document.scripts]
        .filter((script) => script.src && !script.noModule)
        .map((script) => script.src),
    }));
    // Only what Next.js built. The Vercel analytics scripts do not exist on
    // a local server and would be counted as the size of its 404 page.
    const scripts = [...new Set(page_.scripts)].filter((src) =>
      src.startsWith(`${ORIGIN}/_next/`),
    );
    let bytes = 0;
    for (const src of scripts) bytes += await gzipSize(src);

    results.push({
      bytes,
      files: scripts.length,
      route,
      router: page_.router,
      scripts,
      status: response?.status() ?? 0,
    });
    await context.close();
  }
} finally {
  await browser?.close();
  server.kill();
}

// Scripts every measured page of one router loads: the framework and the
// app shell. The two routers share nothing, so they are counted apart.
const shared = {};
for (const router of new Set(results.map((result) => result.router))) {
  const group = results.filter((result) => result.router === router);
  const common = group[0].scripts.filter((src) =>
    group.every((result) => result.scripts.includes(src)),
  );
  let bytes = 0;
  for (const src of common) bytes += await gzipSize(src);
  shared[router] = { bytes, files: common.length, pages: group.length };
}

const kb = (bytes) => `${(bytes / 1000).toFixed(0)} kB`;

if (asJson) {
  console.log(
    JSON.stringify(
      {
        routes: results.map(({ scripts, ...result }) => result),
        shared,
      },
      null,
      2,
    ),
  );
} else {
  console.log('| Route | Router | JS (gzip) | Files |');
  console.log('|---|---|---|---|');
  for (const result of results) {
    const failed = result.status === 200 ? '' : ` (HTTP ${result.status})`;
    console.log(
      `| \`${result.route}\`${failed} | ${result.router} | ${kb(result.bytes)} | ${result.files} |`,
    );
  }
  for (const [router, { bytes, files, pages }] of Object.entries(shared)) {
    if (pages < 2) continue;
    console.log(
      `| shared by the ${pages} ${router} routes above | ${router} | ${kb(bytes)} | ${files} |`,
    );
  }
}
