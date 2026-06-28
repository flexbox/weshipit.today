import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import { LightBulbIcon } from '@heroicons/react/24/outline';

const GITHUB_NEW_ISSUE_URL =
  'https://github.com/flexbox/react-native-bootcamp/issues/new';

export function NewIssueLink(): ReactElement {
  const router = useRouter();
  let title;
  if (router.query.id === undefined) {
    title = encodeURI('Issue with setup');
  } else {
    title = encodeURI(`Issue+with+${router.query.id}`);
  }
  const link = `${GITHUB_NEW_ISSUE_URL}?assignees=&labels=Bootcamp+report&template=bootcamp_report.yml&amp;title=${title}`;
  return (
    <NativeLink
      href={link}
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    >
      <LightBulbIcon className="-ml-0.5 mr-2 size-4" />
      Report an issue
    </NativeLink>
  );
}
