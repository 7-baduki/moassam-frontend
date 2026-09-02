'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { useMyCommentsQuery, useMyCommentsInfiniteQuery } from '@/hooks/queries/user';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { MyComment } from './comment.type';

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

const CATEGORY_LABEL: Record<string, string> = {
  MOABANG: '모아방',
  FREE: '자유게시판',
};

function CommentItem({ comment }: { comment: MyComment }) {
  return (
    <div className="animate-lift flex items-center rounded-[10px] bg-white px-5 py-3">
      <Link
        href={`/community/${comment.category === 'MOABANG' ? 'moabang' : 'board'}/${comment.postId}`}
        className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center"
      >
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
          {comment.content}
        </span>
        <div className="flex items-center gap-5 text-xs font-medium text-black-500 md:pl-10">
          <span className="w-14 shrink-0 md:w-auto">
            {CATEGORY_LABEL[comment.category] ?? comment.category}
          </span>
          <span className="w-21.75 truncate">{comment.postTitle}</span>
          <span className="shrink-0">{formatDate(comment.createdAt)}</span>
        </div>
      </Link>
    </div>
  );
}

function CommentsPaginated() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useMyCommentsQuery(currentPage);
  const isEmpty = !data?.data || data.data.length === 0;

  return (
    <div className="flex flex-col gap-5">
      {isEmpty ? (
        <div className="flex justify-center pt-11.25">
          <EmptyState message="아직 작성한 댓글이 없어요" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 px-4 md:px-9 xl:px-0">
            {data?.data.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
          </div>
          <div className="flex justify-center pt-12">
            <Pagination
              currentPage={currentPage + 1}
              totalPages={data?.totalPages ?? 1}
              onChange={(page) => setCurrentPage(page - 1)}
            />
          </div>
        </>
      )}
    </div>
  );
}

function CommentsInfinite() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyCommentsInfiniteQuery();

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

  return (
    <div className="flex flex-col gap-5">
      {isEmpty ? (
        <div className="flex justify-center pt-11.25">
          <EmptyState message="아직 작성한 댓글이 없어요" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 pb-5 md:px-9 xl:px-0">
          {allItems.map((comment) => (
            <CommentItem key={comment.commentId} comment={comment} />
          ))}
          <div ref={observerRef} className="h-1" />
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black-300 border-t-black-800" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommentsSection() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <CommentsPaginated /> : <CommentsInfinite />;
}
