'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import EditSection from './EditSection';

interface EditBoundaryProps {
  postId: number;
}

export default function EditBoundary({ postId }: EditBoundaryProps) {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="mt-[20vh]" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} className="pt-7.5" />
      )}
    >
      <EditSection postId={postId} />
    </AsyncBoundary>
  );
}
