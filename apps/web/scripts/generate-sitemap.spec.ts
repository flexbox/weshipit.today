import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const appDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appDir, '../..');

describe('weekly plan sitemap migration guard', () => {
  let root: string;
  let webDir: string;
  let legacyDir: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'plan-sitemap-'));
    webDir = path.join(root, 'web');
    legacyDir = path.join(webDir, 'pages/plan');
    for (const dir of [
      'scripts',
      'pages',
      'public',
      'content/plan',
      'content/glossary',
    ]) {
      fs.mkdirSync(path.join(webDir, dir), { recursive: true });
    }
    fs.copyFileSync(
      path.join(appDir, 'scripts/generate-sitemap.mts'),
      path.join(webDir, 'scripts/generate-sitemap.mts'),
    );
    fs.symlinkSync(
      path.join(appDir, 'fixtures'),
      path.join(webDir, 'fixtures'),
      'dir',
    );
    fs.symlinkSync(
      path.join(repoRoot, 'node_modules'),
      path.join(root, 'node_modules'),
      'dir',
    );
    fs.writeFileSync(
      path.join(webDir, 'content/plan/2026-W48.md'),
      '# Weekly plan\n',
    );
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  function generate() {
    return spawnSync(
      process.execPath,
      [path.join(webDir, 'scripts/generate-sitemap.mts')],
      { cwd: root, encoding: 'utf8' },
    );
  }

  it.each(['missing', 'empty', 'non-Markdown'])(
    'generates the new week when the legacy directory is %s',
    (state) => {
      if (state !== 'missing') fs.mkdirSync(legacyDir);
      if (state === 'non-Markdown') {
        fs.writeFileSync(path.join(legacyDir, 'index.tsx'), '');
      }

      const result = generate();

      expect(result.stderr).not.toContain('Legacy weekly plans');
      expect(result.status).toBe(0);
      expect(
        fs.readFileSync(path.join(webDir, 'public/sitemap.xml'), 'utf8'),
      ).toContain('<loc>https://weshipit.today/plan/2026-W48</loc>');
    },
  );

  it('fails before overwriting the sitemap when old plan PRs add Markdown', () => {
    fs.mkdirSync(legacyDir);
    for (const file of ['2026-W47.md', '2026-w48.md']) {
      fs.writeFileSync(path.join(legacyDir, file), '# Legacy plan\n');
    }
    const sitemap = path.join(webDir, 'public/sitemap.xml');
    fs.writeFileSync(sitemap, 'previous sitemap');

    const result = generate();

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(
      'Legacy weekly plans found in apps/web/pages/plan',
    );
    expect(result.stderr).toContain('2026-W47.md');
    expect(result.stderr).toContain('2026-w48.md');
    expect(result.stderr).toContain(
      'Move them to apps/web/content/plan before building',
    );
    expect(fs.readFileSync(sitemap, 'utf8')).toBe('previous sitemap');
  });
});
