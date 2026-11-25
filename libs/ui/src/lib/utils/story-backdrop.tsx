import type { Decorator } from '@storybook/react';

/**
 * Storybook-only: paints the site background (`bg-background`, set on <html>
 * in apps/web) behind a story, so token-based components read as in prod.
 * Not exported from the package.
 */
export const withPageBackdrop: Decorator = (Story) => (
  <div className="bg-background p-6 text-neutral-950 dark:text-neutral-200">
    <Story />
  </div>
);
