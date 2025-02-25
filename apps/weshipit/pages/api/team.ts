import { people } from '../../fixtures/people.fixture';

interface People {
  fields: {
    status: string; // 'free' | 'busy'
    type: string | null;
    name?: string | null;
  };
}

export async function fetchTeam(): Promise<People[]> {
  const records = people.records;

  const team = records.filter((record) => record.fields.type === 'team');

  const teamSpotsLeft = team.filter(
    (record) => record.fields.status === 'free'
  );

  return teamSpotsLeft;
}
