'use client';

import { type ReactNode, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';

interface CommunityTitleBarProps {
  title: string;
  onWrite?: () => void;
  writeLabel?: string;
  hideSearch?: boolean;
  writeDisabled?: boolean;
  actions?: ReactNode;
  onSearch?: (keyword: string) => void;
}

export default function CommunityTitleBar({
  title,
  onWrite,
  writeLabel = '새글작성',
  hideSearch = false,
  writeDisabled = false,
  actions,
  onSearch,
}: CommunityTitleBarProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleSearchClear() {
    setSearchValue('');
    onSearch?.('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch?.(searchValue.trim());
    }
  }

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-3 py-[10.5px]">
        <h2 className="typo-line-m2 text-lg font-semibold text-black-800">{title}</h2>
        <p className="typo-line-m4 text-sm font-medium text-black-600">
          자유게시판 글 작성 시 <span className="text-pink-500">1회</span>, 모아방 자료 업로드 시{' '}
          <span className="text-pink-500">3회</span> AI 생성 횟수가 추가돼요
        </p>
      </div>
      {actions ?? (
        <div className="flex items-center gap-3 py-[7.5px]">
          {!hideSearch && (
            <Input
              variant="search"
              size="sm"
              aria-label="게시글 검색"
              placeholder="검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={handleSearchClear}
              onKeyDown={handleKeyDown}
            />
          )}
          <Button size="sm" onClick={onWrite} disabled={writeDisabled}>
            {writeLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
