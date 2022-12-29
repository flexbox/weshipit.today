import Head from 'next/head';

interface BuyButtonProps {
  scriptLink: string;
  buttonText: string;
  href: string;
}
export default function BuyButton({
  scriptLink,
  buttonText,
  href,
}: BuyButtonProps) {
  return (
    <>
      <Head>
        <script src={scriptLink} async></script>
      </Head>

      <a
        href={href}
        className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-semibold leading-6 text-white shadow-sm transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none sm:ml-4 sm:mt-0 sm:w-auto xl:py-4 xl:text-lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText} &rarr;
      </a>
    </>
  );
}
