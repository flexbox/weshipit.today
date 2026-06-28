import React from 'react';

export interface StatsItemProps {
  name: string;
  stat: string;
}
interface StatsItemsProps {
  stats: StatsItemProps[];
}

export const StatsItems = ({ stats }: StatsItemsProps) => {
  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {stats.map((item: StatsItemProps) => (
        <div key={item.name} className="px-4">
          <dt className="truncate text-sm font-medium text-gray-400">
            {item.name}
          </dt>
          <dd className="-mt-1 font-semibold text-gray-700 dark:text-white">
            {item.stat}
          </dd>
        </div>
      ))}
    </dl>
  );
};
