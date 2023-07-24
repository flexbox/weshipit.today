import { Button, Hero, Hyperlink, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export function Consulting() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#000000' } } });
    })();
  }, []);

  return (
    <Layout
      withContainer
      withFooter
      seoTitle="React Native Consulting"
      seoDescription="Looking to improve your skills as a React Native developer? Our coaching services are here to help. Our experienced team will provide personalized guidance and support to help you take your skills to the next level. Whether you're a beginner or an experienced developer, we have a coaching program that's right for you."
      ogImageTitle="Helping you to ship your vision in production"
      withAccessoryRight={
        <Button variant="ghost" href="https://cal.com/davidl/coaching">
          Schedule 1-to-1 consulting
        </Button>
      }
    >
      <Hero>
        <Text as="h1" variant="h1" className="text-center uppercase">
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
        <Text as="p" variant="p1" className="mb-4">
          Every week, I receive emails asking me for a moment with me. I never
          know who to say yes to, who to say no to, and besides, my time is
          precious, I don’t want to waste it. I have absolutely no desire to
          devalue the most precious resource of my life: time.
        </Text>
        <Text as="p" variant="p1" className="mb-4">
          The principle is simple: a 60-minute slot, online payment. You can
          send me before the call if you wish a clear email in bullet points,
          which summarizes the objectives of our conversation.
        </Text>
        <Text as="p" variant="p1">
          My goal is for this hour to be most helpful to you.
        </Text>
        <Text as="p" variant="p1">
          <em>
            Note: If the calendar below doesn’t load in a few seconds, try
            refreshing the page. Or you can{' '}
            <Hyperlink href="https://cal.com/davidl/coaching">
              open the bookling link on another tab
            </Hyperlink>
            .
          </em>
        </Text>
      </div>

      <div className="mb-48 mt-12">
        <Cal
          calLink="davidl/coaching"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        />
      </div>
    </Layout>
  );
}

export default Consulting;
