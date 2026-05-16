import Image from 'next/image';
import { HeroBadge } from '@/app/assets/images';

interface ObservationCreditBadgeProps {
  remainingCount: number;
}

export function ObservationCreditBadge({ remainingCount }: ObservationCreditBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-[30px] border border-yellow-600 bg-yellow-200 py-1 pr-3 pl-1 shadow-[2px_2px_8px_0px_#00000014]">
      <Image src={HeroBadge} alt="" width={24} height={24} />
      <span className="text-xs font-semibold text-black-800">
        오늘 생성횟수 {remainingCount}개 남았어요!
      </span>
    </div>
  );
}
