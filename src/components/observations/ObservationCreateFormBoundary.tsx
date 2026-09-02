'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import ObservationCreateForm from './ObservationCreateForm';

export default function ObservationCreateFormBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="h-full justify-center" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} />
      )}
    >
      <ObservationCreateForm />
    </AsyncBoundary>
  );
}
