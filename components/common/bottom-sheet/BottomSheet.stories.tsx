import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SelectBottomSheet } from './SelectBottomSheet';

const OPTIONS_AGE = [
  { label: '만 0세', value: '0' },
  { label: '만 1세', value: '1' },
  { label: '만 2세', value: '2' },
  { label: '만 3세', value: '3' },
  { label: '만 4세', value: '4' },
  { label: '만 5세', value: '5' },
];

const OPTIONS_DEVELOPMENT = [
  { label: '신체운동·건강', value: 'physical' },
  { label: '의사소통', value: 'communication' },
  { label: '사회관계', value: 'social' },
  { label: '예술경험', value: 'art' },
  { label: '자연탐구', value: 'nature' },
];

const meta: Meta<typeof SelectBottomSheet> = {
  title: 'Common/BottomSheet',
  component: SelectBottomSheet,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBottomSheet>;

export const SingleSelect: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState('');
    return (
      <SelectBottomSheet
        open={open}
        onOpenChange={setOpen}
        title="연령"
        options={OPTIONS_AGE}
        value={value}
        onChange={setValue}
        onConfirm={() => setOpen(false)}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState<string[]>([]);
    return (
      <SelectBottomSheet
        multiple
        open={open}
        onOpenChange={setOpen}
        title="5개 영역"
        description="중복선택 가능"
        options={OPTIONS_DEVELOPMENT}
        value={value}
        onChange={setValue}
        onConfirm={() => setOpen(false)}
      />
    );
  },
};
