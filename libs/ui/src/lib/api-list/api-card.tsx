import { ApiProps } from './api-list.d';
import { Card, Text } from '@weshipit/ui';

export function ApiCard({ fields }: ApiProps) {
  const { pricing, type, name, description } = fields;

  if (!name) {
    return null;
  }

  return (
    <Card>
      {pricing && (
        <div className="mb-6 flex justify-start">
          <div className="rounded-2xl border-2 border-dashed border-gray-400 px-4">
            <Text variant="p2" style="font-bold" color="text-gray-400">
              <small>{pricing[0]}</small>
            </Text>
          </div>
        </div>
      )}

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
