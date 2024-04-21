import Image from 'next/image';
import { Card } from '../card/card';
import { Text } from '../text/text';

export interface ClientProps {
  id: string;
  data: {
    name: string;
    is_visible_homepage: boolean;
    logo?: {
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
    <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
      {clients.map((client) => (
        <Card
          size="sm"
          key={client.id}
          className="flex items-center justify-center text-center"
        >
          {client.data.logo?.url ? (
            <Image
              src={client.data.logo.url}
              alt={client.data.name}
              width={120}
              height={80}
            />
          ) : (
            <Text as="p" variant="s2">
              {client.data.name}
            </Text>
          )}
        </Card>
      ))}
    </div>
  );
}
