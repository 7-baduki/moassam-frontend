'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import ObservationDetail from './ObservationDetail';

interface ObservationDetailBoundaryProps {
  observationId: number;
}

export default function ObservationDetailBoundary({
  observationId,
}: ObservationDetailBoundaryProps) {
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
