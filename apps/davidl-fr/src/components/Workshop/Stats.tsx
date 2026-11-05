import isNil from 'lodash/isNil';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { formatStats } from '~/components/Workshop/formatStats';
import { StatsItems } from '~/components/Workshop/StatsItems';
import { StatsSkeleton } from '~/components/Workshop/StatsSkeleton';
import { useSWRChallengesList } from '~/components/Workshop/useSWRChallenge';
import { useUser } from '~/lib/useUser';
import { allWorkshops } from '~/pages/api/workshop';
import { countDoneChallenges } from '~/utils/formatWorshopToDone';

const StatsWithUser = ({ email }: { email: string }) => {
  const { challenges, error } = useSWRChallengesList(email);

  if (error)
    return (
      <div className="-mt-8 mr-2 max-w-xs">
        <ErrorText />
      </div>
    );
  if (!challenges) return <StatsSkeleton />;

  const workshopsDone = countDoneChallenges(allWorkshops, challenges);

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
