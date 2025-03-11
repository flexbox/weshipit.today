'use client';

import { CheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { SpotLeft } from '../spot-left/spot-left';
import Button from 'libs/ui/src/lib/button/button';
import { Card } from 'libs/ui/src/lib/card/card';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/monthly' },
  { value: 'onetime', label: 'One time', priceSuffix: '/one time' },
];
const tiers = [
  {
    name: 'Kickstart',
    id: 'tier-kickstart',
    href: '#',
    price: { onetime: '10000 €' },
    description:
      'Get started with our one-time package led by award-winning expert David Leuliette for strategic insights to launch or revitalize your React Native app.',
    features: [
      'Comprehensive stack audit and assessment',
      '2 phases implementation: investigation and execution',
      'Definition of key objectives and success metrics',
      'High-level strategy document',
      'DX improvements and performance optimizations',
      'Recommendations for library and tooling updates',
      '2 follow-up strategy calls within the first three months',
    ],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Essential',
    id: 'tier-essential',
    href: '#',
    price: { monthly: '2500 €' },
    description:
      'Get started with a solid foundation guided by an industry leader. This plan offers focused strategic consultation to ensure your community engagement is on the right track.',
    features: [
      '40 hours of software development',
      '24-hour support response time on Slack',
      'Weekly backlog calls',
    ],
    featured: false,
    cta: 'Get Started',
    spotsLeft: 3,
  },
  {
    name: 'Growth',
    id: 'tier-growth',
    href: '#',
    price: { monthly: '6750 €' },
    description:
      'Elevate your efforts with more frequent strategy sessions and in-depth support. This package is perfect for growing teams looking to scale with expert insight.',
    features: [
      '120 hours of software development',
      '24-hour support response time on Slack',
      'Weekly backlog calls',
    ],
    featured: false,
    cta: 'Get Started',
    spotsLeft: 1,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: 'Custom',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Custom hours of software development',
      '1-hour, dedicated support response time',
      'Daily backlog calls',
      'Marketing automations',
    ],
    featured: true,
    cta: 'Book a call with David',
    spotsLeft: 1,
  },
];

export function Pricing({ buttonLink }: { buttonLink: string }) {
  return (
    <div className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-blue-600">Pricing</h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Pricing that fits your needs
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          Our plans are designed to meet your company's needs. Begin with
          Kickstart, and scale to more advanced plans as your mobile app evolve.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={clsx('p-8 xl:p-10 isolate')}
              variant={tier.featured ? 'featured' : undefined}
              size="xs"
            >
              <h3
                id={tier.id}
                className={clsx(
                  'mb-4 text-lg/8 font-semibold',
                  tier.featured
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-900 dark:text-white',
                )}
              >
                {tier.name}
              </h3>
              {tier.spotsLeft && <SpotLeft spotsLeft={tier.spotsLeft} />}
              <p
                className={clsx(
                  'mt-4 text-sm/6',
                  tier.featured
                    ? 'text-gray-300 dark:text-gray-600'
                    : 'text-gray-600 dark:text-gray-300',
                )}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={clsx(
                    'text-4xl font-semibold tracking-tight',
                    tier.featured
                      ? 'text-white dark:text-gray-900'
                      : 'text-gray-900 dark:text-white',
                  )}
                >
                  {typeof tier.price === 'string'
                    ? tier.price
                    : tier.price.monthly || tier.price.onetime}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span
                    className={clsx(
                      'text-sm/6 font-semibold',
                      tier.featured
                        ? 'text-gray-300 dark:text-gray-600'
                        : 'text-gray-600 dark:text-gray-300',
                    )}
                  >
                    {tier.price.monthly && frequencies[0].priceSuffix}
                    {tier.price.onetime && frequencies[1].priceSuffix}
                  </span>
                ) : null}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  'mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  tier.featured
                    ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
                    : 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400',
                )}
              >
                {tier.cta}
              </a>
              <ul className="mt-8 space-y-3 text-sm/6 xl:mt-10">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={clsx(
                      'flex gap-x-3',
                      tier.featured
                        ? 'text-gray-300 dark:text-gray-600'
                        : 'text-gray-600 dark:text-gray-300',
                    )}
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className={clsx(
                        'h-6 w-5 flex-none',
                        tier.featured
                          ? 'text-white dark:text-blue-600'
                          : 'text-blue-600 dark:text-blue-400',
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-16 flex w-screen justify-center">
        <Button
          size="xxl"
          variant="primary"
          href={buttonLink}
          as="a"
          isExternalLink
          withExternalLinkIcon={false}
        >
          Book a free call now
        </Button>
      </div>
    </div>
  );
}

export default Pricing;
