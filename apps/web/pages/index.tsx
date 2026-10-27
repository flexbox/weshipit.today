import {
  Button,
  Card,
  FadeIn,
  Hyperlink,
  Prose,
  Text,
  WorkflowCard,
  Avatar,
  Pricing,
  HeroBanner,
  Badge,
  ClientsListMarkee,
} from '@weshipit/ui';
import { linksApi } from './api/links';
import { Layout } from '../components/layout';
import Head from 'next/head';
import { Customer, getVisibleClients } from './api/client';
import { Steps, getAllWorkflowSteps } from './api/workflow-steps';
import { PrismicRichText } from '@prismicio/react';

import { useState, useEffect } from 'react';
import { TrustedConsultantsSection } from '../components/trusted-consultants-section';
import { FaqSection, faqPageSchema, faqs } from '../components/faq-section';
import {
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  BuildingOffice2Icon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface IndexPageProps {
  steps: Steps[];
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

function LocalTimeInFrance() {
  const localTime = useGetLocalTimeInFrance();
  return <span className="tabular-nums">{localTime}</span>;
}

function ProblemAgitation() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;

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
          className="rounded-full border-4 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700 z-50"
          size={64}
          email="dleuliette@gmail.com"
        />
        <Avatar
          className="rounded-full border-4 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700 -ml-4 mr-4 "
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
        <code>qwerty</code> keyboards. It&apos;s <LocalTimeInFrance /> for us
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

interface TeamMember {
  name: string;
  role: string;
  email: string;
  accent: string;
  worksOn: string[];
  experienceStarted: number;
  handles: { icon: React.ReactNode; text: string }[];
}

const teamMembers: TeamMember[] = [
  {
    accent: 'from-blue-600 to-cyan-300',
    email: 'dleuliette@gmail.com',
    experienceStarted: 2007,
    handles: [
      { icon: <SparklesIcon className="size-4" />, text: 'Strategic audits' },
      {
        icon: <BuildingOffice2Icon className="size-4" />,
        text: 'Complex architecture',
      },
      {
        icon: <RocketLaunchIcon className="size-4" />,
        text: 'Enterprise clients',
      },
    ],
    name: 'David Leuliette',
    role: 'Senior Expert',
    worksOn: ['Kickstart', 'Enterprise'],
  },
  {
    accent: 'from-amber-500 to-emerald-600',
    email: 'ducrocq.matthys@gmail.com',
    experienceStarted: 2021,
    handles: [
      { icon: <BoltIcon className="size-4" />, text: 'Sprint execution' },
      {
        icon: <ArrowPathIcon className="size-4" />,
        text: 'Continuous delivery',
      },
      {
        icon: <ArrowTrendingUpIcon className="size-4" />,
        text: 'Scaling support',
      },
    ],
    name: 'Matthys Ducrocq',
    role: 'Lead Developer',
    worksOn: ['Essential', 'Growth'],
  },
];

export function TeamSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-base/7 font-semibold text-blue-600">
            Trusted Experts
          </p>
          <Text variant="h1" as="h2">
            Meet your React Native team
          </Text>
          <Text
            as="p"
            variant="p1"
            className="max-w-2xl mx-auto mt-4 text-muted-foreground"
          >
            We’re a specialized duo combining strategic expertise with reliable
            execution.
          </Text>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="group relative overflow-hidden ring-0 bg-card shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Gradient accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.accent}`}
              />

              <div className="p-8">
                {/* Avatar & Info */}
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className={`relative p-1 rounded-full bg-gradient-to-br ${member.accent}`}
                  >
                    <div className="relative size-20 rounded-full overflow-hidden">
                      <Avatar
                        className="bg-slate-300 dark:bg-slate-700"
                        size={128}
                        email={member.email}
                      />
                    </div>
                  </div>
                  <div className="pt-1">
                    <Text as="h3" variant="h5">
                      {member.name}
                    </Text>
                    <p className="text-muted-foreground">{member.role}</p>
                    <Badge variant="gray-lighter" className="mt-2" size="sm">
                      {currentYear - member.experienceStarted}+ years
                    </Badge>
                  </div>
                </div>

                {/* Handles */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Handles
                  </h4>
                  <div className="space-y-2.5">
                    {member.handles.map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <span className="text-muted-foreground">
                          {item.icon}
                        </span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Works On */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Works on
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.worksOn.map((plan) => (
                      <Badge key={plan} className="px-3 py-1">
                        {plan}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowDoesItWorks({ steps }: { steps: Steps[] }) {
  return (
    <div className="container px-4 py-16 mx-auto" id="services">
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
        </div>
      </div>
    </div>
  );
}

export default function IndexPage({ clients, steps }: IndexPageProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    description:
      'Subscription-based React Native development agency. We build and maintain iOS and Android apps for startups and scale-ups.',
    foundingDate: '2016',
    knowsAbout: [
      'React Native',
      'iOS',
      'Android',
      'Expo',
      'Mobile Development',
    ],
    name: 'weshipit.today',
    url: 'https://weshipit.today',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: 'https://weshipit.today',
        name: 'Home',
        position: 1,
      },
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    description:
      'Subscription-based React Native developers. One flat fee, zero billable hours. Pause or cancel anytime.',
    name: 'weshipit.today',
    url: 'https://weshipit.today',
  };

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        name: 'Customers',
        position: 1,
        url: 'https://weshipit.today/customers',
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'About',
        position: 2,
        url: 'https://weshipit.today/about',
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Podcast',
        position: 3,
        url: 'https://weshipit.today/podcast',
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'React Native Audit',
        position: 4,
        url: 'https://weshipit.today/audit',
      },
    ],
  };

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbSchema.itemListElement,
      },
      {
        '@type': 'Organization',
        description: organizationSchema.description,
        foundingDate: organizationSchema.foundingDate,
        knowsAbout: organizationSchema.knowsAbout,
        name: organizationSchema.name,
        url: organizationSchema.url,
      },
      faqPageSchema(faqs),
      {
        '@type': 'WebSite',
        description: webSiteSchema.description,
        name: webSiteSchema.name,
        url: webSiteSchema.url,
      },
      {
        '@type': 'ItemList',
        itemListElement: siteNavigationSchema.itemListElement,
      },
    ],
  };

  return (
    <>
      <Head>
        <link rel="alternate" hrefLang="en" href="https://weshipit.today/" />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/bonjour"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema),
          }}
        />
      </Head>
      <Layout
        seoTitle="Hire React Native Developers as a Service"
        ogImageTitle="Hire React Native developers as a service"
        ogImageSubline="One flat fee. Pause or cancel anytime."
        seoDescription="Subscription-based React Native developers. One flat fee, zero billable hours. Pause or cancel anytime."
        ogImageAlt="weshipit.today — Hire React Native Developers as a Service"
        withHeader
        navigation={[
          { href: '#services', name: 'Services' },
          { href: '#pricing', name: 'Pricing' },
          { href: '#faq', name: 'Faq' },
        ]}
        callToActionButton={{
          href: linksApi.cal.ONBOARDING,
          isExternalLink: true,
          name: 'Book a call',
        }}
        withFooter
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <HeroBanner onboardingHref={linksApi.cal.ONBOARDING}>
              <ClientsListMarkee clients={clients} />
            </HeroBanner>
          </FadeIn>
          <div className="m-auto max-w-2xl mb-24">
            <FadeIn>
              <Prose size="2xl">
                <ProblemAgitation />
              </Prose>
            </FadeIn>
          </div>
        </div>

        <TrustedConsultantsSection />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="m-auto max-w-5xl">
            <HowDoesItWorks steps={steps} />
          </div>
        </div>

        <TeamSection />
        <Pricing ctaLink={linksApi.cal.ONBOARDING} />

        <FaqSection />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { clients } = await getVisibleClients();
  const { steps } = await getAllWorkflowSteps();

  return {
    props: {
      clients,
      steps,
    },
    revalidate: 86400,
  };
}
