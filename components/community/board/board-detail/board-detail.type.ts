import type { PostAge, ResourceType } from '@/components/community/moabang/moabang.type';

export type BoardFileType = 'FILE' | 'IMAGE';

export interface BoardDetailFile {
  fileId: number;
  originalName: string;
  url: string;
  size: number;
  fileType: BoardFileType;
}

export interface BoardDetail {
  postId: number;
  authorId: number;
  authorNickName: string;
  title: string;
  category: string;
  postAge: PostAge | null;
  resourceType: ResourceType | null;
  headTag: string | null;
  content: string;
  files: BoardDetailFile[];
  editorFiles: BoardDetailFile[];
  viewCount: number;
  commentCount: number;
  likeCount: number;
  bookmarked: boolean;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  commentId: number;
  authorId: number;
  authorNickName: string;
  content: string;
  createdAt: string;
}

export interface CommentRequest {
  content: string;
}

export interface CommentIdResponse {
  commentId: number;
}
