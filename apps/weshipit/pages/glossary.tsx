import { Layout } from '../components/layout';
import { GlossaryTerm, getAllGlossaryTerms } from './api/glossary';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';

interface GlossaryPageProps {
  glossaryTerms: GlossaryTerm[];
}

export async function getStaticProps() {
  const { glossaryTerms } = await getAllGlossaryTerms();

  return {
    props: {
      glossaryTerms,
    },
  };
}

export default function Glossary({ glossaryTerms }: GlossaryPageProps) {
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
                  key={item.id}
                  className="relative border-b border-gray-200 dark:border-gray-700 pb-6"
                >
                  <dt>
                    <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {item.data.title}
                    </h2>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    <PrismicRichText field={item.data.description} />
                  </dd>
                  {item.data.related_to && item.data.related_to.length > 0 && (
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
          </section>
        </div>
      </article>
    </Layout>
  );
}
