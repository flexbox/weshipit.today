import { getAllClients } from '../api/client';
import { Layout } from '../../components/layout';
import { AuditRouteAnimation } from '../../components/audit-route-animation';
import {
  FadeIn,
  HeroSplit,
  LinkButton,
  ClientsListMarkee,
  Prose,
  Card,
  Text,
  ClientProps,
  Faq,
  FaqProps,
  pricingTiers,
} from '@weshipit/ui';
import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { linksApi } from '../api/links';

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
    revalidate: 86400,
  };
}

const STEPS = [
  {
    step: '01',
    title: 'Scan',
    when: 'Phase 1 · days 1 to 3',
    text: 'We investigate your codebase, native config and dependencies, then estimate the effort behind every finding.',
  },
  {
    step: '02',
    title: 'Backlog',
    when: 'Phase 1 · day 3',
    text: 'Notes, feasibility studies and estimations land in a Notion backlog we share with you, ranked by ROI.',
  },
  {
    step: '03',
    title: 'Upgrade',
    when: 'Phase 2',
    text: 'We pick the target React Native version or Expo SDK with you, upgrade third-party libraries and add the tools your stack is missing.',
  },
  {
    step: '04',
    title: 'Release',
    when: 'Phase 2 · day 14',
    text: 'We test the upgrade with your test suite and QA team, or our QA engineers, then help you ship it to App Store Connect and Google Play.',
  },
];

const DELIVERABLES = [
  {
    label: 'Notion backlog',
    text: 'Every finding written down, estimated and prioritized. You keep it, whoever executes it.',
  },
  {
    label: 'Upgraded dependencies',
    text: (
      <>
        Compatibility issues flagged with <code>dep-check</code> and{' '}
        <code>@rnx-kit/align-deps</code>, then fixed.
      </>
    ),
  },
  {
    label: 'Unblocked releases',
    text: 'A tested build on its way to the App Store and Google Play, not a PDF of advice.',
  },
  {
    label: '3 months of follow-up',
    text: '2 strategic calls and Slack access for critical questions after delivery.',
  },
];

const FREE_TOOLS = [
  {
    href: '/audit-gratuit',
    label: 'Stack self-audit · FR',
    title: 'Score your React Native stack',
    text: '32 questions on foundations, ecosystem, data layer and devops. A score out of 100 in 3 minutes.',
  },
  {
    href: '/react-native-security-audit',
    label: 'Security · 12 checks',
    title: 'React Native security self-audit',
    text: 'Leaked API keys, insecure storage, exposed APIs, deep links and WebViews.',
  },
  {
    href: '/react-native-swift-package-manager-migration',
    label: 'iOS · CocoaPods',
    title: 'Swift Package Manager readiness',
    text: 'Find out what blocks your iOS app before the December 2026 CocoaPods deadline.',
  },
];

const faqs: FaqProps[] = [
  {
    id: 'audit-faq-1',
    question: 'How long does the audit take?',
    answer:
      '2 weeks from kickoff to delivery. Phase 1 (investigation) = 3 days. Phase 2 (execution) = 7-10 days.',
  },
  {
    id: 'audit-faq-2',
    question: 'Do we need to pause development during the audit?',
    answer:
      'No. We work in parallel with your team. You keep shipping features while we audit/upgrade.',
  },
  {
    id: 'audit-faq-3',
    question: "What if you find issues that can't be fixed in 2 weeks?",
    answer:
      'We prioritize by ROI. Critical fixes go first. Anything beyond 2 weeks gets added to a long-term roadmap with effort estimates.',
  },
  {
    id: 'audit-faq-4',
    question: 'Can we execute the roadmap ourselves or do we need you?',
    answer:
      'Your choice. We deliver a complete roadmap you can execute internally, or you can upgrade to Essential/Growth for ongoing support.',
  },
  {
    id: 'audit-faq-5',
    question: 'What React Native versions do you support?',
    answer:
      "We've upgraded apps from React Native 0.59 to the latest release. No version is too old.",
  },
  {
    id: 'audit-faq-6',
    question: 'Do you guarantee the upgrade will work?',
    answer:
      'Yes. We run full QA testing before release. If something breaks post-launch, we fix it (included in the 2 follow-up calls).',
  },
];

const auditSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${AUDIT_URL}#service`,
      areaServed: 'Worldwide',
      description:
        'A 2-week React Native codebase audit: prioritized technical debt backlog, dependency and React Native/Expo upgrades, and an unblocked release process.',
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

