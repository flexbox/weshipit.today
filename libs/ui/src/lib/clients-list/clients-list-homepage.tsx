import { ClientProps } from './clients-list';
import { Text } from '../text/text';
import Image from 'next/image';
import LinkButton from '../button/link-button';

export interface ClientsListHomepageProps {
  clients: ClientProps[];
}

export function ClientsListHomepage({ clients }: ClientsListHomepageProps) {
  return (
    <div className="my-12">
      <div className="group relative grid grid-cols-3 content-around gap-4 md:grid-cols-5">
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
          <LinkButton
            href="/customers"
            className="z-20"
            variant="outline"
            size="xl"
          >
            Meet our customers
          </LinkButton>
        </div>

        {clients.map(
          (client: ClientProps) =>
            client.data.is_visible_homepage && (
              <div
                className="flex flex-col items-center justify-center gap-4 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 group-hover:blur-sm"
                key={client.id}
              >
                <Image
                  src={client.data.logo?.url || ''}
                  alt={`${client.data.name} logo`}
                  width={250}
                  height={250}
                  className="size-32 transition duration-300 ease-in-out dark:rounded-xl dark:bg-white/90 dark:p-2"
                />
                <Text as="p" variant="p2">
                  {client.data.industry}
                </Text>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ClientsListHomepage;
