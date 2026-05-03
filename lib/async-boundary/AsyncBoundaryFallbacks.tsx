import Image from 'next/image';

import { Button } from '@/components/common/button/Button';
import ErrorMascot from '@/app/assets/images/error-mascot.png';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-7.5 w-7.5 animate-spin rounded-full border-3 border-pink-50 border-t-pink-500" />
    </div>
  );
}

type ErrorFallbackProps = {
  error: Error & { response?: { data?: { detail?: string } } };
  actionLabel: string;
  onAction: () => void;
};

export function ErrorFallback({ error, actionLabel, onAction }: ErrorFallbackProps) {
  const errorMessage = error.response?.data?.detail ?? error.message;

  return (
    <div className="flex flex-col items-center gap-4.5 pt-7.5">
      <Image src={ErrorMascot} alt="에러 마스코트" width={280} height={309} />
      <div className="flex w-52.5 flex-col items-center gap-4.5">
        <div className="flex flex-col items-center gap-2 px-2 text-center">
          <p className="text-xl font-semibold text-black">페이지를 찾을 수 없어요</p>
          <p className="text-sm text-black-500">{errorMessage}</p>
        </div>
        <Button size="full" className="bg-green-500 hover:bg-green-700" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
