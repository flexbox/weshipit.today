import * as React from 'react';
import { PrimaryButton } from '~/components/Button';
import { H5, P } from '~/components/Typography';
import { Container, Input, Form, Success, Error } from './style';

export default function Newsletter() {
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('pending');
  const [errorMessage, setErrorMessage] = React.useState('');

  function onChange(event) {
    if (status !== 'pending') setStatus('pending');
    return setEmail(event.target.value.trim());
  }

  async function submit(event) {
    event.preventDefault();

    const res = await fetch('/api/newsletter', {
      body: JSON.stringify({ email, first_name: firstName.trim() }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      setStatus('error');
      setErrorMessage(error);
      return;
    }

    setEmail('');
    setFirstName('');
    setStatus('succeeded');
  }

  return (
    <Container>
      <H5 style={{ marginTop: 0, display: 'flex', alignItems: 'center' }}>
        Subscribe?
      </H5>
      <P>
        Be the first to receive insightful articles and{' '}
        <strong>actionable resources</strong> that help you to{' '}
        <strong>elevate your skills</strong>.
      </P>
      {status === 'succeeded' ? (
        <Success>Thanks for subscribing!</Success>
      ) : (
        <Form onSubmit={submit}>
          <Input
            value={firstName}
            disabled={status === 'loading'}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            aria-label="First name (optional)"
            id="subscribe-first-name"
            type="text"
            name="first_name"
            autoComplete="given-name"
            maxLength={80}
          />
          <Input
            value={email}
            disabled={status === 'loading'}
            onChange={onChange}
            placeholder="Enter your e-mail"
            aria-label="E-mail"
            autoComplete="email"
            id="subscribe-email"
            type="email"
            name="email"
          />
          <PrimaryButton
            disabled={status === 'submitting' || !email}
            type="submit"
          >
            Subscribe
          </PrimaryButton>
        </Form>
      )}
      {status === 'error' && <Error>{errorMessage}</Error>}
    </Container>
  );
}
