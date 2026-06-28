import React from 'react';
import { post } from '~/types/blog';
import BlogListItem from './ListItem';
import { ListGrid } from './style';

interface BlogListProps {
  posts: post[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <ListGrid>
      {posts.map((post) => (
        <BlogListItem key={post.id} post={post} />
      ))}
    </ListGrid>
  );
}
