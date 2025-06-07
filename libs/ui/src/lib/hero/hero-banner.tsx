'use client';

import { useState, useEffect } from 'react';

import { PhoneAnimation } from './phone-animation';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { LinkButton, SpotLeft, Text } from '@weshipit/ui';

export function HeroBanner({
  onboardingHref,
  teamSpotsLeft,
}: {
  onboardingHref: string;
  teamSpotsLeft: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div
            className={`space-y-4 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
          >
            <SpotLeft spotsLeft={teamSpotsLeft} />
            <Text as="h1" variant="h1" className="tracking-tighter">
              React Native Experts on demand.
            </Text>
            <Text
              as="p"
              variant="p1"
              className="text-slate-500 md:text-xl dark:text-slate-400"
            >
              Pause or cancel whenever. Get the mobile development expertise you
              need, exactly when you need it.
            </Text>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <LinkButton size="xl" href={onboardingHref}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Book a call with David
              </LinkButton>
              <LinkButton
                variant="outline"
                className="group"
                size="xl"
                href={'#pricing'}
              >
                See pricing
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </div>
          </div>
          <div
            className={`flex items-center justify-center ${isVisible ? 'animate-fadeInDelay' : 'opacity-0'}`}
          >
            <PhoneAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
