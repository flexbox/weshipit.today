import { client as prismicClient } from '../../prismic';

export async function getClients() {
  try {
    const clients = await prismicClient.getAllByType('client');
    console.log(clients);
    return {
      clients: clients ? clients : [],
    };
  } catch (error) {
    console.error('getClients -> error', error);
    return error;
  }
}
