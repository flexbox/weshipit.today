import { clientProps } from './clients-list.d';

export interface ClientsListHomepageProps {
  clients: clientProps[];
}

export function ClientsListHomepage(data: ClientsListHomepageProps) {
  return (
    <div className="flex w-3/4 justify-between">
      {data.clients.map((client: clientProps) => (
        <div key={client.id} className="text-center">
          {client.data.logo && (
            <img
              src={client.data.logo.url}
              alt={`${client.data.name} logo client of weshipit.today`}
              className="opacity-80 hover:opacity-100"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ClientsListHomepage;
