import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyObservations } from '@/api/user.api';

export const useMyObservationsQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myObservations', page],
    queryFn: () => getMyObservations(page),
  });
};

export const useMyObservationsInfiniteQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['myObservations', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getMyObservations(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
};
