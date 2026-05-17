import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { getMyBookmarks } from '@/api/bookmark.api';
import { unbookmarkPost } from '@/api/community.api';

export const useMyBookmarksQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myBookmarks', page],
    queryFn: () => getMyBookmarks(page),
  });
};

export const useMyBookmarkDeleteMutation = (callbacks: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (postId: number) => unbookmarkPost(postId),
    ...callbacks,
  });
};
