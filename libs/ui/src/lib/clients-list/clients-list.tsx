import Image from 'next/image';
import { Card } from '../card/card';
import { Text } from '../text/text';
import { Url } from 'next/dist/shared/lib/router/router';
import LinkButton from '../button/link-button';

export interface ClientProps {
  id: string;
  data: {
    id: string;
    name: string;
    industry?: string;
    is_visible_homepage: boolean;
    is_audit: boolean;
    logo?: {
      url: string;
    };
  };
}

export interface ClientsListProps {
  clients: ClientProps[];
  hrefOnboarding: Url;
}

export function ClientsList({ clients, hrefOnboarding }: ClientsListProps) {
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
      <Card size="sm">
        <div className="flex flex-col items-center h-full justify-center text-center gap-3">
          <Text as="p" variant="p2" className="opacity-40">
            is your company missing?
          </Text>
          <LinkButton
            href={hrefOnboarding}
            size="xl"
            variant="primary"
            isExternalLink
            withExternalLinkIcon
          >
            Add your logo today
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
