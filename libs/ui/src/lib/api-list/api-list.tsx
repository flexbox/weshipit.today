import { apiListProps } from './api-list.d';
import { ApiCard } from '@weshipit/ui';

export function ApiList({ apis }: apiListProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {apis.map((api) => (
        <ApiCard fields={api.fields} key={api.fields.fields} />
      ))}
    </div>
  );
}
