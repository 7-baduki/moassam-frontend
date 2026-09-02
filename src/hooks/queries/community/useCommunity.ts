import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  useInfiniteQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
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
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmarkPost,
} from '@/api/community.api';
import type {
  MoabangListParams,
  MoabangSearchParams,
} from '@/components/community/moabang/moabang.type';
import type { BoardListParams, BoardSearchParams } from '@/components/community/board/board.type';
import type { CreatePostRequest, UpdatePostRequest } from '@/components/community/write/write.type';
import { userKeys } from '@/hooks/queries/user';
import { communityKeys } from '@/hooks/queries/community/queryKeys';

export function usePostDetailQuery(postId: number) {
  return useSuspenseQuery({
    queryKey: communityKeys.postDetail(postId),
    queryFn: () => getPostDetail(postId),
  });
}

export function useMoabangPostsQuery(params: MoabangListParams) {
  return useSuspenseQuery({
    queryKey: communityKeys.postsList('moabang', params),
    queryFn: () => getMoabangPosts(params),
  });
}

export function useMoabangSearchQuery(params: MoabangSearchParams) {
  return useSuspenseQuery({
    queryKey: communityKeys.searchList('moabang', params),
    queryFn: () => searchMoabangPosts(params),
  });
}

export function useBoardPostsQuery(params: BoardListParams) {
  return useSuspenseQuery({
    queryKey: communityKeys.postsList('board', params),
    queryFn: () => getBoardPosts(params),
  });
}

export function useBoardSearchQuery(params: BoardSearchParams) {
  return useSuspenseQuery({
    queryKey: communityKeys.searchList('board', params),
    queryFn: () => searchBoardPosts(params),
  });
}

export function useMoabangPostsInfiniteQuery(params: Omit<MoabangListParams, 'page'>) {
  return useSuspenseInfiniteQuery({
    queryKey: communityKeys.postsInfinite('moabang', params),
    queryFn: ({ pageParam }) => getMoabangPosts({ ...params, page: pageParam as number, size: 9 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useMoabangSearchInfiniteQuery(params: Omit<MoabangSearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: communityKeys.searchInfinite('moabang', params),
    queryFn: ({ pageParam }) =>
      searchMoabangPosts({ ...params, page: pageParam as number, size: 9 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
}

export function useBoardPostsInfiniteQuery(params: Omit<BoardListParams, 'page'>) {
  return useSuspenseInfiniteQuery({
    queryKey: communityKeys.postsInfinite('board', params),
    queryFn: ({ pageParam }) => getBoardPosts({ ...params, page: pageParam as number, size: 8 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useBoardSearchInfiniteQuery(params: Omit<BoardSearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: communityKeys.searchInfinite('board', params),
    queryFn: ({ pageParam }) => searchBoardPosts({ ...params, page: pageParam as number, size: 8 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
}

export function useCreateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
      queryClient.invalidateQueries({ queryKey: userKeys.myComments.all });
    },
  });
}

export function useUpdateCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(postId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
      queryClient.invalidateQueries({ queryKey: userKeys.myComments.all });
    },
  });
}

export function useDeleteCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
      queryClient.invalidateQueries({ queryKey: userKeys.myComments.all });
    },
  });
}

export function useLikeMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isLiked: boolean) => (isLiked ? unlikePost(postId) : likePost(postId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
    },
  });
}

export function useBookmarkMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isBookmarked: boolean) =>
      isBookmarked ? unbookmarkPost(postId) : bookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
      queryClient.invalidateQueries({ queryKey: userKeys.myBookmarks.all });
      queryClient.invalidateQueries({ queryKey: userKeys.activitySummary() });
    },
  });
}

export function useUpdatePostMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, files }: { request: UpdatePostRequest; files: File[] }) =>
      updatePost(postId, request, files),
    onSuccess: (_, { request }) => {
      queryClient.removeQueries({ queryKey: communityKeys.postDetail(postId) });
      const listKey = request.category === 'MOABANG' ? 'moabang' : 'board';
      queryClient.invalidateQueries({ queryKey: communityKeys.board(listKey) });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
      queryClient.invalidateQueries({ queryKey: userKeys.myMoabangPosts.all });
      queryClient.invalidateQueries({ queryKey: userKeys.myFreePosts.all });
    },
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, files }: { request: CreatePostRequest; files: File[] }) =>
      createPost(request, files),
    onSuccess: (_, { request }) => {
      const isMoabang = request.category === 'MOABANG';
      queryClient.invalidateQueries({
        queryKey: communityKeys.board(isMoabang ? 'moabang' : 'board'),
      });
      queryClient.invalidateQueries({
        queryKey: isMoabang ? userKeys.myMoabangPosts.all : userKeys.myFreePosts.all,
      });
      queryClient.invalidateQueries({ queryKey: userKeys.credits() });
      queryClient.invalidateQueries({ queryKey: userKeys.activitySummary() });
    },
  });
}
