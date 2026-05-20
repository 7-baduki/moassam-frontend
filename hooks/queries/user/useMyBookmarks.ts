import { useSuspenseQuery, useSuspenseInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getMyBookmarks } from '@/api/bookmark.api';
import { unbookmarkPost } from '@/api/community.api';

export function useMyBookmarksQuery(page: number) {
  return useSuspenseQuery({
    queryKey: ['myBookmarks', page],
    queryFn: () => getMyBookmarks(page),
  });
}

export function useMyBookmarksInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: ['myBookmarks', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getMyBookmarks(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useMyBookmarkDeleteMutation(callbacks: {
  onSuccess?: (data: void, postId: number) => void;
  onError?: () => void;
}) {
  return useMutation({
    mutationFn: (postId: number) => unbookmarkPost(postId),
    ...callbacks,
  });
}
