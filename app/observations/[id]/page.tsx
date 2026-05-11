'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ObservationResultCard from '@/components/observations/ObservationResultCard';
import ObservationLoading from '@/components/observations/ObservationLoading';
import { Button } from '@/components/common/button/Button';
import { Dialog } from '@/components/common/dialog/Dialog';
import { SECTION_TYPE_LABEL } from '@/constants/observations/observation';
import { toast } from '@/utils/toast';
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
  const router = useRouter();
  const [showCreditDialog, setShowCreditDialog] = useState(false);

  const { data: observation, isLoading, refetch } = useObservationItemQuery(observationId);
  const { mutate: regenerate, isPending } = useObservationRegenerateMutation({
    onSuccess: () => refetch(),
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.code === 'CREDIT_NOT_ENOUGH') {
        setShowCreditDialog(true);
      } else {
        toast.error({
          title: '관찰일지 재생성에 실패했어요',
          description: '잠시 후 다시 시도해주세요',
        });
      }
    },
  });

  if (isLoading || isPending) return <ObservationLoading />;
  if (!observation) return null;

  const items = [
    { title: '총평', content: observation.summary },
    ...observation.sections.map((section) => ({
      title: SECTION_TYPE_LABEL[section.sectionType] ?? section.sectionType,
      content: section.content,
    })),
  ];

  return (
    <>
      <Dialog
        open={showCreditDialog}
        onOpenChange={setShowCreditDialog}
        iconType="lock"
        title="오늘 생성 횟수를 모두 사용했어요"
        description="내일 다시 이용하거나 커뮤니티 게시글을 작성해 횟수를 추가할 수 있어요"
        buttons={[
          {
            children: '취소',
            variant: 'outline',
            onClick: () => setShowCreditDialog(false),
          },
          {
            children: '커뮤니티로 이동',
            onClick: () => router.push('/community/moabang'),
          },
        ]}
      />
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
    </>
  );
}
