import { Prose } from '@weshipit/ui';
import { Layout } from 'apps/web/components/layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PlanNavSelect, PlanSidebar } from 'apps/web/components/plan-sidebar';
import Link from 'next/link';
import { getAllGlossaryTerms } from '../../utils/glossary';
import { ServiceLink, serviceForText } from '../../utils/glossary-services';
import {
  glossaryTermsIn,
  planHeading,
  planSeoDescription,
  planSeoTitle,
  planTopics,
} from '../../utils/plan-seo';

interface Issue {
  slug: string;
  title: string;
}

interface PlanSlugPageProps {
  title: string;
  issues: Issue[];
  content: string;
  currentSlug: string;
  description: string;
  datePublished: string;
  heading: string;
  seoTitle: string;
  seoDescription: string;
  topics: string[];
  glossaryTerms: { slug: string; title: string }[];
  service: ServiceLink;
}

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

function readIssues(planDir: string): { files: string[]; issues: Issue[] } {
  const files = fs
    .readdirSync(planDir)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));

  const issues: Issue[] = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const raw = fs.readFileSync(path.join(planDir, filename), 'utf8');
    const { content } = matter(raw);
    return { slug, title: extractTitle(content) };
  });

  return { files, issues };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const planDir = path.join(process.cwd(), 'pages/plan');
  const { issues } = readIssues(planDir);
  return {
    fallback: false,
    paths: issues.map((i) => ({ params: { slug: i.slug } })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const planDir = path.join(process.cwd(), 'pages/plan');
  const { issues } = readIssues(planDir);

  // Find the file matching the slug (case-insensitive)
  const files = fs.readdirSync(planDir).filter((f) => f.endsWith('.md'));
  const match = files.find(
    (f) => f.replace('.md', '').toLowerCase() === slug.toLowerCase(),
  );

  if (!match) return { notFound: true };

  const raw = fs.readFileSync(path.join(planDir, match), 'utf8');
  const { content, data: frontmatter } = matter(raw);

  const title = extractTitle(content);
  const description = frontmatter.description || extractDescription(content);
  const datePublished = isoWeekToDate(slug);
  const topics = planTopics(description);

  return {
    props: {
      content,
      currentSlug: slug,
      datePublished,
      description,
      glossaryTerms: glossaryTermsIn(
        `${description}\n${content}`,
        getAllGlossaryTerms(),
      ),
      heading: planHeading(slug, frontmatter.seo_title),
      issues,
      // The blockquote under the title, e.g. "Week of May 18–May 24, 2026".
      seoDescription: planSeoDescription(
        slug,
        topics,
        extractDescription(content),
      ),
      seoTitle: planSeoTitle(slug, frontmatter.seo_title),
      service: serviceForText(`${description}\n${content}`),
      title,
      topics,
    },
  };
};

export default function PlanSlugPage({
  content,
  currentSlug,
  datePublished,
  description,
  glossaryTerms,
  heading,
  issues,
  seoDescription,
  seoTitle,
  service,
  title,
  topics,
}: PlanSlugPageProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    author: {
      '@type': 'Person',
      name: 'David Leuliette',
      url: 'https://weshipit.today',
    },
    datePublished: datePublished,
    description: description,
    headline: heading || title,
    mainEntityOfPage: {
      '@id': `https://weshipit.today/plan/${currentSlug}`,
      '@type': 'WebPage',
    },
    publisher: {
      '@type': 'Organization',
      name: 'weshipit.today',
      url: 'https://weshipit.today',
    },
    url: `https://weshipit.today/plan/${currentSlug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: 'https://weshipit.today',
        name: 'Home',
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: 'https://weshipit.today/plan',
        name: 'Plan',
        position: 2,
      },
      {
        '@type': 'ListItem',
        item: `https://weshipit.today/plan/${currentSlug}`,
        name: `Plan ${currentSlug.toUpperCase()}`,
        position: 3,
      },
    ],
  };

  return (
    <Layout
      seoTitle={seoTitle}
      ogImageTitle={title}
      ogImageKicker={`Plan ${currentSlug.toUpperCase()}`}
      seoDescription={seoDescription}
      withHeader={true}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <PlanNavSelect issues={issues} />

        <div className="flex gap-12">
          <PlanSidebar issues={issues} />

          {/* Content */}
          <article className="min-w-0 flex-1">
            <Prose className="prose-headings:text-balance prose-p:text-pretty">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Every file opens with the same "React Native Roadmap
                  // <week>" heading; say what the week is about, then
                  // introduce it.
                  h1: () => (
                    <>
                      <h1>{heading}</h1>
                      {topics.length > 0 && (
                        <p className="lead">
                          What to ship in a React Native app this week:{' '}
                          {topics.join(', ')}. Each one links to its source,
                          then the 5-day plan below breaks it into steps you can
                          apply to your codebase.
                        </p>
                      )}
                    </>
                  ),
                  // Wide tables scroll inside their own container instead of
                  // forcing the whole page to scroll horizontally on mobile.
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto">
                      <table {...props} />
                    </div>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </Prose>

            <aside className="mt-16 rounded-2xl bg-slate-100 p-8 dark:bg-slate-900">
              {glossaryTerms.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-slate-100">
                    Terms in this plan
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {glossaryTerms.map((term) => (
                      <li key={term.slug}>
                        <Link
                          href={`/react-native-glossary/${term.slug}`}
                          className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 dark:decoration-slate-600 dark:hover:decoration-slate-100"
                        >
                          {term.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h2
                className={`text-xl font-bold text-slate-950 dark:text-slate-100${glossaryTerms.length > 0 ? ' mt-8' : ''}`}
              >
                Want this done in your app?
              </h2>
              <p className="mt-3 text-slate-700 dark:text-slate-300">
                {service.pitch}{' '}
                <Link
                  href={service.href}
                  className="font-semibold underline underline-offset-4"
                >
                  See our {service.label}
                </Link>
              </p>
            </aside>
          </article>
        </div>
      </div>
    </Layout>
  );
}
