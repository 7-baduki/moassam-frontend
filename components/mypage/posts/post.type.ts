export interface MyMoabangPost {
  postId: number;
  title: string;
  postAge: string;
  resourceType: string;
  viewCount: number;
  createdAt: string;
}

export interface MyFreePost {
  postId: number;
  title: string;
  headTag: string;
  viewCount: number;
  createdAt: string;
}

export interface MyPostListResponse<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
