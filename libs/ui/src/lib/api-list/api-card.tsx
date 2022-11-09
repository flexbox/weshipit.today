import { ApiProps } from './api-list.d';
import { Card, Text } from '@weshipit/ui';

export function ApiCard({ fields }: ApiProps) {
  const { pricing, type, name } = fields;
  console.log('file: api-card.tsx ~ line 6 ~ ApiCard ~ fields', fields);

  if (!name) {
    return null;
  }

  return (
    <Card>
      {pricing && (
        <div className="my-8 flex justify-start px-12">
          <div className="rounded-lg border-2 border-dashed border-gray-400 p-2">
            <Text variant="p1" style="font-bold">
              {pricing}
            </Text>
          </div>
        </div>
      )}

      <div className="rounded-b-lg p-12">
        <div className="mb-2 p-2">
          <Text variant="s2" style="font-semibold">
            {name}
          </Text>
        </div>

        <div className="rounded-md bg-indigo-700 px-1 py-2">
          <Text variant="p2" color="text-white">
            {type}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default ApiCard;
