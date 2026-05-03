'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import BoardSection from './BoardSection';

export default function BoardBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner />}
      rejectedFallback={({ error, reset }) => <ErrorFallback error={error} reset={reset} />}
    >
      <BoardSection />
    </AsyncBoundary>
  );
}
