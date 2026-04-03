import Link from 'next/link';
import { useRouter } from 'next/router';

interface Issue {
  slug: string;
  title: string;
}

interface PlanSidebarProps {
  issues: Issue[];
}

function parseSlugOrder(slug: string): number {
  const match = slug.match(/(\d{4})-[Ww](\d+)/);
  if (!match) return 0;
  return parseInt(match[1]) * 100 + parseInt(match[2]);
}

export function PlanSidebar({ issues }: PlanSidebarProps) {
  const { asPath } = useRouter();
  const sorted = [...issues].sort(
    (a, b) => parseSlugOrder(b.slug) - parseSlugOrder(a.slug),
  );
  return (
    <aside className="hidden md:block w-56 shrink-0">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Previous issues
      </p>
      <nav className="flex flex-col gap-1">
        {sorted.map((issue) => {
          const isActive = asPath
            .toLowerCase()
            .endsWith(`/plan/${issue.slug.toLowerCase()}`);
          return (
            <Link
              key={issue.slug}
              href={`/plan/${issue.slug}`}
              className={
                isActive
                  ? 'rounded-md px-3 py-2 text-sm font-bold bg-gray-100 text-blue-500 dark:bg-gray-800 dark:text-white'
                  : 'rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
              }
            >
              {issue.slug.toUpperCase()}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
