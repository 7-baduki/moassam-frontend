import { useQuery } from '@tanstack/react-query';
import { getCredits } from '@/api/credit.api';

export function useCreditsQuery(enabled = true) {
  return useQuery({
    queryKey: ['credits'],
    queryFn: getCredits,
    enabled,
  });
}
