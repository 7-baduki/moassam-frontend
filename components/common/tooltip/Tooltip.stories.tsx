import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  argTypes: {
    label: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-20">
        <div className="relative h-12 w-12 rounded-full bg-gray-200">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: { label: '최근에 로그인 했어요' },
};
