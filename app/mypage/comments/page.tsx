'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';

const MOCK_COMMENTS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  content: 'CD를 활용해 자동차를 표현하는 아이디어가 참신하고 창의성을 자극해주는 활동인 것 같아요',
  boardTitle: '[활동자료] 나만의 자동차 그리기',
  createdAt: '2026.03.06',
}));

const TOTAL_PAGES = 10;

export default function CommentsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">댓글</h1>

      <div className="flex flex-col gap-3">
        {MOCK_COMMENTS.map((comment) => (
          <Link
            key={comment.id}
            href={`/community/board/${comment.id}`}
            className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
          >
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
              {comment.content}
            </span>
            <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
              <span className="whitespace-nowrap">{comment.boardTitle}</span>
              <span>{comment.createdAt}</span>
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
