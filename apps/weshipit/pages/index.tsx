import {
  AvatarAvenger,
  Badge,
  Button,
  Card,
  Hero,
  Hyperlink,
  LinkButton,
  Prose,
  Text,
  WorkflowCard,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { getAllFaqs } from './api/faq';
import { RichTextField, asHTML, asText } from '@prismicio/client';
import { useState } from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import Gravatar from 'react-gravatar';

interface FaqProps {
  id: string;
  data: {
    question: RichTextField;
    answer: RichTextField;
  };
}

interface FaqSectionProps {
  faqs: FaqProps[];
}

function ScarcityBox() {
  const currentDate = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentDate.getMonth() + 1);
  const nextMonthInText = format(nextMonth, 'MMMM');

  return (
    <div className="mb-24 mt-12 flex flex-col gap-4 text-center">
      <div className="shrink-0">
        <Badge variant="blue" className="flex gap-2">
          <div className="size-3 rounded-full bg-slate-300"></div>
          <div className="size-3 rounded-full bg-blue-500"></div>
          <div>1 spot left in {nextMonthInText} ✨</div>
        </Badge>
      </div>
      <Button
        href={linksApi.stripe.MONTHLY_PLAN}
        as="a"
        size="xxl"
        isExternalLink
        withExternalLinkIcon={false}
        className="justify-center"
      >
        Subscribe Today
      </Button>
      <LinkButton
        variant="ghost"
        href={linksApi.cal.CONSULTATION}
        size="xl"
        className="justify-center"
      >
        Or book a call
      </LinkButton>
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
        rapidly evolving technology and a growing demand for complex,
        interactive apps. Developers must continually adapt and deliver
        high-quality products without sacrificing performance or user
        experience.
      </p>

      <div className="relative flex h-[164px] w-[124px] flex-row items-center justify-center sm:h-[124px]">
        <Gravatar
          className="rounded-full border-4 border-white"
          size={64}
          email="ducrocq.matthys@gmail.com"
        />
        <Gravatar
          className="-ml-4 mr-4 rounded-full border-4 border-white"
          size={64}
          email="dleuliette@gmail.com"
        />
      </div>

      <p>
        My name is David and I have been primarily laser on React Native
        development for the past {yearsOfExperience} years.
      </p>
      <p>
        Unlike lengthy contracts that bind you for months and require a six-step
        paperwork process, our service is available whenever you need it. You
        have the freedom to pause or cancel at any time and can restart whenever
        it suits you.
      </p>

      <p>
        We can partner with you and your team on a rolling basis, or we can
        enhance your team’s skills with a one-off workshop. We are flexible to
        suit your needs.
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

function HowItWorks() {
  return (
    <Prose>
      <h2>How it works when you subscribe</h2>
      <div className="flex flex-col gap-12">
        <WorkflowCard step={1} title="You invite us as contributors.">
          <p>
            We are working as developer on React Native. To ship your project to
            <code>preview</code> or <code>production</code>, we need access to{' '}
            <strong>Google Play Console</strong>,{' '}
            <strong>Apple App Store Connect</strong>, and <strong>Expo</strong>.
          </p>
          <p>We will send you a Notion Checklist to speed up the process.</p>
        </WorkflowCard>
        <WorkflowCard
          step={2}
          title="You have features or fixes that need to be done."
        >
          <p>
            Whether it’s big features, small fixes, or tricky workflows, no
            matter the complexity, we’ve got your back.
          </p>
          <p>
            We will provide you with a custom backlog tailored to your needs.
            You can add any tasks requiring our attention to this backlog. There
            are no limits or constraints.
          </p>
        </WorkflowCard>

        <Card variant="green">
          <ul>
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

export default function IndexPage({ faqs }: FaqSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

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
        <Hero>
          <Text as="h1" variant="h1" className="text-center">
            One flat fee.
            <br />
            React Native Experts on demand.
          </Text>
          <Text as="p" variant="h3" className="text-center opacity-30">
            Pause or cancel whenever.
          </Text>
        </Hero>

        <div className="m-auto mb-24 max-w-2xl flex-col">
          <ScarcityBox />

          <Prose className="mb-24">
            <ProblemAgitation />

            <Button
              href={linksApi.stripe.MONTHLY_PLAN}
              as="a"
              size="xxl"
              isExternalLink
              withExternalLinkIcon={false}
              variant="outline"
              className="no-underline"
            >
              Work with us
            </Button>
          </Prose>

          <HowItWorks />

          <div>
            <Text as="h2" variant="h2" className="mb-12 mt-24">
              Frequently Asked Questions
            </Text>
            <div className="">
              {faqs.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer rounded-md px-4 py-12 transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => toggle(item.id)}
                >
                  <Text as={'h2'} variant="s2" className="my-4 font-semibold">
                    {asText(item.data.question)}
                  </Text>
                  {activeId === item.id && (
                    <Text as="p" variant="p2">
                      {asText(item.data.answer)}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { faqs } = await getAllFaqs();
  return {
    props: {
      faqs,
    },
  };
}
