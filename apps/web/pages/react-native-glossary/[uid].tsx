import { Layout } from '../../components/layout';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CheckIcon, LinkIcon } from '@heroicons/react/24/outline';
import { GlossaryMarkdown } from '../../components/glossary-markdown';
import {
  getAllGlossaryTerms,
  resolveTermSlug,
  type GlossaryTerm,
} from '../../utils/glossary';

const SITE_URL = 'https://weshipit.today';
const GLOSSARY_PATH = '/react-native-glossary';

interface TermLink {
  title: string;
  slug: string;
}

interface GlossaryTermPageProps {
  title: string;
  content: string;
  previousTerm: TermLink | null;
  nextTerm: TermLink | null;
  relatedTerms: TermLink[];
  mentionedIn: TermLink[];
  updatedAt: string | null;
  termUrl: string;
  seoDescription: string;
  definedTermSchema: object;
  breadcrumbSchema: object;
}

const toTermLink = (term: GlossaryTerm): TermLink => ({
  title: term.title,
  slug: term.slug,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const terms = getAllGlossaryTerms();

  return {
    paths: terms.map((term) => ({ params: { uid: term.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.uid as string;
  if (!slug) {
    return { notFound: true };
  }

  const terms = getAllGlossaryTerms();
  const index = terms.findIndex((term) => term.slug === slug);

  if (index === -1) {
    return { notFound: true };
  }

  const term = terms[index];
  const previousTerm = index > 0 ? toTermLink(terms[index - 1]) : null;
  const nextTerm =
    index < terms.length - 1 ? toTermLink(terms[index + 1]) : null;

  const relatedTerms: TermLink[] = term.related.map((label) => ({
    title: label,
    slug: resolveTermSlug(label, terms),
  }));

  // Terms rarely link each other explicitly, so derive the reverse index:
  // other definitions that name this one.
  const titlePattern = new RegExp(
    `\\b${term.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
    'i',
  );
  const mentionedIn: TermLink[] = terms
    .filter(
      (other) => other.slug !== term.slug && titlePattern.test(other.plainText),
    )
    .map(toTermLink);

  const seoDescription = term.plainText
    ? `${term.plainText.slice(0, 152)}...`
    : `Learn about ${term.title} in React Native development.`;

  const termUrl = `${SITE_URL}${GLOSSARY_PATH}/${term.slug}`;

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.plainText || undefined,
    url: termUrl,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'React Native Glossary',
      url: `${SITE_URL}${GLOSSARY_PATH}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'React Native Glossary',
        item: `${SITE_URL}${GLOSSARY_PATH}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: term.title,
        item: termUrl,
      },
    ],
  };

  return {
    props: {
      title: term.title,
      content: term.content,
      previousTerm,
      nextTerm,
      relatedTerms,
      mentionedIn,
      updatedAt: term.updated,
      termUrl,
      seoDescription,
      definedTermSchema,
      breadcrumbSchema,
    },
  };
};

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable (insecure context, denied permission) — the
      // URL is in the address bar anyway, so fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="mx-auto flex size-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
    >
      {copied ? (
        <CheckIcon aria-hidden="true" className="size-5" />
      ) : (
        <LinkIcon aria-hidden="true" className="size-5" />
      )}
      <span className="sr-only">
        {copied ? 'Link copied' : 'Copy link to this term'}
      </span>
    </button>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 sm:block">
      <dt className="text-sm text-neutral-400 dark:text-neutral-500">
        {label}
      </dt>
      <dd className="text-sm font-medium text-neutral-900 sm:mt-2 dark:text-neutral-200">
        {children}
      </dd>
    </div>
  );
}

function TermChips({ terms }: { terms: TermLink[] }) {
  return (
    <span className="flex flex-wrap gap-x-2 gap-y-1">
      {terms.map((related) => (
        <Link
          key={related.slug}
          href={`${GLOSSARY_PATH}/${related.slug}`}
          className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
        >
          {related.title}
        </Link>
      ))}
    </span>
  );
}

export default function GlossaryTermPage({
  title,
  content,
  previousTerm,
  nextTerm,
  relatedTerms,
  mentionedIn,
  updatedAt,
  termUrl,
  seoDescription,
  definedTermSchema,
  breadcrumbSchema,
}: GlossaryTermPageProps) {
  const formattedDate = updatedAt
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(updatedAt))
    : null;

  return (
    <Layout
      seoTitle={`${title} | React Native Glossary`}
      seoDescription={seoDescription}
      ogImageTitle={`${title} | React Native Glossary`}
      withHeader
      withFooter
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(definedTermSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <article className="mx-auto max-w-[100rem] px-4 pb-24 sm:px-6">
        {/* Hero: breadcrumb, oversized title, copy link, then the term's facts. */}
        <header className="mt-6 rounded-[2rem] bg-white px-6 py-16 sm:px-12 sm:py-20 dark:bg-neutral-900">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-sm"
          >
            <Link
              href={GLOSSARY_PATH}
              className="text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              Glossary
            </Link>
            <span aria-hidden="true" className="text-neutral-300">
              /
            </span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {title}
            </span>
          </nav>

          <h1 className="mt-20 text-center font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-balance text-neutral-950 sm:mt-28 sm:text-6xl lg:text-7xl dark:text-neutral-100">
            {title}
          </h1>

          <div className="mt-10">
            <CopyLinkButton url={termUrl} />
          </div>

          <dl className="mt-20 grid gap-6 border-t border-neutral-200 pt-8 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4 dark:border-neutral-800">
            <MetaRow label="Part of">
              <Link
                href={GLOSSARY_PATH}
                className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
              >
                React Native Glossary
              </Link>
            </MetaRow>

            {relatedTerms.length > 0 && (
              <MetaRow label="Related">
                <TermChips terms={relatedTerms} />
              </MetaRow>
            )}

            {mentionedIn.length > 0 && (
              <MetaRow label="Mentioned in">
                <TermChips terms={mentionedIn} />
              </MetaRow>
            )}

            {formattedDate && (
              <MetaRow label="Updated">
                <time dateTime={updatedAt ?? undefined}>{formattedDate}</time>
              </MetaRow>
            )}
          </dl>
        </header>

        {/* Definition */}
        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-neutral-950 sm:text-4xl dark:text-neutral-100">
            What is {title} in React Native?
          </h2>

          <div className="mt-6 text-lg leading-relaxed text-neutral-700 sm:text-xl [&_a:hover]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&>*+*]:mt-5 dark:text-neutral-300 dark:[&_a:hover]:text-blue-400">
            <GlossaryMarkdown>{content}</GlossaryMarkdown>
          </div>

          {/* Prev / next, alphabetically through the glossary. */}
          <nav
            aria-label="Glossary navigation"
            className="mt-20 grid grid-cols-2 gap-8 border-t border-neutral-200 pt-12 dark:border-neutral-800"
          >
            <div>
              {previousTerm && (
                <Link
                  href={`${GLOSSARY_PATH}/${previousTerm.slug}`}
                  className="group block font-display text-2xl font-bold tracking-[-0.03em] text-neutral-400 sm:text-3xl dark:text-neutral-500"
                >
                  <span className="block">Prev:</span>
                  <span className="underline decoration-neutral-300 underline-offset-4 group-hover:text-neutral-900 group-hover:decoration-neutral-900 dark:decoration-neutral-600 dark:group-hover:text-neutral-100 dark:group-hover:decoration-neutral-100">
                    {previousTerm.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {nextTerm && (
                <Link
                  href={`${GLOSSARY_PATH}/${nextTerm.slug}`}
                  className="group block font-display text-2xl font-bold tracking-[-0.03em] text-neutral-400 sm:text-3xl dark:text-neutral-500"
                >
                  <span className="block">Next:</span>
                  <span className="underline decoration-neutral-300 underline-offset-4 group-hover:text-neutral-900 group-hover:decoration-neutral-900 dark:decoration-neutral-600 dark:group-hover:text-neutral-100 dark:group-hover:decoration-neutral-100">
                    {nextTerm.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </article>
    </Layout>
  );
}
