import { ToolListProps } from './record-types';
import { ApiCard } from './api-card';

export function ApiList({ records }: ToolListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((record, index) => (
        <ApiCard fields={record.fields} key={`api-list-${index}`} />
      ))}
    </div>
  );
}
