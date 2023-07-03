import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { Badge } from '../../badge/badge';
import kebabCase from 'lodash/kebabCase';

interface Type {
  name: string;
  color?:
    | 'lime'
    | 'indigo'
    | 'green'
    | 'pink'
    | 'cyan'
    | 'yellow'
    | null
    | undefined;
}

const types: Type[] = [
  {
    name: 'Analytics',
    color: 'lime',
  },
  {
    name: 'Authentication',
    color: 'indigo',
  },
  {
    name: 'Backend',
    color: 'green',
  },
  {
    name: 'Crash reporting',
    color: 'pink',
  },
  {
    name: 'Persistent storage',
    color: 'cyan',
  },
  {
    name: 'Infrastructure',
    color: 'yellow',
  },
];

export function TypeFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  // <pathname>?type="xxxxx"
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-6">
      {types.map((type) => (
        <li key={kebabCase(type.name)}>
          <Link href={pathname + '?' + createQueryString('type', type.name)}>
            <Badge intent={type.color}>
              <div className="flex justify-between">
                # {type.name}
                <ChevronRightIcon className="ml-1 h-6 w-6" />
              </div>
            </Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TypeFilter;
