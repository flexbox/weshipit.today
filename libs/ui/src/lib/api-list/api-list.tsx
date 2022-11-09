import { apiListProps } from './api-list.d';
import { Card, Text, ApiCard } from '@weshipit/ui';

export function ApiList({ apis }: apiListProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {apis.map((api) => (
        <ApiCard fields={api.fields} key={api.fields.fields} />
      ))}
    </div>
  );
}
