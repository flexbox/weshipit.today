import CardGradient from '../card-gradient/card-gradient';
import Image from 'next/image';
import gumroad from '../../assets/gumroad-thumbnail.png';
import bootcampLogo from '../../assets/bootcamp.png';
import Button from '../button/button';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Text } from '../text/text';
import Gravatar from 'react-gravatar';

export function UsefulResources() {
  return (
    <div>
      <Text variant="h2" className="text-center">
        Useful Resources
      </Text>
      <div className="flex flex-col justify-center gap-16 py-12 md:flex-row">
        <CardGradient
          variant="purple"
          className="m-auto flex w-2/3 justify-center rounded-xl bg-cover px-4 py-8 text-white sm:col-span-2 md:m-0 md:w-1/5 lg:col-span-5 lg:row-span-5"
        >
          <a
            className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
            href="https://davidl.fr/bootcamp"
          >
            <div className="items-center">
              <Image
                src={bootcampLogo}
                alt="Bootcamp logo"
                width="124"
                height="124"
                className="rounded-3xl"
              />
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <h2 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow md:text-3xl">
                Bootcamp
              </h2>
              <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
                The ultimate way to learn React Native.
              </p>
              <Button
                variant="ghost"
                href="https://davidl.fr/bootcamp"
                className="mt-4"
                accessoryRight={
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
                }
              >
                Join the bootcamp
              </Button>
            </div>
          </a>
        </CardGradient>
        <CardGradient
          variant="purple"
          className=" m-auto flex w-2/3 justify-center rounded-xl bg-cover px-4 py-8 text-white sm:col-span-2 md:m-0 md:w-1/5 lg:col-span-5 lg:row-span-5"
        >
          <a
            className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
            href="gumroad.com/l/expo-checklist"
          >
            <div className="items-center">
              <Image
                src={gumroad}
                alt="Expo checklist"
                width="124"
                height="124"
                className="rounded-3xl"
              />
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <h2 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow md:text-3xl">
                Checklist
              </h2>
              <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
                Never miss your store deployments with Expo.
              </p>
              <Button
                variant="ghost"
                href="https://flexbox.gumroad.com/l/expo-checklist"
                className="mt-4"
                accessoryRight={
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
                }
              >
                Get the checklist
              </Button>
            </div>
          </a>
        </CardGradient>
        <CardGradient
          variant="purple"
          className="m-auto flex  w-2/3 justify-center rounded-xl bg-cover px-4 py-8 text-white sm:col-span-2 md:m-0 md:w-1/5 lg:col-span-5 lg:row-span-5"
        >
          <a
            className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
            href="https://airtable.com/shryVoJ3nzyeq2P4s"
          >
            <div className="relative flex h-[164px] w-[124px] flex-row items-center justify-center sm:h-[124px]">
              <Gravatar
                className="rounded-full border-4 border-white"
                size={80}
                email="ducrocq.matthys@gmail.com"
              />
              <Gravatar
                className="-ml-4 mr-4 rounded-full border-4 border-white"
                size={80}
                email="dleuliette@gmail.com"
              />
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <h2 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow md:text-3xl">
                Consultation
              </h2>
              <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
                Book a call with us to talk about your project.
              </p>
              <Button
                variant="ghost"
                href="https://airtable.com/shryVoJ3nzyeq2P4s"
                className="mt-4"
                accessoryRight={
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
                }
              >
                Book a call
              </Button>
            </div>
          </a>
        </CardGradient>
      </div>
    </div>
  );
}

export default UsefulResources;
