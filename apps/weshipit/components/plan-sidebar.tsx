import Link from 'next/link';

interface Issue {
  slug: string;
  title: string;
}

interface PlanSidebarProps {
  issues: Issue[];
  currentSlug?: string;
}

export function PlanSidebar({ issues, currentSlug }: PlanSidebarProps) {
  return (
    <aside className="hidden md:block w-56 shrink-0">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Previous issues
      </p>
      <nav className="flex flex-col gap-1">
        {issues.map((issue) => {
          const isActive =
            currentSlug != null &&
            issue.slug.toLowerCase() === currentSlug.toLowerCase();
          return (
            <Link
              key={issue.slug}
              href={`/plan/${issue.slug}`}
              className={
                isActive
                  ? 'rounded-md px-3 py-2 text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
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
