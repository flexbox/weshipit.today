import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { Badge } from '../../badge/badge';

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
      <li>
        <a href={pathname + '?' + createQueryString('type', 'Analytics')}>
          <Badge intent={'lime'}># Analytics</Badge>
        </a>
      </li>
      <li>
        <a href={pathname + '?' + createQueryString('type', 'Authentication')}>
          <Badge intent={'indigo'}># Authentication</Badge>
        </a>
      </li>
      <li>
        <a href={pathname + '?' + createQueryString('type', 'Backend')}>
          <Badge intent={'green'}># Backend</Badge>
        </a>
      </li>
      <li>
        <a href={pathname + '?' + createQueryString('type', 'Crash reporting')}>
          <Badge intent={'pink'}># Crash reporting</Badge>
        </a>
      </li>
      <li>
        <a
          href={
            pathname + '?' + createQueryString('type', 'Persistent storage')
          }
        >
          <Badge intent={'cyan'}># Persistent storage</Badge>
        </a>
      </li>
      <li>
        <a href={pathname + '?' + createQueryString('type', 'Infrastructure')}>
          <Badge intent={'yellow'}># Infrastructure</Badge>
        </a>
      </li>
    </ul>
  );
}

export default TypeFilter;
