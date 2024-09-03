import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { Badge } from '../../badge/badge';
import { Text } from '../../text/text';
import kebabCase from 'lodash/kebabCase';
import { types } from '../../tool-list/get-variant-from-type';
import { Button } from '../../button/button';

export function TypeFilter({ numberOfTools }: { numberOfTools: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const canResetFilter = searchParams.has('type');
  const selectedType = searchParams.get('type'); // Get the current type from the URL

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
            <Button variant={'primary'} className="flex w-full justify-between">
              Reset filter
              <XMarkIcon className="ml-1 size-6" />
            </Button>
          </Link>
        </li>
      )}
      {types.map((type) => {
        const isSelected = selectedType === type.name; // Check if this type is selected
        return (
          <li key={kebabCase(type.name)}>
            <Link href={pathname + '?' + createQueryString('type', type.name)}>
              <Button
                variant={isSelected ? 'ghost' : 'outline'} // Change variant if selected
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
