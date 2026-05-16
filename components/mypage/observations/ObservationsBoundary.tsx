'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import ObservationsSection from './ObservationsSection';

export default function ObservationsBoundary() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">관찰일지 내역</h1>
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
