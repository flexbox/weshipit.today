import { getAllClients } from '../api/client';
import { Layout } from '../../components/layout';
import {
  FadeIn,
  Hero,
  Button,
  ClientsListAudit,
  Prose,
  Card,
  Text,
} from '@weshipit/ui';
import { linksApi } from '../api/links';
import {
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

// Define the shape of the props expected by the Audit component
interface AuditProps {
  clients: Customer[];
}

// Fetch the client data at build time
export async function getStaticProps() {
  const { clients } = await getAllClients();

  return {
    props: {
      clients,
    },
  };
}

// Container component
interface ContainerProps extends PropsWithChildren {
  as?: React.ElementType;
  className?: string;
}

export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component className={clsx('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  );
}

// Section component
function Section({ title, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-center lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="mx-auto mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)] dark:after:text-neutral-300"
              aria-hidden="true"
            />
            <Text as="h2" variant="h3" className="mt-2">
              {title}
            </Text>
            <Prose className="mt-6">{children}</Prose>
          </FadeIn>
        </div>
      </div>
    </Container>
  );
}

// Discover component
function Discover() {
  return (
    <Section title="What is React Native Audit?">
      <div className="space-y-6">
        <p>
          Are you seeking someone to review your work and{' '}
          <strong className="font-semibold">
            provide specific recommendations
          </strong>{' '}
          regarding performance, structure, and tools?
        </p>
        <p>
          Our team has been focused on React Native since 2016, and we can help
          you by conducting an{' '}
          <strong className="font-semibold">
            audit or review of your application
          </strong>
          . Based on the findings, we can work together to address any issues,
          taking into account availability and cost.
        </p>
        <p>
          We can also provide recommendations for improving your application.
        </p>
        <div className="not-prose">
          <Button
            href="/onboarding"
            size="xl"
            className="no-underline"
            variant="outline"
          >
            Start now
          </Button>
        </div>
      </div>
    </Section>
  );
}

// Workflow component
function Workflow() {
  return (
    <Section title="How does it work?">
      <div className="space-y-6">
        <p>
          Our service is a fixed fee that covers a one-time project. The process
          typically takes up to{' '}
          <strong className="font-semibold">2 weeks to complete</strong>. If you
          require more personalized work, you have the option to add additional
          working hours to your package.
        </p>
        <h3>Phase 1</h3>
        <ul>
          <li>
            We investigate your codebase and estimate efforts (3 working days).
          </li>
          <li>
            We write down notes and recommendations, and share the Notion
            database with you.
          </li>
        </ul>
        <h4 className="mt-12 text-base font-semibold">
          Included in this phase
        </h4>
        <ul>
          <li>Notion Backlog</li>
          <li>Feasibility studies</li>
          <li>Estimations</li>
        </ul>
        <h3>Phase 2</h3>
        <ol>
          <li>
            Based on our suggestions, we add new features and tools to improve
            your stack.
          </li>
          <li>We upgrade 3rd-party libraries and tools.</li>
          <li>We prepare the upgrade process and share the plan with you.</li>
          <ol>
            <li>
              We decide whether to upgrade to the latest React Native version or
              Expo SDK.
            </li>
            <li>
              We use tools like <code>dep-check</code> and
              <code>@rnx-kit/align-deps</code> to identify compatibility issues
              for your app dependencies.
            </li>
          </ol>
          <li>We run tests to ensure a successful upgrade:</li>
          <ol>
            <li>
              this step ideally engages your existing test suite and testing
              team.
            </li>
            <li>
              if necessary we can engage our QA engineers for manual testing.
            </li>
          </ol>
          <li>
            We help you upload the upgraded version to App Store Connect and
            Google Play Store if necessary.
          </li>
        </ol>
      </div>
    </Section>
  );
}

// Benefits component
function Benefits() {
  return (
    <Section title="What can you gain with our React Native Audit Package?">
      <p>
        Auditing the version of your React Native app can provide the following
        benefits:
      </p>
      <ol>
        <li>
          Reduced time and effort —unfortunately, auditing some React Native
          apps can be quite complex, so we can save your time and own the entire
          process to allow you to{' '}
          <strong className="font-semibold">
            focus on other important aspects of your project
          </strong>
          .
        </li>
        <li>
          Make sure your app is compatible with libraries —The React Native
          ecosystem is constantly evolving with various libraries, tools, and
          community resources. Ensuring that you have the latest version of
          React Native will make your app compatible with the latest versions of
          these dependencies, reduce compatibility issues, and{' '}
          <strong className="font-semibold">
            make it easier to integrate new functionalities into your app
          </strong>
          .
        </li>
        <li>Unblocked release process for App Store and Google Play.</li>
        <li>Access new features and improve DX:</li>
        <ol>
          <li>
            easier debugging with React DevTools and better error messages,
          </li>
          <li>better web-dev compatibility with flexbox gap support,</li>
          <li>
            and many{' '}
            <a href="https://github.com/facebook/react-native/blob/main/CHANGELOG.md">
              more feature from the React Native changelog
            </a>
            .
          </li>
        </ol>
        <div className="not-prose">
          <Button
            href="/onboarding"
            size="xl"
            className="mt-6 no-underline"
            variant="outline"
          >
            Book a call
          </Button>
        </div>
      </ol>
    </Section>
  );
}

// BenefitItem component
function BenefitItem({ Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="size-12 text-black dark:text-white" />
      <Text as="h3" variant="h4" className="mt-4">
        {title}
      </Text>
      <Text as="p" variant="p1">
        {description}
      </Text>
    </div>
  );
}

// BenefitsSection component
function BenefitsSection() {
  return (
    <div className="my-24 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <BenefitItem
        Icon={AcademicCapIcon}
        title="Deep Expertise"
        description="Expert recommendations tailored to your needs."
      />
      <BenefitItem
        Icon={ClockIcon}
        title="Time-Saving"
        description="We handle the audit, so you can focus elsewhere."
      />
      <BenefitItem
        Icon={CheckCircleIcon}
        title="Enhanced Compatibility"
        description="Stay updated with the latest libraries and tools."
      />
      <BenefitItem
        Icon={CurrencyDollarIcon}
        title="Fixed Pricing"
        description="No hidden costs, just a straightforward budget."
      />
      <BenefitItem
        Icon={ClipboardDocumentCheckIcon}
        title="Custom Recommendations"
        description="Tailored notes and recommendations for your project."
      />
      <BenefitItem
        Icon={ScaleIcon}
        title="Scalable Solutions"
        description="Flexibly scale the scope of work as needed."
      />
    </div>
  );
}

// TestimonialSection component
function TestimonialSection() {
  return (
    <div className="m-auto w-3/4">
      <div className="mt-12 lg:flex lg:items-center lg:justify-center lg:gap-x-8">
        <div className="flex w-full flex-col items-center rounded-lg bg-white py-8 text-center shadow-lg lg:w-1/2">
          <Text as="p" variant="quote" className="w-full italic">
            “What‘s better than good code? Less code.”
          </Text>
          <div className="mt-4 flex items-center justify-center">
            <a href="https://x.com/jamonholmgren">
              <Text
                as="p"
                variant="quote"
                className="mr-4 text-right font-semibold"
              >
                Jamon Holmgren
              </Text>
            </a>
            <Image
              src="https://pbs.twimg.com/profile_images/1712505856905170944/LDFMYGSQ_400x400.jpg"
              alt="Jamon Holmgren"
              className="size-16 rounded-full"
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Audit({ clients }: AuditProps) {
  return (
    <Layout
      seoTitle="Audit React Native App - Identify and Address Technical Debt"
      seoDescription={
        'Our React Native Audit Package helps organizations identify and address technical debt in their codebase, improving app performance and stability. Book a call today to learn more.'
      }
      withHeader
      withFooter
      withContainer
    >
      <FadeIn>
        <div className="mx-auto mt-24 w-2/3">
          <Hero
            title="React Native Codebase Audit."
            description="Eradicating your technical debt caused by a lack of expertise or capacity within your team. We can support your team by conducting the audit and allowing your organization to focus on its priorities without a drop in its development pace."
          >
            <div className="my-12">
              <Button
                href={linksApi.cal.ONBOARDING}
                as="a"
                isExternalLink
                withExternalLinkIcon={false}
                size="xxl"
                className="justify-center"
              >
                Start now
              </Button>
            </div>
          </Hero>
        </div>
      </FadeIn>
      <div className="mt-12 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-8 lg:space-y-40">
        <Discover />
        <TestimonialSection />
        <Workflow />
        <ClientsListAudit clients={clients} />
        <Benefits />
      </div>
      <div className="">
        <BenefitsSection />
      </div>
      <Prose size="lg" className="mx-auto my-4 lg:my-32">
        <h2>What else can we do for you?</h2>
        <h3>Long-term maintenance</h3>
        <p>
          You gain peace of mind by freeing yourself from the task of ensuring
          that the product is always available for users. This allows you to
          focus on growing the product instead.
        </p>
        <h3>Improved performance and stability</h3>
        <p>
          Our team ensures that your app uses the most stable and optimized
          version of React Native (RN). By doing so, your app will not only be
          more stable but will also offer better performance for its users.
        </p>
        <h3>Streamlining your app distribution</h3>
        <p>
          We are extensive users of the Expo application service and can assist
          your team in releasing and iterating more quickly.
        </p>
      </Prose>
      <div className="m-auto max-w-4xl py-8 lg:py-24">
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
            Ready to start your journey with us?
          </Text>
          <Text
            variant="p1"
            as="p"
            className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
          >
            Get in touch today and let’s build memorable products together.
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
    </Layout>
  );
}

export default Audit;
