import isNil from 'lodash/isNil';
import { useRouter } from 'next/router';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { useUser } from '~/lib/useUser';
import { allWorkshops } from '~/pages/api/workshop';
import { isCurriculumChallenge } from '~/utils/formatWorshopToDone';
import { getChallengeName, getChallengeNumber } from '~/utils/getGitHubSlug';
import { ElaborationCompleted } from '~/components/Workshop/ElaborationCompleted';
import { ElaborationForm } from '~/components/Workshop/ElaborationForm';
import { useSWRChallengeStatus } from '~/components/Workshop/useSWRChallenge';

interface ChallengeStatusWithUserProps {
  email: string;
  routerPath: string;
  routerQueryId: string;
}

const ElaborationWithUser = ({
  email,
  routerPath,
  routerQueryId,
}: ChallengeStatusWithUserProps) => {
  const challengeName = getChallengeName(routerQueryId);
  const challengeNumber = Number(getChallengeNumber(routerQueryId));

  const { error, isDone, isLoading } = useSWRChallengeStatus(
    email,
    challengeName,
    challengeNumber,
  );

  if (!isCurriculumChallenge(allWorkshops, challengeName, challengeNumber)) {
    return null;
  }
  if (error) return <ErrorText description={error.message} />;
  if (isLoading) return <p>Loading…</p>;

  if (isDone) {
    return <ElaborationCompleted routerPath={routerPath} />;
  }

  return (
    <ElaborationForm
      email={email}
      module={challengeName}
      exercise={challengeNumber}
    />
  );
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
