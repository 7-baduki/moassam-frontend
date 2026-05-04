'use client';

import { CopyIcon } from '@/app/assets/icons';
import { Button } from '@/components/common/button/Button';

interface ObservationResultCardProps {
  title: string;
  content: string;
}

export default function ObservationResultCard({ title, content }: ObservationResultCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white px-15 pt-[25.5px] pb-[15.5px]">
      <p className="border-b-[0.5px] border-b-black-400 pb-5 text-base font-semibold text-pink-500">
        {title}
      </p>
      <p className="mt-5 text-sm font-medium text-black">{content}</p>
      <div className="mt-7.5 flex justify-end">
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
