'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Select } from '@/components/common/select/Select';
import { Textarea } from '@/components/common/textarea/Textarea';
import { Button } from '@/components/common/button/Button';
import { Dialog } from '@/components/common/dialog/Dialog';
import ObservationLoading from '@/components/observations/ObservationLoading';
import { AGE_OPTIONS, AREA_OPTIONS } from '@/constants/observations/observation';
import { useObservationMutation } from '@/hooks/queries/observations/useObservation';

export default function ObservationCreateForm() {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const [isPending, startTransition] = useTransition();
  const [showCreditDialog, setShowCreditDialog] = useState(false);

  const { mutate: createObservation, isPending: isMutating } = useObservationMutation({
    onSuccess: ({ observationId }) => {
      startTransition(() => {
        router.push(`/observations/${observationId}`);
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.code === 'CREDIT_NOT_ENOUGH') {
        setShowCreditDialog(true);
      }
    },
  });

  const isFormValid = !!age && areas.length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    createObservation({ age, sectionTypes: areas, situation: content });
  };

  if (isMutating || isPending) return <ObservationLoading />;

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
      <div className="flex flex-col items-center">
        <div className="mb-12.5 text-center">
          <h1 className="text-xl font-semibold text-black">관찰일지를 완성해보세요!</h1>
          <p className="mt-0.5 text-sm font-medium text-black">
            간단한 입력으로 영유아의 행동을 기록할 수 있어요
          </p>
        </div>

        <h2 className="mb-5 w-full max-w-350 text-lg font-semibold text-black">
          관찰일지 맞춤 검색
        </h2>

        <div className="w-full max-w-350 rounded-[20px] bg-white px-12.5 py-11.75">
          <section className="mb-5">
            <h2 className="mb-5 text-lg font-semibold text-black-800">기본정보</h2>
            <div className="flex gap-15">
              <Select
                size="md"
                options={AGE_OPTIONS}
                triggerLabel="연령"
                value={age}
                onChange={setAge}
              />
              <Select
                multiple
                size="md"
                options={AREA_OPTIONS}
                triggerLabel="5개 영역"
                value={areas}
                onChange={setAreas}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-lg font-semibold text-black-800">관찰상황 입력</h2>
            <Textarea
              placeholder="영유아의 행동이나 상황을 구체적인 문장으로 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              action={
                <Button
                  size="md"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isMutating || isPending}
                >
                  생성하기
                </Button>
              }
            />
          </section>
        </div>
      </div>
    </>
  );
}
