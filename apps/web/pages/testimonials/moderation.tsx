import { Button, Card, Text } from '@weshipit/ui';
import type { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Layout } from '../../components/layout';
import { isAdminRequest } from '../../utils/testimonials/admin';
import { listPendingRecords } from '../../utils/testimonials/store';
import type { TestimonialRecord } from '../../utils/testimonials/types';

const INPUT_CLASS_NAME =
  'w-full rounded-md border-0 bg-white px-3.5 py-2.5 text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10';

async function post(body: Record<string, unknown>) {
  const response = await fetch('/api/testimonials/moderate', {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error ?? 'Request failed');
  }

  return response.json();
}

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await post({ action: 'login', password });
      window.location.reload();
    } catch (caught) {
      setError((caught as Error).message);
    }
  };

  return (
    <Card size="lg" className="mx-auto mt-24 max-w-sm">
      <label className="mb-2 block text-sm font-medium" htmlFor="password">
        Admin password
      </label>
      <input
        className={INPUT_CLASS_NAME}
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && handleLogin()}
        type="password"
        value={password}
      />
      <Button
        as="button"
        className="mt-4"
        onClick={handleLogin}
        size="lg"
        variant="primary"
      >
        Log in
      </Button>
      {error ? (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </Card>
  );
}

function InviteGenerator() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [link, setLink] = useState<string | null>(null);

  const handleGenerate = async () => {
    const { token } = await post({ action: 'invite', company, name });
    setLink(`${window.location.origin}/testimonial/${token}`);
  };

  return (
    <Card size="lg" className="mb-12">
      <Text as="h2" variant="h3" className="mb-4">
        Generate an invite link
      </Text>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className={INPUT_CLASS_NAME}
          onChange={(event) => setName(event.target.value)}
          placeholder="Client name"
          type="text"
          value={name}
        />
        <input
          className={INPUT_CLASS_NAME}
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Company"
          type="text"
          value={company}
        />
        <Button
          as="button"
          disabled={!name.trim()}
          onClick={handleGenerate}
          size="lg"
          variant="primary"
        >
          Generate
        </Button>
      </div>
      {link ? (
        <p className="mt-4 break-all font-mono text-sm text-blue-600 dark:text-blue-400">
          {link}
        </p>
      ) : null}
    </Card>
  );
}

function PendingCard({ record }: { record: TestimonialRecord }) {
  const [review, setReview] = useState(record.review);
  const [pullQuote, setPullQuote] = useState(record.pullQuote);
  const [result, setResult] = useState<string | null>(null);

  const handleApprove = async () => {
    const { slug } = await post({
      action: 'approve',
      id: record.id,
      pullQuote,
      review,
    });
    setResult(`Published at /testimonials/${slug}`);
  };

  const handleReject = async () => {
    await post({ action: 'reject', id: record.id });
    setResult('Rejected and deleted.');
  };

  if (result) {
    return (
      <Card size="lg" className="mb-8">
        <p className="text-slate-600 dark:text-slate-400">{result}</p>
      </Card>
    );
  }

  return (
    <Card size="lg" className="mb-8">
      <Text as="h3" variant="h4" className="mb-1">
        {record.fullName}
      </Text>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {record.jobTitle} {record.company ? `· ${record.company}` : null} ·{' '}
        {new Date(record.createdAt).toLocaleDateString('en-GB')}
      </p>

      <audio
        className="mb-6 w-full"
        controls
        src={`/api/testimonials/media?id=${record.id}&kind=audio`}
      >
        <track kind="captions" />
      </audio>

      <label className="mb-1.5 block text-sm font-medium" htmlFor={record.id}>
        Testimonial
      </label>
      <textarea
        className={INPUT_CLASS_NAME}
        id={record.id}
        onChange={(event) => setReview(event.target.value)}
        rows={6}
        value={review}
      />

      <input
        className={`${INPUT_CLASS_NAME} mt-4`}
        onChange={(event) => setPullQuote(event.target.value)}
        type="text"
        value={pullQuote}
      />

      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-slate-500">
          Raw transcript
        </summary>
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500 dark:text-slate-400">
          {record.rawTranscript}
        </p>
      </details>

      <div className="mt-6 flex gap-3">
        <Button as="button" onClick={handleApprove} size="lg" variant="primary">
          Approve &amp; publish
        </Button>
        <Button as="button" onClick={handleReject} size="lg" variant="outline">
          Reject
        </Button>
      </div>
    </Card>
  );
}

interface ModerationPageProps {
  isAuthenticated: boolean;
  records: TestimonialRecord[];
}

export default function ModerationPage({
  isAuthenticated,
  records,
}: ModerationPageProps) {
  return (
    <Layout
      noindex
      seoDescription="Internal testimonial moderation."
      seoTitle="Testimonial moderation"
      withContainer
    >
      {isAuthenticated ? (
        <div className="my-16">
          <Text as="h1" variant="h1" className="mb-10">
            Testimonial moderation
          </Text>

          <InviteGenerator />

          {records.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">
              Nothing pending.
            </p>
          ) : (
            records.map((record) => (
              <PendingCard key={record.id} record={record} />
            ))
          )}
        </div>
      ) : (
        <LoginForm />
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  ModerationPageProps
> = async ({ req }) => {
  if (!isAdminRequest(req)) {
    return { props: { isAuthenticated: false, records: [] } };
  }

  return {
    props: { isAuthenticated: true, records: await listPendingRecords() },
  };
};
