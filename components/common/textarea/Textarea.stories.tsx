import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/common/button/Button';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Common/Textarea',
  component: Textarea,
  argTypes: {
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: '영유아의 행동이나 상황을 구체적인 문장으로 입력해주세요',
    action: (
      <Button size="sm" className="w-35 p-2.25">
        생성하기
      </Button>
    ),
  },
};

export const WithCounter: Story = {
  args: {
    placeholder: '나누고 싶은 이야기나 따뜻한 응원을 남겨주세요',
    maxLength: 3000,
    action: <Button size="sm">등록</Button>,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '입력할 수 없습니다',
    disabled: true,
    action: (
      <Button size="sm" className="w-35 p-2.25" disabled>
        생성하기
      </Button>
    ),
  },
};
