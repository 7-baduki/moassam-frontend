'use client';

import { useState } from 'react';
import { Select } from '@/components/common/select/Select';
import { cn } from '@/utils/cn';

interface Tab {
  label: string;
  value: string;
}

interface CommunityFilterProps {
  ageTabs?: Tab[];
  categoryTabs?: Tab[];
  sortOptions?: Tab[];
}

const DEFAULT_SORT_OPTIONS: Tab[] = [
  { label: '추천순', value: 'recommended' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

export default function CommunityFilter({
  ageTabs,
  categoryTabs,
  sortOptions = DEFAULT_SORT_OPTIONS,
}: CommunityFilterProps) {
  const [activeAge, setActiveAge] = useState(ageTabs?.[0]?.value ?? '');
  const [activeCategory, setActiveCategory] = useState(categoryTabs?.[0]?.value ?? '');
  const [sort, setSort] = useState(sortOptions[0].value);

  return (
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
        {ageTabs && categoryTabs && <div className="mx-7.5 h-4 w-px self-center bg-black-700" />}
        {categoryTabs && (
          <div className="flex items-center gap-5">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveCategory(tab.value)}
                className={cn(
                  'typo-line-m2 flex h-full items-center border-b-2 text-sm transition-colors',
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
  );
}
