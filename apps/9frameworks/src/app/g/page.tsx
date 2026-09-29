import type { Metadata } from 'next';
import Link from 'next/link';

import { NineGrid } from '../../components/nine-grid';
import {
  countFilled,
  fromSearchParams,
  toSearchParams,
} from '../../lib/grid-state';
import { SHARE_TEXT } from '../../lib/site';
import { gridHeading } from '../../lib/tile-view';

interface SharedGridPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: SharedGridPageProps): Promise<Metadata> {
  const state = fromSearchParams(await searchParams);
  const heading = gridHeading(state.title);
  return {
    description: SHARE_TEXT,
    openGraph: {
      description: SHARE_TEXT,
      images: [`/api/og?${toSearchParams(state)}`],
      title: heading,
    },
    title: heading,
  };
}

export default async function SharedGridPage({
  searchParams,
}: SharedGridPageProps) {
  const state = fromSearchParams(await searchParams);
  const query = toSearchParams(state);

  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-5 pt-8 pb-16 text-center">
      <p className="font-mono text-sm text-accent">$ git log --reverse</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-zinc-50 sm:text-4xl">
        {gridHeading(state.title)}
      </h1>
      <p className="mt-2 text-zinc-500">that shaped the developer they are</p>

      <div className="mt-8 w-full">
        {countFilled(state.slots) > 0 ? (
          <NineGrid slots={state.slots} />
        ) : (
          <p className="text-zinc-500">This grid is empty.</p>
        )}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          className="rounded-full bg-accent px-6 py-3 font-semibold text-page transition-transform hover:-translate-y-0.5"
          href="/create"
        >
          Build your own 9 →
        </Link>
        <Link
          className="rounded-full border border-white/10 px-6 py-3 font-medium text-zinc-200 transition-colors hover:border-white/30"
          href={`/create?${query}`}
        >
          Remix this grid
        </Link>
      </div>
    </section>
  );
}
