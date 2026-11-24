import { Prose } from '@weshipit/ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders a magnet's markdown. GFM task lists (`- [ ] item`) become a
 * checklist. Raw HTML in the markdown is not rendered.
 */
export function MagnetMarkdown({ content }: { content: string }) {
  return (
    // Inline code keeps its monospace style without the literal backticks
    // the typography plugin adds around it.
    <Prose
      className="max-w-none prose-code:before:content-none prose-code:after:content-none print:prose-sm"
      size="lg"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Prose>
  );
}
