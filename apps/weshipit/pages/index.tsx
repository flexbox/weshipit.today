import {
  Button,
  Card,
  ClientsListHomepage,
  FadeIn,
  Faq,
  FaqProps,
  Hero,
  Hyperlink,
  Prose,
  Section,
  SpotLeft,
  Text,
  WorkflowCard,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { getAllFaqs } from './api/faq';
import { asHTML, asText } from '@prismicio/client';
import Head from 'next/head';
import Gravatar from 'react-gravatar';
import { Customer, getVisibleClients } from './api/client';
import { Steps, getAllWorkflowSteps } from './api/workflow-steps';
import { PrismicRichText } from '@prismicio/react';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchTeam } from './api/team';

interface IndexPageProps {
  faqs: FaqProps[];
  clients: Customer[];
  steps: Steps[];
  teamSpotsLeft: number;
}

interface CallToActionProps {
  label: string;
  href: string;
  secondaryHref: string;
  secondaryLabel: string;
  teamSpotsLeft: number;
}

export async function getStaticProps() {
  const { faqs } = await getAllFaqs();
  const { clients } = await getVisibleClients();
  const { steps } = await getAllWorkflowSteps();

  const teamSpotsLeft = await fetchTeam();

  return {
    props: {
      faqs,
      clients,
      steps,
      teamSpotsLeft: teamSpotsLeft.length,
    },
  };
}

function CallToAction({
  label,
  href,
  secondaryHref,
  secondaryLabel,
  teamSpotsLeft,
}: CallToActionProps) {
  return (
    <div className="flex flex-col gap-4 text-center">
      <SpotLeft spotsLeft={teamSpotsLeft} />
      <div className="shrink-0">
        <Button
          href={href}
          as="a"
          isExternalLink
          size="xxl"
          withExternalLinkIcon={false}
          className="justify-center"
        >
          {label}
        </Button>
      </div>
      <div className="shrink-0">
        <Button
          href={secondaryHref}
          as="a"
          isExternalLink
          withExternalLinkIcon={false}
          size="xl"
          variant="ghost"
          className="justify-center"
        >
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );
}

function useGetLocalTimeInFrance() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateLocalTime = () => {
      const timeInFrance = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: false,
      }).format(new Date());

      setLocalTime(timeInFrance);
    };

    updateLocalTime(); // Update time immediately on component mount
    const intervalId = setInterval(updateLocalTime, 1000); // Then update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return localTime;
}

function ProblemAgitation() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;
  const localTimeInFrance = useGetLocalTimeInFrance();

  return (
    <>
      <p>
        <strong>99% of apps</strong> have 1000 users or less and{' '}
        <strong>will never stand out</strong> because of a{' '}
        <strong>broken design and UX</strong>. Users typically decide within 5
        seconds whether to uninstall an app.
      </p>

      <div className="relative flex h-[164px] w-[124px] flex-row items-center sm:h-[124px]">
        <Gravatar
          className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
          size={64}
          email="ducrocq.matthys@gmail.com"
        />
        <Gravatar
          className="-ml-4 mr-4 rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
          size={64}
          email="dleuliette@gmail.com"
        />
      </div>

      <Text as="h2" variant="h4">
        Become top 1% mobile app.
      </Text>
      <p>
        My name is David and I have been laser focused on{' '}
        <strong>
          React Native development for the past {yearsOfExperience} years
        </strong>
        , which has enabled me to become{' '}
        <Hyperlink href={'https://x.com/flexbox_/status/1801588179687936329'}>
          one of the top 20 contributors
        </Hyperlink>{' '}
        on Stackoverflow. I hired Matthys to be my right-hand and help me to
        scale our services.
      </p>
      <p>
        We are based in France, speak english for all our communications and use{' '}
        <code>qwerty</code> keyboards. It’s {localTimeInFrance} for us right
        now,{' '}
        <Hyperlink href={linksApi.cal.ONBOARDING}>
          book a call to see if we can help you
        </Hyperlink>
        .
      </p>
      <p>
        Unlike lengthy contracts that bind you for months and require a six-step
        paperwork process,{' '}
        <strong>our service is available whenever you need it</strong>. You have
        the freedom to pause or cancel at any time and can restart whenever it
        suits you.
      </p>

      <p>
        We can <strong>partner with you and your team</strong> on a rolling
        basis, or we can enhance your team’s skills with a one-off workshop. We
        are flexible to suit your needs.
      </p>

      <p>
        We are going to present the details of our partnership below. However,
        if you’re interested in workshops, you can directly{' '}
        <Hyperlink href="https://davidl.fr/bootcamp">
          jump to workshops
        </Hyperlink>
        .
      </p>
    </>
  );
}

