'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';
import type { TextareaProps } from './textarea.type';

export function Textarea({ action, maxLength, className, onChange, ...props }: TextareaProps) {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-pink-500',
        className,
      )}
    >
      <textarea
        maxLength={maxLength}
        onChange={handleChange}
        className="w-full resize-none bg-transparent p-4 text-sm font-medium text-black-800 placeholder:text-black-600 focus:outline-none"
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
