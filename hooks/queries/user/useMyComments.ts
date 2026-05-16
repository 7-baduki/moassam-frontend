import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyComments } from '@/api/comment.api';

export const useMyCommentsQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myComments', page],
    queryFn: () => getMyComments(page),
  });
};
