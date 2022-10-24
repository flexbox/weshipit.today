import { Text } from '@weshipit/ui';
import { clientsListProps } from './clients-list.d';

export function ClientsList({ clients }: clientsListProps) {
  return (
    <div className=" grid grid-cols-4 justify-between">
      {clients.map((client) => (
        <div key={client.id} className="m-auto w-2/3 pb-32 text-center">
          <Text variant="s2">{client.data.name}</Text>
          {client.data.logo && (
            <img
              src={client.data.logo.url}
              alt={`${client.data.name} logo client of weshipit.today`}
              className="opacity-80 grayscale hover:opacity-100 hover:grayscale-0"
            />
          )}
        </div>
      ))}
    </div>
  );
}
