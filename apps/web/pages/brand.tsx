import { Card, Hyperlink, LinkButton, Text } from '@weshipit/ui';
import Image from 'next/image';
import { Layout } from '../components/layout';

const links = [
  {
    href: 'https://twitter.com/intent/follow?screen_name=flexbox_',
    label: 'X',
  },
  {
    href: 'https://github.com/flexbox/',
    label: 'GitHub',
  },
  {
    href: 'https://www.youtube.com/channel/UCO0X5b0mQ4eIHitXHXSFUyw?sub_confirmation=1',
    label: 'Youtube',
  },
];

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
            Wordmark
          </Text>
          <div className="grid gap-8 sm:grid-cols-2">
            <Card size="lg">
              <div className="mb-4 flex h-32 items-center justify-center rounded-md bg-white p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/weshipit-today-wordmark.svg"
                  alt="weshipit.today wordmark"
                  className="max-h-full w-full object-contain"
                />
              </div>
              <Text variant="p2" className="mb-4">
                Primary wordmark - for light backgrounds
              </Text>
              <div className="flex gap-3">
                <a
                  href="/images/weshipit-today-wordmark.svg"
                  download="weshipit-today-wordmark.svg"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
                >
                  Download SVG
                </a>
                <a
                  href="/images/weshipit-today-wordmark.png"
                  download="weshipit-today-wordmark.png"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
                >
                  Download PNG
                </a>
              </div>
            </Card>
            <Card size="lg">
              <div className="mb-4 flex h-32 items-center justify-center rounded-md bg-slate-900 p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/weshipit-today-wordmark-reversed.svg"
                  alt="weshipit.today wordmark, reversed"
                  className="max-h-full w-full object-contain"
                />
              </div>
              <Text variant="p2" className="mb-4">
                Reversed wordmark - for dark backgrounds
              </Text>
              <div className="flex gap-3">
                <a
                  href="/images/weshipit-today-wordmark-reversed.svg"
                  download="weshipit-today-wordmark-reversed.svg"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
                >
                  Download SVG
                </a>
                <a
                  href="/images/weshipit-today-wordmark-reversed.png"
                  download="weshipit-today-wordmark-reversed.png"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
                >
                  Download PNG
                </a>
              </div>
            </Card>
          </div>
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
            weshipit.today is a senior React Native agency based in France. We
            work with scale-ups to turn slow, brittle mobile apps into machines
            that ship every day. We also host Le Cross-Platform Show, a podcast
            featuring interviews with CTOs building React Native apps at scale.
          </Text>
        </section>

        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Long Description
          </Text>
          <Text variant="p1" className="mb-4">
            Founded in 2016, weshipit.today is a French agency working
            exclusively on React Native. We help scale-ups whose apps have
            become slow to evolve — accumulated dependencies, missing
            observability, fragile releases — and transform them into platforms
            that ship daily through three steps: foundations, ecosystem, and
            acceleration.
          </Text>
          <Text variant="p1" className="mb-4">
            Our model is intentionally narrow: a senior-only team, three clients
            maximum, and a monthly engagement with no long-term commitment.
            Clients see up to 90% code reuse, 100% automated releases, and apps
            that run offline-first in hostile environments — outcomes shaped by
            nearly a decade of shipping in production.
          </Text>
          <Text variant="p1">
            We also produce Le Cross-Platform Show, a podcast where we interview
            the CTOs and engineering leaders behind production React Native apps
            — including Alan, Cdiscount, and Swan — to share the architectures,
            costs, and trade-offs behind shipping mobile at scale.
          </Text>
        </section>

        <section className="my-16">
          <Text as="h2" variant="h3" className="mb-8">
            Links
          </Text>
          <ul className="list-inside list-disc space-y-2">
            {links.map((link) => (
              <Text as="li" variant="p1" key={link.href}>
                <Hyperlink href={link.href}>{link.label}</Hyperlink>
              </Text>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
