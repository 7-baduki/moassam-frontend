import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMoabangPosts, getBoardPosts, createPost, getPostDetail } from '@/api/community.api';
import type { MoabangListParams } from '@/components/community/moabang/moabang.type';
import type { BoardListParams } from '@/components/community/board/board.type';
import type { CreatePostRequest } from '@/components/community/write/write.type';

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

export function useBoardPostsQuery(params: BoardListParams) {
  return useSuspenseQuery({
    queryKey: ['board', 'posts', params],
    queryFn: () => getBoardPosts(params),
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
    },
  });
}
