import { getAllClients } from '../api/client';
import { getAllFeedback, FeedbackPrismicDocument } from '../api/feedback';
import { Layout } from '../../components/layout';
import {
  Button,
  Card,
  Text,
  ClientProps,
  Badge,
  ClientsListHomepage,
} from '@weshipit/ui';
import { linksApi } from '../api/links';
import {
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  UsersIcon,
  Cog6ToothIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Container } from '../audit';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

interface MigrationProps {
  clients: ClientProps[];
  feedback: FeedbackPrismicDocument[];
}

export async function getStaticProps() {
  const [{ clients }, { feedback }] = await Promise.all([
    getAllClients(),
    getAllFeedback(),
  ]);

  return {
    props: {
      clients: clients ?? [],
      feedback: feedback ?? [],
    },
  };
}

export function Migration({ clients, feedback }: MigrationProps) {
  return (
    <Layout
      seoTitle="Migrate to Expo - Simplify Your React Native Development"
      seoDescription={
        'Our React Native to Expo Migration Package helps organizations transition their codebase to Expo, improving development speed and efficiency. Book a call today to learn more.'
      }
      withHeader
      withFooter
    >
      {/* Hero Section - Dark Gradient Background */}
      <section className="bg-gradient-to-b py-20 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-base/7 font-semibold text-primary">
              Trusted by 200+ Companies
            </h2>
            <Text
              as="h1"
              variant="h1"
              className="tracking-tight text-slate-900 dark:text-white"
            >
              Transform Your <span className="text-primary">React Native</span>{' '}
              App with Expo
            </Text>
            <Text variant="p1" className="text-slate-600 dark:text-slate-400">
              Unlock faster development cycles, easier updates, and superior
              performance with our expert migration service.
              <span className="font-medium text-slate-900 dark:text-white">
                {' '}
                30% faster development guaranteed.
              </span>
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button
                href={linksApi.cal.ONBOARDING}
                as="a"
                isExternalLink
                withExternalLinkIcon={false}
                size="xl"
                className="font-medium"
              >
                Book a Free Strategy Call{' '}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2 justify-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-950 bg-slate-300 dark:bg-slate-700"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-white">
                  Join 200+ companies
                </span>{' '}
                who successfully migrated
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Clients Section - Default Dark Background (dark:bg-slate-900) */}
      <div className="py-16 dark:bg-slate-900">
        <ClientsListHomepage clients={clients} />
      </div>

      {/* Benefits Section - Lighter Dark Background */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base/7 font-semibold text-primary">
              Why Choose Us
            </h2>
            <Text
              variant="h2"
              as="h2"
              className="mb-4 text-slate-900 dark:text-white"
            >
              The Smart Way to Upgrade Your React Native App
            </Text>
            <Text
              variant="p1"
              as="p"
              className="text-slate-600 dark:text-slate-400"
            >
              Our proven migration process delivers tangible benefits from day
              one, with minimal disruption to your team
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card shadow="light" className="border-none">
              <div className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Proven Expertise
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  With 6+ years of specialized experience in React Native and
                  Expo migrations since 2017, we've successfully delivered 200+
                  projects across multiple industries.
                </p>
              </div>
            </Card>

            <Card shadow="light" className="border-none">
              <div className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  30% Faster Development
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our clients report 30% faster development cycles after
                  migration. We handle the complex technical work so your team
                  can focus on building features that matter.
                </p>
              </div>
            </Card>

            <Card shadow="light" className="border-none">
              <div className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <BoltIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Seamless Integration
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your app will work flawlessly with the latest Expo features.
                  We ensure zero downtime during transition with our parallel
                  development approach.
                </p>
              </div>
            </Card>

            <Card shadow="light" className="border-none">
              <div className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <BanknotesIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Fixed Pricing Guarantee
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  No surprises or hidden costs. We provide a clear, transparent
                  budget upfront with our satisfaction guarantee - you only pay
                  when you're completely satisfied.
                </p>
              </div>
            </Card>

            <Card shadow="light" className="border-none">
              <div className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Cog6ToothIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Tailored Migration Plan
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Every app is unique. We create custom migration strategies
                  based on your specific needs, codebase complexity, and
                  business requirements.
                </p>
              </div>
            </Card>

            <Card shadow="light" className="border-none">
              <div className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Comprehensive Support
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our relationship doesn't end after migration. We provide 3
                  months of post-migration support to ensure your team is fully
                  equipped to leverage Expo's capabilities.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Process Section - Default Dark Background (dark:bg-slate-900) */}
      <section
        className="my-0 py-20 bg-slate-50 dark:bg-slate-900"
        id="process"
      >
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base/7 font-semibold text-blue-600">
              Our Process
            </h2>
            <Text
              variant="h2"
              as="h2"
              className="mb-4 text-slate-900 dark:text-white"
            >
              How We Transform Your App
            </Text>
            <Text
              variant="p1"
              as="p"
              className="text-slate-600 dark:text-slate-400"
            >
              Our battle-tested migration process ensures a smooth transition
              with minimal disruption
            </Text>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-black dark:text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Free Technical Assessment
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We analyze your codebase, identify potential challenges, and
                  create a detailed migration roadmap.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-black dark:text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Custom Migration Strategy
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We develop a tailored plan that addresses your specific needs
                  and minimizes business disruption.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-black dark:text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Parallel Development
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We migrate your app while your team continues development,
                  ensuring no feature freeze or downtime.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-black dark:text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Comprehensive Testing
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Rigorous testing across devices and platforms ensures your app
                  works flawlessly after migration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-black dark:text-white flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  Knowledge Transfer & Support
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We train your team on Expo best practices and provide 3 months
                  of post-migration support.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section - Lighter Dark Background */}
      <section id="testimonials" className="my-0 py-20 ">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base/7 font-semibold text-blue-600">
              Success Stories
            </h2>
            <Text
              variant="h2"
              as="h2"
              className="mb-4 text-slate-900 dark:text-white"
            >
              What Our Clients Say
            </Text>
            <Text
              variant="p1"
              as="p"
              className="text-slate-600 dark:text-slate-400"
            >
              Don't just take our word for it - hear from companies who've
              successfully made the switch
            </Text>
          </div>

          {/* Dynamically render feedback items, centered */}
          <div className="flex flex-wrap justify-center gap-8">
            {feedback.map((item) => (
              <Card
                key={item.id}
                shadow="light"
                className="border-none max-w-md w-full"
              >
                <div className="pt-6 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {/* Assuming a 5-star rating, use solid yellow stars */}
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIconSolid
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                      />
                    ))}
                  </div>
                  <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                    <PrismicRichText field={item.data.review} />
                  </div>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                    <PrismicNextImage
                      field={item.data.avatar}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 object-cover"
                      imgixParams={{ fit: 'crop', ar: '1:1' }}
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        <PrismicText field={item.data.full_name} />
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <PrismicText field={item.data.job_title} />,{' '}
                        <PrismicText field={item.data.company} />
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Keep the button, adjust link if needed */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Read More Success Stories
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section - Primary Background */}
      <section className="my-0 py-20 bg-white dark:bg-slate-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Text variant="h2" as="h2" className="text-black dark:text-white">
              Ready to Supercharge Your React Native App?
            </Text>
            <Text variant="p1" as="p" className="text-black dark:text-white">
              Book a free strategy call to discuss your migration needs and get
              a custom plan.
            </Text>
            <div className="flex justify-center pt-4">
              <Button
                size="xxl"
                variant="outline"
                href={linksApi.cal.ONBOARDING}
                as="a"
                isExternalLink
                withExternalLinkIcon={false}
                className="font-medium text-base bg-white text-primary hover:bg-slate-100"
              >
                Book Your Free Strategy Call
              </Button>
            </div>
            <p className="text-sm text-black dark:text-white/80 pt-4">
              No commitment required. 30-minute consultation with our migration
              experts.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section - Default Dark Background (dark:bg-slate-900) */}
      <section id="faq" className="my-0 py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base/7 font-semibold text-primary">FAQ</h2>
            <Text
              variant="h2"
              as="h2"
              className="mb-4 text-slate-900 dark:text-white"
            >
              Common Questions
            </Text>
            <Text
              variant="p1"
              as="p"
              className="text-slate-600 dark:text-slate-400"
            >
              Everything you need to know about our React Native to Expo
              migration service
            </Text>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                How long does the migration typically take?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Most migrations take 2-4 weeks depending on app complexity. We
                provide a specific timeline after our initial assessment.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Will my app's performance be affected?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                In most cases, performance improves after migration. We optimize
                your app during the process to ensure it runs smoothly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                What if we have custom native modules?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We handle custom native modules by either finding
                Expo-compatible alternatives or creating custom Expo development
                builds.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Can we continue development during migration?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes! Our parallel development approach allows your team to
                continue working while we handle the migration.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                What's your pricing model?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We offer fixed-price packages based on your app's complexity.
                After our free assessment, you'll receive a detailed quote with
                no hidden costs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                What support do you provide after migration?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                All migrations include 3 months of technical support, knowledge
                transfer sessions, and documentation to ensure your team's
                success.
              </p>
            </div>
          </div>
        </Container>
        <div className="m-auto max-w-4xl py-8 lg:py-24">
          <Card
            size="xl"
            className="m-auto my-24 flex flex-col items-center justify-center gap-8 text-center"
            variant="gradient-blue"
          >
            <Text
              variant="h3"
              as="h2"
              className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
            >
              Ready to Migrate?
            </Text>
            <Text
              variant="p1"
              as="p"
              className="max-w-md bg-gradient-to-b from-white to-white/75 bg-clip-text font-medium tracking-tight text-transparent drop-shadow"
            >
              Get expert advice on your migration path. No commitment required.
            </Text>
            <Button
              size="xxl"
              href={linksApi.cal.ONBOARDING}
              as="a"
              isExternalLink
              withExternalLinkIcon={false}
              variant="outline"
              className="font-medium text-base bg-white text-primary hover:bg-slate-100"
            >
              Book Your Free Strategy Call
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

export default Migration;
