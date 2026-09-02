import { useQuery } from '@tanstack/react-query';
import { getCredits } from '@/api/credit.api';
import { userKeys } from '@/hooks/queries/user/queryKeys';

export function useCreditsQuery(enabled = true) {
  return useQuery({
    queryKey: userKeys.credits(),
    queryFn: getCredits,
    enabled,
  });
}
