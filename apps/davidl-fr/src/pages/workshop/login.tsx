import { useContext, useState } from 'react';
import Router from 'next/router';
import Layout from '~/components/Workshop/Layout';
import Form from '~/components/Workshop/Form';

import { magic } from '~/lib/magic';
import { useUser } from '~/lib/useUser';
import { UserContext } from '~/lib/UserContext';

const LoginPage = () => {
  useUser({ redirectTo: '/workshop/', redirectIfFound: true });
  const { setUser } = useContext(UserContext);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(event: {
    currentTarget: any;
    preventDefault: () => void;
  }) {
    event.preventDefault();
    setIsLoading(true);

    if (errorMsg) setErrorMsg('');

    const email = event.currentTarget.email.value;

    try {
      if (!magic) throw new Error('Magic SDK not initialized');

      const didToken = await magic.auth.loginWithMagicLink({ email });

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status !== 200) {
        throw new Error(await res.text());
      }

      const metadata = await magic.user.getInfo();
      setUser(metadata);
      Router.push('/workshop/profile');
    } catch (error: any) {
      console.error('An unexpected error happened:', error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout withFooter={false}>
      <Form
        errorMessage={errorMsg}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default LoginPage;
