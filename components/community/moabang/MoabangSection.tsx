'use client';

import { useTransition, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import MoabangCard from './MoabangCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFab from '@/components/community/CommunityFab';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import {
  MOABANG_AGE_FILTER_TABS,
  MOABANG_CATEGORY_FILTER_TABS,
} from '@/constants/community/community-tabs';
import {
  useMoabangPostsQuery,
  useMoabangSearchQuery,
  useMoabangPostsInfiniteQuery,
  useMoabangSearchInfiniteQuery,
} from '@/hooks/queries/community/useCommunity';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { getValidParam } from '@/utils/getValidParam';
import type { PostAge, ResourceType, MoabangPost } from './moabang.type';

function PostGrid({ posts }: { posts: MoabangPost[] }) {
  return posts.length === 0 ? (
    <div className="flex flex-1 items-center justify-center pt-20">
      <EmptyState message="아직 등록된 게시글이 없어요" />
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-5">
      {posts.map((post) => (
        <MoabangCard key={post.postId} post={post} />
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

function MoabangListContent({
  age,
  category,
  currentPage,
  onPageChange,
}: {
  age: string;
  category: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useMoabangPostsQuery({
    postAge: age !== 'all' ? (age as PostAge) : undefined,
    resourceType: category !== 'all' ? (category as ResourceType) : undefined,
    page: currentPage - 1,
    size: 9,
  });

  return (
    <>
      <PostGrid posts={data.data} />
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

function MoabangListInfinite({ age, category }: { age: string; category: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMoabangPostsInfiniteQuery({
    postAge: age !== 'all' ? (age as PostAge) : undefined,
    resourceType: category !== 'all' ? (category as ResourceType) : undefined,
  });

  const allPosts = data.pages.flatMap((page) => page.data);

  return (
    <>
      <PostGrid posts={allPosts} />
      {allPosts.length > 0 && (
        <InfiniteScrollSentinel
          onIntersect={() => hasNextPage && fetchNextPage()}
          isFetching={isFetchingNextPage}
        />
      )}
    </>
  );
}

function MoabangSearchContent({
  keyword,
  currentPage,
  onPageChange,
}: {
  keyword: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useMoabangSearchQuery({ keyword, page: currentPage - 1, size: 9 });

  return (
    <>
      <p className="mb-2 text-sm font-medium text-black-700 md:mb-5">
        <span className="font-semibold text-pink-500">&ldquo;{keyword}&rdquo;</span> 검색 결과{' '}
        <span className="font-semibold text-pink-500">{data.totalElements}</span>건
      </p>
      <PostGrid posts={data.data} />
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

function MoabangSearchInfinite({ keyword }: { keyword: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMoabangSearchInfiniteQuery({
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
      <PostGrid posts={allPosts} />
      {allPosts.length > 0 && (
        <InfiniteScrollSentinel
          onIntersect={() => hasNextPage && fetchNextPage()}
          isFetching={isFetchingNextPage}
        />
      )}
    </>
  );
}

export default function MoabangSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const isDesktop = useIsDesktop();

  const keyword = searchParams.get('keyword') ?? '';
  const age = getValidParam(searchParams.get('age'), MOABANG_AGE_FILTER_TABS, 'all');
  const category = getValidParam(searchParams.get('category'), MOABANG_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  function updateParam(key: string, value: string, resetPage = false) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (resetPage) params.set('page', '1');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });
  }

  function handleSearch(value: string) {
    const params = new URLSearchParams();
    if (value) params.set('keyword', value);
    params.set('page', '1');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });
  }

  function handlePageChange(page: number) {
    updateParam('page', String(page));
  }

  return (
    <section className="flex flex-col" aria-label="게시글 목록">
      <CommunityTitleBar
        title="모아방"
        onWrite={() => router.push('/community/write?board=moabang')}
        onSearch={handleSearch}
        renderSearchResults={(kw) => <MoabangSearchInfinite keyword={kw} />}
      />
      <CommunityFab onClick={() => router.push('/community/write?board=moabang')} />
      {!keyword && (
        <CommunityFilter
          ageTabs={MOABANG_AGE_FILTER_TABS}
          age={age}
          onAgeChange={(value) => updateParam('age', value, true)}
          categoryTabs={MOABANG_CATEGORY_FILTER_TABS}
          category={category}
          onCategoryChange={(value) => updateParam('category', value, true)}
        />
      )}
      {keyword ? (
        isDesktop ? (
          <MoabangSearchContent
            keyword={keyword}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <MoabangSearchInfinite keyword={keyword} />
        )
      ) : isDesktop ? (
        <MoabangListContent
          age={age}
          category={category}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <MoabangListInfinite age={age} category={category} />
      )}
    </section>
  );
}
