import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ObservationDetailBoundary from '@/components/observations/ObservationDetailBoundary';

export const metadata: Metadata = {
  title: '관찰일지 상세',
};

interface ObservationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ObservationDetailPage({ params }: ObservationDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <ObservationDetailPageContent params={params} />
    </Suspense>
  );
}

async function ObservationDetailPageContent({ params }: ObservationDetailPageProps) {
  const { id } = await params;
  const observationId = Number(id);

  if (Number.isNaN(observationId) || observationId <= 0) notFound();

  return <ObservationDetailBoundary observationId={observationId} />;
}
