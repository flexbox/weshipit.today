import { Layout } from '../components/layout';
import Script from 'next/script';
import { linksApi } from './api/links';
import { Prose } from '@weshipit/ui';

export function Qr() {
  return (
    <Layout
      seoTitle="FREE Pair Programming Session"
      seoDescription={
        'Join us during Code and Coffee breaks to pair with one of our experienced software consultants on a challenge you’re puzzling over! Pick the day and time slot that’s best for you, and tell us what you’d like to pair on.'
      }
      withHeader
      withFooter
    >
      <div className="mx-auto max-w-2xl p-3">
        <Prose size="lg">
          <h1 className="mt-8">Office Hours</h1>
          <p>
            Join us during Code and Coffee breaks to pair with one of our
            experienced software consultants on a challenge you’re puzzling
            over!{' '}
            <strong>Pick the day and time slot that’s best for you</strong>, and
            tell us what you’d like to pair on.
          </p>
          <p>
            You’ll receive a copy of your time slot request, and we’ll confirm
            as we match you to a Double Agent Slots will be primary in order
            received, and when slots fill up we’ll start a wait list.
          </p>
          <p>
            If something comes up, please contact us so we can give your slot to
            someone else.
          </p>

          <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
          <iframe
            src={linksApi.airtable.PAIR_PROGRAMMING_FORM_EMBED}
            width="100%"
            height="1231"
            className="airtable-embed airtable-dynamic-height mb-12"
            style={{ background: '#ffffff' }}
          ></iframe>
        </Prose>
      </div>
    </Layout>
  );
}

export default Qr;
