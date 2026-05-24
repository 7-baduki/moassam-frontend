'use client';

import BoardDetailSection from './BoardDetailSection';

interface BoardDetailBoundaryProps {
  postId: number;
  title: string;
  initialAuth: boolean;
}

export default function BoardDetailBoundary({
  postId,
  title,
  initialAuth,
}: BoardDetailBoundaryProps) {
  return <BoardDetailSection postId={postId} title={title} initialAuth={initialAuth} />;
}
