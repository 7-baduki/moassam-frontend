import { notFound } from 'next/navigation';
import BoardDetailBoundary from '@/components/community/board/board-detail/BoardDetailBoundary';

interface MoabangDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function MoabangDetailPage({ params }: MoabangDetailPageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  return <BoardDetailBoundary postId={id} title="모아방" />;
}
