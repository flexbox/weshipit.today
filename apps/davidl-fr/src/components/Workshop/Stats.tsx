import isNil from 'lodash/isNil';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { formatStats } from '~/components/Workshop/formatStats';
import { StatsItems } from '~/components/Workshop/StatsItems';
import { StatsSkeleton } from '~/components/Workshop/StatsSkeleton';
import { useSWRChallengesList } from '~/components/Workshop/useSWRChallenge';
import { useUser } from '~/lib/useUser';
import { AirtableRecord } from '~/types/workshop';

interface ChallengesData {
  challenge: AirtableRecord[];
}

const StatsWithUser = ({ email }: { email: string }) => {
  const { data, error } = useSWRChallengesList(email);

  if (error)
    return (
      <div className="-mt-8 mr-2">
        <ErrorText />
      </div>
    );
  if (!data) return <StatsSkeleton />;

  const { challenge } = data as ChallengesData;

  if (challenge[0] === undefined) return null;

  const workshopsDone = challenge.length;

  if (workshopsDone === 0) {
    return null;
  }

  const stats = formatStats(workshopsDone);

  return <StatsItems stats={stats} />;
};

export default function Stats() {
  const user = useUser();

  if (isNil(user)) {
    return null;
  }

  return <StatsWithUser email={user.email} />;
}
