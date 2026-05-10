export type PostCategory = 'RESOURCE' | 'FREE' | 'QUESTION';

export interface MoabangPost {
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
