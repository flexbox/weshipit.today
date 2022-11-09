import { ApiProps } from './api-list.d';
import { Card, Text } from '@weshipit/ui';

export function ApiCard({ fields }: ApiProps) {
  const { pricing, type, name } = fields;

  return (
    <Card>
      <div className="my-8 flex justify-start px-12">
        <div className="border-2 border-dashed border-gray-400 p-4">
          <Text variant="p1" style="font-bold">
            {pricing}
          </Text>
        </div>
      </div>

      <div className="rounded-b-lg p-12">
        <div className="mb-2 p-2">
          <Text variant="s2" style="font-semibold">
            {name}
          </Text>
        </div>

        <div className="rounded-md bg-indigo-700 py-3 md:px-6 ">
          <Text
            variant="p2"
            style="text-base font-medium md:text-lg"
            color="text-white"
          >
            {type}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default ApiCard;
