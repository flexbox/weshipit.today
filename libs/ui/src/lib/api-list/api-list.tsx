import { apiListProps } from './api-list.d';
import { Card, Text, ApiCard } from '@weshipit/ui';

export function ApiList({ apis }: apiListProps) {
  console.log('🚀 ~ file: api-list.tsx ~ line 6 ~ ApiList ~ apis', apis);
  return (
    <div className="grid grid-cols-3 gap-3">
      {apis.map((api) => (
        <ApiCard fields={api.fields} key={api.fields.fields} />
      ))}
    </div>
  );
}
