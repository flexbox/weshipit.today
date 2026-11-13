import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './prism-manual';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-objectivec';

/**
 * Highlights a fenced block at render time, so the colors are in the static
 * HTML and there is no flash on load. Unknown or missing languages stay plain.
 */
function highlight(code: string, className: string) {
  const language = /language-(\w+)/.exec(className)?.[1];
  const grammar = language ? Prism.languages[language] : undefined;
  return grammar ? Prism.highlight(code, grammar, language!) : null;
}

const isInternal = (href: string) =>
  href.startsWith('/') || href.startsWith('#');

/**
 * Renders a glossary definition. Shared by the index and the term pages so a
 * definition reads the same in the list and on its own page.
 */
const components: Components = {
  a: ({ children, href, ...props }) => {
    if (href && isInternal(href)) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  code: ({ children, className }) => {
    // react-markdown only sets `className` (language-*) on fenced blocks, so an
    // absent one means this is an inline span.
    if (className) {
      const html = highlight(String(children).replace(/\n$/, ''), className);
      return html ? (
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <code className={className}>{children}</code>
      );
    }

    return (
      <code className="rounded bg-neutral-200/70 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
        {children}
      </code>
    );
  },
  ol: ({ children }) => (
    <ol className="list-decimal space-y-1 pl-5">{children}</ol>
  ),
  pre: ({ children }) => (
    <pre className="glossary-code overflow-x-auto rounded-xl bg-neutral-900 p-4 font-mono text-xs leading-relaxed text-neutral-100 dark:bg-neutral-950">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="list-disc space-y-1 pl-5">{children}</ul>
  ),
  // Wide tables scroll inside their own container instead of forcing the whole
  // page to scroll horizontally on mobile.
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  td: ({ children }) => (
    <td className="border-b border-neutral-200 px-3 py-2 align-top dark:border-neutral-800">
      {children}
    </td>
  ),
  th: ({ children }) => (
    <th className="border-b border-neutral-300 px-3 py-2 font-semibold whitespace-nowrap text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
      {children}
    </th>
  ),
};

export function GlossaryMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
