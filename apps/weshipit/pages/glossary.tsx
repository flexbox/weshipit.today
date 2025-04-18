import { Layout } from '../components/layout';

const glossaryTerms = [
  {
    term: 'Android',
    definition:
      'A mobile operating system developed by Google based on a modified version of the Linux kernel. React Native can be used to develop apps for Android devices.',
  },
  {
    term: 'API',
    definition:
      'Application Programming Interface. A set of functions and procedures that allow applications to access features or data of an operating system, application, or other service.',
  },
  {
    term: 'Babel',
    definition:
      'A JavaScript compiler that lets you use modern JavaScript features that may not be supported by all environments yet.',
  },
  {
    term: 'Bridge',
    definition:
      "The layer in React Native that enables communication between the JavaScript thread and the native thread. It's being phased out in favor of the new architecture with JSI.",
  },
  {
    term: 'Codegen',
    definition:
      'Code generation process used in React Native to create native code from JavaScript specifications.',
  },
  {
    term: 'Component',
    definition:
      'A reusable piece of UI in React Native that can be composed to create complex interfaces.',
  },
  {
    term: 'Expo',
    definition:
      'A framework and platform for universal React applications, providing a managed workflow to make React Native development easier and more accessible.',
  },
  {
    term: 'Fabric',
    definition:
      'The new rendering system for React Native, part of the new architecture that improves performance and flexibility.',
  },
  {
    term: 'Flexbox',
    definition:
      'A layout system used in React Native to arrange components on the screen, similar to CSS Flexbox in web development.',
  },
  {
    term: 'Hermes',
    definition:
      'An open-source JavaScript engine optimized for React Native that improves app performance, reduces memory usage, and decreases app size.',
  },
  {
    term: 'Hot Reloading',
    definition:
      'A feature that allows developers to see changes in their code immediately without losing the current state of the application.',
  },
  {
    term: 'iOS',
    definition:
      "Apple's mobile operating system used on iPhone and iPad devices. React Native can be used to develop apps for iOS devices.",
  },
  {
    term: 'JSI (JavaScript Interface)',
    definition:
      "A part of React Native's new architecture that allows JavaScript to hold references to C++ objects and call methods on them directly, eliminating the need for the bridge.",
  },
  {
    term: 'Metro',
    definition:
      'The JavaScript bundler for React Native that takes all your JavaScript code and its dependencies and combines them into a single file.',
  },
  {
    term: 'Native Modules',
    definition:
      'Modules that allow you to write native code and expose it to JavaScript in React Native when you need to access platform-specific functionality.',
  },
  {
    term: 'New Architecture',
    definition:
      "A set of changes to React Native's underlying infrastructure including JSI, Fabric, TurboModules, and Codegen that aim to improve performance and flexibility.",
  },
  {
    term: 'Props',
    definition:
      'Short for "properties," these are inputs to React components that allow customization of their behavior and appearance.',
  },
  {
    term: 'React',
    definition:
      'A JavaScript library for building user interfaces, developed by Facebook. React Native is built on top of React.',
  },
  {
    term: 'State',
    definition:
      "Data that controls a component's behavior and rendering. When state changes, the component re-renders.",
  },
  {
    term: 'StyleSheet',
    definition:
      'An API in React Native used to define styles for your components, similar to CSS in web development but with some differences.',
  },
  {
    term: 'TurboModules',
    definition:
      "Part of React Native's new architecture that improves the performance and type safety of native modules.",
  },
  {
    term: 'Virtual DOM',
    definition:
      'A programming concept where a lightweight copy of the DOM is kept in memory that is synced with the real DOM by React. React Native uses a similar concept for native components.',
  },
];

export default function Glossary() {
  return (
    <Layout
      seoTitle="React Native Glossary | weshipit.today"
      seoDescription="A comprehensive glossary of React Native terms and concepts to help you better understand React Native development."
      ogImageTitle="React Native Glossary"
      withHeader
      withFooter
      withContainer
    >
      <article className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="lg:text-center">
            <h1 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              React Native Glossary
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              A comprehensive list of terms and concepts used in React Native
              development
            </p>
          </header>

          <section className="mt-12">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              {glossaryTerms.map((item) => (
                <div
                  key={item.term}
                  className="relative border-b border-gray-200 dark:border-gray-700 pb-6"
                >
                  <dt>
                    <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {item.term}
                    </h2>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </article>
    </Layout>
  );
}
