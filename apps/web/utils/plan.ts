import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';
import { getAllGlossaryTerms } from './glossary';
import { ServiceLink, serviceForText } from './glossary-services';
import {
  glossaryTermsIn,
  planHeading,
  planSeoDescription,
  planSeoTitle,
  planTopics,
} from './plan-seo';

/**
 * Weekly plans: one markdown file per ISO week in `content/plan`. Server
 * only (it reads the file system), so nothing here reaches the browser.
 */
export interface Plan {
  slug: string;
  /** First heading of the file. */
  title: string;
  /** Markdown body, without the frontmatter. */
  content: string;
  /** H1 shown on the page. */
  heading: string;
  topics: string[];
  seoTitle: string;
  description: string;
  service: ServiceLink;
  /** Monday of the ISO week, `YYYY-MM-DD`. */
  datePublished: string;
  seoDescription: string;
  glossaryTerms: { slug: string; title: string }[];
}

const planDir = () => path.join(process.cwd(), 'content/plan');

// Plan files start with YAML frontmatter, so the title is the first heading,
// not the first line.
function extractTitle(content: string): string {
  const heading = content.split('\n').find((line) => /^#\s/.test(line));
  return heading ? heading.replace(/^#+\s*/, '').trim() : '';
}

function extractDescription(content: string): string {
  const blockquote = content.split('\n').find((line) => line.startsWith('>'));
  return blockquote ? blockquote.replace(/^>\s*/, '').trim() : '';
}

function isoWeekToDate(slug: string): string {
  const match = slug.match(/^(\d{4})-[Ww](\d{1,2})$/);
  if (!match) return '';
  const year = parseInt(match[1], 10);
  const week = parseInt(match[2], 10);
  // ISO week 1 contains Jan 4, so find Monday of the given week
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = jan4.getUTCDay() || 7; // Monday=1 ... Sunday=7
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - dayOfWeek + 1 + (week - 1) * 7);
  return monday.toISOString().split('T')[0];
}

/** `2026-W07` → 202607, so weeks sort by date and not by string. */
function weekOrder(slug: string): number {
  const match = slug.match(/(\d{4})-[Ww](\d+)/);
  return match ? parseInt(match[1], 10) * 100 + parseInt(match[2], 10) : 0;
}

/**
 * Slug of every plan, newest first.
 *
 * `cache()` keeps the result for the render in progress: the page, its
 * `generateMetadata` and the navigation all ask for it, and the folder is
 * read once.
 */
export const getPlanSlugs = cache((): string[] =>
  fs
    .readdirSync(planDir())
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort((a, b) => weekOrder(b) - weekOrder(a)),
);

/** One plan, or `null` when no file matches the slug. */
export const getPlan = cache((requested: string): Plan | null => {
  // Only ever open a file that the folder listing returned.
  const slug = getPlanSlugs().find(
    (candidate) => candidate.toLowerCase() === requested.toLowerCase(),
  );
  if (!slug) return null;

  const raw = fs.readFileSync(path.join(planDir(), `${slug}.md`), 'utf8');
  const { content, data: frontmatter } = matter(raw);

  const description = frontmatter.description || extractDescription(content);
  const topics = planTopics(description);
  const text = `${description}\n${content}`;

  return {
    content,
    datePublished: isoWeekToDate(requested),
    description,
    glossaryTerms: glossaryTermsIn(text, getAllGlossaryTerms()),
    heading: planHeading(requested, frontmatter.seo_title),
    // The blockquote under the title, e.g. "Week of May 18–May 24, 2026".
    seoDescription: planSeoDescription(
      requested,
      topics,
      extractDescription(content),
    ),
    seoTitle: planSeoTitle(requested, frontmatter.seo_title),
    service: serviceForText(text),
    slug: requested,
    title: extractTitle(content),
    topics,
  };
});
