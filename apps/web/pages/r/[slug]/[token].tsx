import {
  CheckIcon,
  ClipboardDocumentIcon,
  PrinterIcon,
} from '@heroicons/react/20/solid';
import { Button } from '@weshipit/ui';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MagnetMarkdown } from '../../../components/hq/magnet-markdown';
import { Layout } from '../../../components/layout';
import { getHqAdmin } from '../../../utils/hq/supabase';

interface ResourcePageProps {
  title: string;
  content: string;
}

type CopyState = 'idle' | 'copied' | 'failed';

/** Copies the resource's raw markdown, ready to paste into an AI agent. */
function CopyButton({ content }: { content: string }) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      setState('copied');
    } catch {
      setState('failed');
    }
  }

  return (
    <>
      <Button as="button" onClick={copy} className="gap-1.5">
        {state === 'copied' ? (
          <CheckIcon className="size-4" aria-hidden="true" />
        ) : (
          <ClipboardDocumentIcon className="size-4" aria-hidden="true" />
        )}
        {state === 'copied' ? (
          'Copied'
        ) : (
          <span>
            Copy<span className="hidden sm:inline"> to clipboard</span>
          </span>
        )}
      </Button>
      <p role="status" className="sr-only">
        {state === 'copied' ? 'Copied to clipboard' : ''}
      </p>
      {state === 'failed' && (
        <p
          role="alert"
          className="basis-full text-right text-sm text-red-700 dark:text-red-400"
        >
          Couldn’t copy. Select the text below and copy it by hand.
        </p>
      )}
    </>
  );
}

/** The resource itself, reached from the form or the email link. */
export default function ResourcePage({ content, title }: ResourcePageProps) {
  return (
    <Layout
      seoTitle={title}
      seoDescription={title}
      locale="en_US"
      noindex
      withContainer
    >
      <article className="mx-auto max-w-3xl pb-16 md:pb-24">
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-slate-900 hover:text-blue-600 md:mt-10 dark:text-white dark:hover:text-blue-400 print:hidden"
        >
          weshipit.today
        </Link>
        {/* Sticky so the actions stay in reach on a long resource. */}
        <div className="bg-background/90 sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center justify-end gap-2 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 md:mb-8 print:hidden">
          <Button
            as="button"
            variant="outline"
            onClick={() => window.print()}
            className="gap-1.5"
          >
            <PrinterIcon className="size-4" aria-hidden="true" />
            Save as PDF
          </Button>
          <CopyButton content={content} />
        </div>
        <h1 className="mb-8 text-balance text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
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
