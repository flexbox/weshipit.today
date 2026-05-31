import { Card, LinkButton, Text } from '@weshipit/ui';
import Image from 'next/image';
import { Layout } from '../components/layout';

export default function BrandPage() {
  return (
    <Layout
      seoTitle="Brand"
      seoDescription="Download weshipit.today logos, assets, and brand guidelines."
      withHeader
      withFooter
    >
      <div className="m-auto max-w-4xl px-4">
        <div className="my-16">
          <Text as="h1" variant="h2" className="mb-4">
            Brand
          </Text>
          <Text variant="p1">
            Download weshipit.today logos and learn about our brand guidelines.
          </Text>
        </div>
        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Logo
          </Text>
          <Card size="lg">
            <div className="mb-4 flex h-32 items-center justify-center">
              <Image
                src="/images/weshipit.today-logo.png"
                alt="weshipit.today logo"
                width={100}
                height={100}
              />
            </div>
            <Text variant="p2" className="mb-4">
              Primary logo - PNG format
            </Text>
            <a
              href="/images/weshipit.today-logo.png"
              download="weshipit.today-logo.png"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
            >
              Download PNG
            </a>
          </Card>
        </section>

        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Styleguide
          </Text>
          <Text variant="p1" className="mb-4">
            A collection of packages used to share styles and icons across our
            websites and projects.
          </Text>
          <LinkButton
            href="https://design.weshipit.today"
            variant="outline"
            isExternalLink
          >
            View Styleguide
          </LinkButton>
        </section>

        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Brand Guidelines
          </Text>
          <Card size="lg">
            <Text as="h3" variant="h4" className="mb-4">
              Usage Guidelines
            </Text>
            <div className="mb-6">
              <Text
                variant="p2"
                className="mb-2 font-medium text-green-600 dark:text-green-400"
              >
                Do
              </Text>
              <ul className="list-inside list-disc space-y-2">
                <Text as="li" variant="p1">
                  Use the weshipit.today name in a secondary manner to describe
                  your integration
                </Text>
                <Text as="li" variant="p1">
                  Use allowed logos to indicate product compatibility
                </Text>
                <Text as="li" variant="p1">
                  Mention weshipit.today in articles or editorial content
                </Text>
              </ul>
            </div>
            <div>
              <Text
                variant="p2"
                className="mb-2 font-medium text-red-600 dark:text-red-400"
              >
                Don't
              </Text>
              <ul className="list-inside list-disc space-y-2">
                <Text as="li" variant="p1">
                  Modify the logos (colors, dimensions, or other alterations)
                </Text>
                <Text as="li" variant="p1">
                  Use the trademarks without written permission
                </Text>
                <Text as="li" variant="p1">
                  Use the brand in commercial names or domain names
                </Text>
              </ul>
            </div>
          </Card>
        </section>

        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Short Description
          </Text>
          <Text variant="p1">
            In response to the growing demands of software development,
            weshipit.today has shifted its focus to daily releases of React
            Native Apps on production.
          </Text>
        </section>

        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Long Description
          </Text>
          <Text variant="p1" className="mb-4">
            weshipit.today is a remote React Native design and development
            agency based in France. We specialize in React Native with Expo,
            offering expertise in mobile design and development. Our teams build
            robust apps and contribute to libraries that drive the React Native
            movement.
          </Text>
          <Text variant="p1">
            With our React Native Bootcamps, we've enabled more than 400 happy
            developers to successfully ship outstanding apps to their users.
          </Text>
        </section>
      </div>
    </Layout>
  );
}
