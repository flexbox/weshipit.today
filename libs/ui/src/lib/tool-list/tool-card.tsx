import { RecordProps } from './record-types';
import { Badge } from '../badge/badge';
import { Card } from '../card/card';
import { Text } from '../text/text';

import truncate from 'lodash/truncate';
import Link from 'next/link';
import { ToolCardLogo } from './tool-card-logo';
import { getVariantFromType } from './get-variant-from-type';

export function ToolCard({ fields, id }: RecordProps) {
  const { name, pricing, slug, type, website_url } = fields;

  if (!name) {
    return null;
  }

  const description = truncate(fields.description, {
    length: 160,
    separator: '…',
  });

  const variantType = getVariantFromType(type);

  return (
    <Card variant="link">
      <Link
        href={{
          pathname: '/react-native-tools/[slug]',
          query: { id, slug },
        }}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="justify-start">
            <div className="flex items-center justify-between">
              <Text as="h3" variant="s2" className="font-semibold">
                {name}
              </Text>
              {pricing && (
                <div className="group relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-400 px-4">
                  <Text
                    as="p"
                    variant="p2"
                    className="font-bold text-slate-400"
                  >
                    <small>{pricing[0]}</small>
                  </Text>

                  {/* shine box */}
                  <div className="z-5 group-hover:animate-shine absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-slate-300 opacity-40" />
                </div>
              )}
            </div>

            <div className="my-4">
              <ToolCardLogo name={name} websiteUrl={website_url} />
            </div>

            <Text as="p" variant="p1" className="mb-6 text-slate-400">
              {description}
            </Text>
          </div>

          <div className="flex justify-start">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Badge size="sm" variant={variantType as any}>
              {type}
            </Badge>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default ToolCard;
