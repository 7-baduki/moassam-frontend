import BoardDetailSection from '@/components/community/board/board-detail/BoardDetailSection';

interface MoabangDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function MoabangDetailPage({ params }: MoabangDetailPageProps) {
  const { postId } = await params;

  return <BoardDetailSection postId={postId} title="모아방" />;
}
