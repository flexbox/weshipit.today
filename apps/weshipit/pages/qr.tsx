import { Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import Script from 'next/script';

/* eslint-disable-next-line */
export interface QrProps {}

export function Qr(props: QrProps) {
  return (
    <Layout
      seoTitle="FREE Pair Programming Session"
      seoDescription={''}
      withHeader
      withFooter
    >
      <div className="mx-auto max-w-2xl p-3">
        <Text variant="h1">Office Hours</Text>
        <Text variant="p1">
          Join us during Code and Coffee breaks to pair with one of our
          experienced software consultants on a challenge you’re puzzling over!
          Pick the day and time slot that’s best for you, and tell us what you’d
          like to pair on.
        </Text>
        <Text variant="p1">
          You’ll receive a copy of your time slot request, and we’ll confirm as
          we match you to a Double Agent Slots will be filled in order received,
          and when slots fill up we’ll start a wait list If something comes up,
          please email hello@testdouble.com so we can give your slot to someone
          else
        </Text>
        <Text variant="p1">
          If no slots become available you can arrange a virtual pairing session
          post-conference If the Coffee & Code breaks are not optimal times,
          email hello@testdouble.com to request an alternate time or a
          post-conference virtual pairing session.
        </Text>
        <Text variant="p1">
          LinkedIn Profile/Resume Reviews, Blog writing & Marketing are
          available for pairing with our branding expert throughout the
          conference.
        </Text>
        <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
        <iframe
          src="https://airtable.com/embed/shrbgrlfblUkIFovF?backgroundColor=blue"
          width="100%"
          height="1231"
          className="airtable-embed airtable-dynamic-height mb-12"
          style={{ background: '#ffffff' }}
        ></iframe>
      </div>
    </Layout>
  );
}

export default Qr;
