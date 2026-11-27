import { getAllClients } from '../../utils/clients';
import { Layout } from '../../components/layout';
import {
  AuditAnimation,
  FadeIn,
  HeroSplit,
  LinkButton,
  ClientsListMarkee,
  Card,
  FeatureGrid,
  BookDiscoveryCta,
  Text,
  ClientProps,
  Faq,
  FaqProps,
  pricingTiers,
} from '@weshipit/ui';
import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { linksApi } from '../../utils/links';

import Head from 'next/head';
import Link from 'next/link';

const AUDIT_URL = 'https://weshipit.today/audit';

const kickstart = pricingTiers.find((tier) => tier.key === 'kickstart');
// "10 000 €" -> "10000", for the Offer in the structured data.
const PRICE =
  typeof kickstart?.price === 'object' ? (kickstart.price.onetime ?? '') : '';
const PRICE_AMOUNT = PRICE.replace(/[^\d]/g, '');

interface AuditProps {
  clients: ClientProps[];
}

// Fetch the client data at build time
export async function getStaticProps() {
  const { clients } = await getAllClients();

  return {
    props: {
      clients: clients.filter((client) => client.data?.is_audit),
    },
  };
}

const STEPS = [
  {
    label: '01 / Understand',
    text: 'We get the app running, review architecture and delivery practices, and talk with the people who work in the code every day.',
    title: 'Map the real system',
  },
  {
    label: '02 / Prioritize',
    text: 'We rank findings by product impact, engineering risk, and effort, so the team knows what to tackle now and what can wait.',
    title: 'Separate signal from noise',
  },
  {
    label: '03 / Improve',
    text: 'Work through the highest-value changes together. Leave with cleaner code, better confidence, and a realistic next-step plan.',
    title: 'Ship the first fixes',
  },
];

const DELIVERABLES = [
  {
    description:
      'Where the code is coupled, fragile, or harder to change than it should be.',
    title: 'Architecture & dependency review',
  },
  {
    description:
      'Evidence-led findings across startup, rendering, crashes, and release flow.',
    title: 'Performance and reliability hotspots',
  },
  {
    description:
      'Concrete priorities your team can estimate, schedule, and own.',
    title: 'Ranked roadmap with effort and impact',
  },
  {
    description:
      'Pair on the top fixes and leave the codebase in a better state.',
    title: 'Hands-on implementation support',
  },
].map((item) => ({
  ...item,
  icon: <CheckCircleIcon aria-hidden="true" />,
}));

const FREE_TOOLS = [
  {
    href: '/audit-gratuit',
    label: 'Stack self-audit · FR',
    text: '32 questions on foundations, ecosystem, data layer and devops. A score out of 100 in 3 minutes.',
    title: 'Score your React Native stack',
  },
  {
    href: '/react-native-security-audit',
    label: 'Security · 12 checks',
    text: 'Leaked API keys, insecure storage, exposed APIs, deep links and WebViews.',
    title: 'React Native security self-audit',
  },
  {
    href: '/react-native-swift-package-manager-migration',
    label: 'iOS · CocoaPods',
    text: 'Find out what blocks your iOS app before the December 2026 CocoaPods deadline.',
    title: 'Swift Package Manager readiness',
  },
];

const faqs: FaqProps[] = [
  {
    answer: `${PRICE || 'A fixed fee'}, agreed upfront for up to 2 weeks of work. Need more hands-on time? Add extra working hours to the package.`,
    id: 'audit-faq-price',
    question: 'How much does the audit cost?',
  },
  {
    answer:
      'You tell us where your app is getting stuck, we ask about your stack, your team and your release process, and we tell you honestly whether an audit is the right next step. No prep needed.',
    id: 'audit-faq-call',
    question: 'What happens on the 30-minute call?',
  },
  {
    answer:
      '2 weeks from kickoff to delivery. Phase 1 (investigation) = 3 days. Phase 2 (execution) = 7-10 days.',
    id: 'audit-faq-1',
    question: 'How long does the audit take?',
  },
  {
    answer:
      'No. We work in parallel with your team. You keep shipping features while we audit/upgrade.',
    id: 'audit-faq-2',
    question: 'Do we need to pause development during the audit?',
  },
  {
    answer:
      'We prioritize by ROI. Critical fixes go first. Anything beyond 2 weeks gets added to a long-term roadmap with effort estimates.',
    id: 'audit-faq-3',
    question: "What if you find issues that can't be fixed in 2 weeks?",
  },
  {
    answer:
      'Your choice. We deliver a complete roadmap you can execute internally, or you can upgrade to Essential/Growth for ongoing support.',
    id: 'audit-faq-4',
    question: 'Can we execute the roadmap ourselves or do we need you?',
  },
  {
    answer:
      "We've upgraded apps from React Native 0.59 to the latest release. No version is too old.",
    id: 'audit-faq-5',
    question: 'What React Native versions do you support?',
  },
  {
    answer:
      'Yes. We run full QA testing before release. If something breaks post-launch, we fix it (included in the 2 follow-up calls).',
    id: 'audit-faq-6',
    question: 'Do you guarantee the upgrade will work?',
  },
];

const auditSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${AUDIT_URL}#service`,
      '@type': 'Service',
      areaServed: 'Worldwide',
      description:
        'A 2-week React Native codebase audit: architecture and dependency review, performance and reliability hotspots, a ranked roadmap, and hands-on support on the top fixes.',
      name: 'React Native Codebase Audit',
      ...(PRICE_AMOUNT && {
        offers: {
          '@type': 'Offer',
          price: PRICE_AMOUNT,
          priceCurrency: 'EUR',
          url: AUDIT_URL,
        },
      }),
      provider: {
        '@type': 'Organization',
        name: 'weshipit.today',
        url: 'https://weshipit.today',
      },
      serviceType: 'Software code audit',
      url: AUDIT_URL,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          item: 'https://weshipit.today',
          name: 'Home',
          position: 1,
        },
        {
          '@type': 'ListItem',
          item: AUDIT_URL,
          name: 'React Native Audit',
          position: 2,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ answer, question }) => ({
        '@type': 'Question',
        acceptedAnswer: { '@type': 'Answer', text: answer },
        name: question,
      })),
    },
  ],
};

function SectionHeading({
  children,
  description,
  eyebrow,
  id,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
  eyebrow: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Text as="p" variant="eyebrow" tone="primary">
        {eyebrow}
      </Text>
      <Text as="h2" variant="h3" className="mt-2 text-balance" id={id}>
        {children}
      </Text>
      {description && (
        <Text
          as="p"
          variant="p1"
          className="mt-4 text-pretty text-slate-600 dark:text-slate-300"
        >
          {description}
        </Text>
      )}
    </div>
  );
}

