import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import { getGithubChallengeUrl } from '~/utils/getGitHubSlug';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export function ButtonCheckGitHub(): ReactElement {
  const route = useRouter();
  const challengeId = route.query.id as string;
  const GITHUB_URL = getGithubChallengeUrl(challengeId);
  return (
    <NativeLink
      href={GITHUB_URL}
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    >
      <AcademicCapIcon className="-ml-0.5 mr-2 size-4" />
      Check on GitHub
    </NativeLink>
  );
}
