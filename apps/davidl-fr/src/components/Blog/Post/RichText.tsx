import React, { ReactElement, useEffect } from 'react';
import type { RichTextField } from '@prismicio/client';
import { PrismicRichText, type JSXMapSerializer } from '@prismicio/react';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-synthwave84.css';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

Prism.hooks.add('before-highlight', function (env) {
  // @ts-expect-error: Prism env.element is typed as Element, which has no innerText
  env.code = env.element.innerText;
});

// Returning null falls back to @prismicio/react's default serializer
const components: JSXMapSerializer = {
  heading2: ({ children, key, node }) => {
    const id = kebabCase(node.text);
    return (
      <h2 key={key} id={id}>
        <a href={`#${id}`} className="font-bold no-underline hover:underline">
          {children}
        </a>
      </h2>
    );
  },
  hyperlink: ({ children, key, node }) => {
    if (node.data.link_type === 'Document' && 'uid' in node.data) {
      return (
        <Link key={key} href={`/blog/${node.data.uid}`}>
          {children}
        </Link>
      );
    }
    return null;
  },
  preformatted: ({ children, key }) => (
    <pre key={key}>
      <code className="language-javascript">{children}</code>
    </pre>
  ),
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
