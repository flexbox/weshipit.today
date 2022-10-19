import { clientProps } from './clients-list.d';

export interface ClientsListHomepageProps {
  clients: clientProps[];
}

export function ClientsListHomepage(data: ClientsListHomepageProps) {
  return (
    <div className="m-auto flex w-2/3 justify-between py-16">
      {data.clients.map(
        (client: clientProps) =>
          client.data.is_visible_homepage && (
            <div key={client.id} className="text-center">
              {client.data.logo && (
                <img
                  src={client.data.logo.url}
                  alt={`${client.data.name} logo client of weshipit.today`}
                  className="opacity-80 hover:opacity-100"
                />
              )}
            </div>
          )
      )}
    </div>
  );
}

export default ClientsListHomepage;
