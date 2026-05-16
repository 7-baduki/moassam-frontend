'use client';

import { CopyIcon } from '@/app/assets/icons';
import { Button } from '@/components/common/button/Button';
import { toast } from '@/utils/toast';

interface ObservationResultCardProps {
  title: string;
  content: string;
}

export default function ObservationResultCard({ title, content }: ObservationResultCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success({ title: '복사 완료', description: '클립보드에 저장되었어요' });
    } catch {
      toast.error({ title: '복사 실패', description: '잠시 후 다시 시도해주세요' });
    }
  };

  return (
    <div className="animate-lift flex flex-col rounded-2xl bg-white px-5 py-2.25 md:px-7.5 md:py-2.5 xl:px-15 xl:pt-[25.5px] xl:pb-[15.5px]">
      <p className="border-b-[0.5px] border-b-black-400 pb-5 text-sm font-semibold text-pink-500 md:text-base">
        {title}
      </p>
      <p className="mt-5 text-sm font-medium text-black">{content}</p>
      <div className="mt-2.5 flex justify-end md:mt-7.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          aria-label="복사"
          className="flex w-auto items-center gap-1"
        >
          <CopyIcon />
          복사
        </Button>
      </div>
    </div>
  );
}
