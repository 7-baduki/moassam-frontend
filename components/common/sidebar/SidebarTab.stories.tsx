import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SidebarTab from './SidebarTab';

const meta: Meta<typeof SidebarTab> = {
  title: 'Common/Sidebar/SidebarTab',
  component: SidebarTab,
};

export default meta;
type Story = StoryObj<typeof SidebarTab>;

export const Active: Story = {
  args: {
    tab: { label: '자유게시판', href: '/community' },
    isActive: true,
    isChildActive: false,
  },
};

export const Inactive: Story = {
  args: {
    tab: { label: '모아방', href: '/' },
    isActive: false,
    isChildActive: false,
  },
};

export const WithChildren: Story = {
  args: {
    tab: {
      label: '내 활동',
      children: [
        { label: '게시글', href: '/mypage/posts' },
        { label: '댓글', href: '/mypage/comments' },
      ],
    },
    isActive: false,
    isChildActive: false,
  },
};
