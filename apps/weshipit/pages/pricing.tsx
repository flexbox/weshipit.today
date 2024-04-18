import {
  Badge,
  Button,
  Card,
  Hero,
  LinkButton,
  Prose,
  Text,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import { getAllFaq } from './api/faq';
import { RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { useState } from 'react';
import Head from 'next/head';

interface FaqProps {
  id: string;
  data: {
    question: RichTextField;
    answer: RichTextField;
  };
}

interface FaqSectionProps {
  faq: FaqProps[];
}

function generateStructuredData(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ id, data }) => ({
      '@type': 'Question',
      name: data.question[0].text,
      acceptedAnswer: {
        '@type': 'Answer',
        text: data.answer[0].text,
      },
    })),
  };
}

export default function PricingPage({ faq }: FaqSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };
  const structuredData = generateStructuredData(faq);
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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
            Zero billable hours.
          </Text>
          <Text as="h2" variant="h3" className="text-center opacity-50">
            Pause or cancel whenever.
          </Text>
        </Hero>

        <div className="m-auto mb-24 max-w-2xl flex-col">
          <div className="mb-24 mt-12 flex flex-col gap-4 text-center">
            <div className="shrink-0">
              <Badge variant="blue">First month at 50% off ✨</Badge>
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

          <Prose>
            <Card variant="green" className="mb-12">
              <ul>
                <li>Unlimited revisions.</li>
                <li>One request at time.</li>
                <li>No billable hours.</li>
                <li>Pause anytime.</li>
                <li>Cancel whenever.</li>
              </ul>
            </Card>

            <Card variant="red">
              <h2 className="mt-0">Do not work with us if you want</h2>
              <ol>
                <li>A quote after an initial call.</li>
                <li>The quote is then validated.</li>
                <li>
                  A service contract is signed, which describes the list of
                  tasks to be accomplished and includes the elements of the
                  quote.
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
              </ol>
            </Card>
          </Prose>
          <div>
            <Text as="h2" variant="h2" className="mb-12 mt-24">
              Frequently Asked Questions
            </Text>
            <div className="">
              {faq.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer rounded-md px-4 py-12 transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => toggle(item.id)}
                >
                  <Text as={'h2'} variant="s2" className="my-4 font-semibold">
                    <PrismicRichText field={item.data.question} />
                  </Text>
                  {activeId === item.id && (
                    <Text as="p" variant="p2">
                      <PrismicRichText field={item.data.answer} />
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
  const { faq } = await getAllFaq();
  return {
    props: {
      faq,
    },
  };
}
