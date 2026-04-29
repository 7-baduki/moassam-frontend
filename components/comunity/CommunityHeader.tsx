'use client';

import { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Select } from '@/components/common/select/Select';
import { SearchIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';

interface Tab {
  label: string;
  value: string;
}

interface CommunityHeaderProps {
  title: string;
  description: string;
  ageTabs?: Tab[];
  categoryTabs?: Tab[];
  sortOptions?: Tab[];
  onWrite?: () => void;
}

const DEFAULT_SORT_OPTIONS: Tab[] = [
  { label: '추천순', value: 'recommended' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

export default function CommunityHeader({
  title,
  description,
  ageTabs,
  categoryTabs,
  sortOptions = DEFAULT_SORT_OPTIONS,
  onWrite,
}: CommunityHeaderProps) {
  const [activeAge, setActiveAge] = useState(ageTabs?.[0]?.value ?? '');
  const [activeCategory, setActiveCategory] = useState(categoryTabs?.[0]?.value ?? '');
  const [sort, setSort] = useState(sortOptions[0].value);

  const hasTabs = ageTabs || categoryTabs;

  return (
    <div className="mb-7.5 flex flex-col gap-4">
      {/* 타이틀 영역 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-black-800">{title}</h2>
          <p className="text-sm font-medium text-black-500">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-black-300 px-3 py-2">
            <SearchIcon className="h-4 w-4 shrink-0 text-black-400" />
            <input
              type="text"
              placeholder="주제를 입력하세요"
              className="w-40 text-sm text-black-800 outline-none placeholder:text-black-400"
            />
          </div>
          <Button size="sm" onClick={onWrite}>
            새글쓰기
          </Button>
        </div>
      </div>

      {/* 필터 섹션 */}
      {hasTabs && (
        <div className="flex items-stretch justify-between rounded-lg bg-black-200 pr-1.5 pl-5">
          <div className="flex items-stretch">
            {ageTabs && (
              <div className="flex items-center gap-5">
                {ageTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveAge(tab.value)}
                    className={cn(
                      'typo-line-m2 flex h-full items-center border-b-2 text-sm transition-colors',
                      activeAge === tab.value
                        ? 'border-pink-500 font-semibold text-pink-500'
                        : 'border-transparent font-medium text-black-700',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
            {ageTabs && categoryTabs && (
              <div className="mx-7.5 h-4 w-px self-center bg-black-700" />
            )}
            {categoryTabs && (
              <div className="flex items-center gap-5">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveCategory(tab.value)}
                    className={cn(
                      'typo-line-m2 flex h-full items-center border-b text-sm transition-colors',
                      activeCategory === tab.value
                        ? 'border-pink-500 font-semibold text-pink-500'
                        : 'border-transparent font-medium text-black-700',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Select
            size="sm"
            options={sortOptions}
            value={sort}
            triggerLabel={sortOptions.find((o) => o.value === sort)?.label}
            onChange={(value) => setSort(value as string)}
          />
        </div>
      )}
    </div>
  );
}
