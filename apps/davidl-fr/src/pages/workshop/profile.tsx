import Router from 'next/router';
import Layout from '~/components/Workshop/Layout';
import { ErrorText } from '~/components/Workshop/ErrorText';
import { useUser } from '~/lib/useUser';
import { supabase } from '~/lib/supabase';
import { humanReadableDate } from '~/utils/date';
import { Rarr } from '~/components/Typography';
import PrimaryButton from '~/components/Button/PrimaryButton';
import Link from 'next/link';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { useSWRChallengesList } from '~/components/Workshop/useSWRChallenge';

const LearningPathWithUser = ({ email }: { email: string }) => {
  const { challenges, error } = useSWRChallengesList(email);

  if (error) return <ErrorText description={error.message} />;
  if (!challenges) return <p>Loading…</p>;

  if (challenges.length === 0)
    return (
      <>
        <h2>Sorry, we dont have stats yet</h2>
        <p className="my-4">
          You need to complete your first challenge and fill the form.
        </p>
        <Link href="/workshop/challenges/foundation-01">
          {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */}
          <PrimaryButton size="default">
            Go to the first exercice <Rarr />
          </PrimaryButton>
        </Link>
      </>
    );

  return (
    <>
      <h2>Progression</h2>
      {challenges.map((challenge) => (
        <div key={`${challenge.module}-${challenge.exercise}`} className="mb-6">
          <p className="mb-0 truncate text-sm font-medium text-gray-500">
            {humanReadableDate(challenge.created_at)}
          </p>
          <div className="flex">
            <p className="mt-2 text-gray-900 dark:text-white">
              You completed the challenge{' '}
              <span className="font-semibold">
                {challenge.module} {challenge.exercise}
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

  async function handleLogout() {
    try {
      if (supabase) await supabase.auth.signOut();
    } catch (error) {
      console.error('logout failed:', error);
    }
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
