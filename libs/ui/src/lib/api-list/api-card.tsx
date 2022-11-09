import { apiProps } from './api-list.d';
import { Text } from '@weshipit/ui';

export interface ApiCardProps {
  apis: apiProps[];
}

export function ApiCard(data: ApiCardProps) {
  return (
    <div className="m-12 rounded-lg bg-slate-100">
      <div className="h-1/2 pb-12 text-center font-bold">
        <div className="flex justify-start px-12 py-4 ">
          <Text variant="h3">return</Text>
        </div>
        {data.apis[0].logo?.url && (
          <div
            style={{ backgroundImage: `url(${data.apis[0].logo.url})` }}
            className=" m-auto h-24 w-24 bg-cover bg-center bg-no-repeat object-cover object-center opacity-80 hover:opacity-100"
          />
        )}
      </div>
      <div className="flex h-1/2 flex-col rounded-b-lg  bg-gray-400 p-12">
        <div className="mb-2  p-2">
          {' '}
          <Text variant={'s2'}>Test</Text>
        </div>
        <div className="w-36 rounded-3xl bg-slate-200 p-2 pl-4 ">
          {' '}
          <Text variant={'s2'}>Test</Text>
        </div>
      </div>
    </div>
  );
}

export default ApiCard;
