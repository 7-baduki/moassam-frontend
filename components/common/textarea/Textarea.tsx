'use client';

import { cn } from '@/utils/cn';
import type { TextareaProps } from './textarea.type';

export function Textarea({ action, maxLength, className, onChange, ...props }: TextareaProps) {
  const charCount = typeof props.value === 'string' ? props.value.length : 0;

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-pink-500',
        className,
      )}
    >
      <textarea
        maxLength={maxLength}
        onChange={onChange}
        className="w-full resize-none bg-transparent p-4 text-base font-medium text-black-800 placeholder:text-black-600 focus:outline-none"
        {...props}
      />
      <div className="flex items-center justify-end gap-3 p-4">
        {maxLength !== undefined && (
          <span className="text-xs font-medium text-black-500">
            {charCount}/{maxLength}
          </span>
        )}
        {action}
      </div>
    </div>
  );
}
