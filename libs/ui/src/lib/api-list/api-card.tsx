import { apiProps } from './api-list.d';
import { Button, Text } from '@weshipit/ui';

export interface ApiCardProps {
  apis: apiProps[];
}

export function ApiCard(data: ApiCardProps) {
  return (
    <div className="m-12 rounded-lg border-2 border-white bg-slate-100 hover:border-black">
      <div className="h-1/2 pb-12 text-center font-bold">
        <div className="my-8 flex justify-start px-12 ">
          <Text variant="s2">
            <div className="border-2 border-dashed border-gray-500 p-4 text-gray-500">
              {data.apis[0].pricing}
            </div>
          </Text>
        </div>
        {data.apis[0].logo?.url && (
          <div
            style={{ backgroundImage: `url(${data.apis[0].logo.url})` }}
            className=" m-auto h-32 w-32 rounded-lg bg-cover bg-center bg-no-repeat object-cover object-center opacity-80 hover:opacity-100"
          />
        )}
      </div>
      <div className="flex h-1/2 flex-col rounded-b-lg  bg-gray-400 p-12">
        <div className="mb-2  p-2 font-semibold ">
          {' '}
          <Text variant={'s2'}>{data.apis[0].name}</Text>
        </div>
        <div className="w-min rounded-3xl  ">
          {' '}
          <Button href={'www.google.com'}>{data.apis[0].type}</Button>
        </div>
      </div>
    </div>
  );
}

export default ApiCard;
