'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import { useMyObservationsQuery } from '@/hooks/queries/user/useMyObservations';
import { useObservationDeleteMutation } from '@/hooks/queries/observations/useObservation';
import { AGE_OPTIONS } from '@/constants/observations/observation';
import { MoreButton } from '@/components/common/more-button/MoreButton';
import { EmptyState } from '@/components/common/empty-state/EmptyState';

const CURRICULUM_LABEL: Record<string, string> = {
  NURI: '개정 누리과정',
  STANDARD: '개정 표준보육과정',
};

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

export default function ObservationsSection() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, refetch, isLoading } = useMyObservationsQuery(currentPage);

  const { mutate: handleDelete } = useObservationDeleteMutation({
    onSuccess: () => refetch(),
  });

  const isEmpty = !isLoading && (!data?.data || data.data.length === 0);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">관찰일지 내역</h1>

      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <EmptyState
            message="아직 생성한 관찰일지가 없어요"
            description="첫 관찰일지를 만들어보세요"
            actionLabel="관찰일지 생성하기"
            onAction={() => router.push('/observations')}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {data?.data.map((observation) => (
              <div
                key={observation.observationId}
                className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
              >
                <Link
                  href={`/observations/${observation.observationId}`}
                  className="flex min-w-0 flex-1 items-center"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
                    {observation.title}
                  </span>
                  <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
                    <span>
                      {AGE_OPTIONS.find((o) => o.value === observation.age)?.label ??
                        observation.age}
                    </span>
                    <span className="w-21.75">
                      {CURRICULUM_LABEL[observation.curriculumType] ?? observation.curriculumType}
                    </span>
                    <span>{formatDate(observation.createdAt)}</span>
                  </div>
                </Link>
                <MoreButton
                  className="ml-5"
                  onDelete={() => handleDelete(observation.observationId)}
                />
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
