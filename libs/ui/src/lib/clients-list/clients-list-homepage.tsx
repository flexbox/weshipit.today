import Image from 'next/image';
import { ClientProps } from './clients-list.d';

export interface ClientsListHomepageProps {
  clients: ClientProps[];
}

export function ClientsListHomepage(data: ClientsListHomepageProps) {
  return (
    <div className="my-12 grid grid-cols-3 content-around gap-4 md:grid-cols-5">
      {data.clients.map(
        (client: ClientProps) =>
          client.data.is_visible_homepage && (
            <div className="flex justify-center" key={client.id}>
              <Image
                src={client.data.logo.url}
                alt={`logo of ${client.data.name} client of weshipit.today`}
                width={250}
                height={250}
                className="h-32 w-32 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
              />
            </div>
          )
      )}
    </div>
  );
}

export default ClientsListHomepage;
