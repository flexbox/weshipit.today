import { Text } from '@weshipit/ui/text/text';
import Link from 'next/link';

/**
 * Desktop list of every weekly plan. A Server Component: each plan page is
 * built for one slug, so the active link is known without asking the
 * browser for the URL.
 */
export function PlanSidebar({
  currentSlug,
  slugs,
}: {
  slugs: string[];
  currentSlug: string;
}) {
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <Text variant="eyebrow" tone="muted" className="mb-4">
        Previous issues
      </Text>
      <nav className="flex flex-col gap-1">
        {slugs.map((slug) => {
          const isActive = slug.toLowerCase() === currentSlug.toLowerCase();
          return (
            <Link
              key={slug}
              href={`/plan/${slug}`}
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'rounded-md px-3 py-2.5 text-sm font-bold tabular-nums bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-white'
                  : 'rounded-md px-3 py-2.5 text-sm tabular-nums text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
              }
            >
              {slug.toUpperCase()}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
