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

export function useMoabangPostsInfiniteQuery(params: Omit<MoabangListParams, 'page'>) {
  return useSuspenseInfiniteQuery({
    queryKey: ['moabang', 'posts', 'infinite', params],
    queryFn: ({ pageParam }) => getMoabangPosts({ ...params, page: pageParam as number, size: 9 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useMoabangSearchInfiniteQuery(params: Omit<MoabangSearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['moabang', 'search', 'infinite', params],
    queryFn: ({ pageParam }) =>
      searchMoabangPosts({ ...params, page: pageParam as number, size: 9 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
}

export function useBoardPostsInfiniteQuery(params: Omit<BoardListParams, 'page'>) {
  return useSuspenseInfiniteQuery({
    queryKey: ['board', 'posts', 'infinite', params],
    queryFn: ({ pageParam }) => getBoardPosts({ ...params, page: pageParam as number, size: 9 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useBoardSearchInfiniteQuery(params: Omit<BoardSearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['board', 'search', 'infinite', params],
    queryFn: ({ pageParam }) => searchBoardPosts({ ...params, page: pageParam as number, size: 9 }),
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
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
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
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
    },
  });
}

export function useDeleteCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
    },
  });
}

export function useLikeMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isLiked: boolean) => (isLiked ? unlikePost(postId) : likePost(postId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: ['moabang', 'posts'] });
      queryClient.invalidateQueries({ queryKey: ['board', 'posts'] });
    },
  });
}

export function useBookmarkMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isBookmarked: boolean) =>
      isBookmarked ? unbookmarkPost(postId) : bookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['activitySummary'] });
    },
  });
}

export function useUpdatePostMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, files }: { request: UpdatePostRequest; files: File[] }) =>
      updatePost(postId, request, files),
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
      queryClient.invalidateQueries({ queryKey: ['myMoabangPosts'] });
      queryClient.invalidateQueries({ queryKey: ['myFreePosts'] });
    },
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, files }: { request: CreatePostRequest; files: File[] }) =>
      createPost(request, files),
    onSuccess: (_, { request }) => {
      const queryKey = request.category === 'MOABANG' ? 'moabang' : 'board';
      queryClient.invalidateQueries({ queryKey: [queryKey, 'posts'] });
      const myQueryKey = request.category === 'MOABANG' ? 'myMoabangPosts' : 'myFreePosts';
      queryClient.invalidateQueries({ queryKey: [myQueryKey] });
      queryClient.invalidateQueries({ queryKey: ['credits'] });
    },
  });
}
