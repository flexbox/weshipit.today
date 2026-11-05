// Alumni featured on /bootcamp. Gravatar hashes only, never emails.
export interface Alumni {
  fullName: string;
  gravatarHash: string;
}

export const featuredAlumni: Alumni[] = [
  {
    fullName: 'Jonathan McAlexander',
    gravatarHash: 'e5a8191ca8ae506758236611e0622b7a',
  },
  {
    fullName: 'Guillaume Taupin',
    gravatarHash: '1eabfa5875582b2ad61acf08c57fd3ae',
  },
  {
    fullName: 'Matthys Ducrocq',
    gravatarHash: 'bd145159d99398b211698f66740bb666',
  },
  {
    fullName: 'Jennifer Proust',
    gravatarHash: 'ecf40db24136330bbc05e524e81acb13',
  },
  {
    fullName: 'Eric Martin',
    gravatarHash: '57680aeca40a8c9f195393aeb838c386',
  },
];
