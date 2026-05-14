export interface MyBookmark {
  postId: number;
  title: string;
  category: string;
  viewCount: number;
  createdAt: string;
}

export interface MyBookmarkListResponse {
  data: MyBookmark[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
