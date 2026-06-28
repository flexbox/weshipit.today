import React, { ReactElement, useEffect } from 'react';
import {
  RichText as PrismicRichText,
  Elements,
  RichTextBlock,
} from 'prismic-reactjs';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-synthwave84.css';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

Prism.hooks.add('before-highlight', function (env) {
  // @ts-ignore: Unreachable code error
  env.code = env.element.innerText;
});

function customHtmlSerializer(type, element, content, children, key) {
  if (type === Elements.preformatted) {
    return (
      <pre key={key}>
        <code className="language-javascript">{children}</code>
      </pre>
    );
  }
  if (type === Elements.heading2) {
    const id = kebabCase(children);
    return (
      <h2 key={key} id={id}>
        <a href={`#${id}`} className="font-bold no-underline hover:underline">
          {children}
        </a>
      </h2>
    );
  }
  if (type === Elements.hyperlink) {
    if (element.data.link_type === 'Document') {
      return <Link href={`/blog/${element.data.uid}`}>{children}</Link>;
    }
  }

  return null; // Returning null makes the serializer fallback to its default behavior
}

interface Props {
  render: RichTextBlock[];
}

export default function RichText({ render }: Props): ReactElement {
  useEffect(() => {
    Prism.highlightAll();
  }, [render]);

  return (
    <PrismicRichText render={render} htmlSerializer={customHtmlSerializer} />
  );
}
