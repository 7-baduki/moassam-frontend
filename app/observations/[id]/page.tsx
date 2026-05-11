import ObservationBoundary from '@/components/observations/ObservationBoundary';

interface ObservationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ObservationDetailPage({ params }: ObservationDetailPageProps) {
  const { id } = await params;
  const observationId = Number(id);

  return <ObservationBoundary observationId={observationId} />;
}
