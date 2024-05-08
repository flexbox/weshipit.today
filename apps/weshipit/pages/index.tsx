import {
  Badge,
  Button,
  Card,
  ClientsListHomepage,
  FadeIn,
  Hero,
  Hyperlink,
  Prose,
  Text,
  WorkflowCard,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { getAllFaqs } from './api/faq';
import { RichTextField, asHTML, asText } from '@prismicio/client';
import Head from 'next/head';
import { format } from 'date-fns';
import Gravatar from 'react-gravatar';
import { Customer, getAllClients } from './api/client';
import { Steps, getAllWorkflowSteps } from './api/workflow-steps';
import { PrismicRichText } from '@prismicio/react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface FaqProps {
  id: string;
  data: {
    question: RichTextField;
    answer: RichTextField;
  };
}

interface IndexPageProps {
  faqs: FaqProps[];
  clients: Customer[];
  steps: Steps[];
}

function CallToAction() {
  const currentDate = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentDate.getMonth() + 1);
  const nextMonthInText = format(nextMonth, 'MMMM');

  return (
    <div className="flex flex-col gap-4 text-center">
      <div className="shrink-0">
        <Badge variant="blue" className="flex gap-2">
          <div className="size-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          <div className="size-3 rounded-full bg-blue-500"></div>
          <div>1 spot left in {nextMonthInText} ✨</div>
        </Badge>
      </div>
      <div className="shrink-0">
        <Button
          href={linksApi.stripe.MONTHLY_PLAN}
          as="a"
          isExternalLink
          size="xxl"
          withExternalLinkIcon={false}
          className="justify-center"
        >
          Subscribe Today
        </Button>
      </div>
      <div className="shrink-0">
        <Button
          href={linksApi.cal.CONSULTATION}
          as="a"
          isExternalLink
          withExternalLinkIcon={false}
          size="xl"
          variant="ghost"
          className="justify-center"
        >
          Or book a 30-min introduction call
        </Button>
      </div>
    </div>
  );
}

function ProblemAgitation() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;

  return (
    <>
      <p>
        In {currentYear}, React Native development faces challenges due to
        <strong> rapidly evolving technology</strong> and a{' '}
        <strong>growing demand</strong> for complex, interactive apps.
        Developers must continually adapt and deliver high-quality products
        without sacrificing performance or user experience.
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

      <p>
        My name is David and I have been laser focused on{' '}
        <strong>
          React Native development for the past {yearsOfExperience} years
        </strong>
        . I hired Matthys to be my right-hand and help me to scale our services.
      </p>
      <p>
        We are based in France, speak english for all our communications and use{' '}
        <code>qwerty</code> keyboards.
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

function SocialProof({ clients }) {
  return <ClientsListHomepage clients={clients} />;
}

function HowDoesItWorks({ steps }: { steps: Steps[] }) {
  return (
    <Prose size="xl">
      <h2>How does it work?</h2>
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
          <ul>
            <li>Get acces to top-noch talent.</li>
            <li>Unlimited revisions.</li>
            <li>One request at time.</li>
            <li>No billable hours.</li>
            <li>Pause anytime.</li>
            <li>Cancel whenever.</li>
          </ul>
        </Card>

        <Card variant="red">
          <h3 className="mt-0">Do not work with us if you want</h3>
          <ol>
            <li>A quote after an initial call.</li>
            <li>The quote is then validated.</li>
            <li>
              A service contract is signed, which describes the list of tasks to
              be accomplished and includes the elements of the quote.
            </li>
            <li>The developments are then carried out.</li>
            <li>
              A delivery report is validated, which triggers the payment of the
              invoice.
            </li>
            <li>
              Finally, the intellectual property rights transfer contract is
              signed.
            </li>
          </ol>
        </Card>
      </div>
    </Prose>
  );
}

export default function IndexPage({ faqs, clients, steps }: IndexPageProps) {
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
        withContainer
        seoTitle="Hire React Native Developers as a Service"
        seoDescription="Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Zero billable hours. Pause or cancel whenever."
      >
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
            <CallToAction />
          </Hero>
        </FadeIn>

        <div className="m-auto max-w-2xl">
          <FadeIn>
            <Prose className="mb-12" size="2xl">
              <ProblemAgitation />
            </Prose>
          </FadeIn>

          <Button
            href={linksApi.stripe.MONTHLY_PLAN}
            as="a"
            size="xxl"
            isExternalLink
            withExternalLinkIcon={false}
            className="mb-24 flex w-full justify-center"
          >
            Work with us
          </Button>
        </div>

        <div className="mb-16 py-0 pb-12 lg:py-24">
          <div className="m-auto max-w-2xl">
            <Prose className="mb-12" size="xl">
              <h2>What makes a great app?</h2>
              <p>
                We take immense pride in having expertly served an impressive
                roster of over {clients.length} clients, including:
              </p>
            </Prose>
          </div>
          <SocialProof clients={clients} />
        </div>

        <div className="m-auto max-w-3xl">
          <HowDoesItWorks steps={steps} />
        </div>

        <div className="m-auto max-w-2xl py-32">
          <Text as="h2" variant="h2" className="mb-12">
            Elevate your App Experience with our Subscription Service
          </Text>
          <CallToAction />
        </div>

        <div className="m-auto max-w-2xl">
          <Text as="h2" variant="h2" className="mb-12">
            Frequently Asked Questions
          </Text>

          {faqs.map((item) => (
            <div key={item.id}>
              <Disclosure
                as="div"
                className="cursor-pointer rounded-md transition-colors duration-200 ease-in-out hover:bg-white dark:hover:bg-gray-800"
                defaultOpen={false}
              >
                <DisclosureButton className="group flex w-full items-center justify-between px-4 py-3">
                  <Text as="h2" variant="s2" className="my-4 font-semibold">
                    {asText(item.data.question)}
                  </Text>
                  <ChevronDownIcon className="size-5 group-data-[open]:rotate-180  dark:fill-white/60" />
                </DisclosureButton>
                <DisclosurePanel className="px-4 pb-4">
                  <Text as="p" variant="p2">
                    {asText(item.data.answer)}
                  </Text>
                </DisclosurePanel>
              </Disclosure>
            </div>
          ))}
        </div>

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
            Ready to improve your React Native app with us?
          </Text>
          <Button
            size="xxl"
            variant="outline"
            href={linksApi.stripe.MONTHLY_PLAN}
            as="a"
            isExternalLink
            withExternalLinkIcon={false}
          >
            Start now
          </Button>
        </Card>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { faqs } = await getAllFaqs();
  const { clients } = await getAllClients();
  const { steps } = await getAllWorkflowSteps();

  return {
    props: {
      faqs,
      clients,
      steps,
    },
  };
}
