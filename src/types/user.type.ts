export type Provider = 'KAKAO' | 'NAVER';

export interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
  provider: Provider;
}

export interface ActivitySummary {
  observationCount: number;
  bookmarkedPostCount: number;
}
