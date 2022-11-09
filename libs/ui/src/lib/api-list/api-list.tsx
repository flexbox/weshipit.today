import { apiListProps } from './api-list.d';
import { Card, Text } from '@weshipit/ui';
import ApiCard from 'libs/ui/src/lib/api-list/api-card';

export function ApiList({ apis }: apiListProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {apis.map((api) => (
        <ApiCard fields={api.fields} />
      ))}
    </div>
  );
}
