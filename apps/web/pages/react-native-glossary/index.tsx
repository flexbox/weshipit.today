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
import { AUTHOR_SCHEMA, PUBLISHER_SCHEMA } from '../../utils/schema';

const SITE_URL = 'https://weshipit.today';
const GLOSSARY_PATH = '/react-native-glossary';

interface GlossaryEntry {
  title: string;
  slug: string;
  letter: string;
  /** Short blurb shown in the listing; the full definition lives on the term page. */
  summary: string;
  /** Other names for the concept, matched by search and shown under the title. */
  aliases: string[];
  /** Lowercased title + aliases + definition, used for client-side filtering. */
  haystack: string;
  relatedTo: { label: string; slug: string }[];
}

/**
 * Question-shaped entries for the bottom of the index. These target the
 * "what is / what's the difference" queries newcomers actually type, and each
 * answer is self-contained so it can be quoted without the surrounding page.
 */
const FAQ = [
  {
    question: 'What is React Native in one sentence?',
    answer:
      'React Native is an open-source framework from Meta for building iOS and Android apps with React. You write components in JavaScript or TypeScript, and React Native renders them as real native views — a `<View>` becomes a `UIView` on iOS and a `ViewGroup` on Android — rather than drawing them in a web view.',
  },
  {
    question: 'What is the difference between React Native and Expo?',
    answer:
      '[React Native](/react-native-glossary/core-components) is the renderer and the bridge to native code. [Expo](/react-native-glossary/expo) is a framework on top of it that adds routing, a library of vetted native modules, cloud builds and over-the-air updates. The React Native docs now recommend starting new apps with a framework, and `npx create-expo-app` is the usual entry point.',
  },
  {
    question: 'What is the New Architecture, and do I need to care?',
    answer:
      'The [New Architecture](/react-native-glossary/legacy-vs-new-architecture) replaced the asynchronous [bridge](/react-native-glossary/bridge) with [JSI](/react-native-glossary/jsi), the [Fabric renderer](/react-native-glossary/fabric-renderer) and [TurboModules](/react-native-glossary/turbomodules). It became the default in React Native 0.76 in October 2024. New apps get it automatically — the reason to care is that tutorials written before then describe bridge behaviour that no longer applies.',
  },
  {
    question: 'Why does my app need a rebuild sometimes but not others?',
    answer:
      'Anything inside the [JavaScript bundle](/react-native-glossary/javascript-bundle) — components, logic, styles — reloads instantly with [Fast Refresh](/react-native-glossary/fast-refresh) and can even ship as an [over-the-air update](/react-native-glossary/over-the-air-update). Anything outside it — adding a [native module](/react-native-glossary/native-module), changing permissions, upgrading React Native — changes the binary and needs a new build.',
  },
  {
    question: 'Which terms should a React Native beginner learn first?',
    answer:
      'Start with the ones you meet on day one: [Core Components](/react-native-glossary/core-components), [JSX](/react-native-glossary/jsx), [Props and State](/react-native-glossary/props-and-state), [Flexbox](/react-native-glossary/flexbox) and [StyleSheet](/react-native-glossary/stylesheet). Then the toolchain — [Expo](/react-native-glossary/expo), [Metro](/react-native-glossary/metro) and [Development Build](/react-native-glossary/development-build) — which is where most setup confusion comes from.',
  },
  {
    question: 'Is this glossary free to use?',
    answer:
      'Yes. Every definition is a public page with no signup, maintained by the React Native team at weshipit.today. If a term is missing or a definition has aged badly, the site is open source on [GitHub](https://github.com/flexbox/weshipit.today).',
  },
];

