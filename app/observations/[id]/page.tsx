import { notFound } from 'next/navigation';
import ObservationBoundary from '@/components/observations/ObservationBoundary';

interface ObservationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ObservationDetailPage({ params }: ObservationDetailPageProps) {
  const { id } = await params;
  const observationId = Number(id);

  if (Number.isNaN(observationId) || observationId <= 0) notFound();

  return <ObservationBoundary observationId={observationId} />;
}
