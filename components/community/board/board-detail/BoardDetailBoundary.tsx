'use client';

import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import BoardDetailSection from './BoardDetailSection';

interface BoardDetailBoundaryProps {
  postId: number;
  title: string;
}

export default function BoardDetailBoundary({ postId, title }: BoardDetailBoundaryProps) {
  return (
    <AsyncBoundary
      pendingFallback={<LoadingSpinner className="pt-11.25" />}
      rejectedFallback={({ error, reset }) => (
        <ErrorFallback error={error} actionLabel="다시 시도" onAction={reset} className="pt-7.5" />
      )}
    >
      <BoardDetailSection postId={postId} title={title} />
    </AsyncBoundary>
  );
}
