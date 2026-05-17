'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { ViewCountIcon } from '@/app/assets/icons';
import {
  useMyBookmarksQuery,
  useMyBookmarkDeleteMutation,
} from '@/hooks/queries/user/useMyBookmarks';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { MoreButton } from '@/components/common/more-button/MoreButton';
import { toast } from '@/utils/toast';

const CATEGORY_LABEL: Record<string, string> = {
  FREE: '자유게시판',
  MOABANG: '모아방',
};

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

export default function BookmarksSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, refetch } = useMyBookmarksQuery(currentPage);
  const isEmpty = !data?.data || data.data.length === 0;

  const { mutate: handleDelete } = useMyBookmarkDeleteMutation({
    onSuccess: () => refetch(),
    onError: () => toast.error({ title: '삭제 실패', description: '잠시 후 다시 시도해주세요' }),
  });

  return (
    <div className="flex flex-col gap-5">
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <EmptyState message="아직 북마크한 게시글이 없어요" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {data?.data.map((bookmark) => (
              <div
                key={`${bookmark.category}-${bookmark.postId}`}
                className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
              >
                <Link
                  href={`/community/${bookmark.category === 'FREE' ? 'board' : 'moabang'}/${bookmark.postId}`}
                  className="flex min-w-0 flex-1 items-center"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
                    {bookmark.title}
                  </span>
                  <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
                    <span>{CATEGORY_LABEL[bookmark.category] ?? bookmark.category}</span>
                    <span>{formatDate(bookmark.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      <ViewCountIcon />
                      {bookmark.viewCount}
                    </span>
                  </div>
                </Link>
                <MoreButton className="ml-5" onDelete={() => handleDelete(bookmark.postId)} />
              </div>
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
