import { ApiProps } from './api-list.d';
import { Card, Text } from '@weshipit/ui';
import Image from 'next/image';
import truncate from 'lodash/truncate';

export function ApiCard({ fields }: ApiProps) {
  const { pricing, type, name, logo } = fields;

  if (!name) {
    return null;
  }

  const description = truncate(fields.description, {
    length: 160,
    separator: '...',
  });

  return (
    <Card>
      <div className="mb-6 flex justify-start">
        {pricing && (
          <div className="rounded-2xl border-2 border-dashed border-gray-400 px-4">
            <Text variant="p2" style="font-bold" color="text-gray-400">
              <small>{pricing[0]}</small>
            </Text>
          </div>
        )}
      </div>

      <div className="my-6 flex justify-center">
        {logo && (
          <Image
            src={logo[0].url}
            alt={`Logo of ${name} compatible with React Native`}
            width={250}
            height={100}
          />
        )}
      </div>

      <Text variant="s2" style="font-semibold mb-2 text-center">
        {name}
      </Text>

      <Text variant="p1" style="mb-6" color="text-gray-400">
        {description}
      </Text>

      <div className="flex justify-start">
        <div className="rounded-3xl bg-cyan-400 px-4 py-0.5">
          <Text variant="p2" color="text-cyan-100">
            <small>{type}</small>
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default ApiCard;
