import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { slugify } from './slugify';

/**
 * The glossary is plain markdown in `content/glossary` — one file per term,
 * the filename being the slug. Read at build time only: every consumer calls
 * these from `getStaticProps` / `getStaticPaths`.
 */
const GLOSSARY_DIR = path.join(process.cwd(), 'content/glossary');

export interface GlossaryTerm {
  slug: string;
  title: string;
  /** Section heading: the first letter, or `#` for anything starting with a digit. */
  letter: string;
  /**
   * One- or two-sentence blurb. Shown on the index and used as the meta
   * description, so the listing stays scannable while the term page carries
   * the full definition.
   */
  summary: string;
  /** Other names for the same concept — feeds search and `alternateName`. */
  aliases: string[];
  /** ISO date (YYYY-MM-DD) from frontmatter, or null when unset. */
  updated: string | null;
  /** Titles of terms the author explicitly linked. */
  related: string[];
  /** The markdown body, without frontmatter. */
  content: string;
  /** Body stripped of markdown syntax — for search, meta descriptions and schema. */
  plainText: string;
  /** Words in the body — used by the content-coverage check in the tests. */
  wordCount: number;
}

function firstLetterOf(title: string) {
  const firstLetter = title.charAt(0).toUpperCase();
  return /^[0-9]/.test(firstLetter) ? '#' : firstLetter;
}

/** Good enough for search and meta tags — not a general-purpose markdown parser. */
function toPlainText(markdown: string) {
  return (
    markdown
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // Drop a table's separator row, but keep the cells of every other row —
      // they carry real content that search and cross-links rely on.
      .replace(/^\s*\|[\s:|-]*\|\s*$/gm, ' ')
      .replace(/\|/g, ' ')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/(?<!\w)_([^_]+)_(?!\w)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * YAML parses an unquoted `2026-09-11` into a Date, so normalise both shapes
 * back to a plain `YYYY-MM-DD` string that survives JSON serialisation.
 */
function toIsoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && value.trim()) {
    return value.trim().slice(0, 10);
  }
  return null;
}

/** First one or two sentences, used when a file declares no explicit summary. */
function firstSentences(plainText: string, max = 240) {
  if (plainText.length <= max) return plainText;
  const clipped = plainText.slice(0, max);
  const lastStop = clipped.lastIndexOf('. ');
  return lastStop > 60 ? clipped.slice(0, lastStop + 1) : `${clipped.trim()}…`;
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function parseTerm(filename: string): GlossaryTerm | null {
  const raw = fs.readFileSync(path.join(GLOSSARY_DIR, filename), 'utf8');
  const { data, content } = matter(raw);

  const title = typeof data.title === 'string' ? data.title.trim() : '';
  if (!title) return null;

  const body = content.trim();
  const plainText = toPlainText(body);

  return {
    slug: filename.replace(/\.md$/, ''),
    title,
    letter: firstLetterOf(title),
    summary:
      typeof data.summary === 'string' && data.summary.trim()
        ? data.summary.trim()
        : firstSentences(plainText),
    aliases: toStringArray(data.aliases),
    updated: toIsoDate(data.updated),
    related: toStringArray(data.related),
    content: body,
    plainText,
    wordCount: plainText ? plainText.split(/\s+/).length : 0,
  };
}

/** Every term, sorted alphabetically by title. */
export function getAllGlossaryTerms(): GlossaryTerm[] {
  if (!fs.existsSync(GLOSSARY_DIR)) return [];

  return fs
    .readdirSync(GLOSSARY_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map(parseTerm)
    .filter((term): term is GlossaryTerm => term !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Resolve a related-term title to a slug, preferring an existing term. */
export function resolveTermSlug(title: string, terms: GlossaryTerm[]) {
  const match = terms.find(
    (term) => term.title.toLowerCase() === title.toLowerCase(),
  );
  return match ? match.slug : slugify(title);
}
