'use client';

import { useEffect, useRef, useState } from 'react';
import CheckIcon from '@/app/assets/icons/CheckIcon.svg';
import ChevronDownIcon from '@/app/assets/icons/ChevronDownIcon.svg';
import { cn } from '@/utils/cn';
import type { SelectProps, SelectSize } from './select.type';

const SIZE_STYLES: Record<SelectSize, string> = {
  sm: 'w-25',
  md: 'w-90',
};

const TRIGGER_STYLES: Record<SelectSize, string> = {
  sm: 'justify-end',
  md: 'justify-between rounded-lg border border-black-300',
};

const ICON_SIZE: Record<SelectSize, number> = {
  sm: 16,
  md: 20,
};

export function Select(props: SelectProps) {
  const { size = 'sm', options, triggerLabel = '', className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconSize = ICON_SIZE[size];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function isSelected(optionValue: string): boolean {
    if (props.multiple) return (props.value ?? []).includes(optionValue);
    return props.value === optionValue;
  }

  function handleOptionClick(optionValue: string) {
    if (props.multiple) {
      const current = props.value ?? [];
      const next = current.includes(optionValue)
        ? current.filter((value) => value !== optionValue)
        : [...current, optionValue];
      props.onChange?.(next);
    } else {
      props.onChange?.(optionValue);
      if (size === 'sm') setIsOpen(false);
    }
  }

  function getTriggerLabel(): string {
    if (size === 'md') return triggerLabel;
    const selectedOption = options.find((option) => option.value === props.value);
    return selectedOption?.label ?? triggerLabel;
  }

  return (
    <div ref={containerRef} className={cn('relative', SIZE_STYLES[size], className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-full cursor-pointer items-center gap-1 p-2.5 text-sm font-medium text-black-800 outline-none',
          TRIGGER_STYLES[size],
          isOpen && size === 'md' && 'rounded-b-none',
        )}
      >
        <span>{getTriggerLabel()}</span>
        <ChevronDownIcon
          width={iconSize}
          height={iconSize}
          className={cn('shrink-0 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')}
        />
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute top-full z-100 w-full bg-white',
            size === 'md'
              ? 'border-x border-b border-black-300'
              : 'rounded-b-lg [box-shadow:0_1px_8px_0_rgba(0,0,0,0.04)]',
          )}
        >
          {options.map((option, index) => {
            const selected = isSelected(option.value);
            const isLast = index === options.length - 1;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-1 p-2.5 text-sm font-medium text-black-700 transition-colors hover:bg-black-100',
                    selected ? 'bg-black-200' : 'bg-white',
                    size === 'sm'
                      ? selected
                        ? 'justify-end'
                        : 'justify-center'
                      : 'justify-between',
                    size === 'sm' && isLast && 'rounded-b-lg',
                  )}
                >
                  <span>{option.label}</span>
                  {selected && (
                    <CheckIcon width={iconSize} height={iconSize} className="shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
