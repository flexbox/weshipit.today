import { Text } from '../text/text';

export interface ClientProps {
  id: string;
  data: {
    name: string;
    is_visible_homepage: boolean;
    logo: {
      url: string;
    };
    id: string;
  };
}

export interface ClientsListProps {
  clients: ClientProps[];
}

export function ClientsList({ clients }: ClientsListProps) {
  return (
    <ul className="grid gap-4">
      {clients.map((client) => (
        <li key={client.id}>
          <Text as="p" variant={'s2'}>
            {client.data.name}
          </Text>
        </li>
      ))}
    </ul>
  );
}
