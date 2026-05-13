import { useSuspenseQuery } from '@tanstack/react-query';
import { getMoabangPosts } from '@/api/community.api';
import type { MoabangListParams } from '@/components/community/moabang/moabang.type';

export function useMoabangPostsQuery(params: MoabangListParams) {
  return useSuspenseQuery({
    queryKey: ['moabang', 'posts', params],
    queryFn: () => getMoabangPosts(params),
  });
}
