'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from '@/components/common/pagination/Pagination';
import {
  useMyBookmarksQuery,
  useMyBookmarksInfiniteQuery,
  useMyBookmarkDeleteMutation,
  userKeys,
} from '@/hooks/queries/user';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { MoreButton } from '@/components/common/more-button/MoreButton';
import { Dialog } from '@/components/common/dialog/Dialog';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { toast } from '@/utils/toast';
import { MyBookmark } from './bookmark.type';

const CATEGORY_LABEL: Record<string, string> = {
  FREE: '자유게시판',
  MOABANG: '모아방',
};

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

function BookmarkItem({
  bookmark,
  onDelete,
}: {
  bookmark: MyBookmark;
  onDelete: (postId: number) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="animate-lift flex items-center rounded-[10px] bg-white px-5 py-3">
        <Link
          href={`/community/${bookmark.category === 'FREE' ? 'board' : 'moabang'}/${bookmark.postId}`}
          className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center"
        >
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
            {bookmark.title}
          </span>
          <div className="flex items-center gap-5 text-xs font-medium text-black-500 md:pl-10">
            <span className="w-14 shrink-0 md:w-auto">
              {CATEGORY_LABEL[bookmark.category] ?? bookmark.category}
            </span>
            <span>{formatDate(bookmark.createdAt)}</span>
            <span>조회 {bookmark.viewCount}</span>
          </div>
        </Link>
        <MoreButton className="ml-5" onDelete={() => setShowDeleteDialog(true)} />
      </div>
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        iconType="trash"
        title="북마크를 삭제할까요?"
        description="삭제해도 언제든 다시 북마크할 수 있어요"
        buttons={[
          {
            children: '취소',
            variant: 'outline',
            onClick: () => setShowDeleteDialog(false),
          },
          {
            children: '삭제',
            onClick: () => {
              setShowDeleteDialog(false);
              onDelete(bookmark.postId);
            },
          },
        ]}
      />
    </>
  );
}

function BookmarksPaginated() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, refetch } = useMyBookmarksQuery(currentPage);
  const isEmpty = !data?.data || data.data.length === 0;

  const { mutate: handleDelete } = useMyBookmarkDeleteMutation({
    onSuccess: (_, postId) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: userKeys.activitySummary() });
      toast.success({
        title: '북마크가 삭제되었어요',
        description: '삭제해도 언제든 다시 북마크할 수 있어요',
      });
    },
    onError: () => toast.error({ title: '삭제 실패', description: '잠시 후 다시 시도해주세요' }),
  });

  return (
    <div className="flex flex-col gap-5">
      {isEmpty ? (
        <div className="flex justify-center pt-11.25">
          <EmptyState message="아직 북마크한 게시글이 없어요" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 px-4 md:px-9 xl:px-0">
            {data?.data.map((bookmark) => (
              <BookmarkItem
                key={`${bookmark.category}-${bookmark.postId}`}
                bookmark={bookmark}
                onDelete={handleDelete}
              />
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

function BookmarksInfinite() {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useMyBookmarksInfiniteQuery();

  const { mutate: handleDelete } = useMyBookmarkDeleteMutation({
    onSuccess: (_, postId) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: userKeys.activitySummary() });
      toast.success({
        title: '북마크가 삭제되었어요',
        description: '삭제해도 언제든 다시 북마크할 수 있어요',
      });
    },
    onError: () => toast.error({ title: '삭제 실패', description: '잠시 후 다시 시도해주세요' }),
  });

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
          <EmptyState message="아직 북마크한 게시글이 없어요" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 pb-5 md:px-9 xl:px-0">
          {allItems.map((bookmark) => (
            <BookmarkItem
              key={`${bookmark.category}-${bookmark.postId}`}
              bookmark={bookmark}
              onDelete={handleDelete}
            />
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

export default function BookmarksSection() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <BookmarksPaginated /> : <BookmarksInfinite />;
}
