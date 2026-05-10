import type { SelectOption } from '@/components/common/select';

export const AGE_OPTIONS: SelectOption[] = [
  { label: '만 0세', value: 'AGE_0' },
  { label: '만 1세', value: 'AGE_1' },
  { label: '만 2세', value: 'AGE_2' },
  { label: '만 3세', value: 'AGE_3' },
  { label: '만 4세', value: 'AGE_4' },
  { label: '만 5세', value: 'AGE_5' },
];

export const AREA_OPTIONS: SelectOption[] = [
  { label: '신체 운동·건강', value: 'PHYSICAL_HEALTH' },
  { label: '의사소통', value: 'COMMUNICATION' },
  { label: '사회관계', value: 'SOCIAL_RELATIONSHIP' },
  { label: '예술경험', value: 'ART_EXPERIENCE' },
  { label: '자연탐구', value: 'NATURE_EXPLORATION' },
];
