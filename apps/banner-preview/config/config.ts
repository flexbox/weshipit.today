// Single source of truth for cross-platform identity.
// Iterate here when you tweak voice or branding so the banner and every
// preview frame stay consistent.

export const CONFIG = {
  linkedIn: {
    name: 'David Leuliette',
    description:
      'Host du Cross Platform Show — Le podcast #1 sur React Native en France · 10 000+ écoutes · React Native depuis 2016 · 50+ talks',
    slug: 'david-leuliette',
  },
  youtube: {
    name: 'David Leuliette | weshipit',
    description: `Tu cherches à exceller dans le développement mobile ?

Bienvenue sur la chaîne N°1 dédiée à React Native en France.

Je suis David Leuliette, host du Cross Platform Show, le podcast incontournable pour les développeurs mobiles (avec plus de 10 000 écoutes) et passionnés de tech.

Ici, tu trouveras :

-  Des interviews avec des experts de React Native, où nous décryptons leurs retours d’expérience et astuces pratiques.

-  Des discussions approfondies sur les dernières tendances en matière de développement cross-platform et des conseils pour améliorer tes compétences.

-  Des analyses d'applications mobiles innovantes et des études de cas pour inspirer ton travail.

Abonne-toi et partage cet épisode avec un collègue développeur !`,
    handle: '@flexbox_',
  },
  x: {
    name: 'David Leuliette',
    description:
      'Host du Cross Platform Show · Podcast #1 React Native 🇫🇷 · 10K+ écoutes · React Native depuis 2016 · weshipit.today',
    handle: '@flexbox_',
  },
  banner: {
    name: 'David Leuliette',
    handle: '@flexbox_',
    eyebrow: {
      label: 'LE PODCAST',
      accent: '#1',
    },
    headline: 'REACT NATIVE EN FRANCE',
    tagline: 'Le Podcast #1 sur React Native en France',
    url: 'weshipit.today',
  },
} as const;

export type Config = typeof CONFIG;
