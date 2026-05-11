import { notFound } from 'next/navigation';
import ObservationResultCard from '@/components/observations/ObservationResultCard';
import { Button } from '@/components/common/button/Button';
import { getObservationDetail } from '@/api/observation.server.api';
import { SECTION_TYPE_LABEL } from '@/constants/observations/observation';

interface ObservationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ObservationDetailPage({ params }: ObservationDetailPageProps) {
  const { id } = await params;
  const observation = await getObservationDetail(Number(id));

  if (!observation) return notFound();

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
        <Button size="md">재생성</Button>
      </div>
    </div>
  );
}