const EYEBROW = 'uppercase tracking-wide text-blue-600 dark:text-blue-400';

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
      <Text as="p" variant="c2" className={EYEBROW}>
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
        eyebrow="Fixed fee · 2 weeks"
        id="process-heading"
        description="One project, one price, up to 2 weeks. Need more hands-on work? Add extra working hours to the package."
      >
        How does the React Native audit work?
      </SectionHeading>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.step}>
            <Card size="md" className="h-full">
              <p className="font-mono text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                {step.step}
              </p>
              <Text as="h3" variant="h6" className="mt-3">
                {step.title}
              </Text>
              <Text
                as="p"
                variant="c2"
                className="mt-1 text-slate-500 dark:text-slate-400"
              >
                {step.when}
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
      aria-labelledby="deliverables-heading"
      className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16"
    >
      <div>
        <SectionHeading
          eyebrow="What you get"
          id="deliverables-heading"
          description="Our team has focused on React Native since 2016. We review your app like we would our own: performance, structure and tooling, with recommendations you can act on."
        >
          A plan your team can ship, not a report that gathers dust
        </SectionHeading>
        {PRICE && (
          <p className="mt-8 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold tabular-nums">
              {PRICE}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              fixed fee
            </span>
          </p>
        )}
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        {DELIVERABLES.map((item) => (
          <Card key={item.label} size="md">
            <dt>
              <Text as="span" variant="h6">
                {item.label}
              </Text>
            </dt>
            <dd className="mt-2 text-pretty text-slate-600 dark:text-slate-300">
              {item.text}
            </dd>
          </Card>
        ))}
      </dl>
    </section>
  );
}

function Benefits() {
  return (
    <section className="mx-auto max-w-2xl">
      <Prose size="lg">
        <h2>What can you gain from a React Native audit?</h2>
        <ol>
          <li>
            <strong>Time back.</strong> Auditing a React Native app is complex,
            so we own the entire process and you focus on other important
            aspects of your project.
          </li>
          <li>
            <strong>Compatibility with the ecosystem.</strong> React Native
            evolves fast, with new libraries, tools and community resources
            every month. A recent version keeps your dependencies compatible and
            makes new functionality easier to integrate.
          </li>
          <li>
            <strong>An unblocked release process</strong> for the App Store and
            Google Play.
          </li>
          <li>
            <strong>Better developer experience:</strong> easier debugging with
            React DevTools, better error messages, and many{' '}
            <a
              href="https://github.com/facebook/react-native/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              more features from the React Native changelog
            </a>
            .
          </li>
        </ol>
      </Prose>
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
                <Text as="p" variant="c2" className={EYEBROW}>
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
      seoTitle="React Native Audit: Fix Tech Debt in 2 Weeks"
      seoDescription={
        'Full React Native codebase audit in 2 weeks: prioritized backlog, dependency upgrades, unblocked releases. Trusted by apps serving millions of users.'
      }
      ogImageTitle="React Native Codebase Audit"
      withHeader
      callToActionButton={{
        name: 'Book a call',
        href: linksApi.cal.ONBOARDING,
        isExternalLink: true,
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
            <Text as="p" variant="c2" className={EYEBROW}>
              React Native & Expo · Fixed fee · 2 weeks
            </Text>
          }
          title="React Native codebase audit in 2 weeks"
          description="We map your technical debt, upgrade your dependencies and hand you a prioritized backlog, while your team keeps shipping features."
          actions={
            <>
              <LinkButton size="xl" href={linksApi.cal.ONBOARDING}>
                <CalendarIcon className="mr-2 size-4" />
                Book a call with David
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
          visual={<AuditRouteAnimation />}
        >
          {clients.length > 0 && (
            <div className="mt-16">
              <Text
                as="p"
                variant="c2"
                className="text-center uppercase tracking-wide text-slate-500 dark:text-slate-400"
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
          <Benefits />
        </FadeIn>
        <FadeIn>
          <FreeTools />
        </FadeIn>
        <FadeIn>
          <section className="mx-auto max-w-2xl">
            <Prose size="lg">
              <h2>What else can we do for you?</h2>
              <h3>Long-term maintenance</h3>
              <p>
                You gain peace of mind by freeing yourself from the task of
                ensuring that the product is always available for users. This
                allows you to focus on growing the product instead.
              </p>
              <h3>Improved performance and stability</h3>
              <p>
                Our team ensures that your app uses the most stable and
                optimized version of React Native. Your app will not only be
                more stable but will also offer better performance for its
                users.
              </p>
              <h3>Streamlining your app distribution</h3>
              <p>
                We are extensive users of the Expo application service and can
                assist your team in releasing and iterating more quickly.
              </p>
            </Prose>
          </section>
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
        <Card
          size="xl"
          className="flex flex-col items-center justify-center gap-6 text-center"
          variant="gradient-blue"
        >
          <Text as="h2" variant="h4" className="text-balance text-white">
            Improve your app today
          </Text>
          <Text as="p" variant="p1" className="max-w-xl text-pretty text-white">
            Get in touch and let&apos;s build memorable products together.
          </Text>
          <LinkButton
            href={linksApi.cal.ONBOARDING}
            variant="outline"
            size="xl"
          >
            Book a free call now
          </LinkButton>
        </Card>
      </div>
    </Layout>
  );
}

export default Audit;
