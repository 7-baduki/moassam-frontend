import Link from 'next/link';
import { ProgressBar } from '@/components/common/progress-bar/ProgressBar';
import { Tooltip } from '@/components/common/tooltip/Tooltip';
import { cn } from '@/utils/cn';

interface GenerationCountProps {
  balance: number;
  total: number;
  className?: string;
}

export function GenerationCount({ balance, total, className }: GenerationCountProps) {
  const remainingCount = balance;
  const progress = total > 0 ? Math.min(100, Math.max(0, ((total - balance) / total) * 100)) : 0;

  return (
    <section className={cn('flex flex-col gap-3 px-4 md:px-9 xl:px-0', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-black md:text-[18px]">남은 생성 횟수</h2>
        <Link
          href="/observations"
          className="w-32.5 cursor-pointer rounded-lg border border-pink-500 bg-white py-1.5 text-center text-sm font-medium text-pink-500 transition-colors hover:border-pink-600 hover:text-pink-600"
        >
          관찰일지 생성하기
        </Link>
      </div>

      <div className="rounded-[20px] bg-white px-12.5 pt-11.25 pb-12.5">
        <div className="relative pt-10">
          {remainingCount === total || remainingCount === 0 ? (
            <div className="pointer-events-none absolute -top-4 left-1/2 z-200 -translate-x-1/2">
              <div className="rounded-[20px] bg-pink-100 px-3.75 py-1.5 text-xs font-medium whitespace-nowrap text-pink-500 md:text-xs">
                {`${remainingCount}개 남았어요!`}
              </div>
            </div>
          ) : (
            <Tooltip
              label={`${remainingCount}번 더 만들 수 있어요!`}
              className="-top-1.5"
              labelClassName="md:text-xs text-[10px]"
              style={{ left: `${Math.min(Math.max(progress, 5), 95)}%` }}
            />
          )}
          <ProgressBar progress={progress} />
        </div>
      </div>
    </section>
  );
}
