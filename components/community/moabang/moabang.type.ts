export type PostAge = 'ALL' | 'INFANT' | 'AGE_3' | 'AGE_4' | 'AGE_5';
export type ResourceType = 'ACTIVITY' | 'PLAN' | 'JOURNAL' | 'NOTICE';

export interface MoabangPost {
  postId: number;
  title: string;
  authorNickName: string;
  thumbnailUrl: string | null;
  postAge: PostAge;
  resourceType: ResourceType;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface MoabangListResponse {
  data: MoabangPost[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface MoabangListParams {
  postAge?: PostAge;
  resourceType?: ResourceType;
  page?: number;
  size?: number;
}

export interface MoabangSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}
