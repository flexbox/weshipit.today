import { gql } from '@apollo/client';
import client from './apollo-client';

interface People {
  fields: {
    status: string; // 'free' | 'busy'
    type: string;
    name?: string;
  };
}

export async function fetchTeam(): Promise<People[]> {
  const { data } = await client.query({
    query: gql`
      query getPeopleRecords {
        getPeopleRecords {
          fields {
            status
            type
          }
        }
      }
    `,
  });
  const records: People[] = data.getPeopleRecords;
  const team = records.filter((record) => record.fields.type.includes('team'));
  const teamSpotsLeft = team.filter((record) =>
    record.fields.status.includes('free')
  );

  return teamSpotsLeft;
}
