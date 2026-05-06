'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { ViewCountIcon } from '@/app/assets/icons';

const MOCK_BOOKMARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `선생님들 평균퇴근 시간 몇시인가요? ${i + 1}`,
  board: '자유게시판',
  createdAt: '2026.03.06',
  viewCount: 56,
}));

const TOTAL_PAGES = 10;

export default function BookmarksPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">북마크</h1>

      <div className="flex flex-col gap-3">
        {MOCK_BOOKMARKS.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={`/community/board/${bookmark.id}`}
            className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
          >
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
              {bookmark.title}
            </span>
            <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
              <span>{bookmark.board}</span>
              <span>{bookmark.createdAt}</span>
              <span className="flex items-center gap-1">
                <ViewCountIcon />
                {bookmark.viewCount}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-12">
        <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onChange={setCurrentPage} />
      </div>
    </div>
  );
}
