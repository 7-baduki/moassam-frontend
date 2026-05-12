'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import ObservationDetail from './ObservationDetail';

interface ObservationBoundaryProps {
  observationId: number;
}

export default function ObservationBoundary({ observationId }: ObservationBoundaryProps) {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="h-full justify-center" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} />
      )}
    >
      <ObservationDetail observationId={observationId} />
    </AsyncBoundary>
  );
}
