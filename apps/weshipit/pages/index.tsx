import {
  Bento,
  Button,
  Card,
  ClientsListHomepage,
  FadeIn,
  Faq,
  FaqProps,
  Hyperlink,
  Prose,
  SpotLeft,
  Text,
  WorkflowCard,
  Avatar,
  Pricing,
  HeroBanner,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { getAllFaqs } from './api/faq';
import { asHTML, asText } from '@prismicio/client';
import Head from 'next/head';
import { Customer, getVisibleClients } from './api/client';
import { Steps, getAllWorkflowSteps } from './api/workflow-steps';
import { PrismicRichText } from '@prismicio/react';

import { useState, useEffect } from 'react';
import { fetchTeam } from './api/team';
import { TrustedConsultantsSection } from '../components/trusted-consultants-section';

interface IndexPageProps {
  steps: Steps[];
  faqs: FaqProps[];
  clients: Customer[];
  teamSpotsLeft: number;
}

interface CallToActionProps {
  href: string;
  label: string;
  secondaryHref: string;
  teamSpotsLeft: number;
  secondaryLabel: string;
}

export async function getStaticProps() {
  const { faqs } = await getAllFaqs();
  const { clients } = await getVisibleClients();
  const { steps } = await getAllWorkflowSteps();

  const teamSpotsLeft = await fetchTeam();

  return {
    props: {
      clients,
      faqs,
      steps,
      teamSpotsLeft: teamSpotsLeft.length,
    },
  };
}

function CallToAction({
  href,
  label,
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
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris',
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
        <Avatar
          className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
          size={64}
          email="ducrocq.matthys@gmail.com"
        />
        <Avatar
          className="-ml-4 mr-4 rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
          size={64}
          email="dleuliette@gmail.com"
        />
      </div>

      <Text as="h2" variant="h4">
        Join the top 1% of mobile apps that actually succeed.
      </Text>
      <p>
        I'm David, a{' '}
        <Hyperlink href={'https://x.com/flexbox_/status/1801588179687936329'}>
          top 20 Stack Overflow contributor
        </Hyperlink>{' '}
        with {yearsOfExperience}+ years of{' '}
        <strong>laser-focused React Native experience</strong>. Together with my
        right-hand Matthys, we transform struggling apps into user-converting
        experiences that stand out in the market.
      </p>
      <p>
        We are based in France, speak english for all our communications and use{' '}
        <code>qwerty</code> keyboards. It&apos;s {localTimeInFrance} for us
        right now,{' '}
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
        basis, or we can enhance your team&apos;s skills with a one-off
        workshop. We are flexible to suit your needs.
      </p>

      <p>
        We are going to present the details of our partnership below. However,
        if you&apos;re interested in workshops, you can directly{' '}
        <Hyperlink href="https://davidl.fr/bootcamp">
          jump to workshops
        </Hyperlink>
        .
      </p>
    </>
  );
}

function HowDoesItWorks({ steps }: { steps: Steps[] }) {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <Prose size="xl">
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

        <Card variant="green">
          <Prose size="xl">
            <ol>
              <li>Get acces to top-noch talent.</li>
              <li>Unlimited revisions and one request at a time.</li>
              <li>Pause anytime and cancel whenever.</li>
            </ol>
          </Prose>
        </Card>

        <Card variant="red">
          <Prose size="xl">
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
                Loop of back and forth emails with accounting because the
                payment was not sent.
              </li>
            </ol>
          </Prose>
        </Card>
      </div>
    </div>
  );
}

export default function IndexPage({
  clients,
  faqs,
  steps,
  teamSpotsLeft,
}: IndexPageProps) {
  /** @type {import('schema-dts').FAQPage} */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ data }) => ({
      '@type': 'Question',
      acceptedAnswer: asHTML(data.answer),
      name: asText(data.question),
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
        seoTitle="Hire React Native Developers as a Service"
        seoDescription="Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Zero billable hours. Pause or cancel whenever."
        withHeader
        navigation={[
          { name: 'Services', href: '#services' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Faq', href: '#faq' },
        ]}
        callToActionButton={{
          name: 'Book a call',
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
        }}
        withFooter
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <HeroBanner
              onboardingHref={linksApi.cal.ONBOARDING}
              teamSpotsLeft={teamSpotsLeft}
            />
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
          <div className="mb-16 py-0 pb-12 lg:py-24" id="services">
            <div>
              <div className="m-auto max-w-2xl">
                <Prose className="mb-12" size="xl">
                  <h2>Transform Your Business with Powerful Mobile Apps</h2>
                  <p>
                    Our expert team delivers market-ready iOS and Android apps
                    that drive engagement and boost revenue. Don't let technical
                    challenges hold you back.
                  </p>
                </Prose>
              </div>
              <Bento
                expertLink={linksApi.cal.ONBOARDING}
                auditLink={'/audit'}
                slackLink="https://weblille.rocks/"
                gumroadLink="https://flexbox.gumroad.com/l/expo-checklist"
              />
            </div>

            <div className="mt-12 bg-muted/50 p-6 rounded-lg max-w-3xl mx-auto">
              <Text className="italic text-lg">
                “An understanding of our challenges, the presentation of various
                possible solutions, and an opinion — their own, but one we can
                rely on.”
              </Text>
              <Text className="font-semibold mt-2">
                — Ludovic Borie, CTO of Karnott
              </Text>
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
                  Get your free consultation now
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-16 py-0 pb-12 lg:py-24">
            <ClientsListHomepage clients={clients} />
          </div>
        </div>

        <TrustedConsultantsSection />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-5xl">
            <HowDoesItWorks steps={steps} />
          </div>
        </div>

        <Pricing />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-2xl" id="faq">
            <Faq faqs={faqs} />
          </div>
          <div className="m-auto max-w-4xl py-24">
            <Card
              size="xl"
              className="my-24 flex flex-col items-center justify-center gap-8 text-center"
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
                href={linksApi.cal.ONBOARDING}
                size="xxl"
                variant="outline"
                as="a"
                isExternalLink
              >
                Book a call with David
              </Button>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}
