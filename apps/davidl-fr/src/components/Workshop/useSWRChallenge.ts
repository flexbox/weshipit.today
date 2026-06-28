import useSWR from 'swr';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { RequestDocument, Variables, request } from 'graphql-request';

// https://vercel.com/docs/projects/environment-variables/system-environment-variables#using-prefixed-framework-environment-variables-locally
const BASEQL_API_URL =
  process.env.NEXT_PUBLIC_BASEQL_API_URL || 'https://your-api-url.com/graphql';

function fetcher(
  query: RequestDocument | TypedDocumentNode<unknown, Variables>,
) {
  return request(BASEQL_API_URL, query);
}

export function useSWRChallengeStatus(
  email: string,
  challengeName: string,
  challengeNumber: string | undefined,
) {
  const { data, error } = useSWR(
    `
    {
      challenge(_filter: {
          _and: [
            {email: {_eq: "${email}"}},
            {name: {_eq: "${challengeName}"}},
            {exercice: {_eq: "${challengeNumber}"}}
          ]
        },
      ) {
        name
        exercice
        date
      }
    }
    `,
    fetcher,
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}

export function useSWRChallengesList(email: string | undefined) {
  const { data, error } = useSWR(
    `
    {
      challenge(
        _order_by: {date: "desc"},
        _filter: {email: {_eq: "${email}"}},
      ) {
        name
        exercice
        date
      }
    }
    `,
    fetcher,
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}

export function useSWRAlumnis() {
  const { data, error } = useSWR(
    `
    {
      bootcampOnboarding {
        email
        fullName
      }
    }
    `,
    fetcher,
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
