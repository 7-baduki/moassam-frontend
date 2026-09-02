import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getMyMoabangPosts, getMyFreePosts } from '@/api/post.api';
import { userKeys } from '@/hooks/queries/user/queryKeys';

export function useMyMoabangPostsQuery(page: number) {
  return useSuspenseQuery({
    queryKey: userKeys.myMoabangPosts.page(page),
    queryFn: () => getMyMoabangPosts(page),
  });
}

export function useMyFreePostsQuery(page: number) {
  return useSuspenseQuery({
    queryKey: userKeys.myFreePosts.page(page),
    queryFn: () => getMyFreePosts(page),
  });
}

export function useMyMoabangPostsInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: userKeys.myMoabangPosts.infinite(),
    queryFn: ({ pageParam = 0 }) => getMyMoabangPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}

export function useMyFreePostsInfiniteQuery() {
  return useSuspenseInfiniteQuery({
    queryKey: userKeys.myFreePosts.infinite(),
    queryFn: ({ pageParam = 0 }) => getMyFreePosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
}
