export interface PodcastEpisode {
  name: string;
  title: string;
  number: number;
  description: string;
  slug: string;
  spotifyLink: string;
  appleLink: string;
  companyLogo: string;
  guestName: string;
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    name: 'Cdiscount',
    title: 'React Native chez Cdiscount avec Ludwig Vantours',
    number: 1,
    description:
      "Le géant du e-commerce français qui optimise l'expérience mobile avec React Native",
    slug: 'cdiscount',
    spotifyLink:
      'https://open.spotify.com/episode/4u0RkE3y1gkCpFtpppk25t?si=a6ed852bde0b4dfa',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/react-native-chez-cdiscount-avec-ludwig-vantours/id1790867559?i=1000684234344&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/72/01/507201ee-d376-6f51-c94d-cf9d3bdd3c7b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/230x0w.webp',
    guestName: 'Ludwig Vantours',
  },
  {
    name: 'Alan',
    title:
      "Alan et React Native : L'alliance du bien-être et de la technologie avec Xavier Seignard",
    number: 2,
    description:
      "L'assurance santé nouvelle génération qui simplifie la protection avec React Native",
    slug: 'alan',
    spotifyLink:
      'https://open.spotify.com/episode/7GxdKx5EsfhTwnhCBitOau?si=0645c020f5754e58',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/alan-et-react-native-lalliance-du-bien-%C3%AAtre-et-de-la/id1790867559?i=1000689726403&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/15/ff/24/15ff24da-3615-8cf9-d4ea-f621f9851fc8/AppIcon-0-0-1x_U007emarketing-0-1-85-220.png/230x0w.webp',
    guestName: 'Xavier Seignard',
  },
  {
    name: 'Pacevisor',
    title:
      'Pacevisor : la plateforme de sport crée avec ignite et React Native par Baptiste Lecocq',
    number: 3,
    description:
      'Le convertisseur de course qui aide les coureurs à optimiser leurs performances avec React Native',
    slug: 'pacevisor',
    spotifyLink:
      'https://open.spotify.com/episode/4VyluvJMpxAOvTPS0Cbj3k?si=1e9e942c1cc64ee9',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/pacevisor-la-plateforme-de-sport-cr%C3%A9e-avec-ignite-et/id1790867559?i=1000692148216&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4b/f4/41/4bf4416f-f939-83ac-7d2b-d18f7fd888c2/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
    guestName: 'Baptiste Lecocq',
  },
  {
    name: 'Karnott',
    title:
      'Du React Native dans les tracteurs avec Karnott - Interview de Audrey Wech',
    number: 4,
    description:
      "L'application de productivité qui booste votre efficacité avec React Native",
    slug: 'karnott',
    spotifyLink:
      'https://open.spotify.com/episode/4dyRNiw7xuSGpdQXkwb3GW?si=8790eede701746d6',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/du-react-native-dans-les-tracteurs-avec-karnott-interview/id1790867559?i=1000696790726&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/36/49/67/3649675f-bd1c-6a2c-5972-87f49f34f9c7/AppIcon-0-0-1x_U007ephone-0-85-220.png/230x0w.webp',
    guestName: 'Audrey Wech',
  },
  {
    name: 'Swan',
    title:
      'Swan le SDK de banque pour les applications mobiles en React Native avec Mathieu Acthernoene',
    number: 5,
    description:
      'La fintech qui révolutionne la banque en ligne avec une app React Native performante',
    slug: 'swan',
    spotifyLink:
      'https://open.spotify.com/episode/6OFwNSER1iNx1K5Scoge4t?si=d05827ceda464775',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/swan-le-sdk-de-banque-pour-les-applications-mobiles/id1790867559?i=1000699642862&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ec/ca/c7/eccac76a-0a83-5ff4-d878-1b0915922572/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
    guestName: 'Mathieu Acthernoene',
  },
  {
    name: 'Ekklo',
    title:
      "Les 10 meilleurs conseils de Callstack pour optimiser son application React Native avec Matthys Ducrocq, CTO d'Ekklo",
    number: 6,
    description:
      "L'application de gestion de clients qui optimise la productivité pour coach sportif avec React Native",
    slug: 'ekklo',
    spotifyLink:
      'https://open.spotify.com/episode/06y8m0c9yQyrkp9ZDmQKRq?si=53e416dbf53c4f1c',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/les-10-meilleurs-conseils-de-callstack-pour/id1790867559?i=1000701124964&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/f3/a2/6df3a215-ea30-6e7a-9994-8c10c37327ab/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
    guestName: 'Matthys Ducrocq',
  },
  {
    name: 'Mucho',
    title:
      'Mūcho, des avantages salariés ultra-spécialisés pour les PME avec une application mobile React Native - interview de Lucie Uffoltz',
    number: 7,
    description:
      "L'application lifestyle qui simplifie le quotidien grâce à React Native",
    slug: 'mucho',
    spotifyLink:
      'https://open.spotify.com/episode/1uF2VZH5rs5eXeUAPpVNQQ?si=e8fbd76d663642ef',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/m%C5%ABcho-des-avantages-salari%C3%A9s-ultra-sp%C3%A9cialis%C3%A9s-pour/id1790867559?i=1000703883833&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e8/fb/dd/e8fbdd06-cdf2-bc6c-7e3c-f9853f82aa1b/AppIcon-0-0-1x_U007epad-0-85-220.png/230x0w.webp',
    guestName: 'Lucie Uffoltz',
  },
  {
    name: 'Ilevia',
    title:
      "Ilévia, l'application React Native en marque blanche et Pékin Express avec Maxime Thirouin aka MoOx",
    number: 8,
    description:
      "L'application de navigation qui optimise les trajets avec React Native",
    slug: 'ilevia',
    spotifyLink:
      'https://open.spotify.com/episode/5Ul1mOJ5iCg1JhJgkTCMmO?si=e67374f2c2074859',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/il%C3%A9via-lapplication-react-native-en-marque-blanche/id1790867559?i=1000705449282&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d9/02/d6/d902d64d-7b2b-bff6-bb72-2e13adbf6b12/AppIcon_ilevia-0-0-1x_U007epad-0-1-0-85-220.png/460x0w.webp',
    guestName: 'Maxime Thirouin',
  },
  {
    name: 'ShareLock',
    title:
      'ShareLock l’application mobile companion pour sécuriser et assurer ton vélo - interview de Adnan Aita CTO',
    number: 9,
    description:
      'La solution de partage sécurisé qui révolutionne la collaboration avec React Native',
    slug: 'sharelock',
    spotifyLink:
      'https://open.spotify.com/episode/2zOddvp0or5uyg97FSGMkA?si=e6ace9e1ae6a4caf',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/sharelock-lapplication-mobile-companion-pour/id1790867559?i=1000707011381&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9c/a7/a4/9ca7a47f-c6ef-41ea-4965-c746df6505df/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/230x0w.webp',
    guestName: 'Adnan Aita',
  },
  {
    name: 'Mangacollec',
    title:
      'Mangacollec la meilleure app mobile pour les otakus français codée en rescript et react native avec Freddy Harris',
    number: 10,
    description:
      "L'application de collection de mangas qui passionne les fans avec une expérience React Native optimale",
    slug: 'mangacollec',
    spotifyLink:
      'https://open.spotify.com/episode/6guQ03HE7yadwX369y0zjn?si=91bcd664f7f24861',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/mangacollec-la-meilleure-app-mobile-pour-les-otakus/id1790867559?i=1000709321112&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/13/60/fc/1360fc54-4755-0359-adab-2414d735ec68/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
    guestName: 'Freddy Harris',
  },
  {
    name: 'Ornikar',
    title:
      "Ornikar, une stack React Native pour l'auto-école et l'assurance auto du futur - interview de Romain Spielmann Lead développeur",
    number: 11,
    description:
      "L'innovation dans l'éducation du code de la route avec React Native",
    slug: 'ornikar',
    spotifyLink:
      'https://open.spotify.com/episode/7nKJ4uxFPnhv2TMf28eqEJ?si=8e9eb937155d4d93',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/ornikar-une-stack-react-native-pour-lauto-%C3%A9cole-et/id1790867559?i=1000710224129&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fc/6e/17/fc6e171e-cd14-d36a-91e7-387da9c61439/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp',
    guestName: 'Romain Spielmann',
  },
  {
    name: 'ControlResell',
    title:
      'ControlResell automatise la vente Multiplatforme depuis ton téléphone, interview de Nathan Fallet',
    number: 12,
    description:
      "Découvrez comment ControlResell révolutionne la gestion de stock et d'inventaire avec React Native",
    slug: 'controlresell',
    spotifyLink:
      'https://open.spotify.com/episode/1Pet3tskRm0E64ftDt00n9?si=6fc1dcfdb4734c65',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/controlresell-automatise-la-vente-multiplatforme-depuis/id1790867559?i=1000711108828&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/25/f8/fd/25f8fd8f-f7ad-7f3b-f804-0bd64c124532/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/230x0w.webp',
    guestName: 'Nathan Fallet',
  },
  {
    name: 'AppjsConf',
    title:
      'App.js Conf 2025 rétrospective de la plus grosse conférence React Native',
    number: 13,
    description: "La conférence React Native la plus attendue de l'année",
    slug: 'appjs-conf-2025',
    spotifyLink:
      'https://open.spotify.com/episode/1BPHr0oylS8FrNneRdGCZD?si=60bcb5a047274b74',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/app-js-conf-2025-r%C3%A9trospective-de-la-plus-grosse/id1790867559?i=1000713370419&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3e/c2/cf/3ec2cfae-c04c-ac54-93de-a311154d7a21/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
    guestName: 'Ludwig Vantours, Gabriel Hofman, Matthys Ducrocq',
  },
  {
    name: 'Shine',
    title:
      'Shine, comment procurer de la joie aux freelances avec une app React Native ? interview de Corentin André',
    number: 14,
    description: 'Shone, vos comptes pro en un clic avec une app React Native',
    slug: 'shine',
    spotifyLink:
      'https://open.spotify.com/episode/273rWVjbCwhsAUUibuxHQF?si=81f57cda883c48b8',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/shine-comment-procurer-de-la-joie-aux-freelances/id1790867559?i=1000718520721&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/26/af/28/26af2830-d8c0-5fea-d28b-71742c955cd1/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
    guestName: 'Corentin André',
  },
  {
    name: 'Rosk',
    title:
      'Rosk (ex Brigad) l’application mobile des professionnels de la restauration et de la santé — interview de Thibault Malbranche aka Titozzz Lead Mobile Developer',
    number: 15,
    description:
      "Rosk, l'application mobile des professionnels de la restauration et de la santé",
    slug: 'rosk',
    spotifyLink:
      'https://open.spotify.com/episode/7oDLs8BUb1TFYUeBZ4Cnys?si=1ba8b710453545f8',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/rosk-ex-brigad-lapplication-mobile-des-professionnels/id1790867559?i=1000719760174&l=en-GB',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/15/77/f7/1577f708-b52e-6bf3-8cd2-e2808cb87018/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
    guestName: 'Thibault Malbranche',
  },
  {
    name: 'OdiseiMusic',
    title:
      'Odisei Music, le saxophone numérique qui se joue partout avec son téléphone grâce à React Native — entretien avec Kim Chouard, CTO',
    number: 16,
    description:
      'Jouez de la musique avec votre téléphone grâce à React Native',
    slug: 'odisei-music',
    spotifyLink:
      'https://open.spotify.com/episode/1ym8Ydg6M3QTuP5xiThsIQ?si=a731bcf938f64eb9',
    appleLink:
      'https://podcasts.apple.com/fr/podcast/odisei-music-le-saxophone-num%C3%A9rique-qui-se-joue-partout/id1790867559?i=1000720674682&l=en-GB',
    companyLogo:
      'https://www.autonomia.org/imgcache/7f/df/ef/be/9e/70/4a/c6/e0/5f/fc/2a/0c/fb/a9/ad/62102776_641813846335087_8272529151546621952_n.jpg',
    guestName: 'Kim Chouard',
  },
];
