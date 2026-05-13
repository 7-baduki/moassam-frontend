import BoardDetailBoundary from '@/components/community/board/board-detail/BoardDetailBoundary';

interface BoardDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { postId } = await params;

  return <BoardDetailBoundary postId={Number(postId)} title="자유게시판" />;
}
