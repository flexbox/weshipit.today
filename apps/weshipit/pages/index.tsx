import {
  Button,
  Card,
  FadeIn,
  Faq,
  FaqProps,
  Hyperlink,
  Prose,
  Text,
  WorkflowCard,
  Avatar,
  Pricing,
  HeroBanner,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { getAllFaqs } from './api/faq';
import { asText } from '@prismicio/client';
import Head from 'next/head';
import { Customer, getVisibleClients } from './api/client';
import { Steps, getAllWorkflowSteps } from './api/workflow-steps';
import { PrismicRichText } from '@prismicio/react';

import { useState, useEffect } from 'react';
import { TrustedConsultantsSection } from '../components/trusted-consultants-section';

interface IndexPageProps {
  steps: Steps[];
  faqs: FaqProps[];
  clients: Customer[];
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
        Weekly bugs cause <strong>40% of users to uninstall</strong>. We fix
        stability issues in days. Our clients cut development time by{' '}
        <strong>50%</strong> and boost retention by over <strong>35%</strong>.
      </p>

      <Text as="h2" variant="h4">
        Join the top 1% of mobile apps that actually succeed.
      </Text>
      <div className="relative flex h-[72px] w-[124px] flex-row items-center">
        <Avatar
          className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700 z-50"
          size={64}
          email="dleuliette@gmail.com"
        />
        <Avatar
          className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700 -ml-4 mr-4 "
          size={64}
          email="ducrocq.matthys@gmail.com"
        />
      </div>
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

function MeetYourTeam() {
  const currentYear = new Date().getFullYear();
  const davidXpYears = currentYear - 2007;
  const matthysXpYears = currentYear - 2021;

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          <Prose size="xl">
            <div className="text-center">
              <h2>Meet Your React Native Team</h2>
              <p>
                We're a specialized duo <br />
                combining strategic expertise with reliable execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Avatar
                  className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
                  size={128}
                  email="dleuliette@gmail.com"
                />
                <p>
                  <strong>David Leuliette</strong>
                  <br />
                  Senior Expert ({davidXpYears}+ years)
                </p>
                <strong>Handles</strong>
                <ul className="mt-0">
                  <li className="mt-0">Strategic audits</li>
                  <li>Complex architecture</li>
                  <li>Enterprise clients</li>
                </ul>
                <p>
                  <strong>Works on</strong>
                  <br />
                  Kickstart & Enterprise plans
                </p>
              </div>
              <div>
                <Avatar
                  className="rounded-full border-4 border-white bg-slate-300 dark:bg-slate-700"
                  size={128}
                  email="ducrocq.matthys@gmail.com"
                />
                <p>
                  <strong>Matthys Ducrocq</strong>
                  <br />
                  Lead Developer ({matthysXpYears}+ years)
                </p>
                <strong>Handles</strong>
                <ul className="mt-0">
                  <li className="mt-0">Sprint execution</li>
                  <li>Continuous delivery</li>
                  <li>Scaling support</li>
                </ul>
                <p>
                  <strong>Works on</strong>
                  <br />
                  Essential & Growth plans
                </p>
              </div>
            </div>
          </Prose>
        </div>
      </div>
    </section>
  );
}

function HowDoesItWorks({ steps }: { steps: Steps[] }) {
  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="flex flex-col gap-4">
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
          {/* @todo: refactor this section
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
        </Card> */}
        </div>
      </div>
    </div>
  );
}

export default function IndexPage({ clients, faqs, steps }: IndexPageProps) {
  /** @type {import('schema-dts').FAQPage} */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ data }) => ({
      '@type': 'Question',
      name: asText(data.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: asText(data.answer),
      },
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
            <HeroBanner onboardingHref={linksApi.cal.ONBOARDING} />
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
        </div>

        <TrustedConsultantsSection clients={clients} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-5xl">
            <HowDoesItWorks steps={steps} />
          </div>
        </div>

        <MeetYourTeam />
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

export async function getStaticProps() {
  const { faqs } = await getAllFaqs();
  const { clients } = await getVisibleClients();
  const { steps } = await getAllWorkflowSteps();

  return {
    props: {
      clients,
      faqs,
      steps,
    },
  };
}
