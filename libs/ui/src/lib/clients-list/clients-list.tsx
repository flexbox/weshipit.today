import { clientsListProps } from './clients-list.d';
import { Text } from '@weshipit/ui';

export function ClientsList({ clients }: clientsListProps) {
  return (
    <div>
      {clients.map((client) => (
        <div key={client.id} className="flex items-center">
          {client.data.logo && (
            <div
              style={{ backgroundImage: `url(${client.data.logo.url})` }}
              className="opacity-80 hover:opacity-100 w-24 h-24 object-center object-cover bg-center bg-no-repeat bg-cover"
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
