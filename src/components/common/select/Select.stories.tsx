import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Select } from './Select';

const OPTIONS_SORT = [
  { label: '추천순', value: 'recommend' },
  { label: '최신순', value: 'latest' },
  { label: '좋아요순', value: 'likes' },
];

const OPTIONS_AGE = [
  { label: '만 0세', value: '0' },
  { label: '만 1세', value: '1' },
  { label: '만 2세', value: '2' },
  { label: '만 3세', value: '3' },
  { label: '만 4세', value: '4' },
  { label: '만 5세', value: '5' },
];

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        size="sm"
        options={OPTIONS_SORT}
        triggerLabel="추천순"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const MediumSingle: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        size="md"
        options={OPTIONS_AGE}
        triggerLabel="연령"
        value={value}
        onChange={setValue}
      />
    );
  },
};

const OPTIONS_DEVELOPMENT = [
  { label: '신체 운동 · 건강', value: 'physical' },
  { label: '의사소통', value: 'communication' },
  { label: '사회관계', value: 'social' },
  { label: '예술경험', value: 'art' },
  { label: '자연탐구', value: 'nature' },
];

export const MediumMultiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Select
        multiple
        size="md"
        options={OPTIONS_DEVELOPMENT}
        triggerLabel="발달 영역"
        value={value}
        onChange={setValue}
      />
    );
  },
};
