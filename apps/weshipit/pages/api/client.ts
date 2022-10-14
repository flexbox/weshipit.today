import { client as prismicClient } from './prismic';

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
