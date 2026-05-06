import Link from 'next/link';
import { ProgressBar } from '@/components/common/progress-bar/ProgressBar';
import { Tooltip } from '@/components/common/tooltip/Tooltip';
import { cn } from '@/utils/cn';

interface GenerationCountProps {
  used: number;
  total: number;
  className?: string;
}

export function GenerationCount({ used, total, className }: GenerationCountProps) {
  const remainingCount = total - used;
  const progress = (used / total) * 100;

  return (
    <section className={cn('flex flex-col gap-2.75', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-black">남은 생성 횟수</h2>
        <Link
          href="/observations"
          className="w-32.5 cursor-pointer rounded-lg border border-pink-500 bg-white py-1.5 text-center text-sm font-medium text-pink-500 transition-colors hover:border-pink-600 hover:text-pink-600"
        >
          관찰일지 생성하기
        </Link>
      </div>

      <div className="rounded-[20px] bg-white px-12.5 pt-5.75 pb-4.5">
        <div className="relative pt-10">
          {remainingCount > 0 && (
            <Tooltip
              label={`${remainingCount}번 더 만들 수 있어요!`}
              className="-top-1.5"
              style={{ left: `${progress}%` }}
            />
          )}
          <ProgressBar progress={progress} />
        </div>
        <p className="pt-4.5 text-right text-xs font-medium text-black-500">
          {used}/{total}회 사용
        </p>
      </div>
    </section>
  );
}
