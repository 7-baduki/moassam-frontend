import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MoreButton } from './MoreButton';

const meta: Meta<typeof MoreButton> = {
  title: 'Common/MoreButton',
  component: MoreButton,
  decorators: [
    (Story) => (
      <div className="flex justify-end p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    onEdit: () => console.log('수정 클릭'),
    onDelete: () => console.log('삭제 클릭'),
  },
};

export default meta;
type Story = StoryObj<typeof MoreButton>;

export const Default: Story = {};
