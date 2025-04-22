import { Layout } from '../../components/layout';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';
import Link from 'next/link';
import { Button, Card, LinkButton, Text } from '@weshipit/ui';
import { linksApi } from '../api/links';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  GlossaryTerm,
  getGlossaryTermByUID,
  getPrevNextGlossaryTerms,
  getAllGlossaryTerms,
} from '../api/glossary';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { client as prismicClient } from '../api/prismic';

// Helper function to create slug from title
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except dashes
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

interface GlossaryTermPageProps {
  term: GlossaryTerm;
  previousTerm: GlossaryTerm | null;
  nextTerm: GlossaryTerm | null;
  relatedArticles: any[];
  termsByTitle: Record<string, GlossaryTerm>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { glossaryTerms } = await getAllGlossaryTerms();

  const paths = glossaryTerms
    .filter((term) => term.data.title)
    .map((term) => ({
      params: { uid: slugify(term.data.title) },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.uid as string;
  if (!slug) {
    return { notFound: true };
  }

  // Get all glossary terms
  const { glossaryTerms } = await getAllGlossaryTerms();

  // Find the term that matches the slug
  const term = glossaryTerms.find((term) => slugify(term.data.title) === slug);

  if (!term) {
    return { notFound: true };
  }

  // Sort terms alphabetically for prev/next navigation
  const sortedTerms = [...glossaryTerms].sort((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );

  const currentIndex = sortedTerms.findIndex(
    (t) => slugify(t.data.title) === slug,
  );

  const previousTerm = currentIndex > 0 ? sortedTerms[currentIndex - 1] : null;
  const nextTerm =
    currentIndex < sortedTerms.length - 1
      ? sortedTerms[currentIndex + 1]
      : null;

  // Create a map of terms by title for quick lookup
  const termsByTitle: Record<string, GlossaryTerm> = {};
  glossaryTerms.forEach((term) => {
    if (term.data.title) {
      termsByTitle[term.data.title] = term as unknown as GlossaryTerm;
    }
  });

  // Fetch related articles from Prismic
  let relatedArticles: any[] = [];
  if (term.data.related_articles && term.data.related_articles.length > 0) {
    try {
      const articlePromises = term.data.related_articles.map(
        async (article: any) => {
          if (article.article && article.article.id) {
            return await prismicClient.getByID(article.article.id);
          }
          return null;
        },
      );

      const articles = await Promise.all(articlePromises);
      relatedArticles = articles.filter(Boolean);
    } catch (error) {
      console.error('Error fetching related articles', error);
    }
  }

  return {
    props: {
      term,
      previousTerm,
      nextTerm,
      relatedArticles,
      termsByTitle,
    },
    revalidate: 60,
  };
};

export default function GlossaryTermPage({
  term,
  previousTerm,
  nextTerm,
  relatedArticles,
  termsByTitle,
}: GlossaryTermPageProps) {
  if (!term) {
    return null;
  }

  return (
    <Layout
      seoTitle={`${term.data.title} | React Native Glossary | weshipit.today`}
      seoDescription={`Learn about ${term.data.title} in React Native development.`}
      ogImageTitle={`${term.data.title} | React Native Glossary`}
      withHeader
      withFooter
      withContainer
    >
      <article className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/react-native-glossary"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Back to Glossary
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {term.data.title}
              </h1>

              <div className="prose dark:prose-invert max-w-none">
                <PrismicRichText field={term.data.description} />
              </div>

              {term.data.related_to && term.data.related_to.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Related Terms
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {term.data.related_to.map((related: any, index: number) => {
                      // Get the text of the related term
                      const relatedText = asText(related);
                      // Look up the term in our map of terms by title
                      const matchingTerm = relatedText
                        ? termsByTitle[relatedText]
                        : undefined;

                      return (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {matchingTerm ? (
                            <Link
                              href={`/react-native-glossary/${slugify(matchingTerm.data.title)}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {relatedText}
                            </Link>
                          ) : (
                            relatedText
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {relatedArticles && relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Relevant Articles
                  </h2>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <div
                        key={article.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          <Link
                            href={`/blog/${article.uid}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {article.data.title}
                          </Link>
                        </h3>
                        {article.data.excerpt && (
                          <p className="mt-2 text-gray-500 dark:text-gray-400">
                            {article.data.excerpt}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous / Next Navigation */}
              <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-between">
                <div>
                  {previousTerm && (
                    <Link
                      href={`/react-native-glossary/${slugify(previousTerm.data.title)}`}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex items-center"
                      >
                        <ChevronLeftIcon className="h-4 w-4 mr-2" />
                        {previousTerm.data.title}
                      </Button>
                    </Link>
                  )}
                </div>
                <div>
                  {nextTerm && (
                    <Link
                      href={`/react-native-glossary/${slugify(nextTerm.data.title)}`}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex items-center"
                      >
                        {nextTerm.data.title}
                        <ChevronRightIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
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
