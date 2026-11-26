import fs from 'node:fs';
import path from 'node:path';

/**
 * Guard for the App Router migration (docs/app-router/plan.md).
 *
 * A Server Component that imports from the `@weshipit/ui` barrel makes
 * Next.js ship every client component the barrel re-exports with that page:
 * about 100 kB of gzipped JavaScript measured on `/plan/[slug]`. Server
 * files import by path instead: `@weshipit/ui/header/header`.
 *
 * The test walks every file under `app/` and what it imports, and stops at
 * `'use client'` files, where the client bundler removes unused exports.
 */
const appDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appDir, '../..');

function resolveImport(from: string, specifier: string): string | null {
  const base = specifier.startsWith('.')
    ? path.resolve(path.dirname(from), specifier)
    : specifier.startsWith('apps/web/')
      ? path.resolve(repoRoot, specifier)
      : null;
  if (!base) return null;
  return (
    [
      base,
      `${base}.tsx`,
      `${base}.ts`,
      `${base}/index.tsx`,
      `${base}/index.ts`,
    ].find((file) => fs.existsSync(file) && fs.statSync(file).isFile()) ?? null
  );
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

function serverFilesImportingTheBarrel(): string[] {
  const queue = walk(path.join(appDir, 'app'));
  const seen = new Set<string>();
  const offenders: string[] = [];

  while (queue.length) {
    const file = queue.pop() as string;
    if (seen.has(file)) continue;
    seen.add(file);

    const source = fs.readFileSync(file, 'utf8');
    // A client boundary: everything below it is bundled for the browser.
    if (/^\s*['"]use client['"]/.test(source)) continue;

    const specifiers = [
      ...source.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g),
      ...source.matchAll(/\bimport\s+['"]([^'"]+)['"]/g),
    ].map((match) => match[1]);

    if (specifiers.includes('@weshipit/ui'))
      offenders.push(path.relative(repoRoot, file));
    for (const specifier of specifiers) {
      const target = resolveImport(file, specifier);
      if (target && /\.tsx?$/.test(target)) queue.push(target);
    }
  }
  return offenders.sort();
}

describe('App Router server files', () => {
  it('import UI components by path, not from the @weshipit/ui barrel', () => {
    expect(serverFilesImportingTheBarrel()).toEqual([]);
  });
});
