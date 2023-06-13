import Image from 'next/image';
import bootcampLogo from '../../assets/bootcamp.png';
import Gravatar from 'react-gravatar';
import gumroad from '../../assets/gumroad-thumbnail.png';

export function CardHomepage() {
  return (
    <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-8 lg:grid-rows-5">
      <div className="grid min-h-[420px] rounded-xl bg-[linear-gradient(to_top_right,#0E95EE,#27C9F5)] bg-cover  py-16 text-white dark:bg-[linear-gradient(to_top_right,#07384B,#0F536E)] sm:col-span-2 lg:col-span-5 lg:row-span-5 lg:min-h-[600px]">
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
      </div>
      <div className="grid rounded-xl bg-gradient-to-tr from-[#e98bd4] via-[#a48deb] to-[#5bbdf4] py-16 text-white dark:from-[#803C71] dark:via-[#74376D] dark:to-[#215E86] lg:col-span-3 lg:row-span-3">
        <a
          className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:text-left"
          href="https://flexbox.gumroad.com/l/expo-checklist"
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
            <p className="text-shadow max-w-[14ch] text-lg font-medium opacity-80 md:text-xl">
              Never miss your store deployments with Expo.
            </p>
          </div>
        </a>
      </div>
      <div className="shadow-outline dark:shadow-outline-superbright grid overflow-hidden rounded-xl bg-gradient-to-tr from-blue-100 to-gray-50 py-12 dark:bg-gradient-to-bl dark:from-blue-900 dark:to-black sm:py-16 lg:col-span-3 lg:row-span-2">
        <a
          className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-4 md:text-left"
          href="https://airtable.com/shryVoJ3nzyeq2P4s"
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
            <h1 className="relative bg-gradient-to-b from-black to-[#444] bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/75 dark:drop-shadow md:text-3xl">
              Consultation
            </h1>
            <p className="max-w-[14ch] text-base font-medium text-black opacity-80 dark:text-white md:text-lg">
              Book a call
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default CardHomepage;
