import isNil from 'lodash/isNil';
import { useRouter } from 'next/router';
import {
  StatusItem,
  StatusItemHomepage,
} from '~/components/Workshop/StatusItem';
import { useSWRChallengeStatus } from '~/components/Workshop/useSWRChallenge';
import { useUser } from '~/lib/useUser';
import {
  getChallengeName,
  getChallengeNumber,
  getLastChallengeName,
} from '~/utils/getGitHubSlug';

interface ChallengeStatusWithUserProps {
  email: string;
  routerQueryId: string;
  isHomepage?: boolean;
}

const ChallengeStatusWithUser = ({
  email,
  routerQueryId,
  isHomepage,
}: ChallengeStatusWithUserProps) => {
  const challengeName = getChallengeName(routerQueryId);
  const challengeNumber = getChallengeNumber(routerQueryId);

  let item = { status: 'Status: TODO', statusType: 'todo' };

  const { data, error, isLoading } = useSWRChallengeStatus(
    email,
    challengeName,
    challengeNumber,
  );

  if (error || isLoading) return null;
  if (!data)
    return (
      <div className="flex items-baseline justify-between">
        <StatusItem item={item} />
      </div>
    );

  if (data.challenge.length === 1) {
    item = { status: 'Status: DONE', statusType: 'done' };
  }

  return isHomepage ? (
    challengeName !== 'setup' && (
      <div>
        <StatusItemHomepage item={item} />
      </div>
    )
  ) : (
    <div className="flex items-baseline justify-between">
      <StatusItem item={item} />
    </div>
  );
};

export function ChallengeStatus() {
  const user = useUser();
  const router = useRouter();

  if (isNil(user) || isNil(router.query.id)) {
    return null;
  }

  return (
    <ChallengeStatusWithUser
      email={user.email}
      routerQueryId={router.query.id as string}
    />
  );
}

export const ListChallengeStatus = ({ linkHref }: { linkHref: string }) => {
  const user = useUser();

  if (isNil(user)) {
    return null;
  }

  const challengeNamePop = getLastChallengeName(linkHref);

  if (!challengeNamePop) {
    return null;
  }
  return (
    <ChallengeStatusWithUser
      email={user?.email}
      routerQueryId={challengeNamePop}
      isHomepage
    />
  );
};
