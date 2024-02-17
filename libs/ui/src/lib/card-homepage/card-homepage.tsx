import Image from 'next/image';
import bootcampLogo from '../../assets/bootcamp.png';
import Gravatar from 'react-gravatar';
import gumroad from '../../assets/gumroad-thumbnail.png';
import { Card } from '../card/card';
import Link from 'next/link';

export function CardHomepage() {
  return (
    <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-8 lg:grid-rows-5">
      <Card
        variant="gradient-blue"
        className="grid py-16 text-white sm:col-span-2 lg:col-span-5 lg:row-span-5"
      >
        <a
          className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row sm:text-left"
          href="https://davidl.fr/bootcamp"
        >
          <div className="relative flex flex-col items-center">
            <Image
              src={bootcampLogo}
              alt="Bootcamp logo"
              width="248"
              height="248"
              className="rounded-3xl"
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <h1 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-5xl font-bold tracking-tight text-transparent drop-shadow md:text-7xl">
              Bootcamp
            </h1>
            <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
              The ultimate way to learn React Native.
            </p>
          </div>
        </a>
      </Card>
      <Card
        variant="gradient-pink"
        className="grid rounded-xl py-16 text-white lg:col-span-3 lg:row-span-3"
      >
        <a
          className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:text-left"
          target="_blank"
          href="https://flexbox.gumroad.com/l/expo-checklist"
          rel="noreferrer"
        >
          <div className="relative flex flex-col items-center">
            <Image
              src={gumroad}
              alt="Gumroad expo checklist"
              width="124"
              height="124"
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h1 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow md:text-5xl">
              Checklist
            </h1>
            <p className=" max-w-[14ch] text-lg font-medium opacity-80 md:text-xl">
              Never miss your store deployments with Expo.
            </p>
          </div>
        </a>
      </Card>
      <Card
        variant="gradient-purple"
        className=" grid overflow-hidden rounded-xl  py-12  sm:py-16 lg:col-span-3 lg:row-span-2"
      >
        <Link
          href="/consulting"
          className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-4 md:text-left"
        >
          <div className="relative flex h-[164px] w-[124px] flex-row  items-center justify-center sm:h-[124px]">
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
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h1 className="relative bg-gradient-to-b from-black to-[#444] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-3xl dark:from-white dark:to-white/75 dark:drop-shadow">
              Consultation
            </h1>
            <p className="max-w-[14ch] text-base font-medium text-black opacity-80 md:text-lg dark:text-white">
              Book a call. We'll help you with your project.
            </p>
          </div>
        </Link>
      </Card>
    </div>
  );
}

export default CardHomepage;
