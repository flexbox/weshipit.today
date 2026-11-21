import { Prose } from '@weshipit/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders a magnet's markdown. GFM task lists (`- [ ] item`) become a
 * checklist. Raw HTML in the markdown is not rendered.
 */
export function MagnetMarkdown({ content }: { content: string }) {
  return (
    <Prose className="max-w-none print:prose-sm" size="lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Prose>
  );
}
