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
  age: string | null;
  resourceType: string | null;
  headTag: string;
  content: string;
  files: BoardDetailFile[];
  editorFiles: BoardDetailFile[];
  viewCount: number;
  commentCount: number;
  likeCount: number;
  bookmarked: boolean;
  liked: boolean;
  createdAt: string;
}

export interface Comment {
  commentId: number;
  authorId: number;
  authorNickName: string;
  content: string;
  createdAt: string;
}
