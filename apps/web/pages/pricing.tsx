import Head from 'next/head';
import { PlanFinderSection, Pricing, Text, pricingTiers } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { FaqSection, faqPageSchema, faqs } from '../components/faq-section';
import { linksApi } from './api/links';

const PAGE_URL = 'https://weshipit.today/pricing';

// Pricing-intent questions only: cost vs. hiring, IP, and flexibility.
const pricingFaqs = faqs.filter(({ id }) =>
  ['faq-1', 'faq-4', 'faq-6', 'faq-9'].includes(id),
);

function toSchemaPrice(price: string) {
  return price.replace(/\D/g, '');
}

const offerCatalogSchema = {
  '@type': 'OfferCatalog',
  name: 'React Native development plans',
  url: PAGE_URL,
  itemListElement: pricingTiers.map((tier) => {
    const offer = {
      '@type': 'Offer',
      name: tier.name,
      description: tier.description,
      url: tier.href,
      seller: { '@type': 'Organization', name: 'weshipit.today' },
    };
    if (typeof tier.price === 'string') return offer;
    const amount = tier.price.monthly ?? tier.price.onetime;
    return {
      ...offer,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: toSchemaPrice(amount ?? ''),
        priceCurrency: 'EUR',
        ...(tier.price.monthly && { unitCode: 'MON' }),
      },
    };
  }),
};

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://weshipit.today',
        },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: PAGE_URL },
      ],
    },
    offerCatalogSchema,
    faqPageSchema(pricingFaqs),
  ],
};

export default function PricingPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </Head>
      <Layout
        seoTitle="React Native Development Pricing & Plans"
        seoDescription="Flat monthly plans for React Native development: 2 500 €/month for 40 dev hours, 5 000 €/month for 80. One-time audit at 10 000 €. No contracts, cancel anytime."
        ogImageTitle="React Native Development Pricing"
        ogImageAlt="weshipit.today — React Native development pricing"
        withHeader
        navigation={[
          { name: 'Plans', href: '#pricing' },
          { name: 'Faq', href: '#faq' },
        ]}
        callToActionButton={{
          name: 'Book a call',
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
        }}
        withFooter
      >
        <header className="mx-auto max-w-4xl px-6 pt-24 text-center sm:pt-32">
          <Text as="h1" variant="h1">
            React Native development pricing
          </Text>
        </header>
        <PlanFinderSection ctaLink={linksApi.cal.ONBOARDING} />
        <Pricing ctaLink={linksApi.cal.ONBOARDING} withPlanFinder={false} />
        <FaqSection items={pricingFaqs} />
      </Layout>
    </>
  );
}
