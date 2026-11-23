import { Card, Text } from '@weshipit/ui';
import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { LeadMagnetForm } from '../../../components/hq/lead-magnet-form';
import { Layout } from '../../../components/layout';
import { getOwner } from '../../../utils/hq/require-owner';
import { getHqAdmin } from '../../../utils/hq/supabase';

interface CapturePageProps {
  magnet: {
    slug: string;
    title: string;
    pitch: string;
    bullets: string[];
    published: boolean;
  };
}

/** Counts one view per slug per browser session. */
function useViewBeacon(slug: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const key = `lm-view:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage blocked: count the view anyway.
    }
    fetch('/api/lm/view', {
      body: JSON.stringify({ slug }),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      method: 'POST',
    }).catch(() => undefined);
  }, [slug, enabled]);
}

export default function CapturePage({ magnet }: CapturePageProps) {
  useViewBeacon(magnet.slug, magnet.published);

  return (
    <Layout
      seoTitle={magnet.title}
      seoDescription={magnet.pitch}
      ogImageTitle={magnet.title}
      ogImageKicker="Free resource"
      locale="en_US"
      noindex
      withHeader
      withContainer
    >
      <div className="mx-auto grid max-w-5xl gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          {!magnet.published && (
            <p className="mb-4 inline-block rounded bg-amber-100 px-2 py-1 text-sm text-amber-900">
              Draft: only visible to you
            </p>
          )}
          <Text as="h1" variant="h2" className="text-slate-900 dark:text-white">
            {magnet.title}
          </Text>
          <Text
            as="p"
            variant="p1"
            className="mt-4 text-slate-600 dark:text-slate-300"
          >
            {magnet.pitch}
          </Text>
          {magnet.bullets.length > 0 && (
            <ul className="mt-8 space-y-3">
              {magnet.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-slate-700 dark:text-slate-300"
                >
                  <span aria-hidden="true" className="text-green-600">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Card size="lg" className="self-start">
          <LeadMagnetForm slug={magnet.slug} />
        </Card>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<CapturePageProps> = async (
  ctx,
) => {
  const slug = String(ctx.params?.slug ?? '');
  const { data: magnet } = await getHqAdmin()
    .from('lead_magnets')
    .select('slug, title, pitch, bullets, published')
    .eq('slug', slug)
    .maybeSingle();

  if (!magnet) return { notFound: true };

  if (!magnet.published) {
    // Drafts are visible to me only, for a check before publishing.
    if (!(await getOwner(ctx.req, ctx.res))) return { notFound: true };
    ctx.res.setHeader('Cache-Control', 'private, no-store');
  } else {
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300',
    );
  }

  // content_md stays out of the props: it is only sent after the form.
  return { props: { magnet } };
};
