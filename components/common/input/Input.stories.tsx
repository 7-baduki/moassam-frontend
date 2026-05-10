import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search'],
    },
    size: {
      control: 'select',
      options: ['sm', 'full'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWithState = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState('');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

export const Default: Story = {
  render: (args) => <InputWithState {...args} />,
  args: { variant: 'default', size: 'full', placeholder: '제목을 입력해주세요' },
};

export const Search: Story = {
  render: (args) => <InputWithState {...args} />,
  args: { variant: 'search', size: 'sm', placeholder: '검색' },
};
