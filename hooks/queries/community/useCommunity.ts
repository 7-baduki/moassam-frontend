import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMoabangPosts,
  searchMoabangPosts,
  getBoardPosts,
  searchBoardPosts,
  createPost,
  updatePost,
  deletePost,
  getPostDetail,
  createComment,
  updateComment,
  deleteComment,
} from '@/api/community.api';
import type {
  MoabangListParams,
  MoabangSearchParams,
} from '@/components/community/moabang/moabang.type';
import type { BoardListParams, BoardSearchParams } from '@/components/community/board/board.type';
import type { CreatePostRequest, UpdatePostRequest } from '@/components/community/write/write.type';

export function usePostDetailQuery(postId: number) {
  return useSuspenseQuery({
    queryKey: ['post', 'detail', postId],
    queryFn: () => getPostDetail(postId),
  });
}

export function useMoabangPostsQuery(params: MoabangListParams) {
  return useSuspenseQuery({
    queryKey: ['moabang', 'posts', params],
    queryFn: () => getMoabangPosts(params),
  });
}

export function useMoabangSearchQuery(params: MoabangSearchParams) {
  return useSuspenseQuery({
    queryKey: ['moabang', 'search', params],
    queryFn: () => searchMoabangPosts(params),
  });
}

export function useBoardPostsQuery(params: BoardListParams) {
  return useSuspenseQuery({
    queryKey: ['board', 'posts', params],
    queryFn: () => getBoardPosts(params),
  });
}

export function useBoardSearchQuery(params: BoardSearchParams) {
  return useSuspenseQuery({
    queryKey: ['board', 'search', params],
    queryFn: () => searchBoardPosts(params),
  });
}

export function useCreateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
    },
  });
}

export function useUpdateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(postId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
    },
  });
}

export function useDeleteCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
    },
  });
}

export function useUpdatePostMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      request,
      files,
      editorImages,
    }: {
      request: UpdatePostRequest;
      files: File[];
      editorImages: File[];
    }) => updatePost(postId, request, files, editorImages),
    onSuccess: (_, { request }) => {
      queryClient.removeQueries({ queryKey: ['post', 'detail', postId] });
      const listKey = request.category === 'MOABANG' ? 'moabang' : 'board';
      queryClient.invalidateQueries({ queryKey: [listKey, 'posts'] });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moabang', 'posts'] });
      queryClient.invalidateQueries({ queryKey: ['board', 'posts'] });
    },
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      request,
      files,
      editorImages,
    }: {
      request: CreatePostRequest;
      files: File[];
      editorImages: File[];
    }) => createPost(request, files, editorImages),
    onSuccess: (_, { request }) => {
      const queryKey = request.category === 'MOABANG' ? 'moabang' : 'board';
      queryClient.invalidateQueries({ queryKey: [queryKey, 'posts'] });
    },
  });
}
