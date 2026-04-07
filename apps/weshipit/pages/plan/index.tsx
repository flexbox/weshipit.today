import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const planDir = path.join(process.cwd(), 'pages/plan');
  const files = fs
    .readdirSync(planDir)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));

  const latestSlug = files[0]?.replace('.md', '');

  return {
    redirect: {
      destination: `/plan/${latestSlug}`,
      permanent: false,
    },
  };
}

export default function PlanIndex() {
  return null;
}
