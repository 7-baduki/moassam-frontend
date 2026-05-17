'use client';

import Tabs, { type TabOption } from '@/components/common/tabs/Tabs';

interface CommunityFilterProps {
  ageTabs?: TabOption[];
  age?: string;
  onAgeChange?: (value: string) => void;

  categoryTabs?: TabOption[];
  category?: string;
  onCategoryChange?: (value: string) => void;
}

export default function CommunityFilter({
  ageTabs,
  age = '',
  onAgeChange,
  categoryTabs,
  category = '',
  onCategoryChange,
}: CommunityFilterProps) {
  const showAgeTabs = Boolean(ageTabs && onAgeChange);
  const showCategoryTabs = Boolean(categoryTabs && onCategoryChange);

  return (
    <div className="mb-7.5 flex h-10 items-stretch overflow-x-auto rounded-lg bg-black-200 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {showAgeTabs && (
        <Tabs options={ageTabs!} value={age} onChange={onAgeChange!} className="shrink-0" />
      )}
      {showAgeTabs && showCategoryTabs && (
        <div className="mx-7.5 h-4 w-px shrink-0 self-center bg-black-700" />
      )}
      {showCategoryTabs && (
        <Tabs
          options={categoryTabs!}
          value={category}
          onChange={onCategoryChange!}
          className="shrink-0"
        />
      )}
    </div>
  );
}
