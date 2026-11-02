import { clients, Customer } from '../../content/clients';

export type { Customer };

/**
 * We should rename the endpoint to /api/customers to avoid confusion with GraphQL clients.
 */
export async function getAllClients() {
  return { clients };
}

export async function getVisibleClients({
  visibleOnHomepage = true,
}: { visibleOnHomepage?: boolean } = {}) {
  return {
    clients: clients.filter(
      (client) => client.data.is_visible_homepage === visibleOnHomepage,
    ),
  };
}
