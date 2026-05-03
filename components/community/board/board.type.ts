export interface BoardPost {
  postId: number;
  title: string;
  contentPreview: string;
  categoryName: string;
  authorName: string;
  likeCount: number;
  commentCount: number;
  viewCount?: number;
  createdAt: string;
}
