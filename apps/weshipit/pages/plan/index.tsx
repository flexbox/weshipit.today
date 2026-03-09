import { Prose } from '@weshipit/ui';
import { Layout } from 'apps/weshipit/components/layout';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PlanPageProps {
  content: string;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'pages/plan/2026-W10.md');
  const content = fs.readFileSync(filePath, 'utf8');
  return { props: { content } };
}

export default function PlanPage({ content }: PlanPageProps) {
  return (
    <Layout seoTitle={'Plan your week'} seoDescription={''} withHeader={true}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Prose>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Prose>
      </div>
    </Layout>
  );
}
