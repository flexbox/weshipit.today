import { randomUUID } from 'node:crypto';

import type { GetServerSideProps } from 'next';

import { Layout } from '../../components/layout';
import { TestimonialWizard } from '../../components/testimonials/testimonial-wizard';
import { verifyInviteToken } from '../../utils/testimonials/token';

interface TestimonialInvitePageProps {
  company: string;
  id: string;
  inviteToken: string;
  name: string;
}

export default function TestimonialInvitePage({
  company,
  id,
  inviteToken,
  name,
}: TestimonialInvitePageProps) {
  return (
    <Layout
      noindex
      seoDescription="Record a short audio testimonial."
      seoTitle="Share your experience"
      withContainer
      withFooter
    >
      <div className="my-16">
        <TestimonialWizard
          company={company}
          id={id}
          inviteToken={inviteToken}
          name={name}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  TestimonialInvitePageProps
> = async ({ params }) => {
  const token = String(params?.token ?? '');
  const payload = verifyInviteToken(token);

  if (!payload) {
    return { notFound: true };
  }

  return {
    props: {
      company: payload.company,
      // One id per page load: the client can restart without colliding with a
      // previous take, and the id namespaces their media in Blob.
      id: randomUUID(),
      inviteToken: token,
      name: payload.name,
    },
  };
};
