import { ApiListProps } from './api-list.d';
import { ApiCard } from '@weshipit/ui';

export function ApiList({ apis }: ApiListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {apis.map((api) => (
        <ApiCard fields={api.fields} key={api.id} />
      ))}
    </div>
  );
}
