import { Button, Card, Hero, Hyperlink, Prose, Text } from '@weshipit/ui';
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
      withFooter
      seoTitle="React Native Consulting"
      seoDescription="Looking to improve your skills as a React Native developer? Our coaching services are here to help. Our experienced team will provide personalized guidance and support to help you take your skills to the next level. Whether you're a beginner or an experienced developer, we have a coaching program that's right for you."
      ogImageTitle="Helping you to ship your vision in production"
      withAccessoryRight={
        <Button
          as="a"
          variant="secondary"
          href="https://cal.com/davidl/coaching"
          isExternalLink={true}
          size="xl"
        >
          Schedule 1-to-1 consulting
        </Button>
      }
    >
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 z-0 h-[550px] w-auto min-w-full max-w-none bg-slate-800 object-cover opacity-20"
          style={{ zIndex: -1 }}
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/849077469/rendition/1080p/file.mp4?loc=external&signature=4d9740bee6a0997e8358e6e039238313d6cf22ff06d6a5a0c6b537368a466e56"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Hero title="">
          <Text
            as="h1"
            variant="h1"
            className="mt-12 text-center uppercase tracking-widest text-black"
          >
            Straightforward
            <br />
            <small className="tracking-wider">React Native solutions</small>
          </Text>

          <div className="mt-12 flex justify-center">
            <Button
              href="https://cal.com/davidl/coaching"
              as="a"
              isExternalLink={true}
              size="xl"
            >
              Schedule one-on-one consulting
            </Button>
          </div>
        </Hero>

        <Prose className="mx-auto max-w-3xl">
          <Card>
            <Text as="p" style={{ marginTop: 0 }}>
              Every week, I receive emails asking me for a moment with me. I
              never know who to say yes to, who to say no to, and besides, my
              time is precious, I don’t want to waste it.
            </Text>
            <Text as="p">
              The principle is simple: a 60-minute slot, online payment.
            </Text>
            <ul>
              <li>
                ✍️ You provide me with your current goals, challenges and
                specific questions prior to our call.
              </li>
              <li>
                🧠 I review the materials you provide and formulate a game plan
                to tackle your challenges and help you achieve your vision.
              </li>
              <li>
                🗣️ We speak face-to-face on a one hour video consulting call
                where I review my findings with you and answer your questions.
              </li>
              <li>
                📓 I provide you with a detailed written summary afterwards.
              </li>
              <li>
                🔴 Record the video call locally on your computer (optional).
              </li>
              <li>
                💬 For the next 30 days I make myself available via direct
                message to answer your questions and support you.
              </li>
              <li>🗓️ Weekly & Monthly sessions are available by request.</li>
            </ul>
            <Text as="p">
              My goal is for this hour to be most helpful to you.
            </Text>

            <em>
              Note: If the calendar below doesn’t load in a few seconds, try
              refreshing the page. Or you can{' '}
              <Hyperlink href="https://cal.com/davidl/coaching">
                open the bookling link on another tab
              </Hyperlink>
              .
            </em>
          </Card>
        </Prose>
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
