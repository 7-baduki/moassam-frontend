'use client';

import { useTransition, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import BoardCard from './BoardCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFab from '@/components/community/CommunityFab';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import { BOARD_CATEGORY_FILTER_TABS } from '@/constants/community/community-tabs';
import {
  useBoardPostsQuery,
  useBoardSearchQuery,
  useBoardPostsInfiniteQuery,
  useBoardSearchInfiniteQuery,
} from '@/hooks/queries/community';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { getValidParam } from '@/utils/getValidParam';
import type { BoardPost, HeadTag } from './board.type';
import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import { useUserStore } from '@/stores/userStore';
import { useLoginModalStore } from '@/stores/loginModalStore';
import ScrollToTopButton from '@/components/common/scroll-top/ScrollToTopButton';

function PostList({ posts }: { posts: BoardPost[] }) {
  return posts.length === 0 ? (
    <div className="mt-[20vh] flex justify-center">
      <EmptyState message="아직 등록된 게시글이 없어요" />
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
      {posts.map((post) => (
        <BoardCard key={post.postId} post={post} />
      ))}
    </div>
  );
}

function InfiniteScrollSentinel({
  onIntersect,
  isFetching,
}: {
  onIntersect: () => void;
  isFetching: boolean;
}) {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching) {
        onIntersect();
      }
    },
    [onIntersect, isFetching],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      <div ref={observerRef} className="h-1" />
      {isFetching && (
        <div className="flex justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-black-300 border-t-black-800" />
        </div>
      )}
    </>
  );
}

function BoardListContent({
  category,
  currentPage,
  onPageChange,
}: {
  category: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useBoardPostsQuery({
    headTag: category !== 'all' ? (category as HeadTag) : undefined,
    page: currentPage - 1,
    size: 8,
  });

  return (
    <>
      <PostList posts={data.data} />
      {data.totalPages > 0 && (
        <div className="mt-15 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, data.totalPages)}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

function BoardListInfinite({ category }: { category: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useBoardPostsInfiniteQuery({
    headTag: category !== 'all' ? (category as HeadTag) : undefined,
  });

  const allPosts = data.pages.flatMap((page) => page.data);

  return (
    <>
      <PostList posts={allPosts} />
      {allPosts.length > 0 && (
        <InfiniteScrollSentinel
          onIntersect={() => hasNextPage && fetchNextPage()}
          isFetching={isFetchingNextPage}
        />
      )}
    </>
  );
}

function BoardSearchContent({
  keyword,
  currentPage,
  onPageChange,
}: {
  keyword: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useBoardSearchQuery({ keyword, page: currentPage - 1, size: 8 });

  return (
    <>
      <p className="mb-2 text-sm font-medium text-black-700 md:mb-5">
        <span className="font-semibold text-pink-500">&ldquo;{keyword}&rdquo;</span> 검색 결과{' '}
        <span className="font-semibold text-pink-500">{data.totalElements}</span>건
      </p>
      <PostList posts={data.data} />
      {data.totalPages > 0 && (
        <div className="mt-15 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, data.totalPages)}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

function BoardSearchInfinite({ keyword }: { keyword: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useBoardSearchInfiniteQuery({
    keyword,
  });

  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];
  const totalElements = data?.pages[0]?.totalElements ?? 0;

  return (
    <>
      <p className="mb-2 text-sm font-medium text-black-700 md:mb-5">
        <span className="font-semibold text-pink-500">&ldquo;{keyword}&rdquo;</span> 검색 결과{' '}
        <span className="font-semibold text-pink-500">{totalElements}</span>건
      </p>
      <PostList posts={allPosts} />
      {allPosts.length > 0 && (
        <InfiniteScrollSentinel
          onIntersect={() => hasNextPage && fetchNextPage()}
          isFetching={isFetchingNextPage}
        />
      )}
    </>
  );
}

export default function BoardSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const isDesktop = useIsDesktop();
  const user = useUserStore((state) => state.user);
  const openLoginModal = useLoginModalStore((state) => state.open);

  const keyword = searchParams.get('keyword') ?? '';
  const category = getValidParam(searchParams.get('category'), BOARD_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  function handleWrite() {
    if (!user) {
      openLoginModal();
      return;
    }
    router.push('/community/write?board=free');
  }

  function updateParam(key: string, value: string, resetPage = false) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (resetPage) params.set('page', '1');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleSearch(value: string) {
    const params = new URLSearchParams();
    if (value) params.set('keyword', value);
    params.set('page', '1');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handlePageChange(page: number) {
    updateParam('page', String(page));
  }

  return (
    <section className="flex flex-col" aria-label="게시글 목록">
      <CommunityTitleBar
        title="자유게시판"
        onWrite={handleWrite}
        onSearch={handleSearch}
        renderSearchResults={(kw) => <BoardSearchInfinite keyword={kw} />}
      />
      <div className="fixed right-9 bottom-9 z-300 flex flex-col-reverse items-center gap-3 xl:hidden">
        <ScrollToTopButton showAfter={300} />
        <CommunityFab onClick={handleWrite} positionClassName="" />
      </div>
      {!keyword && (
        <CommunityFilter
          categoryTabs={BOARD_CATEGORY_FILTER_TABS}
          category={category}
          onCategoryChange={(value) => updateParam('category', value, true)}
        />
      )}
      <AsyncBoundary
        pendingFallback={<LoadingSpinner className="mt-[20vh]" />}
        rejectedFallback={({ error, reset }) => (
          <ErrorFallback
            error={error}
            actionLabel="다시 시도"
            onAction={reset}
            className="pt-7.5"
          />
        )}
      >
        {keyword ? (
          isDesktop ? (
            <BoardSearchContent
              keyword={keyword}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          ) : (
            <BoardSearchInfinite keyword={keyword} />
          )
        ) : isDesktop ? (
          <BoardListContent
            category={category}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <BoardListInfinite category={category} />
        )}
      </AsyncBoundary>
    </section>
  );
}
