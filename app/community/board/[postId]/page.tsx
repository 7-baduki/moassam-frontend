import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import BoardDetailBoundary from '@/components/community/board/board-detail/BoardDetailBoundary';
import { getPostTitle } from '@/api/community-server.api';
import { getProfile } from '@/api/user-server.api';

interface BoardDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export async function generateMetadata({ params }: BoardDetailPageProps): Promise<Metadata> {
  const { postId } = await params;
  const id = Number(postId);
  if (!Number.isInteger(id) || id <= 0) return { title: '자유게시판 게시글' };

  const title = await getPostTitle(id);
  return { title: title ?? '자유게시판 게시글' };
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <BoardDetailPageContent params={params} />
    </Suspense>
  );
}

async function BoardDetailPageContent({ params }: BoardDetailPageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  const initialAuth = !!(await getProfile());

  return <BoardDetailBoundary postId={id} title="자유게시판" initialAuth={initialAuth} />;
}
