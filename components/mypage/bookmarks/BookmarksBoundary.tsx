'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import BookmarksSection from './BookmarksSection';

export default function BookmarksBoundary() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="hidden text-lg font-semibold text-black xl:block">북마크</h1>
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
        <BookmarksSection />
      </AsyncBoundary>
    </div>
  );
}
