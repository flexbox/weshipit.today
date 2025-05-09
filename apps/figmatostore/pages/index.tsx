import Layout from '../components/Layout';
import { Avatar } from '@weshipit/ui';
import { figmaDemo } from '../data/index';
import Image from 'next/image';
import React from 'react';
import { BuyButton } from '@weshipit/ui';

const IndexPage = () => (
  <Layout seoTitle="Boilerplate to generate quality mobile screenshots for Apple App Store and Google Play store.">
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="absolute hidden lg:block"></div>

      <div className="relative min-h-screen bg-no-repeat lg:flex lg:items-center  lg:justify-center lg:px-8 lg:py-20">
        <div className="w-full lg:w-2/5 ">
          <div className="px-6 pb-12 pt-8 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none lg:pb-16 lg:pt-0">
            <div className="flex items-center justify-between">
              <div className="font-semibold uppercase text-gray-300">
                Figma To Store
              </div>
            </div>
          </div>
          <div className="px-6 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Now in early access
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-9 text-white sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
              Beautiful apps screenshots,
              <br className="hidden sm:inline" />
              <span className="text-blue-500">to publish in no-time.</span>
            </h1>
            <p className="mt-2 text-lg leading-7 text-gray-300 sm:mt-3 sm:max-w-xl sm:text-xl xl:mt-4 xl:max-w-2xl xl:text-2xl">
              I shipped dozen of apps to the Apple store and Google play.
              Everytime, it&apos;s a pain to coordinate everyone. Let&apos;s fix
              it with this Figma boilerplate.
            </p>
            <div className="mt-6 sm:mt-8 sm:flex xl:mt-12">
              <a
                href={figmaDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-semibold leading-6 text-gray-900 shadow-sm transition duration-150 ease-in-out hover:text-gray-600 focus:text-gray-600 focus:outline-none sm:w-auto xl:py-4 xl:text-lg"
              >
                Explore the preview
              </a>
              <BuyButton href="https://gum.co/figmatostore">
                Get early access
              </BuyButton>
            </div>
          </div>

          <div className="px-6 py-8 sm:pt-12 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-full lg:py-0 lg:pt-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Designed by
            </p>
            <div className="mt-4 sm:flex">
              <a
                href="https://twitter.com/flexbox_"
                className="flex items-center no-underline"
              >
                <div className="shrink-0">
                  <Avatar
                    className="size-12 rounded-full border-2 border-white"
                    email="dleuliette@gmail.com"
                    size={48}
                    name="David Leuliette"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold leading-tight text-white">
                    David Leuliette
                  </p>
                  <p className="text-sm leading-tight text-gray-500">
                    React Native Developer
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="m-auto flex w-full items-center justify-center align-middle lg:w-3/5">
          <Image
            src="/demo.png"
            className=""
            alt="Preview of figmatostore the screenshot template for iOS and Android"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
