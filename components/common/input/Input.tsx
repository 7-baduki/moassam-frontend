'use client';

import { useRef, useState } from 'react';
import { SearchIcon, XCircleIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import type { InputProps } from './input.type';

const SIZE_STYLES = {
  sm: 'w-50 h-8 text-xs',
  full: 'w-full h-11 text-base',
};

export function Input({
  variant = 'default',
  size = 'full',
  value,
  onChange,
  onClear,
  onFocus,
  onBlur,
  className,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const showClearButton = isFocused && !!value;

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
      onBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      onBlur={handleBlur}
      className={cn(
        'flex items-center gap-2 rounded-lg border pr-3 pl-4 transition-colors',
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
          'min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:text-black-600',
          isFocused ? 'text-black-800' : 'text-black-600',
        )}
        ref={inputRef}
        value={value ?? ''}
        onChange={onChange}
        onFocus={handleFocus}
        {...props}
      />
      {showClearButton && (
        <button
          type="button"
          aria-label="입력 초기화"
          onMouseDown={handleClear}
          onClick={handleClear}
          className="shrink-0"
        >
          <XCircleIcon className={cn(size === 'full' ? 'h-4.5 w-4.5' : 'h-3 w-3')} aria-hidden />
        </button>
      )}
    </div>
  );
}
