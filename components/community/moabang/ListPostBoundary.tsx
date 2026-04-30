'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import ListPostSection from './ListPostSection';

export default function ListPostBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner />}
      rejectedFallback={({ error, reset }) => <ErrorFallback error={error} reset={reset} />}
    >
      <ListPostSection />
    </AsyncBoundary>
  );
}
