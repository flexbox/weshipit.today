import { ApiProps } from './api-list.d';
import { Badge, Card, Text } from '@weshipit/ui';

import truncate from 'lodash/truncate';
import Link from 'next/link';
import { ApiCardLogo } from './api-card-logo';

export function ApiCard({ fields }: ApiProps) {
  const { pricing, type, name, logo, website_url, slug } = fields;

  if (!name) {
    return null;
  }

  const description = truncate(fields.description, {
    length: 160,
    separator: '…',
  });

  let typeIntent = 'primary';
  switch (type) {
    case 'Analytics':
      typeIntent = 'lime';
      break;
    case 'Authentication':
      typeIntent = 'indigo';
      break;
    case 'Backend':
      typeIntent = 'green';
      break;
    case 'Bug reports':
      typeIntent = 'pink';
      break;
    case 'Persistent storage':
      typeIntent = 'cyan';
      break;
    case 'Infrastructure':
      typeIntent = 'yellow';
      break;
    default:
      break;
  }

  return (
    <Card>
      <Link href={`/react-native-tools/${slug}`} className="cursor-pointer">
        <div className="flex h-full flex-col justify-between">
          <div className="justify-start">
            <div className="flex items-center justify-between">
              <Text variant="s2" style="font-semibold mb-2 text-left">
                {name}
              </Text>
              {pricing && (
                <div className="group relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-400 px-4">
                  <Text variant="p2" style="font-bold" color="text-gray-400">
                    <small>{pricing[0]}</small>
                  </Text>

                  {/* shine box */}
                  <div className="z-5 group-hover:animate-shine absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-gray-300 opacity-40" />
                </div>
              )}
            </div>
            <div className="justify-center">
              <div className="my-8 flex items-center justify-between">
                <ApiCardLogo
                  name={name}
                  websiteUrl={website_url}
                  logoUrl={logo?.[0].url || undefined}
                />
              </div>
            </div>
            <Text variant="p1" style="mb-6" color="text-gray-400">
              {description}
            </Text>
          </div>

          <div className=" justify-end">
            <div className="flex justify-start ">
              <Badge size="sm" intent={typeIntent as any}>
                {type}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default ApiCard;
