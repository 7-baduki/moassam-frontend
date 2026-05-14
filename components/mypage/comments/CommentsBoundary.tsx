'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import CommentsSection from './CommentsSection';

export default function CommentsBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="pt-11.25" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} className="pt-7.5" />
      )}
    >
      <CommentsSection />
    </AsyncBoundary>
  );
}
