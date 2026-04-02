import { Prose } from '@weshipit/ui';
import { Layout } from 'apps/weshipit/components/layout';
import fs from 'fs';
import path from 'path';
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
}

function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^#+\s*/, '').trim();
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

  return { props: { issues, content, currentSlug: slug } };
};

export default function PlanSlugPage({
  issues,
  content,
  currentSlug,
}: PlanSlugPageProps) {
  return (
    <Layout
      seoTitle={`Plan ${currentSlug.toUpperCase()}`}
      seoDescription=""
      withHeader={true}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex gap-12">
          <PlanSidebar issues={issues} currentSlug={currentSlug} />

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
