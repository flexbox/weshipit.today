import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { Badge } from '../../badge/badge';
import { Text } from '../../text/text';
import kebabCase from 'lodash/kebabCase';
import { types } from '../../tool-list/get-variant-from-type';

export function TypeFilter({ numberOfTools }: { numberOfTools: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const canResetFitler = searchParams.has('type');

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  // <pathname>?type="xxxxx"
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
      {canResetFitler && (
        <li>
          <Link href="/react-native-tools">
            <Badge variant="gray-light">
              Reset filter
              <XMarkIcon className="ml-1 h-6 w-6" />
            </Badge>
          </Link>
        </li>
      )}
      {types.map((type) => (
        <li key={kebabCase(type.name)}>
          <Link href={pathname + '?' + createQueryString('type', type.name)}>
            <Badge variant={type.color}>
              # {type.name}
              <ChevronRightIcon className="ml-1 h-6 w-6" />
            </Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TypeFilter;
