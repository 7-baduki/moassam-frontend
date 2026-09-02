import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TagLabel from './TagLabel';

const meta: Meta<typeof TagLabel> = {
  title: 'Common/Badge/TagLabel',
  component: TagLabel,
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TagLabel>;

export const Default: Story = {
  args: { label: '자유게시판' },
};

export const Moabang: Story = {
  args: { label: '모아방' },
};
