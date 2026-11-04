import { useState } from 'react';
import Layout from '~/components/Workshop/Layout';
import Form from '~/components/Workshop/Form';

import { supabase } from '~/lib/supabase';
import { useUser } from '~/lib/useUser';

const CheckYourInbox = ({
  email,
  onReset,
}: {
  email: string;
  onReset: () => void;
}) => (
  <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 text-center shadow sm:rounded-lg sm:px-10 dark:bg-gray-900">
        <h2 className="mb-4 mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-300">
          Check your inbox
        </h2>
        <p className="text-gray-700 dark:text-gray-400">
          We sent a login link to{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            {email}
          </span>
          . Click it to sign in.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm text-blue-600 underline hover:text-blue-700"
        >
          Use another email
        </button>
      </div>
    </div>
  </div>
);

const LoginPage = () => {
  useUser({ redirectIfFound: true, redirectTo: '/workshop/' });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSubmit(event: {
    currentTarget: any;
    preventDefault: () => void;
  }) {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (errorMsg) setErrorMsg('');

    const email = event.currentTarget.email.value;

    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/workshop/auth/callback`,
          shouldCreateUser: true,
        },
      });
      if (error) throw error;

      setSentTo(email);
    } catch (error: any) {
      console.error('An unexpected error happened:', error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout withFooter={false}>
      {sentTo ? (
        <CheckYourInbox email={sentTo} onReset={() => setSentTo(null)} />
      ) : (
        <Form
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default LoginPage;
