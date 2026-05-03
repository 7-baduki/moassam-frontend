import type { SelectOption } from '@/components/common/select';

export const AGE_OPTIONS: SelectOption[] = [
  { label: '만 0세', value: '0' },
  { label: '만 1세', value: '1' },
  { label: '만 2세', value: '2' },
  { label: '만 3세', value: '3' },
  { label: '만 4세', value: '4' },
  { label: '만 5세', value: '5' },
];

export const AREA_OPTIONS: SelectOption[] = [
  { label: '신체 운동·건강', value: 'physical' },
  { label: '의사소통', value: 'communication' },
  { label: '사회관계', value: 'social' },
  { label: '예술경험', value: 'art' },
  { label: '자연탐구', value: 'nature' },
];
