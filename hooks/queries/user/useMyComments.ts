import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyComments } from '@/api/comment.api';

export function useMyCommentsQuery(page: number) {
  return useSuspenseQuery({
    queryKey: ['myComments', page],
    queryFn: () => getMyComments(page),
  });
}

export function useMyCommentsInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: ['myComments', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getMyComments(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}
