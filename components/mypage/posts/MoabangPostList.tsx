'use client';

import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { ViewCountIcon } from '@/app/assets/icons';
import { useMyMoabangPostsQuery } from '@/hooks/queries/user/useMyPosts';
import { EmptyState } from '@/components/common/empty-state/EmptyState';

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

interface MoabangPostListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function MoabangPostList({ currentPage, onPageChange }: MoabangPostListProps) {
  const { data, isLoading } = useMyMoabangPostsQuery(currentPage);
  const isEmpty = !isLoading && (!data?.data || data.data.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <EmptyState message="아직 작성한 게시글이 없어요" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {data?.data.map((post) => (
          <Link
            key={post.postId}
            href={`/community/moabang/${post.postId}`}
            className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
          >
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
              {post.title}
            </span>
            <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
              <span>{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1">
                <ViewCountIcon />
                {post.viewCount}
              </span>
            </div>
          </Link>
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
