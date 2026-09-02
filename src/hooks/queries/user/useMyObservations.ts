import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyObservations } from '@/api/user.api';
import { userKeys } from '@/hooks/queries/user/queryKeys';

export function useMyObservationsQuery(page: number) {
  return useSuspenseQuery({
    queryKey: userKeys.myObservations.page(page),
    queryFn: () => getMyObservations(page),
  });
}

export function useMyObservationsInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: userKeys.myObservations.infinite(),
    queryFn: ({ pageParam = 0 }) => getMyObservations(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}
