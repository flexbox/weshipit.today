'use client';

import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Text } from '../../text/text';
import kebabCase from 'lodash/kebabCase';
import { types } from '../../tool-list/get-variant-from-type';
import { Button } from '../../button/button';

export function TypeFilter({ numberOfTools }: { numberOfTools: number }) {
  // Works in both routers. In the Pages Router it is empty until the router
  // is ready, which is how `router.query` behaved on this static page.
  const selectedType = useSearchParams()?.get('type') ?? undefined;
  const canResetFilter = !!selectedType;

  return (
    <ul className="grid grid-flow-row gap-4">
      <li>
        <Text variant="c2" className="ml-4 text-slate-400">
          Filter {numberOfTools}+ tools
        </Text>
      </li>
      {canResetFilter && (
        <li>
          <Link href="/react-native-tools">
            <Button variant="outline" className="flex w-full justify-between">
              Reset filter
              <XMarkIcon className="ml-1 size-6" />
            </Button>
          </Link>
        </li>
      )}
      {types.map((type) => {
        const isSelected = selectedType === type.name;
        return (
          <li key={kebabCase(type.name)}>
            <Link
              href={`/react-native-tools?type=${encodeURIComponent(type.name)}`}
            >
              <Button
                variant={isSelected ? 'primary' : 'outline'}
                className="flex w-full justify-between"
              >
                {type.name}
                <ChevronRightIcon className="ml-1 size-6" />
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default TypeFilter;
