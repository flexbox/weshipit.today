export function Hero() {
  return (
    <main className="h-full bg-gray-100 lg:relative">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-72 lg:text-left">
        <div className="px-4  sm:px-8 xl:pr-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">
              Building React Native apps
              <br />
              in <span className=" text-gray-400 line-through">
                months
              </span>{' '}
              days.
            </span>
          </h1>
          <p className="mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            We are software developer, product makers, growth hackers, with a
            focus on engineering community best practices.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="https://airtable.com/shrkRxhdc2zJD8EM5"
                target={'_blank'}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                rel="noreferrer"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
