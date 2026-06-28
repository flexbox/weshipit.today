import React, { ReactElement } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NextChallengeLinkProps {
  href: string;
}

export function NextChallengeLink({
  href,
}: NextChallengeLinkProps): ReactElement {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-white/10 dark:!text-white dark:hover:bg-white/20"
      style={{
        textDecoration: 'none',
        color: 'rgb(55 65 81 / var(--tw-text-opacity))',
      }}
    >
      Next exercise
      <ArrowRightIcon className="-mr-0.5 ml-2 size-4" />
    </Link>
  );
}
