import Image from 'next/image';
import { EmptyMascot } from '@/app/assets/images';
import { Button } from '@/components/common/button/Button';

interface EmptyStateProps {
  message: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ message, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <Image src={EmptyMascot} alt="" width={206} height={227} className="h-auto w-32 md:w-51.5" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-base font-semibold text-black-600 md:text-[20px]">{message}</p>
        {description && (
          <p className="text-sm font-medium text-black-400 md:text-base">{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button size="lg" className="py-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
