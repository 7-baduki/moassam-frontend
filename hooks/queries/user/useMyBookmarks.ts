import { useQuery } from '@tanstack/react-query';
import { getMyBookmarks } from '@/api/bookmark.api';

export const useMyBookmarksQuery = (page: number) => {
  return useQuery({
    queryKey: ['myBookmarks', page],
    queryFn: () => getMyBookmarks(page),
  });
};
