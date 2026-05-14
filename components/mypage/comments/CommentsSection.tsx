'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { useMyCommentsQuery } from '@/hooks/queries/user/useMyComments';
import { EmptyState } from '@/components/common/empty-state/EmptyState';

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

export default function CommentsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useMyCommentsQuery(currentPage);
  const isEmpty = !isLoading && (!data?.data || data.data.length === 0);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">댓글</h1>

      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <EmptyState message="아직 작성한 댓글이 없어요" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {data?.data.map((comment) => (
              <Link
                key={comment.commentId}
                href={`/community/board/${comment.commentId}`}
                className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
                  {comment.content}
                </span>
                <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
                  <span className="whitespace-nowrap">{comment.postTitle}</span>
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
              </Link>
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
