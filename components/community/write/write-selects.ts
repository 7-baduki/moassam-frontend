import type { SelectOption } from '@/components/common/select/select.type';

export const BOARD_OPTIONS: SelectOption[] = [
  { label: '모아방', value: 'moabang' },
  { label: '자유게시판', value: 'free' },
];

export const AGE_OPTIONS: SelectOption[] = [
  { label: '공통', value: 'ALL' },
  { label: '영아', value: 'INFANT' },
  { label: '만 3세', value: 'AGE_3' },
  { label: '만 4세', value: 'AGE_4' },
  { label: '만 5세', value: 'AGE_5' },
];

export const MATERIAL_TYPE_OPTIONS: SelectOption[] = [
  { label: '활동자료', value: 'ACTIVITY' },
  { label: '계획안', value: 'PLAN' },
  { label: '일지', value: 'JOURNAL' },
  { label: '안내문', value: 'NOTICE' },
];

export const TOPIC_OPTIONS: SelectOption[] = [
  { label: '고민', value: 'WORRY' },
  { label: '질문', value: 'QUESTION' },
  { label: '잡담', value: 'CHAT' },
];
