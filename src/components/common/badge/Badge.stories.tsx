import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: [
        'yellow',
        'pink-light',
        'green-light',
        'pink-dark',
        'green-dark',
        'outline-yellow',
        'outline-pink',
        'outline-green',
        'outline-gray',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Yellow: Story = {
  args: { label: '공통', variant: 'yellow' },
};

export const PinkLight: Story = {
  args: { label: '영아', variant: 'pink-light' },
};

export const GreenLight: Story = {
  args: { label: '만 3세', variant: 'green-light' },
};

export const PinkDark: Story = {
  args: { label: '만 4세', variant: 'pink-dark' },
};

export const GreenDark: Story = {
  args: { label: '만 5세', variant: 'green-dark' },
};

export const OutlineYellow: Story = {
  args: { label: '활동자료', variant: 'outline-yellow' },
};

export const OutlinePink: Story = {
  args: { label: '일지', variant: 'outline-pink' },
};

export const OutlineGreen: Story = {
  args: { label: '계획안', variant: 'outline-green' },
};

export const OutlineGray: Story = {
  args: { label: '안내문', variant: 'outline-gray' },
};
