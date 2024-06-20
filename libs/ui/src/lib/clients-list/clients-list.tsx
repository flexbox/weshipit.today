import Image from 'next/image';
import { Card } from '../card/card';
import { Text } from '../text/text';

export interface ClientProps {
  id: string;
  data: {
    name: string;
    industry?: string;
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
          className="flex flex-col items-center justify-between text-center"
        >
          {client.data.logo?.url ? (
            <Image
              src={client.data.logo.url}
              alt={client.data.name}
              width={120}
              height={80}
            />
          ) : (
            <Text as="p" variant="s2" className="pt-8">
              {client.data.name}
            </Text>
          )}
          <Text as="p" variant="p2" className="opacity-40">
            {client.data.industry}
          </Text>
        </Card>
      ))}
    </div>
  );
}
