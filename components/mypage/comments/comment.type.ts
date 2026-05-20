export type PostCategory = 'FREE' | 'MOABANG';

export interface MyComment {
  commentId: number;
  postId: number;
  category: PostCategory;
  content: string;
  postTitle: string;
  createdAt: string;
}

export interface MyCommentListResponse {
  data: MyComment[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
