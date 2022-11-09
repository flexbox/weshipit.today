import { apiListProps } from './api-list.d';
import { Text } from '@weshipit/ui';

export function ApiList({ apis }: apiListProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {apis.map((api) => (
        <div className=" divide-y rounded-lg bg-slate-100 p-12">
          <div key={api.name} className="pb-12 text-center font-bold">
            <Text variant={'s2'}>{api.name}</Text>
          </div>
          {api.website && (
            <div className="pb-4 ">
              Website -{' '}
              <a
                href={api.website}
                className="text-sm font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
              >
                {api.website}
              </a>
            </div>
          )}
          {api.description && (
            <div className="pb-4 leading-6">{api.description}</div>
          )}
          {api.features && (
            <div className="pb-4">
              <div className="pb-2 font-semibold">Features</div>
              {api.features}
            </div>
          )}
          {api.type && (
            <div className="flex pb-2">
              <div className="pb-2 font-semibold">Type : </div> {api.type}
            </div>
          )}

          {api.pricing && (
            <div className="">
              <div className="pb-2 font-semibold">Pricing</div>
              {api.pricing}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
