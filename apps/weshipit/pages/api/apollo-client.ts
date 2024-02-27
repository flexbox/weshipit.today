import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.STEPZEN_API_AIRTABLE_URL,
  cache: new InMemoryCache(),
});

export default client;
