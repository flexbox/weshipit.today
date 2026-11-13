import type { GlossaryTerm } from './glossary';

/** "React Native weekly action plan: A, B, and C." → ["A", "B", "C"]. */
export function planTopics(description: string): string[] {
  const list = description.includes(':')
    ? description.slice(description.indexOf(':') + 1)
    : description;
  return list
    .replace(/\.\s*$/, '')
    .split(/,\s*(?:and\s+)?/)
    .map((topic) => topic.trim())
    .filter(Boolean);
}

/** "2026-W07" + "React Native 0.84 & Hermes V1" → title without site suffix (≤ 43). */
export function planSeoTitle(slug: string, seoTitle?: string): string {
  const week = slug.replace(/^\d{4}-/, '').toUpperCase();
  return seoTitle ? `${seoTitle} · Plan ${week}` : `React Native Plan ${slug}`;
}

/** H1: keeps the "React Native Roadmap" series name, adds what the week is about. */
export function planHeading(slug: string, seoTitle?: string): string {
  return seoTitle
    ? `React Native Roadmap ${slug}: ${seoTitle}`
    : `React Native Roadmap ${slug}`;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * First day of the plan's week, e.g. "Feb 9, 2026". Read from the plan's
 * own "Week of …" line (some files don't follow ISO numbering); falls back
 * to the Monday of the ISO week in the slug.
 */
export function weekStartLabel(slug: string, weekLine = ''): string {
  const stated = weekLine.match(/([A-Z][a-z]+)\s+(\d{1,2})\D[^]*?(\d{4})/);
  const month = stated && MONTHS.find((m) => stated[1].startsWith(m));
  if (stated && month) return `${month} ${Number(stated[2])}, ${stated[3]}`;

  const match = slug.match(/^(\d{4})-W(\d{1,2})$/i);
  if (!match) return '';
  const jan4 = new Date(Date.UTC(Number(match[1]), 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(
    jan4.getUTCDate() -
      (jan4.getUTCDay() || 7) +
      1 +
      (Number(match[2]) - 1) * 7,
  );
  return monday.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  });
}

/**
 * Meta description from the week and its topics, keeping whole topics only
 * and staying within 155 characters.
 */
export function planSeoDescription(
  slug: string,
  topics: string[],
  weekLine = '',
): string {
  const start = weekStartLabel(slug, weekLine);
  const prefix = start
    ? `React Native plan, week of ${start}: `
    : 'React Native weekly action plan: ';
  for (let count = topics.length; count > 0; count--) {
    const text = `${prefix}${topics.slice(0, count).join(', ')}.`;
    if (text.length <= 155) return text;
  }
  return `${prefix}${topics[0] ?? ''}`.slice(0, 154) + '…';
}

/**
 * Glossary terms named in the plan, so each week links into the reference
 * pages. Case-sensitive on the term as written ("Hermes", "EAS") to skip
 * everyday words like "context" or "keys".
 */
export function glossaryTermsIn(
  text: string,
  terms: Pick<GlossaryTerm, 'aliases' | 'slug' | 'title'>[],
  max = 10,
): { slug: string; title: string }[] {
  const escape = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const firstIndex = (name: string) =>
    name.length >= 3
      ? text.search(new RegExp(`(?<![\\w-])${escape(name)}(?![\\w-])`))
      : -1;
  return terms
    .map((term) => {
      const hits = [term.title, ...(term.aliases ?? [])]
        .map(firstIndex)
        .filter((index) => index >= 0);
      return { index: hits.length ? Math.min(...hits) : -1, term };
    })
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index)
    .slice(0, max)
    .map(({ term }) => ({ slug: term.slug, title: term.title }));
}
