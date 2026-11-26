/**
 * Structured data for search engines, rendered in the page body.
 *
 * `<` is escaped so a string in the data (a title, a quote from a
 * transcript) can never close the script tag, as the Next.js JSON-LD guide
 * recommends. Crawlers parse the JSON and read the same value either way.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
