'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { XIcon, ChevronDownIcon } from '@/app/assets/icons';
import { Select } from '@/components/common/select/Select';
import { SelectBottomSheet } from '@/components/common/bottom-sheet/SelectBottomSheet';
import { Textarea } from '@/components/common/textarea/Textarea';
import { Button } from '@/components/common/button/Button';
import { Dialog } from '@/components/common/dialog/Dialog';
import ObservationLoading from '@/components/observations/ObservationLoading';
import {
  AGE_OPTIONS,
  AREA_OPTIONS,
  SECTION_TYPE_LABEL,
} from '@/constants/observations/observation';
import { useObservationMutation } from '@/hooks/queries/observations';
import { useIsMobile } from '@/hooks/useIsMobile';
import { toast } from '@/utils/toast';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { useUserStore } from '@/stores/userStore';
import { useObservationStore } from '@/stores/observationStore';

export default function ObservationCreateForm() {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const [isPending, startTransition] = useTransition();
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [ageBottomSheetOpen, setAgeBottomSheetOpen] = useState(false);
  const [areaBottomSheetOpen, setAreaBottomSheetOpen] = useState(false);

  const isMobile = useIsMobile();
  const user = useUserStore((state) => state.user);
  const openLoginModal = useLoginModalStore((state) => state.open);
  const setIsGenerating = useObservationStore((state) => state.setIsGenerating);

  useEffect(() => {
    return () => setIsGenerating(false);
  }, [setIsGenerating]);

  const { mutate: createObservation, isPending: isMutating } = useObservationMutation({
    onSuccess: ({ observationId }) => {
      startTransition(() => {
        router.push(`/observations/${observationId}`);
      });
    },
    onError: (error) => {
      setIsGenerating(false);
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
    if (!user) {
      openLoginModal('로그인이 필요해요!', '로그인 후 관찰일지를 생성할 수 있어요');
      return;
    }
    setIsGenerating(true);
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
        <div className="mt-15 mb-5 text-center md:mt-6 md:mb-12.5 xl:mt-0">
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
          className={`w-full max-w-350 rounded-[20px] bg-white px-5 pt-8.75 md:px-12.5 md:pt-11.75 ${selectedTags.length > 0 ? 'pb-8.75' : 'pb-8.75 md:pb-11.75'}`}
        >
          <section className="mb-12.5 xl:mb-5">
            <h2 className="mb-1.5 text-base font-semibold text-black-800 md:mb-5 md:text-lg">
              기본정보
            </h2>
            <div className="flex flex-col gap-5 md:flex-row md:gap-15">
              {isMobile ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAgeBottomSheetOpen(true)}
                    className="flex w-full items-center justify-between rounded-lg border border-black-300 p-2.5 text-sm font-medium text-black-800"
                  >
                    <span>연령</span>
                    <ChevronDownIcon width={20} height={20} className="shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAreaBottomSheetOpen(true)}
                    className="flex w-full items-center justify-between rounded-lg border border-black-300 p-2.5 text-sm font-medium text-black-800"
                  >
                    <span className="flex items-center gap-1">
                      5개 영역
                      <span className="text-xs font-medium text-black-500">중복선택 가능</span>
                    </span>
                    <ChevronDownIcon width={20} height={20} className="shrink-0" />
                  </button>
                  <SelectBottomSheet
                    open={ageBottomSheetOpen}
                    onOpenChange={setAgeBottomSheetOpen}
                    title="연령"
                    options={AGE_OPTIONS}
                    value={age}
                    onChange={setAge}
                    onConfirm={() => setAgeBottomSheetOpen(false)}
                  />
                  <SelectBottomSheet
                    multiple
                    open={areaBottomSheetOpen}
                    onOpenChange={setAreaBottomSheetOpen}
                    title="5개 영역"
                    description="중복선택 가능"
                    options={AREA_OPTIONS}
                    value={areas}
                    onChange={setAreas}
                    onConfirm={() => setAreaBottomSheetOpen(false)}
                  />
                </>
              ) : (
                <>
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
                    triggerDescription="중복선택 가능"
                    value={areas}
                    onChange={setAreas}
                    className="w-full md:w-90"
                  />
                </>
              )}
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
