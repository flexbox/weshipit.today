import { Hyperlink } from '../hyperlink/hyperlink';
import { ToolListProps } from './record-types';
import { ToolCard } from './tool-card';

export function ToolList({ records }: ToolListProps) {
  if (records.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-xl text-slate-500">No tools found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((record, index) => (
          <ToolCard fields={record.fields} key={`api-list-${index}`} />
        ))}
      </div>
      <div className="py-6">
        <Hyperlink
          href="https://clearbit.com/logo"
          isExternal={true}
          className="text-sm text-slate-400"
        >
          Logos provided by Clearbit
        </Hyperlink>
      </div>
    </>
  );
}
