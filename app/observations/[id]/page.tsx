'use client';

import { use } from 'react';
import ObservationResultCard from '@/components/observations/ObservationResultCard';
import ObservationLoading from '@/components/observations/ObservationLoading';
import { Button } from '@/components/common/button/Button';
import { SECTION_TYPE_LABEL } from '@/constants/observations/observation';
import {
  useObservationItemQuery,
  useObservationRegenerateMutation,
} from '@/hooks/queries/observations/useObservation';

interface ObservationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ObservationDetailPage({ params }: ObservationDetailPageProps) {
  const { id } = use(params);
  const observationId = Number(id);

  const { data: observation, refetch } = useObservationItemQuery(observationId);
  const { mutate: regenerate, isPending } = useObservationRegenerateMutation({
    onSuccess: () => refetch(),
  });

  if (isPending) return <ObservationLoading />;
  if (!observation) return null;

  const items = [
    { title: '총평', content: observation.summary },
    ...observation.sections.map((section) => ({
      title: SECTION_TYPE_LABEL[section.sectionType] ?? section.sectionType,
      content: section.content,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <ObservationResultCard key={item.title} title={item.title} content={item.content} />
        ))}
      </div>
      <div className="flex justify-end py-15">
        <Button size="md" onClick={() => regenerate(observationId)}>
          재생성
        </Button>
      </div>
    </div>
  );
}
