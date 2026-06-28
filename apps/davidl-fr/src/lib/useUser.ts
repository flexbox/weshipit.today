import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { UserContext } from '~/lib/UserContext';

export function useUser({
  redirectTo = '/workshop/login',
  redirectIfFound = false,
} = {}) {
  const { user, loaded } = useContext(UserContext);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !loaded) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, loaded, hasUser]);

  return user;
}
