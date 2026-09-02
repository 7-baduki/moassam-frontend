import Image from 'next/image';

import { Button } from '@/components/common/button/Button';
import Spinner from '@/components/common/spinner/Spinner';
import ErrorMascot from '@/app/assets/images/error-mascot.png';
import LoadingMascot from '@/app/assets/images/loading-mascot.png';

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      <Image
        src={LoadingMascot}
        alt="로딩 마스코트"
        className="mb-3 h-auto w-32 md:w-51.5"
        width={206}
        height={227}
      />
      <p className="mb-7.75 text-base font-semibold text-black md:text-xl">잠시만 기다려 주세요</p>
      <Spinner />
    </div>
  );
}

type ErrorFallbackProps = {
  error: Error & { response?: { data?: { detail?: string } } };
  actionLabel: string;
  onAction: () => void;
  title?: string;
  description?: string;
  className?: string;
};

export function ErrorFallback({
  error,
  actionLabel,
  onAction,
  title,
  description,
  className,
}: ErrorFallbackProps) {
  const resolvedTitle = title ?? '문제가 발생했어요';
  const resolvedDescription = description ?? error.response?.data?.detail ?? error.message;

  return (
    <div className={`flex flex-col items-center gap-4.5 ${className ?? ''}`}>
      <Image
        src={ErrorMascot}
        alt="에러 마스코트"
        width={206}
        height={227}
        className="h-auto w-32 md:w-51.5"
      />
      <div className="flex w-52.5 flex-col items-center gap-4.5">
        <div className="flex flex-col items-center gap-2 px-2 text-center">
          <p className="text-base font-semibold text-black md:text-xl">{resolvedTitle}</p>
          <p className="text-xs text-black-500 md:text-sm">{resolvedDescription}</p>
        </div>
        <Button size="full" className="bg-green-500 hover:bg-green-700" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
