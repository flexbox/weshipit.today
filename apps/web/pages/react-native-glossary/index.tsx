import { Layout } from '../../components/layout';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { GlossaryCTA } from '../../components/GlossaryCTA';
import { GlossaryMarkdown } from '../../components/glossary-markdown';
import {
  getAllGlossaryTerms,
  resolveTermSlug,
  type GlossaryTerm,
} from '../../utils/glossary';

const SITE_URL = 'https://weshipit.today';
const GLOSSARY_PATH = '/react-native-glossary';

interface GlossaryEntry {
  title: string;
  slug: string;
  letter: string;
  /** Markdown body of the definition. */
  content: string;
  /** Lowercased title + definition, used for client-side filtering. */
  haystack: string;
  relatedTo: { label: string; slug: string }[];
}

export async function getStaticProps() {
  const terms = getAllGlossaryTerms();

  const entries: GlossaryEntry[] = terms.map((term: GlossaryTerm) => ({
    title: term.title,
    slug: term.slug,
    letter: term.letter,
    content: term.content,
    haystack: `${term.title} ${term.plainText}`.toLowerCase(),
    relatedTo: term.related.map((label) => ({
      label,
      slug: resolveTermSlug(label, terms),
    })),
  }));

  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'React Native Glossary',
    description:
      'A comprehensive glossary of React Native terms and concepts for mobile developers.',
    url: `${SITE_URL}${GLOSSARY_PATH}`,
    hasDefinedTerm: entries.map((entry) => ({
      '@type': 'DefinedTerm',
      name: entry.title,
      url: `${SITE_URL}${GLOSSARY_PATH}/${entry.slug}`,
    })),
  };

  return {
    props: {
      entries,
      termCount: entries.length,
      definedTermSetSchema,
    },
  };
}

