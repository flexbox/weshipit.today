export interface PodcastEpisode {
  slug: string;
  number: number;
  // Brand / company / topic shown as the chip on the card.
  name: string;
  title: string;
  hosts: string[];
  guests: string[];
  spotify_url: string;
  description_short: string;
  apple_podcast_url: string;
  // Raw YouTube video id only — no query string. Consumer builds the embed URL.
  youtube_embed_id: string;
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
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/live-update-ota-vs-refus-app-store-6-cas-r%C3%A9els-32-jours/id1790867559?i=1000793799309',
    company_logo: '' /* ⚠️ TODO logo capgo */,
    description_short:
      'Martin Donadieu (Capgo) décortique 6 refus de stores : 30 à 50 % des apps recalées au premier envoi, des reviews de 6 heures à 3 semaines.',
    guests: ['Martin Donadieu'],
    hosts: ['David Leuliette'],
    name: 'Capgo',
    number: 40,
    slug: 'refus-stores',
    spotify_url: 'https://open.spotify.com/episode/2aqUlg7hqcsFxKheng9TZj',
    title:
      "6 refus App Store, 32 jours bloqués : que peut vraiment l'OTA ? — Martin Donadieu (Capgo)",
    youtube_embed_id: 'T2Xw-iBD3wY',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/ton-design-system-mobile-te-co%C3%BBte-100-k%E2%82%AC-par-an-et/id1790867559?i=1000791219313',
    company_logo: '' /* ⚠️ TODO logo react-native-reusables */,
    description_short:
      "Zach Nugent (React Native Reusables) chiffre le coût d'un design system mobile maison : six mois pour huit devs, trois semaines pour un date picker.",
    guests: ['Zach Nugent'],
    hosts: ['David Leuliette'],
    name: 'React Native Reusables',
    number: 39,
    slug: 'react-native-reusables',
    spotify_url: 'https://open.spotify.com/episode/2ZAHFbRxza6magVMXD8hxt',
    title: 'Ton design system mobile te coûte 100 K€ par an — Zach Nugent',
    youtube_embed_id: 'Dl4HXU6N1Q8',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/react-native-ou-flutter-en-2026-pourquoi-son-cr%C3%A9ateur/id1790867559?i=1000787302740',
    company_logo: '/images/podcast-logos/vjeux.png',
    description_short:
      'vjeux (Christopher Chedeau), co-créateur de React Native, raconte les origines du framework : bridge asynchrone, Yoga, open source et sa vision 2026.',
    guests: ['Christopher Chedeau'],
    hosts: ['David Leuliette'],
    name: 'React Native',
    number: 38,
    slug: 'vjeux',
    spotify_url: '' /* ⚠️ TODO à compléter */,
    title:
      'React Native, Flutter ou natif en 2026 ? Le créateur de RN tranche - Christopher Chedeau',
    youtube_embed_id: 'a0gdoC5n-pw',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/scaler-une-app-mobile-en-hypercroissance-doctolib-50m/id1790867559?i=1000784243567',
    company_logo: '/images/podcast-logos/doctolib.webp',
    description_short:
      "Comment Doctolib fait tenir une app mobile critique à 50M d'utilisateurs : WebView, incidents, migration React Native et architecture à 20 devs, avec Louis Zawadzki.",
    guests: ['Louis Zawadzki'],
    hosts: ['David Leuliette'],
    name: 'Doctolib',
    number: 37,
    slug: 'doctolib',
    spotify_url: 'https://open.spotify.com/episode/6DJaZSwTFJTK8SIT5O7EMF',
    title:
      'Scaler une app mobile en hypercroissance : Doctolib (50M users) avec Louis Zawadzki',
    youtube_embed_id: 'PaIacBM6Kmk',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/impact-de-lia-sur-react-native-react-native-sans/id1790867559?i=1000783496467',
    company_logo: '/images/podcast-logos/app-js-2026.jpg',
    description_short:
      "Débrief d'App.js 2026 à Cracovie : stabilisation, IA, perf et les vrais outils React Native 2026, avec Gabriel Hofman et Matthys Ducrocq.",
    guests: ['Gabriel Hofman', 'Matthys Ducrocq'],
    hosts: ['David Leuliette'],
    name: 'App.js 2026',
    number: 36,
    slug: 'app-js-2026',
    spotify_url: '' /* ⚠️ TODO à compléter */,
    title: 'App.js 2026 — Ce que la conf ne vous a pas dit',
    youtube_embed_id: '1OQM5jR-EN8',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/le-cross-platform-show-le-talk-show-francophone-sur/id1790867559?i=1000771974481',
    company_logo: '/images/podcast-logos/revenuecat.png',
    description_short:
      'Commission App Store à 30 %, DMA, RevenueCat : Tarek et Armand Petit démontent les mythes de la monétisation mobile en 2026.',
    guests: ['Tarek', 'Armand Petit'],
    hosts: ['David Leuliette'],
    name: 'RevenueCat',
    number: 35,
    slug: 'revenuecat',
    spotify_url: 'https://open.spotify.com/episode/5S8cWrGkWlkbyXFYaUn5FS',
    title: 'RevenueCat : La vérité sur les stores en 2026',
    youtube_embed_id: 'JO46PLqG040',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/le-cross-platform-show-le-talk-show-francophone-sur/id1790867559?i=1000770886841',
    company_logo: '/images/podcast-logos/tiktools.png',
    description_short:
      'Du dev salarié à indie maker : Brice Zele raconte comment il a shippé TikTools seul en React Native, backend fait main et ban Apple compris.',
    guests: ['Brice Zele'],
    hosts: ['David Leuliette'],
    name: 'TikTools',
    number: 34,
    slug: 'tiktools',
    spotify_url: 'https://open.spotify.com/episode/2UasjGWdgW72Wp0klGIRo4',
    title:
      "Du dev salarié à l'indie maker : comment j'ai shippé TikTools seul avec React Native",
    youtube_embed_id: 'tXC0Qnazm3o',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/le-cross-platform-show-le-talk-show-francophone-sur/id1790867559?i=1000769761596',
    company_logo: '/images/podcast-logos/allo.webp',
    description_short:
      'Les 5 erreurs coûteuses des CTO mobile, décryptées par Pablo (Allo) : choix de stack, maintenance, distribution et performance.',
    guests: ['Pablo'],
    hosts: ['David Leuliette'],
    name: 'Allo',
    number: 33,
    slug: 'allo',
    spotify_url: 'https://open.spotify.com/episode/0AXbU04Fm2c1P8FAzm361p',
    title: 'Les 5 erreurs coûteuses des CTO mobile',
    youtube_embed_id: 'roDhUYjIED8',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/le-cross-platform-show-le-talk-show-francophone-sur/id1790867559?i=1000768680693',
    company_logo: '/images/podcast-logos/mobiskill_logo.jpg',
    description_short:
      'Recruter un développeur React Native senior : marché de niche, vrais critères et erreurs de process, avec Carla Rainaud (Mobiskill).',
    guests: ['Carla Rainaud'],
    hosts: ['David Leuliette'],
    name: 'Mobiskill',
    number: 32,
    slug: 'recruter-devs-rn',
    spotify_url: 'https://open.spotify.com/episode/7M80x8p5Q3peRxbaFYv8xJ',
    title: 'Comment recruter des devs React Native seniors',
    youtube_embed_id: 'GkY4mZRJu6Y',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/le-cross-platform-show-le-talk-show-francophone-sur/id1790867559?i=1000760977444',
    company_logo: '/images/podcast-logos/atelier-trivium.png',
    description_short:
      "Vibe coding et agentic engineering en production : dette technique, ROI, et apprendre aux non-devs à créer un SaaS avec l'IA, avec Terence (ARK / Atelier Trivium).",
    guests: ['Terence Zafindratafa Ferhah'],
    hosts: ['David Leuliette'],
    name: 'Atelier Trivium',
    number: 31,
    slug: 'atelier-trivium',
    spotify_url: 'https://open.spotify.com/episode/3yYveE5Wv5S8bVbEewMGff',
    title:
      'Vibe coding en production : shipper un SaaS en solo avec Claude Code — Terence',
    youtube_embed_id: '-f9IHOXy61Y',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/le-cross-platform-show-le-talk-show-francophone-sur/id1790867559?i=1000757191810',
    company_logo: '/images/podcast-logos/biogen.png',
    description_short:
      'Presque 10 ans de React Native en production : écueils du bridge, modules natifs Rust, bascule vers Kotlin Multiplatform et virage back-end/IA, avec Xavier Carpentier.',
    guests: ['Xavier Carpentier'],
    hosts: ['David Leuliette'],
    name: 'Biogen',
    number: 30,
    slug: 'xavier-carpentier',
    spotify_url: 'https://open.spotify.com/episode/56jYsfd6SQA5AvVRq6VOK3',
    title:
      '10 ans de React Native en prod : perf, Kotlin Multiplatform et virage IA — Xavier Carpentier',
    youtube_embed_id: 'x18i2Hr2s-w',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/de-mediapart-en-titanium-%C3%A0-altered-en-react-native/id1790867559?i=1000746973817',
    company_logo: '/images/podcast-logos/thibault-lenclos.webp',
    description_short:
      "Retour sur 15 ans de cross-platform : Titanium, React Native, Tauri, Godot et l'app Altered TCG avec WebView et Vision Camera.",
    guests: ['Thibault Lenclos'],
    hosts: ['David Leuliette', 'Ludwig Vantours'],
    name: 'Premier Octet',
    number: 25,
    slug: 'thibault-lenclos',
    spotify_url: 'https://open.spotify.com/episode/2RlleLgTgvQ7YszwxRTzGg',
    title:
      'De Titanium à Godot en passant par React Native : le parcours cross-platform de Thibault Lenclos',
    youtube_embed_id: 'bDrN8ddY2Eo',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/du-gpu-%C3%A0-react-native-dissection-dune-stack-graphique/id1790867559?i=1000745995827',
    company_logo: '/images/podcast-logos/skia.png',
    description_short:
      "React Native Skia et WebGPU transforment le rendu graphique mobile. William, son créateur, explique la stack, les shaders et l'avenir.",
    guests: ['William Candillon'],
    hosts: ['David Leuliette'],
    name: 'Skia',
    number: 24,
    slug: 'skia',
    spotify_url: 'https://open.spotify.com/episode/5yEyIiz9pbvPZt9LRfL1Nz',
    title:
      "Du GPU à React Native : Dissection d'une stack graphique avec William Candillon",
    youtube_embed_id: 'ecZANWRWyms',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/lart-de-la-veille-tech-les-secrets-de-la/id1790867559?i=1000740512355',
    company_logo: '/images/podcast-logos/this-week-in-react.png',
    description_short:
      'This Week in React, la newsletter de référence pour la veille tech React et React Native',
    guests: ['Sébastien Lorber'],
    hosts: ['David Leuliette'],
    name: 'This Week in React',
    number: 23,
    slug: 'this-week-in-react',
    spotify_url: 'https://open.spotify.com/episode/4u0abzAvJBiihcBPi36aTd',
    title:
      "L'art de la veille tech : Les secrets de la newsletter This Week in React avec Sébastien Lorber",
    youtube_embed_id: 'XR5JUGV4ED0',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/aso-apple-ads-et-growth-mobile-le-guide-pour-votre/id1790867559?i=1000739428306',
    company_logo: '/images/podcast-logos/aso-growth-mobile.png',
    description_short:
      'Le guide ASO, Apple Ads et Growth Mobile pour votre app React Native',
    guests: ['Julie Tonna'],
    hosts: ['David Leuliette'],
    name: 'ASO & Growth Mobile',
    number: 22,
    slug: 'aso-growth-mobile',
    spotify_url: 'https://open.spotify.com/episode/6yzYcFXqRvRQVephednDfB',
    title:
      'ASO, Apple Ads et Growth Mobile : Le guide pour votre app React Native avec Julie Tonna',
    youtube_embed_id: 'zNKtaYLKsi8',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/upstream-transformer-le-chaos-de-gmail-pour-discuter/id1790867559?i=1000738463490',
    company_logo: '/images/podcast-logos/upstream.png',
    description_short:
      'Transformer le chaos de Gmail pour discuter et travailler en équipe efficacement avec React Native',
    guests: ['Gabriel Hofman'],
    hosts: ['David Leuliette'],
    name: 'Upstream',
    number: 21,
    slug: 'upstream',
    spotify_url: 'https://open.spotify.com/episode/15c4xt4EuU3C2BLeaJAzyl',
    title:
      'Upstream : transformer le chaos de Gmail pour discuter et travailler en équipe efficacement — interview de Gabriel Hofman Développeur React Native Freelance',
    youtube_embed_id: 'NhurGGdksqQ',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/kidgo-lapplication-react-native-des-darons-qui-nont/id1790867559?i=1000736376336',
    company_logo: '/images/podcast-logos/kidgo.png',
    description_short:
      "L'application React Native des darons qui n'ont pas le temps",
    guests: ['David Leuliette'],
    hosts: ['Ludwig Vantours'],
    name: 'KidGo',
    number: 20,
    slug: 'kidgo',
    spotify_url: 'https://open.spotify.com/episode/2XlvoUrRprj3ZfsLkSQqzl',
    title:
      "KidGo l'application React Native des darons qui n'ont pas le temps — interview de David Leuliette",
    youtube_embed_id: 'Wxy_fj7eX_U',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/saxotools-de-la-m%C3%A9canique-des-fluides-au/id1790867559?i=1000731909014',
    company_logo: '/images/podcast-logos/saxotools.webp',
    description_short:
      'De la mécanique des fluides au développement mobile avec React Native',
    guests: ['Rémy Ntshaykolo'],
    hosts: ['David Leuliette'],
    name: 'SaxoTools',
    number: 19,
    slug: 'saxotools',
    spotify_url: 'https://open.spotify.com/episode/3tYS4XStjhwtqqPenqRL2m',
    title:
      'SaxoTools : de la mécanique des fluides au développement mobile avec React Native — interview de Rémy Ntshaykolo',
    youtube_embed_id: '1NpUTq4sMeY',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/osly-solutions-lapp-react-native-qui-transforme-ton/id1790867559?i=1000728305223',
    company_logo: '/images/podcast-logos/osly-solutions.png',
    description_short:
      "Osly Solutions l'app React Native qui transforme ton smartphone en badge d’accès sécurisé — interview de Armand Petit",
    guests: ['Armand Petit'],
    hosts: ['David Leuliette'],
    name: 'Osly Solutions',
    number: 18,
    slug: 'osly-solutions',
    spotify_url: 'https://open.spotify.com/episode/2qQDkRi66lzMSKnZA39YOj',
    title:
      "Osly Solutions l'app React Native qui transforme ton smartphone en badge d'accès sécurisé — interview de Armand Petit",
    youtube_embed_id: '7JnveBtiWb4',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/kicksfolio-la-collection-de-sneakers-qui-utilise/id1790867559?i=1000727138622',
    company_logo: '/images/podcast-logos/kicksfolio.webp',
    description_short:
      "L'app ultime pour les collectionneurs de sneakers, construite avec Supabase et React Native",
    guests: ['Rémy Cassagne'],
    hosts: ['David Leuliette'],
    name: 'KicksFolio',
    number: 17,
    slug: 'kicksfolio',
    spotify_url: 'https://open.spotify.com/episode/5O89q9TOfDhsJNCC9H89xV',
    title:
      'KicksFolio la collection de sneakers qui utilise Supabase et React Native — interview de Rémy Cassagne',
    youtube_embed_id: 'KOuANtl_IQM',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/odisei-music-le-saxophone-num%C3%A9rique-qui-se-joue-partout/id1790867559?i=1000720674682',
    company_logo: '/images/podcast-logos/odisei-music.jpg',
    description_short:
      'Jouez de la musique avec votre téléphone grâce à React Native',
    guests: ['Kim Chouard'],
    hosts: ['David Leuliette'],
    name: 'OdiseiMusic',
    number: 16,
    slug: 'odisei-music',
    spotify_url: 'https://open.spotify.com/episode/1ym8Ydg6M3QTuP5xiThsIQ',
    title:
      'Odisei Music, le saxophone numérique qui se joue partout avec son téléphone grâce à React Native — entretien avec Kim Chouard, CTO',
    youtube_embed_id: '5Blu68kOJOA',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/rosk-ex-brigad-lapplication-mobile-des-professionnels/id1790867559?i=1000719760174',
    company_logo: '/images/podcast-logos/rosk.webp',
    description_short:
      "Comment Rosk a scalé de 0 à 100K users : gestion d'état, perf, CI/CD, open source. Stratégie de Thibault Malbranche, Lead Mobile Dev",
    guests: ['Thibault Malbranche'],
    hosts: ['David Leuliette'],
    name: 'Rosk (ex Brigad)',
    number: 15,
    slug: 'rosk',
    spotify_url: 'https://open.spotify.com/episode/7oDLs8BUb1TFYUeBZ4Cnys',
    title:
      'Rosk : Scaler de 0 à 100K users avec React Native | Thibault Malbranche',
    youtube_embed_id: 'WsVqBjqvhf0',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/shine-comment-procurer-de-la-joie-aux-freelances/id1790867559?i=1000718520721',
    company_logo: '/images/podcast-logos/shine.webp',
    description_short:
      'Comment Shine a amélioré son rating App Store de 4.2 à 4.8★ : optimisation perf, UX, animations. Stratégie de Corentin André, Head of Frontend',
    guests: ['Corentin André'],
    hosts: ['David Leuliette'],
    name: 'Shine',
    number: 14,
    slug: 'shine',
    spotify_url: 'https://open.spotify.com/episode/273rWVjbCwhsAUUibuxHQF',
    title:
      'Shine : Passer de 4.2 à 4.8★ sur l’App Store avec React Native | Corentin André',
    youtube_embed_id: 'cGNybzNFj68',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/app-js-conf-2025-r%C3%A9trospective-de-la-plus-grosse/id1790867559?i=1000713370419',
    company_logo: '/images/podcast-logos/appjs-conf-2025.webp',
    description_short: "La conférence React Native la plus attendue de l'année",
    guests: ['Ludwig Vantours', 'Gabriel Hofman', 'Matthys Ducrocq'],
    hosts: ['David Leuliette'],
    name: 'App.js Conf',
    number: 13,
    slug: 'appjs-conf-2025',
    spotify_url: 'https://open.spotify.com/episode/1BPHr0oylS8FrNneRdGCZD',
    title:
      'App.js Conf 2025 rétrospective de la plus grosse conférence React Native',
    youtube_embed_id: 'e5DdBdoIAdE',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/controlresell-automatise-la-vente-multiplatforme-depuis/id1790867559?i=1000711108828',
    company_logo: '/images/podcast-logos/controlresell.webp',
    description_short:
      "L'application de gestion de stock et d'inventaire qui révolutionne la gestion de stock et d'inventaire avec React Native",
    guests: ['Nathan Fallet'],
    hosts: ['David Leuliette'],
    name: 'ControlResell',
    number: 12,
    slug: 'controlresell',
    spotify_url: 'https://open.spotify.com/episode/1Pet3tskRm0E64ftDt00n9',
    title:
      'ControlResell automatise la vente Multiplatforme depuis ton téléphone, interview de Nathan Fallet',
    youtube_embed_id: 'IiPEvKMtxuY',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/ornikar-une-stack-react-native-pour-lauto-%C3%A9cole-et/id1790867559?i=1000710224129',
    company_logo: '/images/podcast-logos/ornikar.webp',
    description_short:
      "Comment Ornikar gère 2M+ d'élèves avec React Native : architecture, tests, déploiement, design system. Insights de Romain Spielmann, Lead Dev.",
    guests: ['Romain Spielmann'],
    hosts: ['David Leuliette'],
    name: 'Ornikar',
    number: 11,
    slug: 'ornikar',
    spotify_url: 'https://open.spotify.com/episode/7nKJ4uxFPnhv2TMf28eqEJ',
    title:
      "Ornikar : Architecture React Native pour 2M+ d'élèves | Romain Spielmann",
    youtube_embed_id: 'J3q7UwdoJDc',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/mangacollec-la-meilleure-app-mobile-pour-les-otakus/id1790867559?i=1000709321112',
    company_logo: '/images/podcast-logos/mangacollec.webp',
    description_short:
      "L'application de collection de mangas qui passionne les fans avec une expérience React Native optimale",
    guests: ['Freddy Harris'],
    hosts: ['David Leuliette'],
    name: 'Mangacollec',
    number: 10,
    slug: 'mangacollec',
    spotify_url: 'https://open.spotify.com/episode/6guQ03HE7yadwX369y0zjn',
    title:
      'Mangacollec la meilleure app mobile pour les otakus français codée en rescript et react native avec Freddy Harris',
    youtube_embed_id: 'y2mk3hJ_3A4',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/sharelock-lapplication-mobile-companion-pour-s%C3%A9curiser/id1790867559?i=1000708562523',
    company_logo: '/images/podcast-logos/sharelock.webp',
    description_short:
      'La solution de partage sécurisé qui révolutionne la collaboration avec React Native',
    guests: ['Adnan Aita'],
    hosts: ['David Leuliette'],
    name: 'ShareLock',
    number: 9,
    slug: 'sharelock',
    spotify_url: 'https://open.spotify.com/episode/2zOddvp0or5uyg97FSGMkA',
    title:
      'ShareLock l’application mobile companion pour sécuriser et assurer ton vélo - interview de Adnan Aita CTO',
    youtube_embed_id: 'H_lM_TU39tY',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/il%C3%A9via-lapplication-react-native-en-marque-blanche/id1790867559?i=1000705449282',
    company_logo: '/images/podcast-logos/ilevia.webp',
    description_short:
      'Comment Ilévia a construit une app React Native en marque blanche : architecture modulaire, Redux, Reanimated. Insights de Maxime Thirouin (MoOx)',
    guests: ['Maxime Thirouin'],
    hosts: ['David Leuliette'],
    name: 'Ilevia',
    number: 8,
    slug: 'ilevia',
    spotify_url: 'https://open.spotify.com/episode/5Ul1mOJ5iCg1JhJgkTCMmO',
    title:
      'Ilévia : Application React Native en marque blanche pour les transports | Maxime Thirouin',
    youtube_embed_id: 'JNtl1K2XIIA',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/m%C5%ABcho-des-avantages-salari%C3%A9s-ultra-sp%C3%A9cialis%C3%A9s-pour/id1790867559?i=1000703883833',
    company_logo: '/images/podcast-logos/mucho.webp',
    description_short:
      "Comment Mucho a construit une app universelle (web + mobile) avec React Native : Unistyles, MMKV, Rive. Retour d'XP de Lucie Uffoltz, Dev React Native",
    guests: ['Lucie Uffoltz'],
    hosts: ['David Leuliette'],
    name: 'Mucho',
    number: 7,
    slug: 'mucho',
    spotify_url: 'https://open.spotify.com/episode/1uF2VZH5rs5eXeUAPpVNQQ',
    title:
      'Mucho : Application universelle web + mobile avec React Native | Lucie Uffoltz',
    youtube_embed_id: '18cMx05PJIo',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/les-10-meilleurs-conseils-de-callstack-pour/id1790867559?i=1000701124964',
    company_logo: '/images/podcast-logos/ekklo.webp',
    description_short:
      'Comment Ekklo a réduit ses temps de chargement de 40% avec React Compiler, Reanimated et FlashList. Guide technique de Matthys Ducrocq, CTO',
    guests: ['Matthys Ducrocq'],
    hosts: ['David Leuliette'],
    name: 'Ekklo',
    number: 6,
    slug: 'ekklo',
    spotify_url: 'https://open.spotify.com/episode/06y8m0c9yQyrkp9ZDmQKRq',
    title:
      '10 techniques Callstack pour optimiser React Native en production | Matthys Ducrocq',
    youtube_embed_id: 'P8h9StbxNLY',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/swan-le-sdk-de-banque-pour-les-applications-mobiles/id1790867559?i=1000699642862',
    company_logo: '/images/podcast-logos/swan.webp',
    description_short:
      'Comment Swan a construit un SDK bancaire React Native qui gère des millions de transactions : sécurité, conformité, architecture. Insights de Mathieu Acthernoene',
    guests: ['Mathieu Acthernoene'],
    hosts: ['David Leuliette'],
    name: 'Swan',
    number: 5,
    slug: 'swan',
    spotify_url: 'https://open.spotify.com/episode/6OFwNSER1iNx1K5Scoge4t',
    title:
      'Swan : SDK bancaire React Native conforme et scalable | Mathieu Acthernoene',
    youtube_embed_id: 'g5qlv9RsMYY',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/du-react-native-dans-les-tracteurs-avec-karnott-interview/id1790867559?i=1000696790726',
    company_logo: '/images/podcast-logos/karnott.webp',
    description_short:
      "Comment Karnott utilise React Native pour l'agriculture connectée : cartographie D3, Turf.js, gestion offline. Retour d'XP de Audrey Wech, Dev React Native",
    guests: ['Audrey Wech'],
    hosts: ['David Leuliette'],
    name: 'Karnott',
    number: 4,
    slug: 'karnott',
    spotify_url: 'https://open.spotify.com/episode/4dyRNiw7xuSGpdQXkwb3GW',
    title:
      'Karnott : React Native pour l’agriculture connectée et la cartographie | Audrey Wech',
    youtube_embed_id: 'y6ntPx7oSLw',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/pacevisor-la-plateforme-de-sport-cr%C3%A9e-avec-ignite-et/id1790867559?i=1000692148216',
    company_logo: '/images/podcast-logos/pacevisor.webp',
    description_short:
      'Le convertisseur de course qui aide les coureurs à optimiser leurs performances avec React Native',
    guests: ['Baptiste Lecocq'],
    hosts: ['David Leuliette'],
    name: 'Pacevisor',
    number: 3,
    slug: 'pacevisor',
    spotify_url: 'https://open.spotify.com/episode/4VyluvJMpxAOvTPS0Cbj3k',
    title:
      'Pacevisor : la plateforme de sport crée avec ignite et React Native par Baptiste Lecocq',
    youtube_embed_id: 'QvXQcPIqU30',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/alan-et-react-native-lalliance-du-bien-%C3%AAtre-et-de-la/id1790867559?i=1000689726403',
    company_logo: '/images/podcast-logos/alan.webp',
    description_short:
      "Comment Alan a migré vers Expo, réduit les coûts de dev et optimisé son app React Native pour 500K+ utilisateurs. Retour d'XP de Xavier Seignard, Lead Dev",
    guests: ['Xavier Seignard'],
    hosts: ['David Leuliette'],
    name: 'Alan',
    number: 2,
    slug: 'alan',
    spotify_url: 'https://open.spotify.com/episode/7GxdKx5EsfhTwnhCBitOau',
    title:
      'Alan : Migration Expo et optimisation React Native à 500K+ users | Xavier Seignard',
    youtube_embed_id: 'Si1_MacPWK0',
  },
  {
    apple_podcast_url:
      'https://podcasts.apple.com/fr/podcast/react-native-chez-cdiscount-avec-ludwig-vantours/id1790867559?i=1000684234344',
    company_logo: '/images/podcast-logos/cdiscount.webp',
    description_short:
      "Le géant du e-commerce français qui optimise l'expérience mobile avec React Native",
    guests: ['Ludwig Vantours'],
    hosts: ['David Leuliette'],
    name: 'Cdiscount',
    number: 1,
    slug: 'cdiscount',
    spotify_url: 'https://open.spotify.com/episode/4u0RkE3y1gkCpFtpppk25t',
    title:
      'Cdiscount : Gérer 10M+ d’utilisateurs avec React Native | Ludwig Vantours',
    youtube_embed_id: 'C3toh628KJE',
  },
];
