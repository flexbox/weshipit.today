// Single source of truth for cross-platform identity.
//
// Canonical brand pillars — repeat verbatim across surfaces to keep the
// profile crystal clear for both humans and AI search engines:
//   Show name:    "Cross Platform Show"
//   Positioning:  "Podcast 🇫🇷 #1 React Native "
//   Listeners:    "10k+ écoutes"
//   Experience:   "React Native depuis 2016"
//   Authority:    "50+ talks"
//   Domain:       "weshipit.today"
//   Handle:       "@flexbox_"
//   Separator:    " · "  (U+00B7 middle dot)
//
// Iterate here when you tweak voice or branding so the banner and every
// preview frame stay consistent.

// Gravatar URL derived from md5('dleuliette@gmail.com'). Re-compute the hash
// (md5 of the lowercased trimmed email) if the canonical email ever changes.
export const AVATAR_URL =
  'https://gravatar.com/avatar/66ecc55f1bc2e5863eb516ee6f20794e?s=300';

export const CONFIG = {
  linkedIn: {
    slug: 'david-leuliette',
    name: 'David Leuliette',
    // headline: 220 characters max
    headline:
      'React Native depuis 2016 · Host du Cross Platform Show · Podcast 🇫🇷 #1 React Native',
    ctaLabel: 'Réserver un expert React Native',
    ctaUrl: 'https://weshipit.today',
  },
  youtube: {
    // title: 100 characters max
    title: 'Cross Platform Show — David Leuliette',
    // handle: 30 characters max (3–30)
    handle: '@flexbox_',
    // description: 1000 characters max
    description: `Tu cherches à exceller dans le développement mobile ?

Bienvenue sur la chaîne #1 dédiée à React Native en France.

Je suis David Leuliette, host du Cross Platform Show, le podcast incontournable pour les développeurs mobiles (avec plus de 10k+ écoutes) et passionnés de tech.

Ici, tu trouveras :

-  Des interviews avec des experts de React Native, où nous décryptons leurs retours d'expérience et astuces pratiques.

-  Des discussions approfondies sur les dernières tendances en matière de développement cross-platform et des conseils pour améliorer tes compétences.

-  Des analyses d'applications mobiles innovantes et des études de cas pour inspirer ton travail.

Abonne-toi et partage cet épisode avec un collègue développeur !`,
  },
  x: {
    name: 'David Leuliette',
    // description (bio): 160 characters max
    description:
      'React Native depuis 2016 · Host du Cross Platform Show · Podcast 🇫🇷 #1 React Native',
    handle: '@flexbox_',
  },
  spotify: {
    // showName: 100 characters max
    showName: 'Cross Platform Show',
    // creatorName: 80 characters max
    creatorName: 'David Leuliette',
    // description: 600 characters max
    description: `Le podcast #1 React Native en France 🇫🇷. Host : David Leuliette, React Native depuis 2016, 50+ talks. 10k+ écoutes cumulées. Chaque mercredi, retours d'expérience concrets pour Expo, TypeScript, architecture et déploiement d'apps performantes sur iOS et Android. Discussions techniques avec des experts pour Freelances, CTO et Indie Hackers de l'écosystème JavaScript mobile. Abonne-toi sur weshipit.today/podcast.`,
    category: 'Technology',
  },
  banner: {
    name: 'David Leuliette',
    status: 'Nouvel épisode chaque mercredi',
    // \n is honored by the renderer (white-space: pre-line) so the break
    // lands exactly here rather than wherever the text would naturally wrap.
    headline: 'Scale ton app React Native,\nsans 300k€ de dette technique.',
    tagline:
      '🇫🇷 Podcast #1 React Native · 🎧 10k+ écoutes · ⚡ Livre 40% plus vite',
    url: 'weshipit.today/podcast',
  },
} as const;

export type Config = typeof CONFIG;
