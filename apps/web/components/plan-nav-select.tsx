'use client';

import { useRouter } from 'next/navigation';

/**
 * Compact dropdown navigation shown on mobile, where the desktop sidebar is
 * hidden. Without it, mobile visitors have no way to reach other weekly plans.
 *
 * The only interactive part of a plan page: it takes the slugs it lists and
 * nothing else.
 */
export function PlanNavSelect({
  currentSlug,
  slugs,
}: {
  slugs: string[];
  currentSlug: string;
}) {
  const router = useRouter();

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
        value={currentSlug}
        onChange={(event) => router.push(`/plan/${event.target.value}`)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium tabular-nums text-gray-900 shadow-xs transition-colors duration-150 hover:border-gray-300 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-gray-600"
      >
        {slugs.map((slug) => (
          <option key={slug} value={slug}>
            {slug.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
