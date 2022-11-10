import { ClientsListProps } from './clients-list.d';
import { Text } from '@weshipit/ui';

export function ClientsList({ clients }: ClientsListProps) {
  return (
    <div>
      {clients.map((client) => (
        <div key={client.id} className="flex items-center">
          {client.data.logo && (
            <div
              style={{ backgroundImage: `url(${client.data.logo.url})` }}
              className="h-24 w-24 bg-cover bg-center bg-no-repeat object-cover object-center opacity-80 hover:opacity-100"
            />
          )}
          <Text variant="s2" style="ml-4">
            {client.data.name}
          </Text>
        </div>
      ))}
    </div>
  );
}
