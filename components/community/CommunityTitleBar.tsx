'use client';

import { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';

interface CommunityTitleBarProps {
  title: string;
  description: string;
  onWrite?: () => void;
}

export default function CommunityTitleBar({ title, description, onWrite }: CommunityTitleBarProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-3 py-[10.5px]">
        <h2 className="typo-line-m2 text-lg font-semibold text-black-800">{title}</h2>
        <p className="typo-line-m4 text-sm font-medium text-black-600">{description}</p>
      </div>
      <div className="flex items-center gap-3 py-[7.5px]">
        <Input
          variant="search"
          size="sm"
          aria-label="게시글 검색"
          placeholder="검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
        />
        <Button size="sm" onClick={onWrite}>
          새글쓰기
        </Button>
      </div>
    </div>
  );
}
