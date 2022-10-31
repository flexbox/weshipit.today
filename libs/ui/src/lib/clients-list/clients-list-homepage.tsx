import { clientProps } from './clients-list.d';
import { Text } from '@weshipit/ui';

export interface ClientsListHomepageProps {
  clients: clientProps[];
}

export function ClientsListHomepage(data: ClientsListHomepageProps) {
  return (
    <div className="flex w-full justify-between py-16">
      {data.clients.map(
        (client: clientProps) =>
          client.data.is_visible_homepage && (
            <div key={client.id}>
              <img
                src={client.data.logo.url}
                alt={`${client.data.name} logo client of weshipit.today`}
                className="h-32 w-32 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
              />
            </div>
          )
      )}
    </div>
  );
}

export default ClientsListHomepage;
