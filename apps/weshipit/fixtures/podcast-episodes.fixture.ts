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
    name: 'ControlResell',
    title: "Révolutionner la gestion d'inventaire avec React Native",
    number: 1,
    description:
      "Découvrez comment ControlResell révolutionne la gestion de stock et d'inventaire avec React Native",
    slug: 'controlresell',
    spotifyLink:
      'https://open.spotify.com/episode/1Pet3tskRm0E64ftDt00n9?si=6fc1dcfdb4734c65',
    appleLink: 'https://podcasts.apple.com/episode/1Pet3tskRm0E64ftDt00n9',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/25/f8/fd/25f8fd8f-f7ad-7f3b-f804-0bd64c124532/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/230x0w.webp',
    guestName: 'Lyes Benchoubane',
  },
  {
    name: 'Mangacollec',
    title: "Collectionner les mangas dans l'ère numérique",
    number: 2,
    description:
      "L'application de collection de mangas qui passionne les fans avec une expérience React Native optimale",
    slug: 'mangacollec',
    spotifyLink:
      'https://open.spotify.com/episode/6guQ03HE7yadwX369y0zjn?si=ee5c8f18db7c4595',
    appleLink: 'https://podcasts.apple.com/episode/6guQ03HE7yadwX369y0zjn',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/13/60/fc/1360fc54-4755-0359-adab-2414d735ec68/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
    guestName: 'Thomas Paris',
  },
  {
    name: 'Pacevisor',
    title: 'Optimiser ses performances de course avec la tech',
    number: 3,
    description:
      'Le convertisseur de course qui aide les coureurs à optimiser leurs performances avec React Native',
    slug: 'pacevisor',
    spotifyLink:
      'https://open.spotify.com/episode/4VyluvJMpxAOvTPS0Cbj3k?si=1e9e942c1cc64ee9',
    appleLink: 'https://podcasts.apple.com/episode/4VyluvJMpxAOvTPS0Cbj3k',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4b/f4/41/4bf4416f-f939-83ac-7d2b-d18f7fd888c2/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
    guestName: 'Antoine Dupont',
  },
  {
    name: 'Mūcho',
    title: 'Simplifier le quotidien avec une app lifestyle',
    number: 4,
    description:
      "L'application lifestyle qui simplifie le quotidien grâce à React Native",
    slug: 'mucho',
    spotifyLink:
      'https://open.spotify.com/episode/1uF2VZH5rs5eXeUAPpVNQQ?si=e8fbd76d663642ef',
    appleLink: 'https://podcasts.apple.com/episode/1uF2VZH5rs5eXeUAPpVNQQ',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e8/fb/dd/e8fbdd06-cdf2-bc6c-7e3c-f9853f82aa1b/AppIcon-0-0-1x_U007epad-0-85-220.png/230x0w.webp',
    guestName: 'Marie Laurent',
  },
  {
    name: 'Swan',
    title: 'Révolutionner la banque en ligne avec React Native',
    number: 5,
    description:
      'La fintech qui révolutionne la banque en ligne avec une app React Native performante',
    slug: 'swan',
    spotifyLink:
      'https://open.spotify.com/episode/6OFwNSER1iNx1K5Scoge4t?si=d05827ceda464775',
    appleLink: 'https://podcasts.apple.com/episode/6OFwNSER1iNx1K5Scoge4t',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ec/ca/c7/eccac76a-0a83-5ff4-d878-1b0915922572/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
    guestName: 'Nicolas Benady',
  },
  {
    name: 'Cdiscount',
    title: 'Le e-commerce français optimisé pour mobile',
    number: 6,
    description:
      "Le géant du e-commerce français qui optimise l'expérience mobile avec React Native",
    slug: 'cdiscount',
    spotifyLink:
      'https://open.spotify.com/episode/4u0RkE3y1gkCpFtpppk25t?si=a6ed852bde0b4dfa',
    appleLink: 'https://podcasts.apple.com/episode/4u0RkE3y1gkCpFtpppk25t',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/72/01/507201ee-d376-6f51-c94d-cf9d3bdd3c7b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/230x0w.webp',
    guestName: 'Sophie Martin',
  },
  {
    name: 'Ornikar',
    title: "L'innovation dans l'éducation du code de la route",
    number: 7,
    description:
      "L'innovation dans l'éducation du code de la route avec React Native",
    slug: 'ornikar',
    spotifyLink:
      'https://open.spotify.com/episode/7nKJ4uxFPnhv2TMf28eqEJ?si=c84fbf441ad04acf',
    appleLink: 'https://podcasts.apple.com/episode/7nKJ4uxFPnhv2TMf28eqEJ',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fc/6e/17/fc6e171e-cd14-d36a-91e7-387da9c61439/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp',
    guestName: 'Alexandre Chartier',
  },
  {
    name: 'Karnott',
    title: 'Booster sa productivité avec une app intelligente',
    number: 8,
    description:
      "L'application de productivité qui booste votre efficacité avec React Native",
    slug: 'karnott',
    spotifyLink:
      'https://open.spotify.com/episode/4dyRNiw7xuSGpdQXkwb3GW?si=8790eede701746d6',
    appleLink: 'https://podcasts.apple.com/episode/4dyRNiw7xuSGpdQXkwb3GW',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/36/49/67/3649675f-bd1c-6a2c-5972-87f49f34f9c7/AppIcon-0-0-1x_U007ephone-0-85-220.png/230x0w.webp',
    guestName: 'Lucas Moreau',
  },
  {
    name: 'ShareLock',
    title: 'Le partage sécurisé pour la collaboration',
    number: 9,
    description:
      'La solution de partage sécurisé qui révolutionne la collaboration avec React Native',
    slug: 'sharelock',
    spotifyLink:
      'https://open.spotify.com/episode/2zOddvp0or5uyg97FSGMkA?si=e6ace9e1ae6a4caf',
    appleLink: 'https://podcasts.apple.com/episode/2zOddvp0or5uyg97FSGMkA',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9c/a7/a4/9ca7a47f-c6ef-41ea-4965-c746df6505df/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/230x0w.webp',
    guestName: 'Emma Rousseau',
  },
  {
    name: 'Alan',
    title: "L'assurance santé nouvelle génération",
    number: 10,
    description:
      "L'assurance santé nouvelle génération qui simplifie la protection avec React Native",
    slug: 'alan',
    spotifyLink:
      'https://open.spotify.com/episode/7GxdKx5EsfhTwnhCBitOau?si=0645c020f5754e58',
    appleLink: 'https://podcasts.apple.com/episode/7GxdKx5EsfhTwnhCBitOau',
    companyLogo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/15/ff/24/15ff24da-3615-8cf9-d4ea-f621f9851fc8/AppIcon-0-0-1x_U007emarketing-0-1-85-220.png/230x0w.webp',
    guestName: 'Jean-Charles Samuelian',
  },
];
