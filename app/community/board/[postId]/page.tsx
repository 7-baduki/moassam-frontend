import BoardDetailSection from '@/components/community/board/board-detail/BoardDetailSection';

interface BoardDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { postId } = await params;

  return <BoardDetailSection postId={postId} />;
}
