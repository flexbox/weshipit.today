// Single source of truth for cross-platform identity.
// Iterate here when you tweak voice or branding so the banner and every
// preview frame stay consistent.

// Gravatar URL derived from md5('dleuliette@gmail.com'). Re-compute the hash
// (md5 of the lowercased trimmed email) if the canonical email ever changes.
export const AVATAR_URL =
  'https://gravatar.com/avatar/66ecc55f1bc2e5863eb516ee6f20794e?s=300';

export const CONFIG = {
  linkedIn: {
    name: 'David Leuliette',
    description:
      'Host du Cross Platform Show — Le podcast #1 sur React Native en France · 10k+ écoutes · React Native depuis 2016 · 50+ talks',
    slug: 'david-leuliette',
  },
  youtube: {
    name: 'David Leuliette | weshipit',
    description: `Tu cherches à exceller dans le développement mobile ?

Bienvenue sur la chaîne N°1 dédiée à React Native en France.

Je suis David Leuliette, host du Cross Platform Show, le podcast incontournable pour les développeurs mobiles (avec plus de 10k+ écoutes) et passionnés de tech.

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
  spotify: {
    title:
      'Le Cross Platform Show - Le talk-show francophone sur le dev React Native',
    author: 'David Leuliette',
    about: `Le Cross Platform Show est le podcast de référence pour maîtriser React Native et le développement mobile. Animé par David Leuliette, chaque épisode offre des retours d'expérience concrets pour créer des apps performantes suriOS et Android. Freelance, CTO ou Indie Hacker, découvre les meilleures stacks (Expo, TypeScript), architectures et stratégies de déploiement. Des discussions techniques avec des experts dignes de formations avancées pour booster ta carrière de développeur. La veille audio incontournable pour exceller dans l'écosystème JavaScript mobile et rejoindre la communauté.`,
  },
  banner: {
    name: 'David Leuliette',
    status: 'Nouvel épisode chaque mercredi',
    headline: 'Scale ton app React Native sans 300k€ de dette technique.',
    tagline:
      '🇫🇷 Podcast #1 React Native · 🎧 10k+ écoutes · ⚡ Livre 40% plus vite',
    url: 'weshipit.today/podcast',
  },
} as const;

export type Config = typeof CONFIG;
