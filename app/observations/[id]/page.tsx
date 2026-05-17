import { notFound } from 'next/navigation';
import ObservationDetailBoundary from '@/components/observations/ObservationDetailBoundary';

interface ObservationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ObservationDetailPage({ params }: ObservationDetailPageProps) {
  const { id } = await params;
  const observationId = Number(id);

  if (Number.isNaN(observationId) || observationId <= 0) notFound();

  return <ObservationDetailBoundary observationId={observationId} />;
}
