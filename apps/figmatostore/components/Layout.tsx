import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/flexbox/figmatostore/bf9a5b283b3367fc63a3cee26973947a629b3203/public/image_og.png"
      />
      <meta property="og:title" content="Figma to store" />
      <meta
        property="og:description"
        content="Beautiful apps screenshots,to publish in no-time."
      />
    </Head>
    {children}
  </>
);

export default Layout;
