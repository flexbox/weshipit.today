import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    credentials: 'same-origin',
    headers: {
      Authorization: process.env.STEPZEN_API_KEY || '',
    },
    uri: process.env.STEPZEN_API_AIRTABLE_URL,
  }),
});

export default client;
