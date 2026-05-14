import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyMoabangPosts, getMyFreePosts } from '@/api/post.api';

export const useMyMoabangPostsQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myMoabangPosts', page],
    queryFn: () => getMyMoabangPosts(page),
  });
};

export const useMyFreePostsQuery = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['myFreePosts', page],
    queryFn: () => getMyFreePosts(page),
  });
};