export async function getStaticProps() {
  const terms = getAllGlossaryTerms();

  const entries: GlossaryEntry[] = terms.map((term: GlossaryTerm) => ({
    title: term.title,
    slug: term.slug,
    letter: term.letter,
    summary: term.summary,
    aliases: term.aliases,
    haystack:
      `${term.title} ${term.aliases.join(' ')} ${term.plainText}`.toLowerCase(),
    relatedTo: term.related.map((label) => ({
      label,
      slug: resolveTermSlug(label, terms),
    })),
  }));

  const lastUpdated =
    terms
      .map((term) => term.updated)
      .filter((date): date is string => Boolean(date))
      .sort()
      .at(-1) ?? null;

  // Carrying each term's definition and alternate names in the set schema lets
  // an AI crawler answer from this one document without fetching 40 pages.
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'React Native Glossary',
    description: `Plain-English definitions of ${terms.length} React Native terms, written for developers new to the ecosystem.`,
    url: `${SITE_URL}${GLOSSARY_PATH}`,
    inLanguage: 'en',
    dateModified: lastUpdated ?? undefined,
    author: AUTHOR_SCHEMA,
    publisher: PUBLISHER_SCHEMA,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.title,
      alternateName: term.aliases.length ? term.aliases : undefined,
      description: term.summary,
      url: `${SITE_URL}${GLOSSARY_PATH}/${term.slug}`,
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
      seoDescription={`${termCount} React Native terms explained in plain English for developers new to the ecosystem — Expo, Metro, JSX, Flexbox, Hermes, the New Architecture, Fabric and TurboModules.`}
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

        {!isSearching && (
          <div className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            <p>
              The React Native glossary is a plain-English reference to the{' '}
              {termCount} words you meet in React Native tutorials, release
              notes and pull requests — from{' '}
              <Link
                href={`${GLOSSARY_PATH}/jsx`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                JSX
              </Link>{' '}
              and{' '}
              <Link
                href={`${GLOSSARY_PATH}/flexbox`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Flexbox
              </Link>{' '}
              to the{' '}
              <Link
                href={`${GLOSSARY_PATH}/legacy-vs-new-architecture`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                New Architecture
              </Link>
              ,{' '}
              <Link
                href={`${GLOSSARY_PATH}/fabric-renderer`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Fabric
              </Link>{' '}
              and{' '}
              <Link
                href={`${GLOSSARY_PATH}/turbomodules`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                TurboModules
              </Link>
              . Every entry is written for someone new to the ecosystem: what
              the term means, why it exists, and the mistake it usually causes.
            </p>
            <p className="mt-4">
              New here? Start with{' '}
              <Link
                href={`${GLOSSARY_PATH}/expo`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Expo
              </Link>
              ,{' '}
              <Link
                href={`${GLOSSARY_PATH}/core-components`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Core Components
              </Link>{' '}
              and{' '}
              <Link
                href={`${GLOSSARY_PATH}/metro`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Metro
              </Link>
              , then read{' '}
              <Link
                href={`${GLOSSARY_PATH}/legacy-vs-new-architecture`}
                className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Legacy vs New Architecture
              </Link>{' '}
              to understand why older tutorials describe React Native
              differently.
            </p>
          </div>
        )}

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
                          {term.aliases.length > 0 && (
                            <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
                              Also called {term.aliases.join(', ')}
                            </p>
                          )}
                          <dd className="mt-3 text-base leading-relaxed text-neutral-600 [&_a:hover]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&>*+*]:mt-3 dark:text-neutral-400 dark:[&_a:hover]:text-blue-400">
                            <GlossaryMarkdown>{term.summary}</GlossaryMarkdown>
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

        {!isSearching && (
          <section
            aria-labelledby="glossary-faq"
            className="mx-auto mt-24 max-w-2xl border-t border-neutral-200 pt-12 dark:border-neutral-800"
          >
            <h2
              id="glossary-faq"
              className="font-display text-2xl font-bold tracking-[-0.03em] text-neutral-950 sm:text-3xl dark:text-neutral-200"
            >
              React Native jargon, answered
            </h2>

            <dl className="mt-8 space-y-8">
              {FAQ.map((item) => (
                <div key={item.question}>
                  <dt className="font-display text-lg font-semibold tracking-[-0.02em] text-neutral-950 dark:text-neutral-200">
                    {item.question}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-neutral-600 [&_a:hover]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 dark:text-neutral-400 dark:[&_a:hover]:text-blue-400">
                    <GlossaryMarkdown>{item.answer}</GlossaryMarkdown>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <aside className="mx-auto mt-24 max-w-3xl">
          <GlossaryCTA />
        </aside>
      </div>
    </Layout>
  );
}
