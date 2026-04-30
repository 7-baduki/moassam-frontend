'use client';

import { Select } from '@/components/common/select/Select';
import Tabs, { type TabOption } from '@/components/common/tabs/Tabs';

interface CommunityFilterProps {
  ageTabs?: TabOption[];
  age?: string;
  onAgeChange?: (value: string) => void;

  categoryTabs?: TabOption[];
  category?: string;
  onCategoryChange?: (value: string) => void;

  sortOptions?: TabOption[];
  sort?: string;
  onSortChange?: (value: string) => void;
}

const DEFAULT_SORT_OPTIONS: TabOption[] = [
  { label: '추천순', value: 'recommended' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

export default function CommunityFilter({
  ageTabs,
  age = '',
  onAgeChange,
  categoryTabs,
  category = '',
  onCategoryChange,
  sortOptions = DEFAULT_SORT_OPTIONS,
  sort,
  onSortChange,
}: CommunityFilterProps) {
  const hasSortOptions = sortOptions.length > 0;
  const sortValue = sort ?? sortOptions[0]?.value ?? '';

  return (
    <div className="flex items-stretch justify-between rounded-lg bg-black-200 pr-1.5 pl-5">
      <div className="flex items-stretch">
        {ageTabs && onAgeChange && <Tabs options={ageTabs} value={age} onChange={onAgeChange} />}
        {ageTabs && categoryTabs && <div className="mx-7.5 h-4 w-px self-center bg-black-700" />}
        {categoryTabs && onCategoryChange && (
          <Tabs options={categoryTabs} value={category} onChange={onCategoryChange} />
        )}
      </div>
      {hasSortOptions && (
        <Select
          size="sm"
          options={sortOptions}
          value={sortValue}
          triggerLabel={sortOptions.find((o) => o.value === sortValue)?.label}
          onChange={(value) => onSortChange?.(value as string)}
        />
      )}
    </div>
  );
}
