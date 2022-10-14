import * as prismic from '@prismicio/client';

// Fill in your repository name
export const repositoryName = 'weshipit';

export const client = prismic.createClient(repositoryName, {
  routes: [
    {
      type: 'client',
      path: '/clients',
    },
  ],
});
