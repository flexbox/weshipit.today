import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const isInternal = (href: string) =>
  href.startsWith('/') || href.startsWith('#');

/**
 * Renders a glossary definition. Shared by the index and the term pages so a
 * definition reads the same in the list and on its own page.
 */
const components: Components = {
  a: ({ href, children, ...props }) => {
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
  ul: ({ children }) => (
    <ul className="list-disc space-y-1 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-1 pl-5">{children}</ol>
  ),
  code: ({ children, className }) =>
    // react-markdown only sets `className` (language-*) on fenced blocks, so an
    // absent one means this is an inline span.
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-neutral-200/70 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-4 font-mono text-xs leading-relaxed text-neutral-100 dark:bg-neutral-950">
      {children}
    </pre>
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
  th: ({ children }) => (
    <th className="border-b border-neutral-300 px-3 py-2 font-semibold whitespace-nowrap text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-neutral-200 px-3 py-2 align-top dark:border-neutral-800">
      {children}
    </td>
  ),
};

export function GlossaryMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
