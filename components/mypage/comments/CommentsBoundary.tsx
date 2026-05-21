'use client';

import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@/app/assets/icons';
import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import CommentsSection from './CommentsSection';

export default function CommentsBoundary() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 xl:gap-3">
      <div className="flex items-center gap-4 px-4 pt-4 md:px-9 md:pt-9 xl:hidden">
        <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
          <ChevronDownIcon className="h-5 w-5 rotate-90 text-black" />
        </button>
        <h1 className="py-2 text-base font-semibold text-black md:text-[18px]">댓글</h1>
      </div>
      <h1 className="hidden text-lg font-semibold text-black xl:block xl:pt-[10.5px]">댓글</h1>
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
        <CommentsSection />
      </AsyncBoundary>
    </div>
  );
}