function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-24"
    >
      <SectionHeading
        eyebrow="A small, focused engagement"
        id="process-heading"
        description="No speculative rewrite. We trace the actual bottlenecks in your app, agree on what matters, then make targeted improvements with your team."
      >
        Clarity first. Then forward motion.
      </SectionHeading>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.label}>
            <Card size="md" className="h-full">
              <Text
                as="p"
                variant="eyebrow"
                tone="primary"
                className="font-mono tabular-nums"
              >
                {step.label}
              </Text>
              <Text as="h3" variant="h6" className="mt-3">
                {step.title}
              </Text>
              <Text
                as="p"
                variant="p2"
                className="mt-3 text-pretty text-slate-600 dark:text-slate-300"
              >
                {step.text}
              </Text>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Deliverables() {
  return (
    <section
      id="deliverables"
      aria-labelledby="deliverables-heading"
      className="grid scroll-mt-24 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16"
    >
      <div>
        <SectionHeading
          eyebrow="What you take away"
          id="deliverables-heading"
          description="Every recommendation comes with context, impact, and a next move. You keep the plan whether or not we work together after the audit."
        >
          A useful map, not a scary score.
        </SectionHeading>
        {PRICE && (
          <p className="mt-8 flex items-baseline gap-2">
            <Text
              as="span"
              variant="inherit"
              className="font-display text-3xl font-bold tabular-nums"
            >
              {PRICE}
            </Text>
            <Text as="span" variant="inherit" tone="muted">
              fixed fee · 2 weeks
            </Text>
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 min-[400px]:flex-row">
          <LinkButton size="lg" href={linksApi.cal.ONBOARDING}>
            <CalendarIcon className="mr-2 size-4" />
            Book a 30-min call
          </LinkButton>
          {kickstart?.href && (
            <LinkButton size="lg" variant="outline" href={kickstart.href}>
              Reserve your audit
            </LinkButton>
          )}
        </div>
        <Text as="p" variant="small" tone="muted" className="mt-3">
          Already decided? Reserve online and we schedule the kickoff with you.
        </Text>
      </div>
      <FeatureGrid items={DELIVERABLES} columns={2} className="my-0" />
    </section>
  );
}

function Outcome() {
  return (
    <section className="mx-auto max-w-3xl text-center">
      <Text as="p" variant="eyebrow" tone="primary">
        The outcome
      </Text>
      <Text as="h2" variant="h3" className="mt-4 text-balance">
        Stop debating what to rewrite. Start fixing what is{' '}
        <Text as="span" variant="inherit" tone="primary">
          actually slowing you down.
        </Text>
      </Text>
      <Text as="p" variant="p1" tone="muted" className="mt-6">
        A calmer codebase. A clearer next release.
      </Text>
    </section>
  );
}

function FreeTools() {
  return (
    <section aria-labelledby="free-tools-heading">
      <SectionHeading
        eyebrow="Free · no call needed"
        id="free-tools-heading"
        description="We turned parts of our audit grid into self-audits. Run them first, then bring the results to the call."
      >
        Not ready for a full audit yet?
      </SectionHeading>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {FREE_TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="group block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Card
                size="md"
                className="flex h-full flex-col group-hover:shadow-lg"
              >
                <Text as="p" variant="eyebrow" tone="primary">
                  {tool.label}
                </Text>
                <Text as="h3" variant="h6" className="mt-2 text-balance">
                  {tool.title}
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-2 mb-6 text-pretty text-slate-600 dark:text-slate-300"
                >
                  {tool.text}
                </Text>
                <span className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Start for free
                  <ArrowRightIcon className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Audit({ clients }: AuditProps) {
  return (
    <Layout
      seoTitle="React Native Code Audit in 2 Weeks"
      seoDescription={
        'The focused React Native codebase audit: find the friction, get a prioritized plan, and fix the important bits in two weeks.'
      }
      ogImageTitle="React Native Codebase Audit"
      ogImageSubline="Make your app easier to ship"
      withHeader
      callToActionButton={{
        href: linksApi.cal.ONBOARDING,
        isExternalLink: true,
        name: 'Book a call',
      }}
      withFooter
      withContainer
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(auditSchema) }}
        />
      </Head>
      <FadeIn>
        <HeroSplit
          eyebrow={
            <Text as="p" variant="eyebrow" tone="primary">
              React Native & Expo codebase audit · Fixed fee · 2 weeks
            </Text>
          }
          title={
            <>
              Make your app easier to{' '}
              <Text as="span" variant="inherit" tone="primary">
                ship.
              </Text>
            </>
          }
          description="The focused engineering audit for teams who've outgrown their React Native codebase. Find the friction, get a prioritized plan, and fix the important bits in two weeks."
          actions={
            <>
              <LinkButton size="xl" href={linksApi.cal.ONBOARDING}>
                <CalendarIcon className="mr-2 size-4" />
                Book a 30-min call
              </LinkButton>
              <LinkButton
                variant="outline"
                className="group"
                size="xl"
                href="#process"
              >
                See how it works
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </>
          }
          note={
            <>
              {PRICE && <>{PRICE} fixed fee. </>}Senior engineers. Clear scope.
              No 80-page report that gathers dust.
            </>
          }
          visual={<AuditAnimation />}
        >
          {clients.length > 0 && (
            <div className="mt-16">
              <Text
                tone="muted"
                as="p"
                variant="eyebrow"
                className="text-center"
              >
                Apps we audited
              </Text>
              <ClientsListMarkee clients={clients} />
            </div>
          )}
        </HeroSplit>
      </FadeIn>

      <div className="space-y-24 pb-8 sm:space-y-32">
        <FadeIn>
          <Process />
        </FadeIn>
        <FadeIn>
          <Deliverables />
        </FadeIn>
        <FadeIn>
          <Outcome />
        </FadeIn>
      </div>

      <div className="mx-auto max-w-3xl">
        <Faq
          faqs={faqs}
          headingId="faq-heading"
          title="Common questions about our audit"
        />
      </div>

      <div className="mx-auto mb-24 max-w-4xl">
        <BookDiscoveryCta
          ctaLink={linksApi.cal.ONBOARDING}
          title="Know what to fix. Get back to shipping."
          description="Tell us where your React Native app is getting stuck. 30 minutes, no prep needed: you leave knowing whether an audit is the right next step."
          buttonLabel="Book a 30-min call"
        />
      </div>

      <div className="mb-24">
        <FreeTools />
      </div>
    </Layout>
  );
}

export default Audit;
