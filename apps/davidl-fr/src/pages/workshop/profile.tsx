import { useContext } from 'react';
import Router from 'next/router';
import Layout from '~/components/Workshop/Layout';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { useUser } from '~/lib/useUser';
import { magic } from '~/lib/magic';
import { UserContext } from '~/lib/UserContext';
import { humanReadableDate } from '~/utils/date';
import { Rarr } from '~/components/Typography';
import PrimaryButton from '~/components/Button/PrimaryButton';
import Link from 'next/link';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { useSWRChallengesList } from '~/components/Workshop/useSWRChallenge';

interface Challenge {
  date: Date;
  exercice: string;
  name: string;
}

interface Data {
  challenge: Challenge[];
}

const LearningPathWithUser = ({ email }: { email: string }) => {
  const { data, error } = useSWRChallengesList(email);

  if (error) return <ErrorText description={error.message} />;
  if (!data) return <p>Loading…</p>;

  if (data.challenge[0] === undefined)
    return (
      <>
        <h2>Sorry, we dont have stats yet</h2>
        <p className="my-4">
          You need to complete your first challenge and fill the form.
        </p>

        <Link href="/workshop/challenges/foundation-01" passHref legacyBehavior>
          <PrimaryButton size="default">
            Go to the first exercice <Rarr />
          </PrimaryButton>
        </Link>
      </>
    );

  const workshopsDone = data.challenge.length;
  const allChallenges = data.challenge;

  if (workshopsDone === 0) {
    return null;
  }

  return (
    <>
      <h2>Progression</h2>
      {allChallenges.map((challenge: Challenge, index: number) => (
        <div key={`${challenge.name}-${index}`} className="mb-6">
          <p className="mb-0 truncate text-sm font-medium text-gray-500">
            {humanReadableDate(challenge.date)}
          </p>
          <div className="flex">
            <p className="mt-2 text-gray-900 dark:text-white">
              You completed the challenge{' '}
              <span className="font-semibold">
                {challenge.name} {challenge.exercice}
              </span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

const ProfileContent = () => {
  const user = useUser();
  const { setUser } = useContext(UserContext);

  async function handleLogout() {
    try {
      if (magic) await magic.user.logout();
    } catch (error) {
      console.error('logout failed:', error);
    }
    setUser(null);
    Router.push('/workshop/login');
  }

  return (
    <ProseContainer withContentContainer>
      {user && user.email && (
        <>
          <LearningPathWithUser email={user.email} />
          <p>Your session:</p>
          <pre>{user.email}</pre>
          <button type="button" onClick={handleLogout} className="underline">
            Logout
          </button>
        </>
      )}
    </ProseContainer>
  );
};

const Profile = () => {
  return (
    <Layout>
      <ProfileContent />
    </Layout>
  );
};

export default Profile;
