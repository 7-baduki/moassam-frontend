export type HeadTag = 'WORRY' | 'QUESTION' | 'CHAT';

export interface BoardPost {
  postId: number;
  title: string;
  authorNickName: string;
  contentPreview: string;
  headTag: HeadTag;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface BoardListResponse {
  data: BoardPost[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface BoardListParams {
  headTag?: HeadTag;
  page?: number;
  size?: number;
}
