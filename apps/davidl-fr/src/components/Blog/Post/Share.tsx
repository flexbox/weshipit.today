import React from 'react';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { NativeLink } from '~/components/Link/NativeLink';

interface ShareProps {
  title: string;
  slug: string;
}

export const Share = ({ slug, title }: ShareProps) => {
  const url = `https://davidl.fr/blog/${slug}`;

  return (
    <ProseContainer>
      <div className="flex flex-col">
        <div className="flex-auto py-2">
          🐦{' '}
          <NativeLink
            href={`https://twitter.com/intent/tweet?text=${title}+@flexbox_+${url}`}
          >
            Got a comment? Need help? Shoot a tweet!
          </NativeLink>
        </div>
        <div className="flex-auto py-2">
          ☕️{' '}
          <NativeLink href="https://github.com/sponsors/flexbox?frequency=one-time&sponsor=flexbox">
            Was this helpful? Leaving a small tip helps me a lot!
          </NativeLink>
        </div>
      </div>
    </ProseContainer>
  );
};
