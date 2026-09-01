import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import BoardDetailBoundary from '@/components/community/board/board-detail/BoardDetailBoundary';
import { getPostTitle } from '@/api/community-server.api';
import { getProfile } from '@/api/user-server.api';

interface MoabangDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export async function generateMetadata({ params }: MoabangDetailPageProps): Promise<Metadata> {
  const { postId } = await params;
  const id = Number(postId);
  if (!Number.isInteger(id) || id <= 0) return { title: '모아방 게시글' };

  const title = await getPostTitle(id);
  return { title: title ?? '모아방 게시글' };
}

export default function MoabangDetailPage({ params }: MoabangDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <MoabangDetailPageContent params={params} />
    </Suspense>
  );
}

async function MoabangDetailPageContent({ params }: MoabangDetailPageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  const initialAuth = !!(await getProfile());

  return <BoardDetailBoundary postId={id} title="모아방" initialAuth={initialAuth} />;
}
