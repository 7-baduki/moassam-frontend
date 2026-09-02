import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyComments } from '@/api/comment.api';
import { userKeys } from '@/hooks/queries/user/queryKeys';

export function useMyCommentsQuery(page: number) {
  return useSuspenseQuery({
    queryKey: userKeys.myComments.page(page),
    queryFn: () => getMyComments(page),
  });
}

export function useMyCommentsInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: userKeys.myComments.infinite(),
    queryFn: ({ pageParam = 0 }) => getMyComments(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}
