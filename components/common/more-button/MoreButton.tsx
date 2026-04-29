'use client';

import { useEffect, useRef, useState } from 'react';
import MoreDotIcon from '@/app/assets/icons/MoreDotIcon.svg';
import { cn } from '@/utils/cn';
import { DropdownItem } from './DropdownItem';

interface MoreButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export function MoreButton({ onEdit, onDelete, className }: MoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleEditClick() {
    onEdit();
    setIsOpen(false);
  }

  function handleDeleteClick() {
    onDelete();
    setIsOpen(false);
  }

  return (
    <div ref={ref} className={cn('relative w-fit', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="더보기"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center justify-center"
      >
        <MoreDotIcon aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.75 w-25 overflow-hidden rounded-2xl border border-black-200 bg-white py-2 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            onClick={handleEditClick}
            className="w-full cursor-pointer hover:bg-black-100"
          >
            <DropdownItem label="수정" />
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="w-full cursor-pointer hover:bg-black-100"
          >
            <DropdownItem label="삭제" />
          </button>
        </div>
      )}
    </div>
  );
}
