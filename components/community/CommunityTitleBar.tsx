'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { InfoIcon, SearchIcon } from '@/app/assets/icons';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import CommunityInfoTooltip from './CommunityInfoTooltip';
import CommunitySearchOverlay from './CommunitySearchOverlay';

interface CommunityTitleBarProps {
  title: string;
  onWrite?: () => void;
  writeLabel?: string;
  hideSearch?: boolean;
  writeDisabled?: boolean;
  actions?: ReactNode;
  onSearch?: (keyword: string) => void;
  renderSearchResults?: (keyword: string) => ReactNode;
}

export default function CommunityTitleBar({
  title,
  onWrite,
  writeLabel = '새글작성',
  hideSearch = false,
  writeDisabled = false,
  actions,
  onSearch,
  renderSearchResults,
}: CommunityTitleBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltipOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tooltipOpen]);

  function handleSearchClear() {
    setSearchValue('');
    onSearch?.('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch?.(searchValue.trim());
    }
  }

  function handleOverlaySearch(keyword: string) {
    onSearch?.(keyword);
    setOverlayOpen(false);
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1 py-[10.5px]">
          <h2 className="typo-line-m2 text-base leading-none! font-semibold text-black-800 md:text-lg">
            {title}
          </h2>

          <div ref={tooltipRef} className="relative md:hidden">
            <button
              type="button"
              aria-label="AI 생성횟수 추가 안내"
              onClick={() => setTooltipOpen((prev) => !prev)}
              className="flex h-4 w-4 cursor-pointer items-center justify-center text-black-500"
            >
              <InfoIcon className="" />
            </button>
            {tooltipOpen && <CommunityInfoTooltip />}
          </div>

          <p className="typo-line-m4 hidden text-xs font-medium text-black-600 md:block xl:text-sm">
            자유게시판 글 작성 시 <span className="text-pink-500">1회</span>, 모아방 자료 업로드 시{' '}
            <span className="text-pink-500">3회</span> AI 생성 횟수가 추가돼요
          </p>
        </div>

        {actions ?? (
          <div className="flex items-center gap-3 py-[7.5px]">
            {!hideSearch && (
              <>
                <button
                  type="button"
                  aria-label="검색"
                  onClick={() => setOverlayOpen(true)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center text-black-700 md:hidden"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
                <div className="hidden md:block">
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
                </div>
              </>
            )}
            <div className="hidden xl:block">
              <Button size="sm" onClick={onWrite} disabled={writeDisabled}>
                {writeLabel}
              </Button>
            </div>
          </div>
        )}
      </div>

      {overlayOpen && (
        <CommunitySearchOverlay
          onClose={() => setOverlayOpen(false)}
          onSearch={handleOverlaySearch}
          renderResults={renderSearchResults}
        />
      )}
    </>
  );
}
