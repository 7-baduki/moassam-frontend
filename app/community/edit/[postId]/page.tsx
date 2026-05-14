import EditBoundary from '@/components/community/edit/EditBoundary';

interface EditPageProps {
  params: Promise<{ postId: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { postId } = await params;

  return <EditBoundary postId={Number(postId)} />;
}
