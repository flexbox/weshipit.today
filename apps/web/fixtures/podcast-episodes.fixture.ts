export interface PodcastEpisode {
  number: number;
  slug: string;
  // Brand / company / topic shown as the chip on the card.
  name: string;
  title: string;
  description_short: string;
  hosts: string[];
  guests: string[];
  spotify_url: string;
  apple_podcast_url: string;
  // Raw YouTube video id only — no query string. Consumer builds the embed URL.
  youtube_embed_id?: string;
  // Path under /public, e.g. "/images/podcast-logos/<slug>.webp".
  company_logo?: string;
  // ISO 8601 date string. Optional — backfill from RSS later.
  published_at?: string;
  // Human-readable duration, e.g. "1h12" or "58:30". Optional.
  duration?: string;
}

// Ordered newest first (highest episode number first).
export const podcastEpisodes: PodcastEpisode[] = [
  {
    number: 25,
    slug: 'thibault-lenclos',
    name: 'Premier Octet',
    title:
      'De Titanium à Godot en passant par React Native : le parcours cross-platform de Thibault Lenclos',
    description_short:
      "Retour sur 15 ans de cross-platform : Titanium, React Native, Tauri, Godot et l'app Altered TCG avec WebView et Vision Camera.",
    hosts: ['David Leuliette', 'Ludwig Vantours'],
    guests: ['Thibault Lenclos'],
    spotify_url: 'https://open.spotify.com/episode/2RlleLgTgvQ7YszwxRTzGg',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/de-mediapart-en-titanium-%C3%A0-altered-en-react-native/id1790867559?i=1000746973817',
    youtube_embed_id: 'bDrN8ddY2Eo',
    company_logo: '/images/podcast-logos/thibault-lenclos.webp',
  },
  {
    number: 24,
    slug: 'skia',
    name: 'Skia',
    title:
      "Du GPU à React Native : Dissection d'une stack graphique avec William Candillon",
    description_short:
      "React Native Skia et WebGPU transforment le rendu graphique mobile. William, son créateur, explique la stack, les shaders et l'avenir.",
    hosts: ['David Leuliette'],
    guests: ['William Candillon'],
    spotify_url: 'https://open.spotify.com/episode/5yEyIiz9pbvPZt9LRfL1Nz',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/du-gpu-%C3%A0-react-native-dissection-dune-stack-graphique/id1790867559?i=1000745995827',
    youtube_embed_id: 'ecZANWRWyms',
    company_logo: '/images/podcast-logos/skia.png',
  },
  {
    number: 23,
    slug: 'this-week-in-react',
    name: 'This Week in React',
    title:
      "L'art de la veille tech : Les secrets de la newsletter This Week in React avec Sébastien Lorber",
    description_short:
      'This Week in React, la newsletter de référence pour la veille tech React et React Native',
    hosts: ['David Leuliette'],
    guests: ['Sébastien Lorber'],
    spotify_url: 'https://open.spotify.com/episode/4u0abzAvJBiihcBPi36aTd',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/lart-de-la-veille-tech-les-secrets-de-la/id1790867559?i=1000740512355',
    youtube_embed_id: 'XR5JUGV4ED0',
    company_logo: '/images/podcast-logos/this-week-in-react.png',
  },
  {
    number: 22,
    slug: 'aso-growth-mobile',
    name: 'ASO & Growth Mobile',
    title:
      'ASO, Apple Ads et Growth Mobile : Le guide pour votre app React Native avec Julie Tonna',
    description_short:
      'Le guide ASO, Apple Ads et Growth Mobile pour votre app React Native',
    hosts: ['David Leuliette'],
    guests: ['Julie Tonna'],
    spotify_url: 'https://open.spotify.com/episode/6yzYcFXqRvRQVephednDfB',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/aso-apple-ads-et-growth-mobile-le-guide-pour-votre/id1790867559?i=1000739428306',
    youtube_embed_id: 'zNKtaYLKsi8',
    company_logo: '/images/podcast-logos/aso-growth-mobile.png',
  },
  {
    number: 21,
    slug: 'upstream',
    name: 'Upstream',
    title:
      'Upstream : transformer le chaos de Gmail pour discuter et travailler en équipe efficacement — interview de Gabriel Hofman Développeur React Native Freelance',
    description_short:
      'Transformer le chaos de Gmail pour discuter et travailler en équipe efficacement avec React Native',
    hosts: ['David Leuliette'],
    guests: ['Gabriel Hofman'],
    spotify_url: 'https://open.spotify.com/episode/15c4xt4EuU3C2BLeaJAzyl',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/upstream-transformer-le-chaos-de-gmail-pour-discuter/id1790867559?i=1000738463490',
    youtube_embed_id: 'NhurGGdksqQ',
    company_logo: '/images/podcast-logos/upstream.png',
  },
  {
    number: 20,
    slug: 'kidgo',
    name: 'KidGo',
    title:
      "KidGo l'application React Native des darons qui n'ont pas le temps — interview de David Leuliette",
    description_short:
      "L'application React Native des darons qui n'ont pas le temps",
    hosts: ['Ludwig Vantours'],
    guests: ['David Leuliette'],
    spotify_url: 'https://open.spotify.com/episode/2XlvoUrRprj3ZfsLkSQqzl',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/kidgo-lapplication-react-native-des-darons-qui-nont/id1790867559?i=1000736376336',
    youtube_embed_id: 'Wxy_fj7eX_U',
    company_logo: '/images/podcast-logos/kidgo.png',
  },
  {
    number: 19,
    slug: 'saxotools',
    name: 'SaxoTools',
    title:
      'SaxoTools : de la mécanique des fluides au développement mobile avec React Native — interview de Rémy Ntshaykolo',
    description_short:
      'De la mécanique des fluides au développement mobile avec React Native',
    hosts: ['David Leuliette'],
    guests: ['Rémy Ntshaykolo'],
    spotify_url: 'https://open.spotify.com/episode/3tYS4XStjhwtqqPenqRL2m',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/saxotools-de-la-m%C3%A9canique-des-fluides-au/id1790867559?i=1000731909014',
    youtube_embed_id: '1NpUTq4sMeY',
    company_logo: '/images/podcast-logos/saxotools.webp',
  },
  {
    number: 18,
    slug: 'osly-solutions',
    name: 'Osly Solutions',
    title:
      "Osly Solutions l'app React Native qui transforme ton smartphone en badge d'accès sécurisé — interview de Armand Petit",
    description_short:
      "Osly Solutions l'app React Native qui transforme ton smartphone en badge d’accès sécurisé — interview de Armand Petit",
    hosts: ['David Leuliette'],
    guests: ['Armand Petit'],
    spotify_url: 'https://open.spotify.com/episode/2qQDkRi66lzMSKnZA39YOj',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/osly-solutions-lapp-react-native-qui-transforme-ton/id1790867559?i=1000728305223',
    youtube_embed_id: '7JnveBtiWb4',
    company_logo: '/images/podcast-logos/osly-solutions.png',
  },
  {
    number: 17,
    slug: 'kicksfolio',
    name: 'KicksFolio',
    title:
      'KicksFolio la collection de sneakers qui utilise Supabase et React Native — interview de Rémy Cassagne',
    description_short:
      "L'app ultime pour les collectionneurs de sneakers, construite avec Supabase et React Native",
    hosts: ['David Leuliette'],
    guests: ['Rémy Cassagne'],
    spotify_url: 'https://open.spotify.com/episode/5O89q9TOfDhsJNCC9H89xV',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/kicksfolio-la-collection-de-sneakers-qui-utilise/id1790867559?i=1000727138622',
    youtube_embed_id: 'KOuANtl_IQM',
    company_logo: '/images/podcast-logos/kicksfolio.webp',
  },
  {
    number: 16,
    slug: 'odisei-music',
    name: 'OdiseiMusic',
    title:
      'Odisei Music, le saxophone numérique qui se joue partout avec son téléphone grâce à React Native — entretien avec Kim Chouard, CTO',
    description_short:
      'Jouez de la musique avec votre téléphone grâce à React Native',
    hosts: ['David Leuliette'],
    guests: ['Kim Chouard'],
    spotify_url: 'https://open.spotify.com/episode/1ym8Ydg6M3QTuP5xiThsIQ',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/odisei-music-le-saxophone-num%C3%A9rique-qui-se-joue-partout/id1790867559?i=1000720674682',
    youtube_embed_id: '5Blu68kOJOA',
    company_logo: '/images/podcast-logos/odisei-music.jpg',
  },
  {
    number: 15,
    slug: 'rosk',
    name: 'Rosk (ex Brigad)',
    title:
      'Rosk : Scaler de 0 à 100K users avec React Native | Thibault Malbranche',
    description_short:
      "Comment Rosk a scalé de 0 à 100K users : gestion d'état, perf, CI/CD, open source. Stratégie de Thibault Malbranche, Lead Mobile Dev",
    hosts: ['David Leuliette'],
    guests: ['Thibault Malbranche'],
    spotify_url: 'https://open.spotify.com/episode/7oDLs8BUb1TFYUeBZ4Cnys',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/rosk-ex-brigad-lapplication-mobile-des-professionnels/id1790867559?i=1000719760174',
    youtube_embed_id: 'WsVqBjqvhf0',
    company_logo: '/images/podcast-logos/rosk.webp',
  },
  {
    number: 14,
    slug: 'shine',
    name: 'Shine',
    title:
      'Shine : Passer de 4.2 à 4.8★ sur l’App Store avec React Native | Corentin André',
    description_short:
      'Comment Shine a amélioré son rating App Store de 4.2 à 4.8★ : optimisation perf, UX, animations. Stratégie de Corentin André, Head of Frontend',
    hosts: ['David Leuliette'],
    guests: ['Corentin André'],
    spotify_url: 'https://open.spotify.com/episode/273rWVjbCwhsAUUibuxHQF',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/shine-comment-procurer-de-la-joie-aux-freelances/id1790867559?i=1000718520721',
    youtube_embed_id: 'cGNybzNFj68',
    company_logo: '/images/podcast-logos/shine.webp',
  },
  {
    number: 13,
    slug: 'appjs-conf-2025',
    name: 'AppjsConf',
    title:
      'App.js Conf 2025 rétrospective de la plus grosse conférence React Native',
    description_short: "La conférence React Native la plus attendue de l'année",
    hosts: ['David Leuliette'],
    guests: ['Ludwig Vantours', 'Gabriel Hofman', 'Matthys Ducrocq'],
    spotify_url: 'https://open.spotify.com/episode/1BPHr0oylS8FrNneRdGCZD',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/app-js-conf-2025-r%C3%A9trospective-de-la-plus-grosse/id1790867559?i=1000713370419',
    youtube_embed_id: 'e5DdBdoIAdE',
    company_logo: '/images/podcast-logos/appjs-conf-2025.webp',
  },
  {
    number: 12,
    slug: 'controlresell',
    name: 'ControlResell',
    title:
      'ControlResell automatise la vente Multiplatforme depuis ton téléphone, interview de Nathan Fallet',
    description_short:
      "L'application de gestion de stock et d'inventaire qui révolutionne la gestion de stock et d'inventaire avec React Native",
    hosts: ['David Leuliette'],
    guests: ['Nathan Fallet'],
    spotify_url: 'https://open.spotify.com/episode/1Pet3tskRm0E64ftDt00n9',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/controlresell-automatise-la-vente-multiplatforme-depuis/id1790867559?i=1000711108828',
    youtube_embed_id: 'IiPEvKMtxuY',
    company_logo: '/images/podcast-logos/controlresell.webp',
  },
  {
    number: 11,
    slug: 'ornikar',
    name: 'Ornikar',
    title:
      "Ornikar : Architecture React Native pour 2M+ d'élèves | Romain Spielmann",
    description_short:
      "Comment Ornikar gère 2M+ d'élèves avec React Native : architecture, tests, déploiement, design system. Insights de Romain Spielmann, Lead Dev.",
    hosts: ['David Leuliette'],
    guests: ['Romain Spielmann'],
    spotify_url: 'https://open.spotify.com/episode/7nKJ4uxFPnhv2TMf28eqEJ',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/ornikar-une-stack-react-native-pour-lauto-%C3%A9cole-et/id1790867559?i=1000710224129',
    youtube_embed_id: 'J3q7UwdoJDc',
    company_logo: '/images/podcast-logos/ornikar.webp',
  },
  {
    number: 10,
    slug: 'mangacollec',
    name: 'Mangacollec',
    title:
      'Mangacollec la meilleure app mobile pour les otakus français codée en rescript et react native avec Freddy Harris',
    description_short:
      "L'application de collection de mangas qui passionne les fans avec une expérience React Native optimale",
    hosts: ['David Leuliette'],
    guests: ['Freddy Harris'],
    spotify_url: 'https://open.spotify.com/episode/6guQ03HE7yadwX369y0zjn',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/mangacollec-la-meilleure-app-mobile-pour-les-otakus/id1790867559?i=1000709321112',
    youtube_embed_id: 'y2mk3hJ_3A4',
    company_logo: '/images/podcast-logos/mangacollec.webp',
  },
  {
    number: 9,
    slug: 'sharelock',
    name: 'ShareLock',
    title:
      'ShareLock l’application mobile companion pour sécuriser et assurer ton vélo - interview de Adnan Aita CTO',
    description_short:
      'La solution de partage sécurisé qui révolutionne la collaboration avec React Native',
    hosts: ['David Leuliette'],
    guests: ['Adnan Aita'],
    spotify_url: 'https://open.spotify.com/episode/2zOddvp0or5uyg97FSGMkA',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/sharelock-lapplication-mobile-companion-pour/id1790867559?i=1000707011381',
    youtube_embed_id: 'H_lM_TU39tY',
    company_logo: '/images/podcast-logos/sharelock.webp',
  },
  {
    number: 8,
    slug: 'ilevia',
    name: 'Ilevia',
    title:
      'Ilévia : Application React Native en marque blanche pour les transports | Maxime Thirouin',
    description_short:
      'Comment Ilévia a construit une app React Native en marque blanche : architecture modulaire, Redux, Reanimated. Insights de Maxime Thirouin (MoOx)',
    hosts: ['David Leuliette'],
    guests: ['Maxime Thirouin'],
    spotify_url: 'https://open.spotify.com/episode/5Ul1mOJ5iCg1JhJgkTCMmO',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/il%C3%A9via-lapplication-react-native-en-marque-blanche/id1790867559?i=1000705449282',
    company_logo: '/images/podcast-logos/ilevia.webp',
  },
  {
    number: 7,
    slug: 'mucho',
    name: 'Mucho',
    title:
      'Mucho : Application universelle web + mobile avec React Native | Lucie Uffoltz',
    description_short:
      "Comment Mucho a construit une app universelle (web + mobile) avec React Native : Unistyles, MMKV, Rive. Retour d'XP de Lucie Uffoltz, Dev React Native",
    hosts: ['David Leuliette'],
    guests: ['Lucie Uffoltz'],
    spotify_url: 'https://open.spotify.com/episode/1uF2VZH5rs5eXeUAPpVNQQ',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/m%C5%ABcho-des-avantages-salari%C3%A9s-ultra-sp%C3%A9cialis%C3%A9s-pour/id1790867559?i=1000703883833',
    youtube_embed_id: '18cMx05PJIo',
    company_logo: '/images/podcast-logos/mucho.webp',
  },
  {
    number: 6,
    slug: 'ekklo',
    name: 'Ekklo',
    title:
      '10 techniques Callstack pour optimiser React Native en production | Matthys Ducrocq',
    description_short:
      'Comment Ekklo a réduit ses temps de chargement de 40% avec React Compiler, Reanimated et FlashList. Guide technique de Matthys Ducrocq, CTO',
    hosts: ['David Leuliette'],
    guests: ['Matthys Ducrocq'],
    spotify_url: 'https://open.spotify.com/episode/06y8m0c9yQyrkp9ZDmQKRq',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/les-10-meilleurs-conseils-de-callstack-pour/id1790867559?i=1000701124964',
    youtube_embed_id: 'P8h9StbxNLY',
    company_logo: '/images/podcast-logos/ekklo.webp',
  },
  {
    number: 5,
    slug: 'swan',
    name: 'Swan',
    title:
      'Swan : SDK bancaire React Native conforme et scalable | Mathieu Acthernoene',
    description_short:
      'Comment Swan a construit un SDK bancaire React Native qui gère des millions de transactions : sécurité, conformité, architecture. Insights de Mathieu Acthernoene',
    hosts: ['David Leuliette'],
    guests: ['Mathieu Acthernoene'],
    spotify_url: 'https://open.spotify.com/episode/6OFwNSER1iNx1K5Scoge4t',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/swan-le-sdk-de-banque-pour-les-applications-mobiles/id1790867559?i=1000699642862',
    youtube_embed_id: 'g5qlv9RsMYY',
    company_logo: '/images/podcast-logos/swan.webp',
  },
  {
    number: 4,
    slug: 'karnott',
    name: 'Karnott',
    title:
      'Karnott : React Native pour l’agriculture connectée et la cartographie | Audrey Wech',
    description_short:
      "Comment Karnott utilise React Native pour l'agriculture connectée : cartographie D3, Turf.js, gestion offline. Retour d'XP de Audrey Wech, Dev React Native",
    hosts: ['David Leuliette'],
    guests: ['Audrey Wech'],
    spotify_url: 'https://open.spotify.com/episode/4dyRNiw7xuSGpdQXkwb3GW',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/du-react-native-dans-les-tracteurs-avec-karnott-interview/id1790867559?i=1000696790726',
    youtube_embed_id: 'y6ntPx7oSLw',
    company_logo: '/images/podcast-logos/karnott.webp',
  },
  {
    number: 3,
    slug: 'pacevisor',
    name: 'Pacevisor',
    title:
      'Pacevisor : la plateforme de sport crée avec ignite et React Native par Baptiste Lecocq',
    description_short:
      'Le convertisseur de course qui aide les coureurs à optimiser leurs performances avec React Native',
    hosts: ['David Leuliette'],
    guests: ['Baptiste Lecocq'],
    spotify_url: 'https://open.spotify.com/episode/4VyluvJMpxAOvTPS0Cbj3k',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/pacevisor-la-plateforme-de-sport-cr%C3%A9e-avec-ignite-et/id1790867559?i=1000692148216',
    youtube_embed_id: 'QvXQcPIqU30',
    company_logo: '/images/podcast-logos/pacevisor.webp',
  },
  {
    number: 2,
    slug: 'alan',
    name: 'Alan',
    title:
      'Alan : Migration Expo et optimisation React Native à 500K+ users | Xavier Seignard',
    description_short:
      "Comment Alan a migré vers Expo, réduit les coûts de dev et optimisé son app React Native pour 500K+ utilisateurs. Retour d'XP de Xavier Seignard, Lead Dev",
    hosts: ['David Leuliette'],
    guests: ['Xavier Seignard'],
    spotify_url: 'https://open.spotify.com/episode/7GxdKx5EsfhTwnhCBitOau',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/alan-et-react-native-lalliance-du-bien-%C3%AAtre-et-de-la/id1790867559?i=1000689726403',
    youtube_embed_id: 'Si1_MacPWK0',
    company_logo: '/images/podcast-logos/alan.webp',
  },
  {
    number: 1,
    slug: 'cdiscount',
    name: 'Cdiscount',
    title:
      'Cdiscount : Gérer 10M+ d’utilisateurs avec React Native | Ludwig Vantours',
    description_short:
      "Le géant du e-commerce français qui optimise l'expérience mobile avec React Native",
    hosts: ['David Leuliette'],
    guests: ['Ludwig Vantours'],
    spotify_url: 'https://open.spotify.com/episode/4u0RkE3y1gkCpFtpppk25t',
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/react-native-chez-cdiscount-avec-ludwig-vantours/id1790867559?i=1000684234344',
    youtube_embed_id: 'C3toh628KJE',
    company_logo: '/images/podcast-logos/cdiscount.webp',
  },
];
