'use client';

import Link from 'next/link';

/**
 * The wordmark. A right-click opens the brand page with the logo assets.
 * A plain page load is enough for this shortcut, and it keeps the logo
 * independent of which Next.js router renders the page.
 */
export function HeaderLogo() {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.assign('/brand');
  };

  return (
    <Link
      href="/"
      className="-m-1.5 p-1.5 text-lg font-bold leading-6 dark:text-white"
      onContextMenu={handleContextMenu}
    >
      weshipit<span className="text-slate-400">.today</span>
    </Link>
  );
}
