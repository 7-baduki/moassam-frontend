export interface MyComment {
  commentId: number;
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
