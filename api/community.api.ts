import apiClient from './axios';
import type {
  MoabangListParams,
  MoabangListResponse,
  MoabangSearchParams,
} from '@/components/community/moabang/moabang.type';
import type {
  BoardListParams,
  BoardListResponse,
  BoardSearchParams,
} from '@/components/community/board/board.type';
import type {
  CreatePostRequest,
  CreatePostResponse,
  UpdatePostRequest,
} from '@/components/community/write/write.type';
import type {
  BoardDetail,
  CommentRequest,
  CommentIdResponse,
} from '@/components/community/board/board-detail/board-detail.type';

export async function getPostDetail(postId: number): Promise<BoardDetail> {
  const { data } = await apiClient.get(`/api/v1/posts/${postId}`);
  return data.data;
}

export async function getMoabangPosts(params: MoabangListParams): Promise<MoabangListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/moabang', { params });
  return data.data;
}

export async function searchMoabangPosts(
  params: MoabangSearchParams,
): Promise<MoabangListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/moabang/search', { params });
  return data.data;
}

export async function getBoardPosts(params: BoardListParams): Promise<BoardListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/free', { params });
  return data.data;
}

export async function searchBoardPosts(params: BoardSearchParams): Promise<BoardListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/free/search', { params });
  return data.data;
}

export async function createComment(
  postId: number,
  request: CommentRequest,
): Promise<CommentIdResponse> {
  const { data } = await apiClient.post(`/api/v1/posts/${postId}/comments`, request);
  return data.data;
}

export async function updateComment(
  postId: number,
  commentId: number,
  request: CommentRequest,
): Promise<CommentIdResponse> {
  const { data } = await apiClient.patch(`/api/v1/posts/${postId}/comments/${commentId}`, request);
  return data.data;
}

export async function deleteComment(postId: number, commentId: number): Promise<void> {
  await apiClient.delete(`/api/v1/posts/${postId}/comments/${commentId}`);
}

export async function updatePost(
  postId: number,
  request: UpdatePostRequest,
  files: File[],
  editorImages: File[],
): Promise<CreatePostResponse> {
  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
  files.forEach((file) => formData.append('files', file));
  editorImages.forEach((image) => formData.append('editorImages', image));

  const { data } = await apiClient.patch(`/api/v1/posts/${postId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function deletePost(postId: number): Promise<void> {
  await apiClient.delete(`/api/v1/posts/${postId}`);
}

export async function likePost(postId: number): Promise<void> {
  await apiClient.post(`/api/v1/posts/${postId}/likes`);
}

export async function unlikePost(postId: number): Promise<void> {
  await apiClient.delete(`/api/v1/posts/${postId}/likes`);
}

export async function bookmarkPost(postId: number): Promise<void> {
  await apiClient.post(`/api/v1/posts/${postId}/bookmarks`);
}

export async function unbookmarkPost(postId: number): Promise<void> {
  await apiClient.delete(`/api/v1/posts/${postId}/bookmarks`);
}

export async function createPost(
  request: CreatePostRequest,
  files: File[],
  editorImages: File[],
): Promise<CreatePostResponse> {
  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
  files.forEach((file) => formData.append('files', file));
  editorImages.forEach((image) => formData.append('editorImages', image));

  const { data } = await apiClient.post('/api/v1/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}
