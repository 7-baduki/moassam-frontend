import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import EditBoundary from '@/components/community/edit/EditBoundary';

export const metadata: Metadata = {
  title: '게시글 수정',
};

interface EditPageProps {
  params: Promise<{ postId: string }>;
}

export default function EditPage({ params }: EditPageProps) {
  return (
    <Suspense fallback={null}>
      <EditPageContent params={params} />
    </Suspense>
  );
}

async function EditPageContent({ params }: EditPageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  return <EditBoundary postId={id} />;
}
