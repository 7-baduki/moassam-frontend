export type PostCategory = 'RESOURCE' | 'FREE' | 'QUESTION';

export type HotPostCategory = PostCategory;

export interface ListPost {
  postId: number;
  title: string;
  thumbnail?: string;
  category: PostCategory;
  categoryName: string;
  tags?: string[];
  authorName: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  viewCount?: number;
}

export interface HotPost {
  postId: number;
  title: string;
  contentPreview: string;
  thumbnail?: string;
  category: HotPostCategory;
  categoryName: string;
  authorName?: string;
  createdAt: string;
}
