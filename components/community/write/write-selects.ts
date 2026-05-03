import type { SelectOption } from '@/components/common/select/select.type';

export const BOARD_OPTIONS: SelectOption[] = [
  { label: '모아방', value: 'moabang' },
  { label: '자유게시판', value: 'free' },
];

export const AGE_OPTIONS: SelectOption[] = [
  { label: '공동', value: '공동' },
  { label: '영아', value: '영아' },
  { label: '만 3세', value: '만3세' },
  { label: '만 4세', value: '만4세' },
  { label: '만 5세', value: '만5세' },
];

export const MATERIAL_TYPE_OPTIONS: SelectOption[] = [
  { label: '활동자료', value: '활동자료' },
  { label: '계획안', value: '계획안' },
  { label: '일지', value: '일지' },
  { label: '안내문', value: '안내문' },
];

export const TOPIC_OPTIONS: SelectOption[] = [
  { label: '고민', value: '고민' },
  { label: '질문', value: '질문' },
  { label: '잡담', value: '잡담' },
];
