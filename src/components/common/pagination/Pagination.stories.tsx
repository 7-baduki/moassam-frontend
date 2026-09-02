import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Common/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = (args: React.ComponentProps<typeof Pagination>) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  return <Pagination {...args} currentPage={currentPage} onChange={setCurrentPage} />;
};

export const Default: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: { currentPage: 1, totalPages: 5 },
};

export const FirstPage: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: { currentPage: 1, totalPages: 5 },
};

export const LastPage: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: { currentPage: 5, totalPages: 5 },
};

export const MiddlePage: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: { currentPage: 3, totalPages: 5 },
};

export const SinglePage: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: { currentPage: 1, totalPages: 1 },
};