function PodcastProof() {
  const URLS = [
    {
      platform: 'Apple Podcasts',
      icon: 'apple',
      url: 'https://podcasts.apple.com/us/podcast/rnr-289-real-life-react-native-david-leuliette-talks/id1058647602?i=1000647166395',
    },
    {
      platform: 'Spotify',
      icon: 'spotify',
      url: 'https://open.spotify.com/show/28hPRLml3FbP14FCYtlOvg',
    },
    {
      platform: 'Web',
      icon: 'globe',
      url: 'https://reactnativeradio.com/episodes/rnr-289-real-life-react-native-david-leuliette-talks-retail-shake-scanner',
    },
  ];

  return (
    <Prose size="xl">
      <h2>We’re trusted React Native consultants.</h2>
      <p>
        We actively participate in the community, presenting at{' '}
        <Hyperlink href="https://davidl.fr/talks">
          meetups and conferences
        </Hyperlink>
        , as well as{' '}
        <Hyperlink href="https://davidl.fr/bootcamp">
          conducting bootcamps
        </Hyperlink>
        .
      </p>
      <Image
        src="/images/appjs-2022.jpg"
        alt="David Leuliette, at appjs conference."
        className="mb-0 w-full rounded-lg bg-neutral-100 object-cover dark:bg-neutral-800"
        width={950}
        height={559}
      />
      <small className="text-slate-400">
        David with Catalyn and Aman at App.js Conf
      </small>
      <h3>infinite.red alchemist</h3>
      <p>
        We have made numerous open-source contributions to different
        organizations focused on react-native, such as <code>@expo</code>,{' '}
        <code>@facebook</code>, <code>@aws-amplify</code> and{' '}
        <code>@infinitered</code>.
      </p>
      <Image
        src="/images/chainreact-2023.jpg"
        alt="David Leuliette, at ChainReact conference."
        className="mb-0 w-full rounded-lg bg-neutral-100 object-cover dark:bg-neutral-800"
        width={950}
        height={559}
      />
      <small className="text-slate-400">
        David with John and Mazen at Chain React
      </small>
      <p>
        Listen to David Leuliette, the founder of weshipit.today, on the React
        Native Radio podcast.
      </p>
      <div className="not-prose flex gap-4">
        {URLS.map(({ platform, url }) => (
          <Button
            key={platform}
            href={url}
            as="a"
            isExternalLink
            variant="outline"
            size="lg"
          >
            {platform}
          </Button>
        ))}
      </div>
    </Prose>
  );
}

function HowDoesItWorks({ steps }: { steps: Steps[] }) {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <Prose size={'xl'}>
        <h2>How does it work?</h2>
      </Prose>
      <div className="flex flex-col gap-12">
        {steps.map((step) => (
          <WorkflowCard
            key={step.id}
            step={step.data.step_number}
            title={step.data.title}
            image={step.data.image}
          >
            <PrismicRichText field={step.data.description} />
          </WorkflowCard>
        ))}

        <Prose size="xl" className="mx-auto flex flex-col gap-4">
          <Card variant="green">
            <ol>
              <li>Get acces to top-noch talent.</li>
              <li>Unlimited revisions and one request at time.</li>
              <li>Pause anytime and cancel whenever.</li>
            </ol>
          </Card>
          <Card variant="red">
            <h3 className="mt-0">Do not work with us if you want</h3>
            <ol>
              <li>A quote is sent after an initial call.</li>
              <li>The quote is then validated.</li>
              <li>
                A service contract is signed, which describes the list of tasks
                to be accomplished and includes the elements of the quote.
              </li>
              <li>The developments are then carried out.</li>
              <li>
                A delivery report is validated, which triggers the payment of
                the invoice.
              </li>
              <li>
                Finally, the intellectual property rights transfer contract is
                signed.
              </li>
              <li>
                Endless loop of back and forth emails with accounting because
                the payment was not sent.
              </li>
            </ol>
          </Card>
        </Prose>
      </div>
    </div>
  );
}

