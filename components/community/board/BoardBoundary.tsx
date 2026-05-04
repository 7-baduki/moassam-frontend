'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import BoardSection from './BoardSection';

export default function BoardBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="pt-11.25" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} />
      )}
    >
      <BoardSection />
    </AsyncBoundary>
  );
}