export default function ReactNativeGlossary({
  entries,
  termCount,
  definedTermSetSchema,
}: {
  entries: GlossaryEntry[];
  termCount: number;
  definedTermSetSchema: object;
}) {
  const [query, setQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSearching = query.trim().length > 0;

  const visibleEntries = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter((entry) => entry.haystack.includes(needle));
  }, [entries, query]);

  /** Letters that actually have a matching term, in alphabetical order. */
  const letters = useMemo(() => {
    const present = new Set(visibleEntries.map((entry) => entry.letter));
    return '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split('')
      .filter((letter) => present.has(letter));
  }, [visibleEntries]);

  const sections = useMemo(
    () =>
      letters.map((letter) => ({
        letter,
        terms: visibleEntries.filter((entry) => entry.letter === letter),
      })),
    [letters, visibleEntries],
  );

  // Focus the search field with "/" — a glossary is something you scan, not read.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Scroll-spy: the active letter is the last section whose top has passed
  // under the sticky header.
  useEffect(() => {
    if (letters.length === 0) return;

    let frame = 0;

    function update() {
      frame = 0;
      let current = letters[0];
      for (const letter of letters) {
        const section = document.getElementById(letter);
        if (section && section.getBoundingClientRect().top <= 160) {
          current = letter;
        }
      }
      setActiveLetter(current);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [letters]);

  return (
    <Layout
      seoTitle="React Native Glossary"
      seoDescription={`${termCount}+ React Native terms explained — from core concepts like JSX and Flexbox to advanced topics like the New Architecture, Fabric, and Turbo Modules.`}
      ogImageTitle="React Native Glossary"
      withHeader
      withFooter
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(definedTermSetSchema),
          }}
        />
      </Head>

      <div className="mx-auto max-w-[100rem] px-4 pb-24 sm:px-6">
        {/* Hero: oversized "Aa" behind a search field, Mobbin-style. */}
        <header className="relative isolate mt-6 flex min-h-[20rem] items-center justify-center overflow-hidden rounded-[2rem] bg-white px-4 py-16 sm:min-h-[22rem] dark:bg-neutral-900">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[13rem] font-bold leading-none tracking-[-0.05em] text-neutral-900 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_72%,transparent)] sm:text-[18rem] md:text-[22rem] dark:text-neutral-50"
          >
            Aa
          </span>

          <div className="w-full max-w-2xl">
            <label htmlFor="glossary-search" className="sr-only">
              Search the React Native glossary
            </label>
            <div className="relative">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
              />
              <input
                ref={searchInputRef}
                id="glossary-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setQuery('');
                }}
                placeholder="What are you looking for?"
                autoComplete="off"
                className="block w-full rounded-full border-0 bg-neutral-800/95 py-4 pl-13 pr-13 text-base text-white shadow-lg ring-1 ring-white/10 backdrop-blur-sm outline-hidden placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
                >
                  <XMarkIcon aria-hidden="true" className="size-5" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <h1 className="mt-12 text-center font-display text-3xl font-bold tracking-[-0.03em] text-neutral-950 sm:text-4xl dark:text-neutral-200">
          React Native Glossary
        </h1>

        {/* Live region so screen readers hear the filtered count. */}
        <p
          aria-live="polite"
          className="mt-3 text-center text-neutral-500 dark:text-neutral-400"
        >
          {isSearching
            ? `${visibleEntries.length} of ${termCount} terms match “${query.trim()}”`
            : `${termCount} terms that come up when you build, ship and debug a React Native app.`}
        </p>

        {sections.length === 0 ? (
          <div className="mx-auto mt-24 max-w-md text-center">
            <p className="font-display text-2xl font-bold tracking-[-0.03em] text-neutral-950 dark:text-neutral-200">
              No term matches “{query.trim()}”
            </p>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400">
              Try a broader keyword, or browse the full glossary.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="relative mt-16">
            <div className="mx-auto max-w-4xl">
              {sections.map(({ letter, terms }) => (
                <section
                  key={letter}
                  id={letter}
                  className="scroll-mt-28 pb-16 last:pb-0"
                >
                  <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-[8rem_minmax(0,1fr)]">
                    <h2
                      aria-label={`Terms starting with ${letter}`}
                      className="font-display text-5xl font-bold leading-none tracking-[-0.05em] text-neutral-950 md:sticky md:top-28 md:self-start dark:text-neutral-200"
                    >
                      {letter}
                    </h2>

                    <dl className="max-w-2xl space-y-12">
                      {terms.map((term) => (
                        <div key={term.slug}>
                          <dt>
                            <Link
                              href={`${GLOSSARY_PATH}/${term.slug}`}
                              className="group inline-flex items-start gap-1.5 font-display text-2xl font-bold tracking-[-0.03em] text-neutral-950 hover:text-blue-600 sm:text-3xl dark:text-neutral-200 dark:hover:text-blue-400"
                            >
                              {term.title}
                              <ArrowUpRightIcon
                                aria-hidden="true"
                                className="mt-1.5 size-5 shrink-0 opacity-0 transition group-hover:opacity-100"
                              />
                            </Link>
                          </dt>
                          <dd className="mt-3 text-base leading-relaxed text-neutral-600 [&_a:hover]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&>*+*]:mt-3 dark:text-neutral-400 dark:[&_a:hover]:text-blue-400">
                            <GlossaryMarkdown>{term.content}</GlossaryMarkdown>
                          </dd>

                          {term.relatedTo.length > 0 && (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                                Related
                              </span>
                              {term.relatedTo.map((related) => (
                                <Link
                                  key={related.slug}
                                  href={`${GLOSSARY_PATH}/${related.slug}`}
                                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                >
                                  {related.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>
              ))}
            </div>

            {/* Alphabet rail — only letters that have a term are listed. */}
            <nav
              aria-label="Jump to letter"
              className="absolute inset-y-0 right-0 hidden lg:block"
            >
              <ul className="sticky top-28 flex flex-col items-end border-r border-neutral-300 pr-4 dark:border-neutral-700">
                {letters.map((letter) => {
                  const isActive = activeLetter === letter;
                  return (
                    <li key={letter}>
                      <Link
                        href={`#${letter}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative block w-8 py-1 text-center text-sm transition-colors ${
                          isActive
                            ? 'font-medium text-neutral-950 dark:text-neutral-100'
                            : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-600 dark:hover:text-neutral-300'
                        }`}
                      >
                        {letter}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute -right-4 top-0 h-full w-0.5 bg-neutral-950 dark:bg-neutral-100"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}

        <aside className="mx-auto mt-24 max-w-3xl">
          <GlossaryCTA />
        </aside>
      </div>
    </Layout>
  );
}
