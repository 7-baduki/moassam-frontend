'use client';

import { CheckIcon } from '@/app/assets/icons';
import { Button } from '@/components/common/button/Button';
import { cn } from '@/utils/cn';
import { BottomSheet } from './BottomSheet';
import type { SelectBottomSheetProps } from './bottom-sheet.type';

export function SelectBottomSheet(props: SelectBottomSheetProps) {
  const { open, onOpenChange, title, description, options, onConfirm } = props;

  function isSelected(optionValue: string): boolean {
    if (props.multiple) return (props.value ?? []).includes(optionValue);
    return props.value === optionValue;
  }

  function handleOptionClick(optionValue: string) {
    if (props.multiple) {
      const current = props.value ?? [];
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];
      props.onChange?.(next);
    } else {
      props.onChange?.(optionValue);
    }
  }

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title={title} description={description}>
      <ul className="max-h-[50vh] overflow-y-auto">
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between px-4 py-4 text-sm font-medium text-black-700 transition-colors',
                  selected ? 'bg-black-200' : 'bg-white',
                )}
              >
                <span>{option.label}</span>
                {selected && <CheckIcon width={20} height={20} className="shrink-0" />}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-5">
        <Button size="full" className="py-4" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
