'use client';

import { useState, useEffect } from 'react';

import { PhoneAnimation } from './phone-animation';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Button, LinkButton } from '@weshipit/ui';

export function HeroBanner() {
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
            <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
              <span className="flex items-center">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                1 spot left in May ✨
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              React Native Experts on demand.
            </h1>
            <p className="text-zinc-500 md:text-xl dark:text-zinc-400">
              Pause or cancel whenever. Get the mobile development expertise you
              need, exactly when you need it.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="xl">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Book a call with David
              </Button>
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
