import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
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

export const useMyMoabangPostsInfiniteQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['myMoabangPosts', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getMyMoabangPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
};

export const useMyFreePostsInfiniteQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['myFreePosts', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getMyFreePosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
};
