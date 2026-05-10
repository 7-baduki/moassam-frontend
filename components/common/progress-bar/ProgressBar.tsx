'use client';

import * as RadixProgress from '@radix-ui/react-progress';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <RadixProgress.Root
      value={clamped}
      className={cn('h-6 w-full overflow-hidden rounded-3xl bg-black-200', className)}
    >
      <RadixProgress.Indicator
        className="h-full rounded-3xl bg-pink-200 transition-all duration-300"
        style={{ transform: `translateX(-${100 - clamped}%)` }}
      />
    </RadixProgress.Root>
  );
}
