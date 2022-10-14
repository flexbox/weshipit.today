import { clientProps } from './clients-list';

export interface ClientsListHomepageProps {
  clients: clientProps[];
}

export function ClientsListHomepage(props: ClientsListHomepageProps) {
  return <h1>Welcome to ClientsListHomepage!</h1>;
}

export default ClientsListHomepage;
