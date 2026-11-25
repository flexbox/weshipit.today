import type { Decorator } from '@storybook/react';

/**
 * Storybook-only: paints the site background (`bg-background`, set on <html>
 * in apps/web) behind a story, so token-based components read as in prod.
 * Set `parameters.contentWidth` (any CSS width) to size the story inside it;
 * the backdrop grows with the content instead of letting it overflow.
 * Not exported from the package.
 */
export const withPageBackdrop: Decorator = (Story, { parameters }) => (
  <div className="w-fit min-w-full bg-background p-6 text-neutral-950 dark:text-neutral-200">
    <div style={{ width: parameters['contentWidth'] }}>
      <Story />
    </div>
  </div>
);
