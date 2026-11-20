import React, { ReactElement, useEffect } from 'react';
import type { RichTextField } from '@prismicio/client';
import { PrismicRichText, type JSXMapSerializer } from '@prismicio/react';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-synthwave84.css';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

Prism.hooks.add('before-highlight', function (env) {
  // @ts-ignore: Unreachable code error
  env.code = env.element.innerText;
});

// Returning null falls back to @prismicio/react's default serializer
const components: JSXMapSerializer = {
  preformatted: ({ children, key }) => (
    <pre key={key}>
      <code className="language-javascript">{children}</code>
    </pre>
  ),
  heading2: ({ node, children, key }) => {
    const id = kebabCase(node.text);
    return (
      <h2 key={key} id={id}>
        <a href={`#${id}`} className="font-bold no-underline hover:underline">
          {children}
        </a>
      </h2>
    );
  },
  hyperlink: ({ node, children, key }) => {
    if (node.data.link_type === 'Document' && 'uid' in node.data) {
      return (
        <Link key={key} href={`/blog/${node.data.uid}`}>
          {children}
        </Link>
      );
    }
    return null;
  },
};

interface Props {
  render: RichTextField;
}

export default function RichText({ render }: Props): ReactElement {
  useEffect(() => {
    Prism.highlightAll();
  }, [render]);

  return <PrismicRichText field={render} components={components} />;
}
