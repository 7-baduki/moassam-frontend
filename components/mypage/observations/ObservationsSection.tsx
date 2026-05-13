'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { useMyObservationsQuery } from '@/hooks/queries/user/useMyObservations';
import { AGE_OPTIONS } from '@/constants/observations/observation';

const CURRICULUM_LABEL: Record<string, string> = {
  NURI: '누리과정',
  STANDARD: '개정 표준보육과정',
};

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

export default function ObservationsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useMyObservationsQuery(currentPage);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">관찰일지 내역</h1>

      <div className="flex flex-col gap-3">
        {data?.data.map((observation) => (
          <Link
            key={observation.observationId}
            href={`/observations/${observation.observationId}`}
            className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
          >
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
              {observation.title}
            </span>
            <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
              <span>
                {AGE_OPTIONS.find((o) => o.value === observation.age)?.label ?? observation.age}
              </span>
              <span>
                {CURRICULUM_LABEL[observation.curriculumType] ?? observation.curriculumType}
              </span>
              <span>{formatDate(observation.createdAt)}</span>
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
    </div>
  );
}
