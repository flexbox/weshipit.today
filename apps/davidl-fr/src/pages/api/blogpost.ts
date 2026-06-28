import { createClient } from '~/utils/prismic-configuration';

export async function getPosts() {
  const client = createClient();

  try {
    // Retrieve the blog posts organized in descending chronological order
    const posts = await client.getByType('post', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    });

    return {
      posts: posts ? posts.results : [],
    };
  } catch (error) {
    console.error('getPosts -> error', error);
    return error;
  }
}

export async function getPostBySlug(slug: string) {
  const client = createClient();

  try {
    const post = await client.getByUID('post', slug, { lang: 'en-gb' });
    return { post };
  } catch (error) {
    console.error('getPostBySlug -> error', error);
    return error;
  }
}

export async function getFeaturedPosts() {
  const client = createClient();

  try {
    const posts = await client.getByType('my.post.featured_homepage', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    });

    return {
      posts: posts ? posts.results : [],
    };
  } catch (error) {
    console.error('getFeaturedPosts -> error', error);
  }
}
