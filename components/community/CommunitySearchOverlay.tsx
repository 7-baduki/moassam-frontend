'use client';

import { useState, useTransition, useRef, type ReactNode } from 'react';
import { BackArrowIcon } from '@/app/assets/icons';
import { Input } from '@/components/common/input/Input';

interface CommunitySearchOverlayProps {
  onClose: () => void;
  onSearch: (keyword: string) => void;
  renderResults?: (keyword: string) => ReactNode;
}

export default function CommunitySearchOverlay({
  onClose,
  onSearch,
  renderResults,
}: CommunitySearchOverlayProps) {
  const [value, setValue] = useState('');
  const [resultsKeyword, setResultsKeyword] = useState('');
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setValue(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      startTransition(() => setResultsKeyword(v.trim()));
    }, 300);
  }

  function handleClear() {
    setValue('');
    if (timerRef.current) clearTimeout(timerRef.current);
    startTransition(() => setResultsKeyword(''));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(value.trim());
    }
  }

  const showResults = renderResults && resultsKeyword.length > 0;

  return (
    <div className="fixed inset-x-0 top-12 bottom-0 z-1000 flex flex-col bg-white md:hidden">
      {/* 검색창 행 */}
      <div className="flex shrink-0 items-center gap-2 px-4 pt-5 pb-3">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center"
        >
          <BackArrowIcon />
        </button>
        <div className="flex-1">
          <Input
            variant="search"
            size="full"
            autoFocus
            aria-label="게시글 검색"
            placeholder="검색"
            value={value}
            onChange={handleChange}
            onClear={handleClear}
            onKeyDown={handleKeyDown}
            className="h-9 text-base"
          />
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {showResults ? (
          <div style={{ opacity: isPending ? 0.5 : 1 }}>{renderResults(resultsKeyword)}</div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-black-500">
            궁금한 키워드를
            <br />
            입력해보세요
          </div>
        )}
      </div>
    </div>
  );
}
