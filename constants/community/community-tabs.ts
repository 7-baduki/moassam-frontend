import type { TabOption } from '@/components/common/tabs/Tabs';

const ALL_TAB: TabOption = { label: '전체', value: 'all' };

export const MOABANG_AGES: TabOption[] = [
  { label: '영아', value: 'infant' },
  { label: '만 3세', value: 'age3' },
  { label: '만 4세', value: 'age4' },
  { label: '만 5세', value: 'age5' },
];

export const MOABANG_CATEGORIES: TabOption[] = [
  { label: '활동자료', value: 'activity' },
  { label: '계획안', value: 'plan' },
  { label: '일지', value: 'journal' },
  { label: '안내문', value: 'notice' },
];

export const MOABANG_AGE_FILTER_TABS: TabOption[] = [ALL_TAB, ...MOABANG_AGES];
export const MOABANG_CATEGORY_FILTER_TABS: TabOption[] = [ALL_TAB, ...MOABANG_CATEGORIES];

export const BOARD_CATEGORIES: TabOption[] = [
  { label: '고민', value: 'concern' },
  { label: '질문', value: 'question' },
  { label: '잡담', value: 'counseling' },
];

export const BOARD_CATEGORY_FILTER_TABS: TabOption[] = [ALL_TAB, ...BOARD_CATEGORIES];
