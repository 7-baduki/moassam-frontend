'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import MoabangSection from './MoabangSection';

export default function MoabangBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} />
      )}
    >
      <MoabangSection />
    </AsyncBoundary>
  );
}
