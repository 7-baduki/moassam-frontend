import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '@/api/comment.api';

export const useMyCommentsQuery = (page: number) => {
  return useQuery({
    queryKey: ['myComments', page],
    queryFn: () => getMyComments(page),
  });
};
