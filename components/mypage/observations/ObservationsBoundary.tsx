'use client';

import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@/app/assets/icons';
import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import ObservationsSection from './ObservationsSection';

export default function ObservationsBoundary() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 bg-white px-4 py-3 md:px-9 xl:hidden">
        <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
          <ChevronDownIcon className="h-5 w-5 rotate-90 text-black" />
        </button>
        <h1 className="text-base font-semibold text-black md:text-[18px]">관찰일지 내역</h1>
      </div>
      <h1 className="hidden text-lg font-semibold text-black xl:block">관찰일지 내역</h1>
      <AsyncBoundary
        pendingFallback={<LoadingSpinner className="pt-11.25" />}
        rejectedFallback={({ error, reset }) => (
          <ErrorFallback
            error={error}
            actionLabel="다시 시도"
            onAction={reset}
            className="pt-7.5"
          />
        )}
      >
        <ObservationsSection />
      </AsyncBoundary>
    </div>
  );
}
