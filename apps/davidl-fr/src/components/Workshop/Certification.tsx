import isNil from 'lodash/isNil';
import { useUser } from '~/lib/useUser';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { CertificationBox } from '~/components/Workshop/CertificationBox';
import { useSWRChallengesList } from '~/components/Workshop/useSWRChallenge';
import { allWorkshops } from '~/pages/api/workshop';
import { countDoneChallenges } from '~/utils/formatWorshopToDone';

/**
 * @deprecated
 */
const CertificationLinkUser = ({ email }: { email: string }) => {
  const { challenges, error } = useSWRChallengesList(email);

  if (error) return <ErrorText description={error.message} />;
  if (!challenges) return <p>Loading your progress…</p>;

  const workshopsDone = countDoneChallenges(allWorkshops, challenges);

  return <CertificationBox workshopsDone={workshopsDone} />;
};

/**
 * @deprecated
 */
export function Certification() {
  const user = useUser();

  if (isNil(user)) {
    return null;
  }

  return <CertificationLinkUser email={user.email} />;
}
