import { clients, Customer } from '../content/clients';

export type { Customer };

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
