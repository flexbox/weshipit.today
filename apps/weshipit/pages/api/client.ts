import * as prismic from '@prismicio/client';
import { client as prismicClient } from './prismic';

export interface Customer {
  id: string;
  data: {
    name: string;
    industry?: string;
    is_visible_homepage: boolean;
    logo?: {
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

export async function getVisibleClients() {
  try {
    const { results } = await prismicClient.get({
      filters: [
        prismic.filter.at('document.type', 'client'),
        prismic.filter.at('my.client.is_visible_homepage', true),
      ],
    });

    return {
      clients: results ? results : [],
    };
  } catch (error) {
    console.error('❌ getVisibleClients -> error', error);
    return error;
  }
}
