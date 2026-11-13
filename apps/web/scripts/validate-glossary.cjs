/**
 * Checks content/glossary: unique titles and aliases, related titles and
 * internal links that resolve, summaries and bodies long enough to stand alone.
 * Run: node apps/web/scripts/validate-glossary.cjs
 */
const fs = require('fs'),
  path = require('path'),
  matter = require('gray-matter');
const D = path.join(__dirname, '..', 'content/glossary');
const pages = new Set([
  '/react-native-testing',
  '/react-native-security-audit',
  '/is-react-native',
]);
const terms = {},
  errs = [];
for (const f of fs
  .readdirSync(D)
  .filter((f) => f.endsWith('.md'))
  .sort()) {
  try {
    const { data, content } = matter(fs.readFileSync(path.join(D, f), 'utf8'));
    terms[f.slice(0, -3)] = { m: data, b: content };
  } catch (e) {
    errs.push(`${f}: YAML ${e.message.split('\n')[0]}`);
  }
}
const titles = new Set(
  Object.values(terms).map((t) => t.m.title.toLowerCase()),
);
const names = {};
for (const [k, { m }] of Object.entries(terms)) {
  for (const n of [m.title, ...(m.aliases || [])]) {
    const key = String(n).toLowerCase();
    (names[key] = names[key] || new Set()).add(k);
  }
}
for (const [n, ks] of Object.entries(names))
  if (ks.size > 1) errs.push(`DUP "${n}": ${[...ks]}`);
const wc = [];
for (const [k, { m, b }] of Object.entries(terms)) {
  for (const r of m.related || [])
    if (!titles.has(r.toLowerCase()))
      errs.push(`${k}: related "${r}" unresolved`);
  for (const [, l] of b.matchAll(/\]\((\/[^)\s#]*)/g)) {
    if (l.startsWith('/react-native-glossary/')) {
      if (!terms[l.split('/')[2]]) errs.push(`${k}: link ${l}`);
    } else if (!pages.has(l)) errs.push(`${k}: internal ${l}`);
  }
  if (!m.summary) errs.push(`${k}: no summary`);
  else if (m.summary.length > 175)
    errs.push(`${k}: summary ${m.summary.length}`);
  if (!m.updated) errs.push(`${k}: no updated`);
  const n = b
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  wc.push(n);
  if (n < 110) errs.push(`${k}: ${n} words`);
  if (/^#{1,6}\s/m.test(b.replace(/```[\s\S]*?```/g, '')))
    errs.push(`${k}: heading`);
}
console.log(
  Object.keys(terms).length,
  'terms; min words',
  Math.min(...wc),
  'total',
  wc.reduce((a, b) => a + b),
);
console.log(errs.join('\n') || 'no errors');
process.exitCode = errs.length ? 1 : 0;
