import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: '생성하기', variant: 'primary', size: 'md' },
};

export const Outline: Story = {
  args: { children: '생성하기', variant: 'outline', size: 'md' },
};

export const Ghost: Story = {
  args: { children: '생성하기', variant: 'ghost', size: 'sm' },
};

export const Disabled: Story = {
  args: { children: '생성하기', variant: 'primary', size: 'md', disabled: true },
};
