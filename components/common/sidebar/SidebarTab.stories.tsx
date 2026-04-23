import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SidebarTab from './SidebarTab';

const meta: Meta<typeof SidebarTab> = {
  title: 'Common/Sidebar/SidebarTab',
  component: SidebarTab,
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    isActive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarTab>;

export const Active: Story = {
  args: { label: '자유게시판', href: '/community', isActive: true },
};

export const Inactive: Story = {
  args: { label: '모아방', href: '/', isActive: false },
};
