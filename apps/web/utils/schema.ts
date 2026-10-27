/**
 * Author and publisher entities shared by the glossary JSON-LD.
 *
 * `sameAs` is what lets a search or AI crawler tie these pages to a real,
 * verifiable identity rather than an anonymous byline — the E-E-A-T signal
 * that carries the most weight on developer reference content.
 */
export const AUTHOR_SCHEMA = {
  '@type': 'Person',
  jobTitle: 'React Native engineer',
  name: 'David Leuliette',
  sameAs: ['https://github.com/flexbox', 'https://x.com/flexbox_'],
  url: 'https://weshipit.today/about',
} as const;

export const PUBLISHER_SCHEMA = {
  '@type': 'Organization',
  name: 'weshipit.today',
  sameAs: ['https://github.com/flexbox/weshipit.today'],
  url: 'https://weshipit.today',
} as const;
