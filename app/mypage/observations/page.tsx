'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';

const MOCK_OBSERVATIONS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `관찰일지 제목 ${i + 1}`,
  age: '만 4세',
  curriculum: '개정 표준보육과정',
  createdAt: '2026.03.06',
}));

const TOTAL_PAGES = 10;

export default function ObservationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">관찰일지 내역</h1>

      <div className="flex flex-col gap-3">
        {MOCK_OBSERVATIONS.map((observation) => (
          <Link
            key={observation.id}
            href={`/observations/${observation.id}`}
            className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
          >
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
              {observation.title}
            </span>
            <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
              <span>{observation.age}</span>
              <span>{observation.curriculum}</span>
              <span>{observation.createdAt}</span>
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
