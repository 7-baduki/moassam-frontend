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
      <Image src={EmptyMascot} alt="" width={206} height={247} />
      <div className="flex flex-col items-center gap-2">
        <p className="text-[20px] font-semibold text-black-600">{message}</p>
        {description && <p className="text-base font-medium text-black-400">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button size="lg" className="py-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
