import isNil from 'lodash/isNil';
import { useRouter } from 'next/router';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { useUser } from '~/lib/useUser';
import { AIRTABLE_LINK } from '~/utils/airtable-links';
import { getChallengeName, getChallengeNumber } from '~/utils/getGitHubSlug';
import { ElaborationCompleted } from '~/components/Workshop/ElaborationCompleted';
import { ElaborationForm } from '~/components/Workshop/ElaborationForm';
import { useSWRChallengeStatus } from '~/components/Workshop/useSWRChallenge';

interface ChallengeStatusWithUserProps {
  email: string;
  routerQueryId: string;
  routerPath: string;
}

const ElaborationWithUser = ({
  email,
  routerQueryId,
  routerPath,
}: ChallengeStatusWithUserProps) => {
  const FORM_LINK = AIRTABLE_LINK.CHALLENGE_ELABORATION;
  const challengeName = getChallengeName(routerQueryId);
  const PARAM_NAME = `?prefill_Name=${challengeName}`;
  const challengeNumber = getChallengeNumber(routerQueryId);
  const PARAM_EXERCICE = `&prefill_Exercice=${challengeNumber}`;
  const PARAM_EMAIL = `&prefill_Email=${email}`;
  const FORM_ENDPOINT = `${FORM_LINK}${PARAM_NAME}${PARAM_EXERCICE}${PARAM_EMAIL}`;

  const { data, error } = useSWRChallengeStatus(
    email,
    challengeName,
    challengeNumber,
  );

  if (error) return <ErrorText description={error.message} />;
  if (!data) return <p>Loading…</p>;

  if (data.challenge.length >= 1) {
    return <ElaborationCompleted routerPath={routerPath} />;
  } else {
    return <ElaborationForm formEndpoint={FORM_ENDPOINT} />;
  }
};

export function ElaborationResult() {
  const user = useUser();
  const router = useRouter();
  const routerQueryId = router.query.id as string;
  const routerPath = router.asPath as string;

  if (isNil(user)) {
    return null;
  }
  if (isNil(router.query.id)) {
    return null;
  }

  return (
    <ElaborationWithUser
      email={user.email}
      routerQueryId={routerQueryId}
      routerPath={routerPath}
    />
  );
}
