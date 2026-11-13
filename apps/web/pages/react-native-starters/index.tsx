import { Layout } from '../../components/layout';
import {
  CategorizedStarters,
  ReactNativeStartersPageProps,
  StarterLevel,
  StarterRecord,
  starters,
} from '../../fixtures/starters.fixture';

import { Hyperlink, Prose, TagList, Text } from '@weshipit/ui';
import {
  DirectoryHero,
  DirectoryHeroHighlight,
  RoadmapSponsorship,
} from '../../components/directory-hero';
import round from 'lodash/round';

import { linksApi } from '../api/links';
import { extractUsernameFromGithubUrl } from '@weshipit/utils';

const levelDetails: Record<StarterLevel, { id: string; description: string }> =
  {
    Advanced: {
      description:
        'Designed for experienced React Native developers. They offer a lot of flexibility and customization options, but they take more time to set up and use.',
      id: 'advanced',
    },
    Beginner: {
      description:
        'Easy to use and need very little prior knowledge of React Native. A good choice if you are new to React Native or want to create a simple app quickly.',
      id: 'beginner',
    },
    Intermediate: {
      description:
        'More flexibility and customization options than the beginner templates, with a steeper setup.',
      id: 'intermediate',
    },
  };

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function StarterCard({ record }: { record: StarterRecord }) {
  const { github_url, name, scope, stack, website_url } = record.fields;
  const author = extractUsernameFromGithubUrl(github_url || '');

  return (
    <li className="flex min-w-0 flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-lg dark:bg-slate-800 dark:ring-white/10">
      <div className="flex flex-col gap-1">
        <Text
          as="h3"
          variant="s2"
          className="break-words font-semibold text-slate-900 dark:text-slate-100"
        >
          {name}
        </Text>
        {author && (
          <Text as="p" variant="c2" className="text-slate-500">
            by {author}
          </Text>
        )}
      </div>

      {(scope || stack) && (
        <div className="flex flex-col gap-4">
          {scope && (
            <div className="flex flex-col gap-2">
              <Text
                as="p"
                variant="c2"
                className="font-semibold text-slate-600 dark:text-slate-400"
              >
                Scope
              </Text>
              <TagList tags={scope} size="sm" />
            </div>
          )}
          {stack && (
            <div className="flex flex-col gap-2">
              <Text
                as="p"
                variant="c2"
                className="font-semibold text-slate-600 dark:text-slate-400"
              >
                Stack included
              </Text>
              <TagList tags={stack} size="sm" />
            </div>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-3">
        {github_url && (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-50 hover:ring-slate-400 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-700"
          >
            GitHub
            <span className="sr-only">repository for {name}</span>
            <ExternalIcon />
          </a>
        )}
        {website_url && (
          <a
            href={website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-200 transition-colors hover:bg-blue-100 hover:ring-blue-300 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/30 dark:hover:bg-blue-400/20"
          >
            Website
            <span className="sr-only">of {name}</span>
            <ExternalIcon />
          </a>
        )}
      </div>
    </li>
  );
}

export default function ReactNativeStartersPage({
  categorizedRecords,
}: ReactNativeStartersPageProps) {
  const levels = categorizedRecords.filter(
    (category) => category.records.length > 0,
  );
  const totalStarters = levels.reduce(
    (total, category) => total + category.records.length,
    0,
  );
  // rounded down for the SEO title, so it stays true as the list grows
  const seoCount = round(totalStarters, -1);

  return (
    <Layout
      seoTitle="React Native Starter Kits & Boilerplates"
      seoDescription={`${seoCount}+ React Native starter kits and boilerplates for Expo and the CLI, sorted by level: navigation, auth, state and UI already wired so you ship faster.`}
      ogImageTitle="React Native Starter Templates"
      ogImageKicker="Free directory"
      withHeader
      navigation={levels.map((category) => ({
        href: `#${levelDetails[category.title].id}`,
        name: category.title,
      }))}
      callToActionButton={{
        href: linksApi.airtable.TEMPLATE_FORM,
        isExternalLink: true,
        name: 'Add a React Native Boilerplate',
      }}
      withFooter
    >
      <DirectoryHero
        kicker={`Free directory · ${totalStarters} starters`}
        title={
          <>
            The best{' '}
            <DirectoryHeroHighlight>starter templates</DirectoryHeroHighlight>{' '}
            for busy React Native developers
          </>
        }
        description={
          <>
            Boilerplates to create your React Native project, sorted by how much
            they decide for you. <RoadmapSponsorship />
          </>
        }
        sectionsLabel="Levels"
        sections={levels.map((category) => ({
          href: `#${levelDetails[category.title].id}`,
          label: category.title,
          count: category.records.length,
        }))}
      />

      <div className="mx-auto flex max-w-screen-xl flex-col gap-24 px-4 pb-24 sm:px-6">
        {levels.map((category) => {
          const { description, id } = levelDetails[category.title];
          return (
            <section
              key={category.title}
              id={id}
              aria-labelledby={`${id}-title`}
              className="flex scroll-mt-28 flex-col gap-8"
            >
              <div className="flex max-w-3xl flex-col gap-3">
                <Text
                  as="h2"
                  variant="h4"
                  id={`${id}-title`}
                  className="font-semibold text-slate-900 dark:text-slate-100"
                >
                  {category.title} starters
                </Text>
                <Text
                  as="p"
                  variant="p1"
                  className="text-pretty text-slate-600 dark:text-slate-400"
                >
                  {description}
                </Text>
              </div>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-6">
                {category.records.map((record) => (
                  <StarterCard key={record.id} record={record} />
                ))}
              </ul>
            </section>
          );
        })}

        <section className="max-w-3xl">
          <Prose size="lg">
            <h2>
              How do you choose which React Native boilerplate to include?
            </h2>
            <p>
              Every week, we search and evaluate the best starter templates from
              the Internet.
            </p>
            <p>
              Afterwards, we tested each boilerplate in their common use cases
              and selected best ones that are highly personalized and deliver
              what they promise.
            </p>
            <p>
              If you find a useful template that&apos;s not in the list, but
              should be - please let us know! You can also{' '}
              <Hyperlink href={linksApi.airtable.TEMPLATE_FORM} isExternal>
                submit your custom template here
              </Hyperlink>
              .
            </p>

            <h2>How can I contact you if I have questions?</h2>
            <p>
              Feedback and ideas on how to improve this site are most welcome.
            </p>
            <p>
              Feel free to reach me on Twitter (X){' '}
              <Hyperlink href="https://twitter.com/intent/follow?screen_name=flexbox_">
                @flexbox_
              </Hyperlink>
              .
            </p>
          </Prose>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const records = starters.records;

  // add an extra keys and order records by level
  // sort all begninner first, then intermediate and advanced
  records.sort((a, b) => {
    const levelA = a.fields.level.toLowerCase();
    const levelB = b.fields.level.toLowerCase();

    if (levelA === 'beginner' && levelB !== 'beginner') {
      return -1;
    }
    if (levelA !== 'beginner' && levelB === 'beginner') {
      return 1;
    }
    if (levelA === 'intermediate' && levelB !== 'intermediate') {
      return -1;
    }
    if (levelA !== 'intermediate' && levelB === 'intermediate') {
      return 1;
    }

    return 0;
  });

  const categorizedRecords: CategorizedStarters[] = [
    { records: [], title: 'Beginner' },
    { records: [], title: 'Intermediate' },
    { records: [], title: 'Advanced' },
  ];

  records.forEach((record) => {
    const level = record.fields.level.toLowerCase();
    if (level === 'beginner') {
      categorizedRecords[0].records.push(record);
    } else if (level === 'intermediate') {
      categorizedRecords[1].records.push(record);
    } else if (level === 'advanced') {
      categorizedRecords[2].records.push(record);
    }
  });

  return {
    props: {
      categorizedRecords,
    },
  };
}
