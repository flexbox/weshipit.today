import { apiProps, fields } from './api-list.d';
import { Button, Card, Text } from '@weshipit/ui';

export interface ApiCardProps {
  fields: fields;
}

export function ApiCard({ fields }: ApiCardProps) {
  const { pricing, type, name } = fields;

  return (
    <Card>
      <div className=" pb-12 text-center font-bold ">
        <div className="my-8 flex justify-start px-12 ">
          <Text variant="s2">
            <div className="border-2 border-dashed border-gray-500 p-4 text-gray-500">
              {pricing}
            </div>
          </Text>
        </div>
      </div>
      <div className="flex flex-col rounded-b-lg  bg-gray-400 p-12">
        <div className="mb-2  p-2 font-semibold ">
          {' '}
          <Text variant={'s2'}>{name}</Text>
        </div>
        <div className="w-min rounded-3xl  ">
          {' '}
          <div className=" flex  items-center justify-between rounded-md bg-indigo-600 py-3 text-base font-medium text-white shadow-md md:px-6 md:text-lg">
            {type}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ApiCard;
