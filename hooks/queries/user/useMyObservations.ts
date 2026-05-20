import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyObservations } from '@/api/user.api';

export function useMyObservationsQuery(page: number) {
  return useSuspenseQuery({
    queryKey: ['myObservations', page],
    queryFn: () => getMyObservations(page),
  });
}

export function useMyObservationsInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: ['myObservations', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getMyObservations(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}
