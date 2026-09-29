import type { Metadata } from 'next';

import { Builder } from '../../components/builder';
import { fromSearchParams } from '../../lib/grid-state';

export const metadata: Metadata = {
  title: 'Build your 9',
};

interface CreatePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CreatePage({ searchParams }: CreatePageProps) {
  const params = await searchParams;
  return (
    <Builder
      fromUrl={Boolean(params.f)}
      initialState={fromSearchParams(params)}
    />
  );
}
