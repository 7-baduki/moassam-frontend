'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { XIcon } from '@/app/assets/icons';
import { Select } from '@/components/common/select/Select';
import { Textarea } from '@/components/common/textarea/Textarea';
import { Button } from '@/components/common/button/Button';
import { Dialog } from '@/components/common/dialog/Dialog';
import ObservationLoading from '@/components/observations/ObservationLoading';
import {
  AGE_OPTIONS,
  AREA_OPTIONS,
  SECTION_TYPE_LABEL,
} from '@/constants/observations/observation';
import { useObservationMutation } from '@/hooks/queries/observations/useObservation';
import { toast } from '@/utils/toast';

export default function ObservationCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [age, setAge] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const [isPending, startTransition] = useTransition();
  const [showCreditDialog, setShowCreditDialog] = useState(false);

  const { mutate: createObservation, isPending: isMutating } = useObservationMutation({
    onSuccess: ({ observationId }) => {
      queryClient.invalidateQueries({ queryKey: ['observations'] });
      startTransition(() => {
        router.push(`/observations/${observationId}`);
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.code === 'CREDIT_NOT_ENOUGH') {
        setShowCreditDialog(true);
      } else if (!(error as { isHandled?: boolean }).isHandled) {
        toast.error({
          title: '관찰일지 생성에 실패했어요',
          description: '잠시 후 다시 시도해주세요',
        });
      }
    },
  });

  const isFormValid = !!age && areas.length > 0 && content.trim().length > 0;

  const selectedTags = [
    ...(age
      ? [
          {
            key: `age-${age}`,
            label: `연령>${AGE_OPTIONS.find((o) => o.value === age)?.label ?? age}`,
            onRemove: () => setAge(''),
          },
        ]
      : []),
    ...areas.map((area) => ({
      key: `area-${area}`,
      label: `5개 영역>${SECTION_TYPE_LABEL[area] ?? area}`,
      onRemove: () => setAreas((prev) => prev.filter((a) => a !== area)),
    })),
  ];

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
        <div className="mb-5 text-center md:mb-12.5">
          <h1 className="text-base font-semibold text-black md:text-xl">
            관찰일지를
            <br className="md:hidden" />
            완성해보세요!
          </h1>
          <p className="mt-5 text-sm font-medium text-black md:mt-0.5 md:text-sm">
            간단한 입력으로 영유아의 행동을 기록할 수 있어요
          </p>
        </div>

        <h2 className="mb-5 hidden w-full max-w-350 font-semibold text-black md:block md:text-lg">
          관찰일지 맞춤 검색
        </h2>

        <div
          className={`w-full max-w-350 rounded-[20px] bg-white px-12.5 pt-11.75 ${selectedTags.length > 0 ? 'pb-5' : 'pb-11.75'}`}
        >
          <section className="mb-12.5 xl:mb-5">
            <h2 className="mb-1.5 text-base font-semibold text-black-800 md:mb-5 md:text-lg">
              기본정보
            </h2>
            <div className="flex flex-col gap-5 md:flex-row md:gap-15">
              <Select
                size="md"
                options={AGE_OPTIONS}
                triggerLabel="연령"
                value={age}
                onChange={setAge}
                className="w-full md:w-90"
              />
              <Select
                multiple
                size="md"
                options={AREA_OPTIONS}
                triggerLabel="5개 영역"
                value={areas}
                onChange={setAreas}
                className="w-full md:w-90"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-1.5 text-base font-semibold text-black-800 md:mb-5 md:text-lg">
              관찰상황 입력
            </h2>
            <Textarea
              placeholder="영유아의 행동이나 상황을 구체적인 문장으로 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-[14px] md:text-sm"
              action={
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  className="md:w-35 md:py-2 md:text-base"
                  disabled={!isFormValid || isMutating || isPending}
                >
                  생성하기
                </Button>
              }
            />
          </section>
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-5">
              {selectedTags.map((tag) => (
                <span
                  key={tag.key}
                  className="flex items-center gap-px rounded-[20px] bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-500 md:gap-2.5 md:px-3.5 md:py-2"
                >
                  {tag.label}
                  <button
                    type="button"
                    onClick={tag.onRemove}
                    aria-label={`${tag.label} 제거`}
                    className="cursor-pointer"
                  >
                    <XIcon width={18} height={18} className="text-pink-900 md:hidden" />
                    <XIcon width={20} height={20} className="hidden text-pink-900 md:block" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
