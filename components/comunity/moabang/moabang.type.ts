export type HotPostCategory = 'RESOURCE' | 'FREE' | 'QUESTION';

export interface HotPost {
  postId: number;
  title: string;
  contentPreview: string;
  thumnail?: string;
  category: HotPostCategory;
  categoryName: string;
  authorName?: string;
  createdAt: string;
}
