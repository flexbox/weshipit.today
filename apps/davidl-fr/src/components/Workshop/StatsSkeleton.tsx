import React, { ReactElement } from 'react';

export function StatsSkeleton(): ReactElement {
  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="px-4">
        <dt className="truncate text-sm font-medium text-gray-400">
          Challenges completed
        </dt>
        <dd className="-mt-1 font-semibold text-gray-700 dark:text-white">
          ...
        </dd>
      </div>
      <div className="px-4">
        <dt className="truncate text-sm font-medium text-gray-400">
          Progression
        </dt>
        <dd className="-mt-1 font-semibold text-gray-700 dark:text-white">
          ...
        </dd>
      </div>
    </dl>
  );
}
