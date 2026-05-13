import BoardDetailBoundary from '@/components/community/board/board-detail/BoardDetailBoundary';

interface MoabangDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function MoabangDetailPage({ params }: MoabangDetailPageProps) {
  const { postId } = await params;

  return <BoardDetailBoundary postId={Number(postId)} title="모아방" />;
}
