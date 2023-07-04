import { ClientsListProps } from './clients-list.d';
import { Text } from '../text/text';

export function ClientsList({ clients }: ClientsListProps) {
  return (
    <div className="grid gap-4 pb-24">
      {clients.map((client) => (
        <div key={client.id}>
          <Text variant="p" textStyle={'s2'}>
            {client.data.name}
          </Text>
        </div>
      ))}
    </div>
  );
}
