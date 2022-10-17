import { Text } from '@weshipit/ui';
import { clientsListProps } from './clients-list.d';

export function ClientsList({ clients }: clientsListProps) {
  return (
    <div className="flex w-3/4 justify-between">
      {clients.map((client) => (
        <div key={client.id} className="text-center">
          <Text variant="s2">{client.data.name}</Text>
          {client.data.logo && (
            <img
              src={client.data.logo.url}
              alt={`${client.data.name} logo client of weshipit.today`}
              className="opacity-80 hover:opacity-100"
            />
          )}
        </div>
      ))}
    </div>
  );
}
