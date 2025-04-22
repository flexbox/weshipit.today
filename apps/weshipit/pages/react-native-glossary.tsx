import { Layout } from '../components/layout';
import { GlossaryTerm, getAllGlossaryTerms } from './api/glossary';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';
import Link from 'next/link';
import { Card, LinkButton, Text } from '@weshipit/ui';
import { useEffect, useState } from 'react';
import { linksApi } from './api/links';

interface GlossaryPageProps {
  glossaryTerms: GlossaryTerm[];
}

export async function getStaticProps() {
  const { glossaryTerms } = await getAllGlossaryTerms();

  // Group terms by their first letter
  const groupedTerms: { [key: string]: GlossaryTerm[] } = {};
  glossaryTerms.forEach((term) => {
    const firstLetter = term.data.title.charAt(0).toUpperCase();
    const category = /^[0-9]/.test(firstLetter) ? '#' : firstLetter;

    if (!groupedTerms[category]) {
      groupedTerms[category] = [];
    }

    groupedTerms[category].push(term);
  });

  return {
    props: {
      glossaryTerms,
      groupedTerms,
    },
  };
}

export default function ReactNativeGlossary({
  glossaryTerms,
  groupedTerms,
}: GlossaryPageProps & { groupedTerms: { [key: string]: GlossaryTerm[] } }) {
  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [activeLetters, setActiveLetters] = useState<string[]>([]);

  useEffect(() => {
    // Set active letters based on available terms
    setActiveLetters(Object.keys(groupedTerms));
  }, [groupedTerms]);

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
              A glossary of all the terms around React Native development.
            </p>
          </header>

          {/* Alphabet Navigation */}
          <nav className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
            {alphabet.map((letter) => {
              const isActive = activeLetters.includes(letter);
              return (
                <Link
                  key={letter}
                  href={isActive ? `#${letter}` : '#'}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-lg font-medium shadow-sm
                    ${
                      isActive
                        ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 dark:focus-visible:outline-blue-700'
                        : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  aria-disabled={!isActive}
                >
                  {letter}
                </Link>
              );
            })}
          </nav>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section className="lg:col-span-2">
              {activeLetters.sort().map((letter) => (
                <div key={letter} id={letter} className="mb-12">
                  <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
                    {letter}
                  </h2>

                  <dl className="space-y-8">
                    {groupedTerms[letter]?.map((item) => (
                      <div
                        key={item.id}
                        className="relative border-b border-gray-200 dark:border-gray-700 pb-6"
                      >
                        <dt>
                          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                            {item.data.title}
                          </h3>
                        </dt>
                        <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                          <PrismicRichText field={item.data.description} />
                        </dd>
                        {item.data.related_to &&
                          item.data.related_to.length > 0 && (
                            <div className="mt-4">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Related to:
                              </span>
                              <div className="mt-1 flex flex-wrap gap-2">
                                {item.data.related_to.map(
                                  (related: any, index: number) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                    >
                                      {asText(related)}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </section>

            {/* Call to Action Card */}
            <aside className="sticky top-8 h-fit lg:col-span-1">
              <Card
                size="xl"
                className="flex flex-col items-start"
                variant="gradient-blue"
              >
                <Text
                  variant="h4"
                  as="h2"
                  className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
                >
                  React Native Expertise
                </Text>
                <Text
                  variant="p1"
                  as="p"
                  className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
                >
                  Make your app stand out from the crowd with professional
                  assistance. We can help with:
                </Text>
                <ul className="mt-4 space-y-2 text-white">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Expert advice on React Native development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>UX/UI improvements</span>
                  </li>
                </ul>
                <div className="mt-6 w-full">
                  <LinkButton
                    href={linksApi?.cal?.ONBOARDING || '/contact'}
                    size="xl"
                    variant="outline"
                    className="mt-4 w-full justify-center"
                  >
                    Book a Free Consultation
                  </LinkButton>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
