import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import { langForPage } from '../utils/page-lang';

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  return (
    <Html lang={langForPage(__NEXT_DATA__.page)} className="bg-background">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
