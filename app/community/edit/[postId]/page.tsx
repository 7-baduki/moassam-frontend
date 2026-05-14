import { notFound } from 'next/navigation';
import EditBoundary from '@/components/community/edit/EditBoundary';

interface EditPageProps {
  params: Promise<{ postId: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  return <EditBoundary postId={id} />;
}
