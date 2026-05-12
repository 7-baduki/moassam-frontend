'use client';

import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreDotIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import { DropdownItem } from './DropdownItem';

interface MoreButtonProps {
  onEdit?: () => void;
  onDelete: () => void;
  className?: string;
}

export function MoreButton({ onEdit, onDelete, className }: MoreButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <div className={cn(className, open && 'visible')}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label="더보기"
            className="flex cursor-pointer items-center justify-center"
          >
            <MoreDotIcon aria-hidden="true" />
          </button>
        </DropdownMenu.Trigger>
      </div>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-100 w-25 overflow-hidden rounded-2xl border border-black-200 bg-white py-2 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)]"
        >
          {onEdit && (
            <DropdownMenu.Item asChild onSelect={onEdit}>
              <button
                type="button"
                className="w-full cursor-pointer outline-none hover:bg-black-100"
              >
                <DropdownItem label="수정" />
              </button>
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Item asChild onSelect={onDelete}>
            <button type="button" className="w-full cursor-pointer outline-none hover:bg-black-100">
              <DropdownItem label="삭제" />
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
