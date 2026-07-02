import { PropsWithChildren } from 'react';
import { Avatar } from '../avatar/avatar';
import { Text } from '../text/text';

export interface AuthorDisclosureProps extends PropsWithChildren {
  /** Section heading. */
  title?: string;
  /** Author name shown in the byline. */
  name?: string;
  /** Gravatar email used by the Avatar component. */
  email?: string;
  /** Short role/tagline shown under the name. */
  tagline?: string;
}

/**
 * "Pourquoi je publie cet avis" disclosure section shared across the
 * solopreneur pages. Renders the heading and the author byline (Avatar +
 * name + tagline); the page-specific prose is passed as {children}, so the
 * copy can change from one page to another while the layout stays consistent.
 */
export function AuthorDisclosure({
  title = 'Pourquoi je publie cet avis',
  name = 'David Leuliette',
  email = 'dleuliette@gmail.com',
  tagline = 'Solopreneur depuis 2016',
  children,
}: AuthorDisclosureProps) {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Text variant="h3" as="h2" className="mb-6 text-balance">
          {title}
        </Text>

        <div className="mb-8 flex items-center gap-4">
          <Avatar
            email={email}
            name={name}
            size={56}
            className="shrink-0 rounded-full border-2 border-white bg-slate-300 dark:border-neutral-800 dark:bg-slate-700"
          />
          <div>
            <div className="font-semibold text-neutral-950 dark:text-neutral-100">
              {name}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {tagline}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
          {children}
        </div>
      </div>
    </section>
  );
}

export default AuthorDisclosure;
