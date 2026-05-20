'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import {
  useMyMoabangPostsQuery,
  useMyMoabangPostsInfiniteQuery,
} from '@/hooks/queries/user/useMyPosts';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { MyMoabangPost } from './post.type';

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

function MoabangPostItem({ post }: { post: MyMoabangPost }) {
  return (
    <Link
      href={`/community/moabang/${post.postId}`}
      className="animate-lift flex min-w-0 flex-1 flex-col gap-1 rounded-[10px] bg-white px-5 py-3 md:flex-row md:items-center"
    >
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
        {post.title}
      </span>
      <div className="flex items-center gap-5 text-xs font-medium text-black-500 md:pl-10">
        <span>{formatDate(post.createdAt)}</span>
        <span>조회 {post.viewCount}</span>
      </div>
    </Link>
  );
}

interface MoabangPostListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

function MoabangPostPaginated({ currentPage, onPageChange }: MoabangPostListProps) {
  const { data } = useMyMoabangPostsQuery(currentPage);
  const isEmpty = !data?.data || data.data.length === 0;

  if (isEmpty) {
    return (
      <div className="flex justify-center pt-11.25">
        <EmptyState message="아직 작성한 게시글이 없어요" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 px-4 md:px-9 xl:px-0">
        {data?.data.map((post) => (
          <MoabangPostItem key={post.postId} post={post} />
        ))}
      </div>
      <div className="flex justify-center pt-12">
        <Pagination
          currentPage={currentPage + 1}
          totalPages={data?.totalPages ?? 1}
          onChange={(page) => onPageChange(page - 1)}
        />
      </div>
    </>
  );
}

function MoabangPostInfinite() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyMoabangPostsInfiniteQuery();
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allItems = data.pages.flatMap((page) => page.data);
  const isEmpty = allItems.length === 0;

  if (isEmpty) {
    return (
      <div className="flex justify-center pt-11.25">
        <EmptyState message="아직 작성한 게시글이 없어요" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 pb-5 md:px-9 xl:px-0">
      {allItems.map((post) => (
        <MoabangPostItem key={post.postId} post={post} />
      ))}
      <div ref={observerRef} className="h-1" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-black-300 border-t-black-800" />
        </div>
      )}
    </div>
  );
}

export default function MoabangPostList({ currentPage, onPageChange }: MoabangPostListProps) {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <MoabangPostPaginated currentPage={currentPage} onPageChange={onPageChange} />
  ) : (
    <MoabangPostInfinite />
  );
}
