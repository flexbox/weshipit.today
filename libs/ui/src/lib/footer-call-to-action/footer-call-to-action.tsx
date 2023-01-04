import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import client from 'apps/weshipit/pages/api/apollo-client';
import gql from 'graphql-tag';
import { useState } from 'react';

const SUBSCRIBE_MUTATION = gql`
  mutation SubscribeToAirtableByEmail(
    $email: String!
    $baseId: String!
    $tableName: String!
  ) {
    subscribeToAirtableByEmail(
      email: $email
      baseId: $baseId
      tableName: $tableName
    ) {
      success
      message
    }
  }
`;

/* eslint-disable-next-line */
export interface FooterCallToActionProps {}

function SubscribeForm() {
  const [subscribe, { data, loading, error }] = useMutation(SUBSCRIBE_MUTATION);
  const [email, setEmail] = useState('');

  const baseId = process.env['AIRTABLE_BASE_ID_REACT_NATIVE'];
  const tableName = 'People';

  const handleSubmit = (event) => {
    event.preventDefault();
    subscribe({ variables: { email, baseId, tableName } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button type="submit">Subscribe</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && <p>Subscribed!</p>}
    </form>
  );
}

export function FooterCallToAction(props: FooterCallToActionProps) {
  return (
    <div className="bg-white">
      <ApolloProvider client={client}>
        <SubscribeForm />
      </ApolloProvider>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="inline text-3xl font-bold tracking-tight text-gray-900 sm:block sm:text-4xl">
          Get our latest updates
        </h2>
        <p className="inline text-3xl font-bold tracking-tight text-indigo-600 sm:block sm:text-4xl">
          before everyone else 😉
        </p>
        <form className="mt-8 sm:flex">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="focus border-2:border-indigo-500 w-full rounded-md border-2 border-gray-300 px-5 py-3 placeholder:text-gray-500 focus:ring-indigo-500 sm:max-w-xs"
            placeholder="Enter your email"
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:shrink-0">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Notify me
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FooterCallToAction;
