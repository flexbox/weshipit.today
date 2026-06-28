import React, { ReactElement } from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  url: string;
}

export function ButtonVideoLink({ url, title }: Props): ReactElement {
  return (
    <NativeLink
      href={url}
      style={{
        textDecoration: 'none',
        color: 'rgba(55, 65, 81, var(--tw-text-opacity))',
      }}
      className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 !text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-white/10 dark:!text-white dark:hover:bg-white/20"
    >
      <VideoCameraIcon className="-ml-0.5 mr-2 size-4" />
      {title}
    </NativeLink>
  );
}
