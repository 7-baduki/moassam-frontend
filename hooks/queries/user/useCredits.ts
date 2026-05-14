import { useQuery } from '@tanstack/react-query';
import { getCredits } from '@/api/credit.api';

export const useCreditsQuery = () => {
  return useQuery({
    queryKey: ['credits'],
    queryFn: getCredits,
  });
};
