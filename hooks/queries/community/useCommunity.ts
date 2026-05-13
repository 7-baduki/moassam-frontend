import { useSuspenseQuery } from '@tanstack/react-query';
import { getMoabangPosts, getBoardPosts } from '@/api/community.api';
import type { MoabangListParams } from '@/components/community/moabang/moabang.type';
import type { BoardListParams } from '@/components/community/board/board.type';

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
