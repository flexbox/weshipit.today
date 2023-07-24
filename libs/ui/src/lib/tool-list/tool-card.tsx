import { RecordProps } from './record-types';
import { Badge } from '../badge/badge';
import { Card } from '../card/card';
import { Text } from '../text/text';

import truncate from 'lodash/truncate';
import Link from 'next/link';
import { ToolCardLogo } from './tool-card-logo';

export function ToolCard({ fields }: RecordProps) {
  const { pricing, type, name, website_url, slug } = fields;

  if (!name) {
    return null;
  }

  const description = truncate(fields.description, {
    length: 160,
    separator: '…',
  });

  let typeVariant = 'primary';
  switch (type) {
    case 'Analytics':
      typeVariant = 'lime';
      break;
    case 'Authentication':
      typeVariant = 'indigo';
      break;
    case 'Backend':
      typeVariant = 'green';
      break;
    case 'Crash reporting':
      typeVariant = 'pink';
      break;
    case 'Persistent storage':
      typeVariant = 'cyan';
      break;
    case 'Infrastructure':
      typeVariant = 'blue';
      break;
    case 'Payment':
      typeVariant = 'yellow';
      break;
    default:
      break;
  }

  return (
    <Card>
      <Link href={`/react-native-tools/${slug}`} className="cursor-pointer">
        <div className="flex h-full flex-col justify-between ">
          <div className="justify-start">
            <div className="flex items-center justify-between">
              <Text
                as="h3"
                variant="s2"
                className="mb-2 text-left font-semibold"
              >
                {name}
              </Text>
              {pricing && (
                <div className="group relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-400 px-4">
                  <Text
                    as="p"
                    variant={'p2'}
                    className="font-bold text-gray-400"
                  >
                    <small>{pricing[0]}</small>
                  </Text>

                  {/* shine box */}
                  <div className="z-5 group-hover:animate-shine absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-gray-300 opacity-40" />
                </div>
              )}
            </div>
            <div className="justify-center">
              <div className="my-8 flex items-center justify-between">
                <ToolCardLogo name={name} websiteUrl={website_url} />
              </div>
            </div>
            <Text as="p" variant={'p1'} className="mb-6 text-gray-400">
              {description}
            </Text>
          </div>

          <div className="justify-end">
            <div className="flex justify-start ">
              <Badge size="sm" variant={typeVariant as any}>
                {type}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default ToolCard;
