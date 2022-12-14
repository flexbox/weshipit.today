import { Button, Hero, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface ConsultingProps {}

export function Consulting(props: ConsultingProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#000000' } } });
    })();
  }, []);

  return (
    <Layout
      ogImageTitle="Helping you to ship your vision in production."
      withContainer
      withFooter
      withAccessoryRight={
        <Button variant="secondary" href="https://cal.com/davidl/coaching">
          Schedule 1-to-1 consulting
        </Button>
      }
    >
      <Hero>
        <Text variant="h1" style="uppercase text-center">
          <span className="tracking-widest">Straightforward</span> <br />
          <small className="tracking-wide">React Native solutions</small>
        </Text>

        <div className="mt-12 flex justify-center">
          <Button href="https://cal.com/davidl/coaching">
            Schedule one-on-one consulting
          </Button>
        </div>
      </Hero>

      <div className="mx-auto max-w-2xl p-3">
        <Text variant="p1" style="mb-4">
          Every week, I receive emails asking me for a moment with me. I never
          know who to say yes to, who to say no to, and besides, my time is
          precious, I don’t want to waste it. I have absolutely no desire to
          devalue the most precious resource of my life: time.
        </Text>
        <Text variant="p1" style="mb-4">
          The principle is simple: a 60-minute slot, online payment. You can
          send me before the call if you wish a clear email in bullet points,
          which summarizes the objectives of our conversation.
        </Text>
        <Text variant="p1">
          My goal is for this hour to be most helpful to you.
        </Text>
      </div>

      <div className="mt-12 mb-48">
        <Cal
          calLink="davidl/coaching"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        />
      </div>
    </Layout>
  );
}

export default Consulting;
