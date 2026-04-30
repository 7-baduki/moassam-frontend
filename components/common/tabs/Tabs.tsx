'use client';

import { cn } from '@/utils/cn';

export interface TabOption {
  label: string;
  value: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Tabs({ options, value, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex items-center gap-5', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'typo-line-m2 flex h-full items-center border-b-2 text-sm transition-colors',
            value === option.value
              ? 'border-pink-500 font-semibold text-pink-500'
              : 'border-transparent font-medium text-black-700',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
