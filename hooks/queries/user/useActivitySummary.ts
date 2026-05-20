import { useSuspenseQuery } from '@tanstack/react-query';
import { getActivitySummary } from '@/api/user.api';

export function useActivitySummaryQuery() {
  return useSuspenseQuery({
    queryKey: ['activitySummary'],
    queryFn: getActivitySummary,
  });
}
