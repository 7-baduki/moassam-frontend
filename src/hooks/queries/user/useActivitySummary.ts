import { useSuspenseQuery } from '@tanstack/react-query';
import { getActivitySummary } from '@/api/user.api';
import { userKeys } from '@/hooks/queries/user/queryKeys';

export function useActivitySummaryQuery() {
  return useSuspenseQuery({
    queryKey: userKeys.activitySummary(),
    queryFn: getActivitySummary,
  });
}
