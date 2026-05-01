'use client';

import { useState } from 'react';
import { SearchIcon, XCircleIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import type { InputProps } from './input.type';

const SIZE_STYLES = {
  sm: 'w-50',
  full: 'w-full',
};

export function Input({
  variant = 'default',
  size = 'full',
  value,
  onChange,
  onClear,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showClearButton = isFocused && !!value;

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClear?.();
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border py-2 pr-3 pl-4 transition-colors',
        isFocused ? 'border-pink-500 bg-white' : 'border-black-300',
        SIZE_STYLES[size],
        className,
      )}
    >
      {variant === 'search' && (
        <SearchIcon
          className={cn('h-4 w-4 shrink-0', isFocused ? 'text-black-700' : 'text-black-500')}
          aria-hidden
        />
      )}
      <input
        className={cn(
          'min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-black-600',
          isFocused ? 'text-black-800' : 'text-black-600',
        )}
        value={value ?? ''}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {showClearButton && (
        <button
          type="button"
          aria-label="입력 초기화"
          onMouseDown={handleClear}
          className="shrink-0"
        >
          <XCircleIcon className="h-3 w-3" aria-hidden />
        </button>
      )}
    </div>
  );
}
