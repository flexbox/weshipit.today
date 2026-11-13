import { Text } from '@weshipit/ui';
import type { ReactNode } from 'react';

export interface DirectoryHeroSection {
  href: string;
  label: string;
  count?: number;
}

interface DirectoryHeroProps {
  /** Short label above the title, e.g. "Free directory · 120 tools". */
  kicker: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** Anchor chips under the description, one per section of the page. */
  sections?: DirectoryHeroSection[];
  sectionsLabel?: string;
}

/*
 * Contrast, measured against Tailwind 4 values (WCAG 2.x ratio):
 * every gradient stop keeps white text ≥ 5.26:1 (blue-700 6.82, blue-600 5.26,
 * cyan-700 5.28). Description blue-50 ≥ 4.82:1, highlight cyan-200 ≥ 4.22:1
 * (large text, needs 3:1). Chips darken the surface, so white on them only
 * gains contrast. The cyan glow is xl-only and sits right of the text column.
 */
const chipClassName =
  'inline-flex items-center gap-2 rounded-full border border-transparent bg-blue-950/25 text-white ring-1 ring-inset ring-white/25';

/**
 * Shared hero for the free directories and tools
 * (/react-native-tools, /devtools, /react-native-starters, …).
 * Keep every directory page on this component so they read as one family.
 */
export function DirectoryHero({
  description,
  kicker,
  sections,
  sectionsLabel = 'Sections',
  title,
}: DirectoryHeroProps) {
  return (
    <div className="relative isolate mb-12 overflow-hidden bg-linear-to-br from-blue-700 via-blue-600 to-cyan-700">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 hidden size-[36rem] rounded-full bg-cyan-400/35 blur-3xl xl:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] bg-size-[24px_24px] mask-l-from-0% mask-l-to-55%"
      />

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        <header className="flex max-w-3xl flex-col gap-6 py-12 lg:py-24">
          <span
            className={`${chipClassName} self-start px-3 py-1 text-xs font-medium`}
          >
            {kicker}
          </span>
          <Text as="h1" variant="h2" className="text-balance text-white!">
            {title}
          </Text>
          <Text as="p" variant="p1" className="text-pretty text-blue-50!">
            {description}
          </Text>

          {sections && sections.length > 0 && (
            <nav aria-label={sectionsLabel}>
              <ul className="flex flex-wrap gap-3">
                {sections.map((section) => (
                  <li key={section.href}>
                    <a
                      href={section.href}
                      className={`${chipClassName} px-4 py-2 text-sm font-medium transition-[background-color,box-shadow] duration-150 hover:bg-blue-950/40 hover:ring-white/50`}
                    >
                      {section.label}
                      {section.count !== undefined && (
                        <span className="rounded-full bg-blue-950/30 px-2 text-xs tabular-nums">
                          {section.count}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>
      </div>
    </div>
  );
}

/** Accent for the dynamic word in a hero title (active filter, category…). */
export function DirectoryHeroHighlight({ children }: { children: ReactNode }) {
  return <span className="text-cyan-200">{children}</span>;
}

/** Link style for inline links inside a hero description. */
export const directoryHeroLinkClassName =
  'font-semibold text-white underline decoration-white/50 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-cyan-200';

/** Sponsorship line shared by the curated directories. */
export function RoadmapSponsorship() {
  return (
    <>
      Brought to you through the generous sponsorship of{' '}
      <a
        href="https://gum.co/road-react-native/HELLO_FRIEND"
        className={directoryHeroLinkClassName}
      >
        the React Native Roadmap
      </a>
      .
    </>
  );
}
