'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import DashboardSection from './DashboardSection';

export default function DashboardBoundary() {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="pt-11.25" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} className="pt-7.5" />
      )}
    >
      <DashboardSection />
    </AsyncBoundary>
  );
}
