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

function sortIssues(issues: Issue[]): Issue[] {
  return [...issues].sort(
    (a, b) => parseSlugOrder(b.slug) - parseSlugOrder(a.slug),
  );
}

/**
 * Compact dropdown navigation shown on mobile, where the desktop sidebar is
 * hidden. Without it, mobile visitors have no way to reach other weekly plans.
 */
export function PlanNavSelect({ issues }: PlanSidebarProps) {
  const router = useRouter();
  const sorted = sortIssues(issues);
  const current = sorted.find((issue) =>
    router.asPath.toLowerCase().endsWith(`/plan/${issue.slug.toLowerCase()}`),
  );

  return (
    <div className="mb-8 md:hidden">
      <label
        htmlFor="plan-nav-select"
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
      >
        Previous issues
      </label>
      <select
        id="plan-nav-select"
        value={current?.slug ?? ''}
        onChange={(event) => router.push(`/plan/${event.target.value}`)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium tabular-nums text-gray-900 shadow-xs transition-colors duration-150 hover:border-gray-300 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-gray-600"
      >
        {sorted.map((issue) => (
          <option key={issue.slug} value={issue.slug}>
            {issue.slug.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PlanSidebar({ issues }: PlanSidebarProps) {
  const { asPath } = useRouter();
  const sorted = sortIssues(issues);
  return (
    <aside className="hidden w-56 shrink-0 md:block">
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
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'rounded-md px-3 py-2.5 text-sm font-bold tabular-nums bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-white'
                  : 'rounded-md px-3 py-2.5 text-sm tabular-nums text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
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
