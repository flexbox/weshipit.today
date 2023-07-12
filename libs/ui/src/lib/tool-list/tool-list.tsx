import { ToolListProps } from './record-types';
import { ToolCard } from './tool-card';

export function ToolList({ records }: ToolListProps) {
  if (records.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-xl text-gray-500">No tools found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {records.map((record, index) => (
        <ToolCard fields={record.fields} key={`api-list-${index}`} />
      ))}
    </div>
  );
}
