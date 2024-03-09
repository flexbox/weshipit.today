import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: createHttpLink({
    credentials: 'same-origin',
    headers: {
      Authorization: process.env.STEPZEN_API_KEY || '',
    },
    uri: process.env.STEPZEN_API_AIRTABLE_URL,
  }),
  cache: new InMemoryCache(),
});

export default client;
