import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import BoardDetailBoundary from '@/components/community/board/board-detail/BoardDetailBoundary';

interface BoardDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  const initialAuth = (await cookies()).get('isLoggedIn')?.value === 'true';

  return <BoardDetailBoundary postId={id} title="자유게시판" initialAuth={initialAuth} />;
}
