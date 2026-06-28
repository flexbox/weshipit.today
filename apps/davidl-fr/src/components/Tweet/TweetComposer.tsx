import Link from 'next/link';
import { useState } from 'react';

import { Button } from '~/components/Button';
import Icon from '~/components/Icon';
import { H2, P } from '~/components/Typography';

export const TweetComposer = () => {
  const [text, setText] = useState('');
  const suffix = '\n @flexbox_';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <>
      <textarea
        className="mt-4 w-full rounded-md border-2 border-gray-300 p-2 pb-16 text-black focus:border-yellow-500 focus:outline-none"
        placeholder="I want to reach you because ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <P className="mb-2">{counter} characters left</P>

      <Link
        href={`https://twitter.com/intent/tweet?text=${tweet}`}
        passHref
        legacyBehavior
      >
        <Button>
          <Icon glyph="twitter" size={24} />
          <P className="pl-2">Tweet at @flexbox_</P>
        </Button>
      </Link>
    </>
  );
};
