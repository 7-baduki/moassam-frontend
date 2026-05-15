import { useSuspenseQuery } from '@tanstack/react-query';
import { getCredits } from '@/api/credit.api';

export const useCreditsQuery = () => {
  return useSuspenseQuery({
    queryKey: ['credits'],
    queryFn: getCredits,
  });
};
