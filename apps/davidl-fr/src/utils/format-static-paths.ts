interface Path {
  params: {
    slug: string;
  };
}

export function formatStaticPaths(posts: any[]): Path[] {
  if (!posts) {
    return [];
  }

  return posts.map((post) => ({
    params: {
      slug: post.uid,
    },
  }));
}
