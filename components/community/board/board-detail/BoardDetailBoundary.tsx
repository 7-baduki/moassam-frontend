'use client';

import BoardDetailSection from './BoardDetailSection';

interface BoardDetailBoundaryProps {
  postId: number;
  title: string;
}

export default function BoardDetailBoundary({ postId, title }: BoardDetailBoundaryProps) {
  return <BoardDetailSection postId={postId} title={title} />;
}
