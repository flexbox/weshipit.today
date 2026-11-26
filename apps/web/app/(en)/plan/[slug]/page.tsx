import { Prose } from '@weshipit/ui/prose/prose';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { JsonLd } from '../../../../components/json-ld';
import { LinkedInOgImage } from '../../../../components/linkedin-og-image';
import { PageShell } from '../../../../components/page-shell';
import { PlanNavSelect } from '../../../../components/plan-nav-select';
import { PlanSidebar } from '../../../../components/plan-sidebar';
import { getPlan, getPlanSlugs, Plan } from '../../../../utils/plan';
import {
  buildMetadata,
  PageSeo,
  SITE_URL,
} from '../../../../utils/seo/metadata';

interface PlanPageProps {
  params: Promise<{ slug: string }>;
}

// Plans are files in the repo: every valid URL is known at build time, and
// any other slug is a 404 (`fallback: false` in the Pages Router).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPlanSlugs().map((slug) => ({ slug }));
}

const seoFor = (plan: Plan): PageSeo => ({
  ogImageKicker: `Plan ${plan.slug.toUpperCase()}`,
  ogImageTitle: plan.title,
  path: `/plan/${plan.slug}`,
  seoDescription: plan.seoDescription,
  seoTitle: plan.seoTitle,
});

export async function generateMetadata({
  params,
}: PlanPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlan(slug);
  return plan ? buildMetadata(seoFor(plan)) : {};
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { slug } = await params;
  const plan = getPlan(slug);
  if (!plan) notFound();

  const { glossaryTerms, heading, service, topics } = plan;
  const slugs = getPlanSlugs();
  const url = `${SITE_URL}/plan/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    author: {
      '@type': 'Person',
      name: 'David Leuliette',
      url: SITE_URL,
    },
    datePublished: plan.datePublished,
    description: plan.description,
    headline: heading || plan.title,
    mainEntityOfPage: { '@id': url, '@type': 'WebPage' },
    publisher: {
      '@type': 'Organization',
      name: 'weshipit.today',
      url: SITE_URL,
    },
    url,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', item: SITE_URL, name: 'Home', position: 1 },
      {
        '@type': 'ListItem',
        item: `${SITE_URL}/plan`,
        name: 'Plan',
        position: 2,
      },
      {
        '@type': 'ListItem',
        item: url,
        name: `Plan ${slug.toUpperCase()}`,
        position: 3,
      },
    ],
  };

  return (
    <PageShell withHeader>
      <LinkedInOgImage seo={seoFor(plan)} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <PlanNavSelect slugs={slugs} currentSlug={slug} />

        <div className="flex gap-12">
          <PlanSidebar slugs={slugs} currentSlug={slug} />

          {/* Content */}
          <article className="min-w-0 flex-1">
            <Prose className="prose-headings:text-balance prose-p:text-pretty">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Every file opens with the same "React Native Roadmap
                  // <week>" heading; say what the week is about, then
                  // introduce it.
                  h1: () => (
                    <>
                      <h1>{heading}</h1>
                      {topics.length > 0 && (
                        <p className="lead">
                          What to ship in a React Native app this week:{' '}
                          {topics.join(', ')}. Each one links to its source,
                          then the 5-day plan below breaks it into steps you can
                          apply to your codebase.
                        </p>
                      )}
                    </>
                  ),
                  // Wide tables scroll inside their own container instead of
                  // forcing the whole page to scroll horizontally on mobile.
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto">
                      <table {...props} />
                    </div>
                  ),
                }}
              >
                {plan.content}
              </ReactMarkdown>
            </Prose>

            <aside className="mt-16 rounded-2xl bg-slate-100 p-8 dark:bg-slate-900">
              {glossaryTerms.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-slate-100">
                    Terms in this plan
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {glossaryTerms.map((term) => (
                      <li key={term.slug}>
                        <Link
                          href={`/react-native-glossary/${term.slug}`}
                          className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 dark:decoration-slate-600 dark:hover:decoration-slate-100"
                        >
                          {term.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h2
                className={`text-xl font-bold text-slate-950 dark:text-slate-100${glossaryTerms.length > 0 ? ' mt-8' : ''}`}
              >
                Want this done in your app?
              </h2>
              <p className="mt-3 text-slate-700 dark:text-slate-300">
                {service.pitch}{' '}
                <Link
                  href={service.href}
                  className="font-semibold underline underline-offset-4"
                >
                  See our {service.label}
                </Link>
              </p>
            </aside>
          </article>
        </div>
      </div>
    </PageShell>
  );
}
