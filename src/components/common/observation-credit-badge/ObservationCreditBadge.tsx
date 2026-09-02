import Image from 'next/image';
import { HeroBadge } from '@/app/assets/images';

interface ObservationCreditBadgeProps {
  remainingCount: number;
}

export function ObservationCreditBadge({ remainingCount }: ObservationCreditBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-[30px] border border-yellow-600 bg-yellow-200 py-0.5 pr-3 pl-1 shadow-[2px_2px_8px_0px_#00000014] md:py-1">
      <Image
        src={HeroBadge}
        alt=""
        width={24}
        height={24}
        className="h-5 w-5 shrink-0 md:h-6 md:w-6"
      />
      <span className="typo-line-m2 text-[11px] font-semibold whitespace-nowrap text-black-800 md:text-xs">
        오늘 생성횟수 {remainingCount}개 남았어요!
      </span>
    </div>
  );
}
