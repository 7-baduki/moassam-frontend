import { Button } from '@/components/common/button/Button';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-7.5 w-7.5 animate-spin rounded-full border-3 border-pink-50 border-t-pink-500" />
    </div>
  );
}

type ErrorFallbackProps = {
  error: Error;
  reset: () => void;
};

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p className="text-sm font-medium text-black-500">{error.message}</p>
      <Button size="sm" className="bg-green-500" onClick={reset}>
        재시도
      </Button>
    </div>
  );
}
