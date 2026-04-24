import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['common', 'age3', 'age5', 'age6', 'age7', 'activity', 'diary', 'plan', 'notice'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Common: Story = {
  args: { label: '공통', variant: 'common' },
};

export const Age3: Story = {
  args: { label: '3~4세', variant: 'age3' },
};

export const Age5: Story = {
  args: { label: '5세', variant: 'age5' },
};

export const Age6: Story = {
  args: { label: '6세', variant: 'age6' },
};

export const Age7: Story = {
  args: { label: '7세', variant: 'age7' },
};

export const Activity: Story = {
  args: { label: '활동자료', variant: 'activity' },
};

export const Diary: Story = {
  args: { label: '일지', variant: 'diary' },
};

export const Plan: Story = {
  args: { label: '계획안', variant: 'plan' },
};

export const Notice: Story = {
  args: { label: '안내문', variant: 'notice' },
};
