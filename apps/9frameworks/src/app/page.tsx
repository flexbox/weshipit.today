import Link from 'next/link';

import { NineGrid } from '../components/nine-grid';
import { FRAMEWORKS } from '../data/catalog';
import { MY_NINE } from '../data/my-nine';

const STEPS = [
  {
    body: `Search ${FRAMEWORKS.length}+ frameworks, languages and tools. Missing one? Add it by name.`,
    title: 'Pick',
  },
  {
    body: 'Drag them into the order you met them. Add the year each one entered your life.',
    title: 'Order',
  },
  {
    body: 'Download a PNG, or share a link that unfurls as an image on X, LinkedIn and Bluesky.',
    title: 'Share',
  },
];

const PROMPTS = [
  'The first thing you ever shipped with.',
  'The one that got you hired.',
  'The one you hated before you loved it.',
  'The one that made you rewrite a side project from scratch.',
  'The one that taught you a pattern you still use everywhere.',
  'The one you would defend in any code review.',
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-20 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div>
          <p className="font-mono text-sm text-accent">
            $ git log --reverse ~/career
          </p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-zinc-50 sm:text-6xl">
            Nine frameworks.
            <br />
            <span className="text-zinc-500">One developer: you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-zinc-400">
            Not your résumé. Not your current stack. The nine tools that changed
            how you think about code — from your first{' '}
            <code className="font-mono text-zinc-200">&lt;script&gt;</code> tag
            to the one you would pick for tomorrow&apos;s side project. Pick
            them, order them, share the grid.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              className="rounded-full bg-accent px-6 py-3 font-semibold text-page transition-transform hover:-translate-y-0.5 active:translate-y-0"
              href="/create"
            >
              Build my 9 →
            </Link>
            <span className="font-mono text-xs text-zinc-600">
              free · no sign-up · 2 minutes
            </span>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-md">
          <NineGrid slots={MY_NINE.slots} />
          <figcaption className="mt-4 text-center font-mono text-xs text-zinc-500">
            {MY_NINE.title}&apos;s 9 — oldest first
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-white/5 bg-white/[0.015]">
        <ol className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2 text-xl font-bold text-zinc-100">
                {step.title}
              </h2>
              <p className="mt-2 text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-50">
          Stuck at six? Ask yourself:
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROMPTS.map((prompt) => (
            <li
              className="rounded-xl border border-white/8 bg-tile px-5 py-4 text-zinc-300"
              key={prompt}
            >
              <span className="mr-2 font-mono text-accent">›</span>
              {prompt}
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <Link
            className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-page transition-transform hover:-translate-y-0.5 active:translate-y-0"
            href="/create"
          >
            Build my 9 →
          </Link>
        </div>
      </section>
    </>
  );
}
