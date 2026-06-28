import isNil from 'lodash/isNil';
import { useUser } from '~/lib/useUser';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { CertificationBox } from '~/components/Workshop/CertificationBox';
import { useSWRChallengesList } from '~/components/Workshop/useSWRChallenge';

/**
 * @deprecated
 */
const CertificationLinkUser = ({ email }: { email: string }) => {
  const { data, error } = useSWRChallengesList(email);

  if (error) return <ErrorText description={error.message} />;
  if (!data) return <p>Loading…</p>;

  const workshopsDone = data.challenge.length;

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
