import { Prose } from '@weshipit/ui';
import { Layout } from 'apps/weshipit/components/layout';
import { PlanSidebar } from 'apps/weshipit/components/plan-sidebar';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Issue {
  slug: string;
  title: string;
}

interface PlanPageProps {
  content: string;
  issues: Issue[];
}

function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^#+\s*/, '').trim();
}

export async function getStaticProps() {
  const planDir = path.join(process.cwd(), 'pages/plan');
  const files = fs
    .readdirSync(planDir)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));

  const issues: Issue[] = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const fileContent = fs.readFileSync(path.join(planDir, filename), 'utf8');
    return { slug, title: extractTitle(fileContent) };
  });

  const latestFile = files[0];
  const content = fs.readFileSync(path.join(planDir, latestFile), 'utf8');

  return { props: { content, issues } };
}

export default function PlanPage({ content, issues }: PlanPageProps) {
  return (
    <Layout
      seoTitle={'Plan your week'}
      seoDescription={
        'Weekly sprint plan for the weshipit.today engineering team.'
      }
      noindex
      withHeader={true}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex gap-12">
          <PlanSidebar issues={issues} />
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
