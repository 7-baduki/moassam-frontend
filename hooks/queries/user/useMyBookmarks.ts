import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyBookmarks } from '@/api/bookmark.api';

export const useMyBookmarksQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myBookmarks', page],
    queryFn: () => getMyBookmarks(page),
  });
};
