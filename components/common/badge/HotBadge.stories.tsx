import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HotBadge from './HotBadge';

const meta: Meta<typeof HotBadge> = {
  title: 'Common/Badge/HotBadge',
  component: HotBadge,
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['type1', 'type2'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HotBadge>;

export const Type1: Story = {
  args: { label: '조회수 5,218명 돌파 🔥' },
};

export const Type2: Story = {
  args: { label: '급상승 🔥', variant: 'type2' },
};
