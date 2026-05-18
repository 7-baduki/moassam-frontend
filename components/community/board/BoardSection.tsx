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
} from '@/hooks/queries/community/useCommunity';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { getValidParam } from '@/utils/getValidParam';
import type { BoardPost, HeadTag } from './board.type';

function PostList({ posts }: { posts: BoardPost[] }) {
  return posts.length === 0 ? (
    <div className="flex flex-1 items-center justify-center pt-20">
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
    size: 9,
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
  const { data } = useBoardSearchQuery({ keyword, page: currentPage - 1, size: 9 });

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

  const allPosts = data.pages.flatMap((page) => page.data);
  const totalElements = data.pages[0]?.totalElements ?? 0;

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

  const keyword = searchParams.get('keyword') ?? '';
  const category = getValidParam(searchParams.get('category'), BOARD_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

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
        onWrite={() => router.push('/community/write?board=free')}
        onSearch={handleSearch}
      />
      <CommunityFab onClick={() => router.push('/community/write?board=free')} />
      {!keyword && (
        <CommunityFilter
          categoryTabs={BOARD_CATEGORY_FILTER_TABS}
          category={category}
          onCategoryChange={(value) => updateParam('category', value, true)}
        />
      )}
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
    </section>
  );
}
