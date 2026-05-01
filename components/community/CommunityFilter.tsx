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
    <div className="flex h-10 items-stretch rounded-lg bg-black-200 px-5">
      {showAgeTabs && <Tabs options={ageTabs!} value={age} onChange={onAgeChange!} />}
      {showAgeTabs && showCategoryTabs && (
        <div className="mx-7.5 h-4 w-px self-center bg-black-700" />
      )}
      {showCategoryTabs && (
        <Tabs options={categoryTabs!} value={category} onChange={onCategoryChange!} />
      )}
    </div>
  );
}
