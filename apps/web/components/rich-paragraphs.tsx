import type { RichParagraph } from '../content/types';

export function RichParagraphs({
  paragraphs,
}: {
  paragraphs: RichParagraph[];
}) {
  return (
    <>
      {paragraphs.map((segments, i) => (
        <p key={i}>
          {segments.map((segment, j) => {
            if (segment.strong) return <strong key={j}>{segment.text}</strong>;
            if (segment.em) return <em key={j}>{segment.text}</em>;
            return segment.text;
          })}
        </p>
      ))}
    </>
  );
}
