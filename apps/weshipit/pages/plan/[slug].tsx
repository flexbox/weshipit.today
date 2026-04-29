import { Prose } from '@weshipit/ui';
import { Layout } from 'apps/weshipit/components/layout';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PlanSidebar } from 'apps/weshipit/components/plan-sidebar';

interface Issue {
  slug: string;
  title: string;
}

interface PlanSlugPageProps {
  issues: Issue[];
  content: string;
  currentSlug: string;
  description: string;
  title: string;
  datePublished: string;
}

function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^#+\s*/, '').trim();
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
    const content = fs.readFileSync(path.join(planDir, filename), 'utf8');
    return { slug, title: extractTitle(content) };
  });

  return { files, issues };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const planDir = path.join(process.cwd(), 'pages/plan');
  const { issues } = readIssues(planDir);
  return {
    paths: issues.map((i) => ({ params: { slug: i.slug } })),
    fallback: false,
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

  const content = fs.readFileSync(path.join(planDir, match), 'utf8');

  const title = extractTitle(content);
  const description = extractDescription(content);
  const datePublished = isoWeekToDate(slug);
  return {
    props: {
      issues,
      content,
      currentSlug: slug,
      description,
      title,
      datePublished,
    },
  };
};

export default function PlanSlugPage({
  issues,
  content,
  currentSlug,
  description,
  title,
  datePublished,
}: PlanSlugPageProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    url: `https://weshipit.today/plan/${currentSlug}`,
    datePublished: datePublished,
    author: {
      '@type': 'Person',
      name: 'David Leuliette',
      url: 'https://weshipit.today',
    },
    publisher: {
      '@type': 'Organization',
      name: 'weshipit.today',
      url: 'https://weshipit.today',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://weshipit.today/plan/${currentSlug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://weshipit.today',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plan',
        item: 'https://weshipit.today/plan',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Plan ${currentSlug.toUpperCase()}`,
        item: `https://weshipit.today/plan/${currentSlug}`,
      },
    ],
  };

  return (
    <Layout
      seoTitle={`Plan ${currentSlug.toUpperCase()}`}
      seoDescription={description}
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
        <div className="flex gap-12">
          <PlanSidebar issues={issues} />

          {/* Content */}
          <main className="min-w-0 flex-1">
            <Prose>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </Prose>
          </main>
        </div>
      </div>
    </Layout>
  );
}
