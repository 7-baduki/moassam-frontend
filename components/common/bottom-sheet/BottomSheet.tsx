'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { XIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import type { BottomSheetProps } from './bottom-sheet.type';

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: BottomSheetProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="overlay fixed inset-0 z-900" />
        <RadixDialog.Content
          className={cn(
            'fixed right-0 bottom-0 left-0 z-1000',
            'flex flex-col rounded-t-[20px] bg-white',
            'focus:outline-none',
          )}
        >
          <div className="flex items-center justify-between border-b border-black-200 px-4 py-5">
            <div className="flex items-center gap-2">
              <RadixDialog.Title className="text-[15px] font-semibold text-black-800">
                {title}
              </RadixDialog.Title>
              {description && (
                <RadixDialog.Description className="text-[13px] font-medium text-black-500">
                  {description}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close className="cursor-pointer text-black-500 outline-none focus-visible:ring-2 focus-visible:ring-black-400">
              <XIcon width={20} height={20} />
            </RadixDialog.Close>
          </div>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
