'use client';

import { useState } from 'react';
import { BackArrowIcon } from '@/app/assets/icons';
import { Input } from '@/components/common/input/Input';

interface CommunitySearchOverlayProps {
  onClose: () => void;
  onSearch: (keyword: string) => void;
}

export default function CommunitySearchOverlay({ onClose, onSearch }: CommunitySearchOverlayProps) {
  const [value, setValue] = useState('');

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(value.trim());
    }
  }

  return (
    <div className="fixed inset-0 z-1000 flex flex-col bg-white pt-16 md:hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center"
        >
          <BackArrowIcon className="" />
        </button>
        <div className="flex-1">
          <Input
            variant="search"
            size="full"
            autoFocus
            aria-label="게시글 검색"
            placeholder="검색"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue('')}
            onKeyDown={handleKeyDown}
            className="h-9 text-sm"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center text-sm text-black-500">
        궁금한 키워드를
        <br />
        입력해보세요
      </div>
    </div>
  );
}
