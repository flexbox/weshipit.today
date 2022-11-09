import { apiListProps } from './api-list.d';

export function ApiList({ apis }: apiListProps) {
  return (
    <div>
      {apis.map((api) => (
        <>
          <div key={api.name} className="flex items-center">
            {api.name}
          </div>
          <div className="flex items-center">{api.website}</div>
          <div className="flex items-center">{api.description}</div>
          <div className="flex items-center">{api.features}</div>
          <div className="flex items-center">{api.pricing}</div>
          <div className="flex items-center">{api.type}</div>
        </>
      ))}
    </div>
  );
}
