import { Post } from './post.model';

export interface GroupedPosts {
  expanded: boolean;
  name: string;
  posts: Post[];
}