export default function IndexPage({
  faqs,
  clients,
  steps,
  teamSpotsLeft,
}: IndexPageProps) {
  /** @type {import('schema-dts').FAQPage} */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ data }) => ({
      '@type': 'Question',
      name: asText(data.question),
      acceptedAnswer: asHTML(data.answer),
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <Layout
        withHeader
        withFooter
        seoTitle="Hire React Native Developers as a Service"
        seoDescription="Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Zero billable hours. Pause or cancel whenever."
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <Hero>
              <div className="my-12">
                <Text as="h1" variant="h1" className="text-center">
                  One flat fee.
                  <br />
                  React Native Experts on demand.
                </Text>
                <Text as="p" variant="h3" className="text-center opacity-30">
                  Pause or cancel whenever.
                </Text>
              </div>
              <CallToAction
                label={'Book a 30-min introduction call'}
                href={linksApi.cal.ONBOARDING}
                secondaryLabel={'Or Subscribe Today'}
                secondaryHref={linksApi.stripe.MONTHLY_PLAN}
                teamSpotsLeft={teamSpotsLeft}
              />
            </Hero>
          </FadeIn>
          <div className="m-auto max-w-2xl">
            <FadeIn>
              <Prose className="mb-12" size="2xl">
                <ProblemAgitation />
              </Prose>
            </FadeIn>

            <Button
              href={linksApi.cal.ONBOARDING}
              as="a"
              size="xxl"
              variant="outline"
              isExternalLink
              withExternalLinkIcon={false}
              className="mb-24 flex w-full justify-center"
            >
              Talk to us
            </Button>
          </div>
          <div className="mb-16 py-0 pb-12 lg:py-24">
            <div>
              <div className="m-auto max-w-2xl">
                <Prose className="mb-12" size="xl">
                  <h2>Mobile app for iOS, Android and more</h2>
                  <p>
                    Our team can assist you in shipping a new app, add new
                    features, or just keep an existing app up to date. Contact
                    us today if you want:
                  </p>
                </Prose>
              </div>
              <div className="m-auto grid w-full grid-cols-1 gap-4 p-4 md:w-3/4 md:grid-cols-2">
                <div className="flex h-full flex-col gap-4">
                  <Card className="h-1/2 overflow-hidden p-4">
                    <Prose size={'xl'} className="mb-6">
                      <Text>
                        A new mobile application{' '}
                        <strong>quickly on Apple and Google store</strong>.
                      </Text>
                    </Prose>
                    <div className="flex w-full justify-center gap-8">
                      <Image
                        className="rounded-lg"
                        src="/images/gumroad.jpg"
                        alt="iOS and Android logos"
                        width={375}
                        height={150}
                      />
                    </div>
                  </Card>
                  <Card className="h-1/2 overflow-hidden p-4">
                    <Prose size={'xl'} className="mb-6">
                      <Text>
                        To <strong>stop struggling</strong> with React Native
                        updates.
                      </Text>
                    </Prose>
                    <div className="flex w-full justify-center gap-8">
                      <Image
                        className="rounded-lg"
                        src="/images/update.png"
                        alt="iOS and Android logos"
                        width={375}
                        height={250}
                      />
                    </div>
                  </Card>
                </div>
                <div className="flex h-full flex-col gap-4">
                  <Card className="h-1/4 p-4  md:h-1/3">
                    <Prose size={'xl'} className="mb-6">
                      <Text>
                        To <strong>regain agility</strong> to evolve my
                        application quickly.
                      </Text>
                    </Prose>
                    <div className="flex justify-end gap-8">
                      <Text variant="h2" className="pr-4 pt-0 md:pt-4">
                        🚀
                      </Text>
                    </div>
                  </Card>
                  <div className="flex h-1/3 w-full gap-4">
                    <Card
                      variant={'gradient-purple-dark'}
                      className="w-1/2 p-4"
                    >
                      <Prose size={'xl'} className="mb-0 md:mb-6">
                        <Text>
                          Talk to <strong>experts</strong>
                        </Text>
                      </Prose>
                      <div className="relative mx-auto flex h-[164px] w-full flex-col-reverse items-center justify-center sm:h-[124px] md:flex-row">
                        <Gravatar
                          className="size-[64px] rounded-full border-4 border-white bg-slate-300 md:size-auto dark:bg-slate-700"
                          size={80}
                          email="ducrocq.matthys@gmail.com"
                        />
                        <Gravatar
                          className="-mb-4 size-[64px] rounded-full border-4 border-white bg-slate-300 md:-mb-0 md:-ml-4 md:mr-4 md:size-auto dark:bg-slate-700"
                          size={80}
                          email="dleuliette@gmail.com"
                        />
                      </div>
                    </Card>
                    <Card className="w-1/2 p-4">
                      <div className="mb-6 flex flex-col gap-2">
                        <Text>
                          <strong>Slack !</strong>
                        </Text>
                        <Text variant="c2">
                          No emails here! Responsive and more human exchanges
                        </Text>
                      </div>
                      <div className="flex justify-end gap-8 md:h-auto md:w-full">
                        <Image
                          src="/images/slack.png"
                          alt="slack logo"
                          className="size-[32px] md:size-auto"
                          width={40}
                          height={40}
                        />
                      </div>
                    </Card>
                  </div>
                  <Card className="h-1/3 p-4">
                    <Prose size={'xl'} className="mb-6">
                      <Text>
                        To <strong>quickly migrate</strong> an application to
                        React Native.
                      </Text>
                    </Prose>
                    <div className="flex gap-8">
                      <Image
                        className="rounded-xl p-2 dark:bg-white"
                        src="/images/expo-logo.png"
                        alt="iOS and Android logos"
                        width={175}
                        height={75}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <div className="m-auto mt-12 max-w-2xl">
              <div className="flex justify-center">
                <Button
                  href={linksApi.cal.ONBOARDING}
                  as="a"
                  isExternalLink
                  withExternalLinkIcon={false}
                  size="xxl"
                  variant="outline"
                >
                  Book a free 30-min introduction call
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-16 py-0 pb-12 lg:py-24">
            <div className="m-auto max-w-2xl">
              <Prose className="mb-12" size="xl">
                <h2>What makes a great app?</h2>
                <p>
                  We take immense pride in having expertly served an impressive
                  roster of over 15 clients, including
                </p>
              </Prose>
            </div>
            {/* Social Proof */}
            <ClientsListHomepage clients={clients} />
          </div>

          <div className="mb-24 py-0 lg:py-24">
            <div className="m-auto max-w-2xl">
              <PodcastProof />
            </div>
          </div>

          <div className="m-auto max-w-5xl">
            <HowDoesItWorks steps={steps} />
          </div>
        </div>

        <Section variant="light">
          <div className="m-auto max-w-2xl text-center">
            <Text as="h2" variant="h2" className="mb-12">
              Cutting Edge UI and Enhanced Productivity
            </Text>
            <CallToAction
              label={'Book a 30-min introduction call'}
              href={linksApi.cal.ONBOARDING}
              secondaryLabel={'Subscribe Today'}
              secondaryHref={linksApi.stripe.MONTHLY_PLAN}
              teamSpotsLeft={teamSpotsLeft}
            />
          </div>
        </Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-2xl">
            <Faq faqs={faqs} />
          </div>
          <div className="m-auto max-w-4xl py-24">
            <Card
              size="xl"
              className="m-auto my-24 flex flex-col items-center justify-center gap-8 text-center"
              variant="gradient-blue"
            >
              <Text
                variant="h4"
                as="h2"
                className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
              >
                See if weshipit.today is right for your needs
              </Text>
              <Text
                variant="p1"
                as="p"
                className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
              >
                Book a call and find out how you and your team can change your
                mobile app development forever.
              </Text>
              <Button
                size="xxl"
                variant="outline"
                href={linksApi.cal.ONBOARDING}
                as="a"
                isExternalLink
                withExternalLinkIcon={false}
              >
                Book a free call now
              </Button>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}
