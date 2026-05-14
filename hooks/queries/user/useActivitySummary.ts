import { useQuery } from '@tanstack/react-query';
import { getActivitySummary } from '@/api/user.api';

export const useActivitySummaryQuery = () => {
  return useQuery({
    queryKey: ['activitySummary'],
    queryFn: getActivitySummary,
  });
};
