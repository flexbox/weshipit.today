import React from 'react';
import Avatar from '~/components/Avatar';
import { P } from '~/components/Typography';

export default function Author() {
  return (
    <div className="flex items-center">
      <Avatar />
      <div className="p-5">
        <P>
          Hi, I’m David, a french <strong>freelance developer</strong> working
          remotely. I’m the author of this blog, nice to meet you!
        </P>
      </div>
    </div>
  );
}
