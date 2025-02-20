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
  ClientProps,
  Section as SectionDivider,
  Section,
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
import { BenefitItem, Container, Section as MigrationSection } from '../audit';

interface MigrationProps {
  clients: ClientProps[];
}

export async function getStaticProps() {
  const { clients } = await getAllClients();

  return {
    props: {
      clients,
    },
  };
}

function Discover() {
  return (
    <Container>
      <MigrationSection title="What is React Native to Expo Migration?">
        <div className="space-y-6">
          <p>
            Are you looking to migrate your React Native project to Expo for a{' '}
            <strong className="font-semibold">
              streamlined development experience
            </strong>{' '}
            and better management of your application lifecycle?
          </p>
          <p>
            Our team has been working with Expo and React Native since 2017, and
            we can assist you with a{' '}
            <strong className="font-semibold">
              seamless migration process
            </strong>
            . We’ll help you transition smoothly to Expo, ensuring your app
            continues to function as expected while gaining the benefits of Expo
            ecosystem.
          </p>
          <p>
            Let us guide you through this migration, addressing any challenges
            and optimizing your app performance.
          </p>
          <div className="not-prose">
            <Button
              href="/onboarding"
              size="xl"
              className="no-underline"
              variant="outline"
            >
              Migrate to Expo
            </Button>
          </div>
        </div>
      </MigrationSection>
    </Container>
  );
}

function Workflow() {
  return (
    <MigrationSection title="How does the migration process work?">
      <div className="space-y-6">
        <p>
          Our migration service is a fixed monthly fee that covers a one-time
          project. We offer a two-phase approach to ensure a smooth transition
          to Expo:
        </p>
        <h3>Phase 1</h3>
        <ul>
          <li>
            We evaluate your current codebase and identify areas for migration
          </li>
          <li>
            We create a migration plan, including necessary adjustments and
            tools, and share the plan with you.
          </li>
        </ul>
        <h4 className="mt-12 text-base font-semibold">
          Included in this phase
        </h4>
        <ul>
          <li>Migration Strategy</li>
          <li>Feasibility studies</li>
          <li>Effort estimations</li>
        </ul>
        <h3>Phase 2</h3>
        <ol>
          <li>
            Begin the migration by adapting your codebase for Expo, ensuring all
            components and native modules are compatible.
          </li>
          <li>
            Upgrade all libraries and tools to their latest versions to ensure
            compatibility and stability within the Expo environment.
          </li>
          <li>
            Optimize the build process, including:
            <ol>
              <li>Setting up Continuous Integration (CI) pipelines.</li>
              <li>Improving build efficiency and reliability.</li>
              <li>Streamlining deployment with Expo’s tools.</li>
            </ol>
          </li>
          <li>
            Conduct thorough testing, including:
            <ol>
              <li>Unit tests for individual components.</li>
              <li>Integration tests for module interactions.</li>
              <li>End-to-end tests to validate user flows.</li>
            </ol>
          </li>
          <li>
            Deploy the migrated app to the App Store and Google Play Store,
            ensuring all platform-specific requirements are met.
          </li>
          <li>
            Provide post-migration support to resolve any issues and ensure a
            smooth transition.
          </li>
        </ol>
      </div>
    </MigrationSection>
  );
}

// Benefits component
function Benefits() {
  return (
    <MigrationSection title="What can you gain with our React Native to Expo Migration Package?">
      <p>
        Migrating your React Native app to Expo can offer the following
        advantages:
      </p>
      <ol>
        <li>
          Simplified development workflow — Expo provides a{' '}
          <strong className="font-semibold">
            more streamlined and efficient development environment
          </strong>
          , reducing setup time and complexity.
        </li>
        <li>
          Better integration with modern tools — Expo ecosystem is designed to
          be up-to-date with the latest technologies, ensuring{' '}
          <strong className="font-semibold">
            smooth integration and enhanced development experience
          </strong>
          .
        </li>
        <li>Faster app updates and releases with Expo over-the-air updates.</li>
        <li>Access to Expo SDK features and services:</li>
        <ol>
          <li>
            Better push notification handling with Expo Notifications service,
          </li>
          <li>Streamlined asset management and easier build processes,</li>
          <li>
            and many{' '}
            <a href="https://expo.dev/features">
              more features available through Expo platform
            </a>
            .
          </li>
        </ol>
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
    </MigrationSection>
  );
}

function BenefitsList() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        <BenefitItem
          Icon={AcademicCapIcon}
          title="Proven Expertise"
          description="We’ve been working with Expo and React Native since 2017."
        />
        <BenefitItem
          Icon={ClockIcon}
          title="Time-Saving"
          description="We manage the migration, so you can focus on your project’s core."
        />
        <BenefitItem
          Icon={CheckCircleIcon}
          title="Seamless Integration"
          description="Your app will work smoothly with the latest Expo features."
        />
        <BenefitItem
          Icon={CurrencyDollarIcon}
          title="Fixed Pricing"
          description="No surprises, just a clear and straightforward budget."
        />
        <BenefitItem
          Icon={ClipboardDocumentCheckIcon}
          title="Tailored Solutions"
          description="Custom recommendations and a migration plan designed for you."
        />
        <BenefitItem
          Icon={ScaleIcon}
          title="Flexible Options"
          description="We can assist your team during and after the migration."
        />
      </div>
    </Container>
  );
}

export function Migration({ clients }: MigrationProps) {
  return (
    <Layout
      seoTitle="Migrate to Expo - Simplify Your React Native Development"
      seoDescription={
        'Our React Native to Expo Migration Package helps organizations transition their codebase to Expo, improving development speed and efficiency. Book a call today to learn more.'
      }
      withHeader
      withFooter
    >
      <Container>
        <FadeIn className="max">
          <div className="mx-auto mt-24 w-2/3">
            <Hero
              title="React Native to Expo Migration."
              description="Simplify your development process and enhance your app with Expo. Our team can guide you through a seamless migration, ensuring your app is ready to take advantage of all that Expo has to offer."
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

          <ClientsListAudit clients={clients} />

          <SectionDivider variant="transparent">
            <BenefitsList />
          </SectionDivider>
        </FadeIn>
      </Container>

      <div className="mt-12 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-8 lg:space-y-40">
        <Discover />
      </div>
      <Section variant="light">
        <Workflow />
      </Section>
      <div className="mt-12 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-8 lg:space-y-40">
        <Benefits />
      </div>
      <Section variant={'light'}>
        <Prose size="lg" className="mx-auto my-4 lg:my-32">
          <h2>What else can we do for you?</h2>
          <h3>Long-term maintenance</h3>
          <p>
            With Expo’s tools and our team’s expertise, you can focus on what
            matters most: growing your product, while we ensure it remains
            stable and optimized.
          </p>
          <h3>Improved performance and stability</h3>
          <p>
            Migrating to Expo ensures that your app is running on a stable and
            optimized platform, providing a better experience for your users.
          </p>
          <h3>Streamlined app distribution</h3>
          <p>
            Expo’s build and deployment tools can significantly reduce the
            complexity of releasing updates, and we can help you make the most
            of these capabilities.
          </p>
        </Prose>
      </Section>
      <div className="m-auto max-w-4xl py-8 lg:py-24">
        <Card
          size="xl"
          className="m-auto my-24 flex flex-col items-center justify-center gap-8 text-center"
          variant="gradient-purple"
        >
          <Text variant="h4" as="h2">
            Migrate to Expo today
          </Text>
          <Text variant="p1" as="p">
            Get in touch and let’s make your app better together.
          </Text>
          <Button
            size="xxl"
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

export default Migration;
