import { client as prismicClient } from './prismic';

export interface Customer {
  id: string;
  data: {
    name: string;
    is_visible_homepage: boolean;
    logo: {
      url: string;
    };
    id: string;
  };
}

/**
 * We should rename the endpoint to /api/customers to avoid confusion with GraphQL clients.
 */
export async function getAllClients() {
  try {
    const clients = await prismicClient.getAllByType('client');

    return {
      clients: clients ? clients : [],
    };
  } catch (error) {
    console.error('getAllClients -> error', error);
    return error;
  }
}
