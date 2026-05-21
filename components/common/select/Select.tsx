'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon, ChevronDownIcon } from '@/app/assets/icons';
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
  const {
    size = 'sm',
    options,
    triggerLabel = '',
    triggerDescription,
    className,
    fixedMenu = false,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
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

  useEffect(() => {
    if (fixedMenu && isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMenuStyle({ top: rect.bottom, left: rect.left, width: rect.width });
    }
  }, [fixedMenu, isOpen]);

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
      setIsOpen(false);
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
          'flex w-full cursor-pointer items-center gap-1 p-2.5 text-sm font-medium text-black-800 outline-none focus-visible:ring-2 focus-visible:ring-black-400',
          TRIGGER_STYLES[size],
          isOpen && size === 'md' && 'rounded-b-none',
        )}
      >
        <span className="flex items-center gap-1">
          {getTriggerLabel()}
          {triggerDescription && (
            <span className="text-xs font-medium text-black-500">{triggerDescription}</span>
          )}
        </span>
        <ChevronDownIcon
          width={iconSize}
          height={iconSize}
          className={cn('shrink-0 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')}
        />
      </button>

      {isOpen &&
        (() => {
          const menuItems = (
            <ul
              className={cn(
                'z-100 w-full bg-white',
                fixedMenu ? 'fixed' : 'absolute top-full',
                size === 'md'
                  ? 'border-x border-b border-black-300 py-2.5'
                  : 'rounded-b-lg [box-shadow:0_1px_8px_0_rgba(0,0,0,0.04)]',
              )}
              style={
                fixedMenu
                  ? { top: menuStyle.top, left: menuStyle.left, width: menuStyle.width }
                  : undefined
              }
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
          );
          return fixedMenu ? createPortal(menuItems, document.body) : menuItems;
        })()}
    </div>
  );
}
