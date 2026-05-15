import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyObservations } from '@/api/user.api';

export const useMyObservationsQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myObservations', page],
    queryFn: () => getMyObservations(page),
  });
};
