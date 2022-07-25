export function Hero() {
  return (
    <main className="lg:relative h-full bg-gray-100">
      <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-72 lg:text-left">
        <div className="px-4  sm:px-8 xl:pr-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">
              Building apps in{' '}
              <span className=" line-through text-gray-400">months</span> days
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
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
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
