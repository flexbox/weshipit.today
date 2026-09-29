import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { MY_NINE } from '../data/my-nine';
import { toSearchParams } from '../lib/grid-state';
import { SITE_NAME, SITE_URL } from '../lib/site';
import './global.css';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const DESCRIPTION =
  'Pick the 9 frameworks, languages and tools that shaped the developer you are. Order them, share the grid.';

export const metadata: Metadata = {
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    description: DESCRIPTION,
    images: [`/api/og?${toSearchParams(MY_NINE)}&variant=home`],
    siteName: SITE_NAME,
    type: 'website',
  },
  title: {
    default: '9frameworks — the 9 frameworks that shaped you',
    template: `%s · ${SITE_NAME}`,
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable}`} lang="en">
      <body className="flex min-h-dvh flex-col bg-page font-sans text-zinc-300">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
          <Link
            className="flex items-center gap-2 font-mono text-sm font-bold text-zinc-100"
            href="/"
          >
            <Logo />
            {SITE_NAME}
          </Link>
          <Link
            className="rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-100 transition-colors hover:border-accent hover:text-accent"
            href="/create"
          >
            Build yours
          </Link>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mx-auto w-full max-w-6xl px-5 py-10 font-mono text-xs text-zinc-600">
          Made by{' '}
          <a
            className="text-zinc-400 underline-offset-4 hover:text-accent hover:underline"
            href="https://twitter.com/intent/follow?screen_name=flexbox_"
            rel="noreferrer"
            target="_blank"
          >
            David Leuliette (@flexbox_)
          </a>{' '}
          ·{' '}
          <a
            className="text-zinc-400 underline-offset-4 hover:text-accent hover:underline"
            href="https://weshipit.today"
          >
            weshipit.today
          </a>{' '}
          · Logos by{' '}
          <a
            className="text-zinc-400 underline-offset-4 hover:text-accent hover:underline"
            href="https://simpleicons.org"
          >
            Simple Icons
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

function Logo() {
  return (
    <svg aria-hidden className="size-5" viewBox="0 0 20 20">
      {Array.from({ length: 9 }, (_, i) => (
        <rect
          fill={i === 4 ? 'var(--color-accent)' : 'currentColor'}
          height="5"
          key={i}
          opacity={i === 4 ? 1 : 0.35}
          rx="1.2"
          width="5"
          x={(i % 3) * 7 + 0.5}
          y={Math.floor(i / 3) * 7 + 0.5}
        />
      ))}
    </svg>
  );
}
