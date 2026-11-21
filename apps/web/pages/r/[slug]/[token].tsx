import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { MagnetMarkdown } from '../../../components/hq/magnet-markdown';
import { Layout } from '../../../components/layout';
import { getHqAdmin } from '../../../utils/hq/supabase';

interface ResourcePageProps {
  title: string;
  content: string;
}

/** The resource itself, reached from the form or the email link. */
export default function ResourcePage({ content, title }: ResourcePageProps) {
  return (
    <Layout
      seoTitle={title}
      seoDescription={title}
      locale="fr_FR"
      noindex
      withContainer
    >
      <article className="mx-auto max-w-3xl py-10 md:py-16">
        <div className="mb-10 flex items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-900 hover:text-blue-600 dark:text-white"
          >
            weshipit.today
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
          >
            Enregistrer en PDF
          </button>
        </div>
        <h1 className="mb-8 text-3xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
        <MagnetMarkdown content={content} />
        <p className="mt-12 hidden text-sm text-slate-500 print:block">
          weshipit.today
        </p>
      </article>
    </Layout>
  );
}

const TOKEN = /^[0-9a-f-]{36}$/i;

export const getServerSideProps: GetServerSideProps<ResourcePageProps> = async (
  ctx,
) => {
  const slug = String(ctx.params?.slug ?? '');
  const token = String(ctx.params?.token ?? '');
  if (!TOKEN.test(token)) return { notFound: true };

  const { data: lead } = await getHqAdmin()
    .from('leads')
    .select('lead_magnets(slug, title, content_md)')
    .eq('access_token', token)
    .maybeSingle();

  const magnet = lead?.lead_magnets;
  if (!magnet || magnet.slug !== slug) return { notFound: true };

  ctx.res.setHeader('Cache-Control', 'private, no-store');
  return { props: { content: magnet.content_md, title: magnet.title } };
};
