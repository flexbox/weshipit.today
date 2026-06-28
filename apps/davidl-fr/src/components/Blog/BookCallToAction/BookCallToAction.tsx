import React from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import { P } from '~/components/Typography';

interface Props {}

export const BookCallToAction = (props: Props) => {
  return (
    <div className="mb-24">
      <P>
        I am releasing a book about the React Native ecosystem, which covers{' '}
        <strong>everything I wish I had known before</strong> I started working
        with this technology.
      </P>
      <P>
        If you appreciate my work and would like to show your support, please
        check{' '}
        <NativeLink href="https://flexbox.gumroad.com/l/road-react-native/BLOGFRIEND">
          the Road to React Native
        </NativeLink>
        .
      </P>
    </div>
  );
};
