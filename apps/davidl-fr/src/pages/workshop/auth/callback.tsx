import { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { WorkshopSeo } from '~/components/SEO/WorkshopSeo';
import { supabase } from '~/lib/supabase';
import { consumeReturnTo } from '~/lib/returnTo';

// The magic link lands here with the session (or an error) in the URL
// fragment. The Supabase client reads it on load (detectSessionInUrl).
const AuthCallbackPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const linkError = hashParams.get('error_description');

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        Router.replace(consumeReturnTo());
      } else {
        setErrorMsg(linkError || 'This login link is invalid or has expired.');
      }
    });
  }, []);

  return (
    <>
      <WorkshopSeo />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 text-center shadow sm:rounded-lg sm:px-10 dark:bg-gray-900">
            {errorMsg ? (
              <>
                <h2 className="mb-4 mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-300">
                  This link has expired
                </h2>
                <p className="text-gray-700 dark:text-gray-400">{errorMsg}</p>
                <Link
                  href="/workshop/login"
                  className="mt-6 inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700"
                >
                  Get a new login link
                </Link>
              </>
            ) : (
              <p className="text-gray-700 dark:text-gray-400">
                Signing you in…
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthCallbackPage;
