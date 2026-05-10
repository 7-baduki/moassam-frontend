import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
  argTypes: {
    iconType: {
      control: 'select',
      options: ['loading', 'success', 'error', 'lock'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Loading: Story = {
  args: {
    open: true,
    iconType: 'loading',
    title: '관찰일지를 준비하고 있어요',
    description: '유아의 성향과 키워드를 바탕으로 내용을 정리하는 중이에요',
  },
};

export const Success: Story = {
  args: {
    open: true,
    iconType: 'success',
    title: '관찰일지 저장이 완료되었습니다',
    description: '작성된 내용은 보관함에서 확인할 수 있어요',
    subDescription: '오늘 9회 생성 기회가 남았어요',
    buttons: [{ children: '확인', variant: 'primary' }],
  },
};

export const Error: Story = {
  args: {
    open: true,
    iconType: 'error',
    title: '생성 실패',
    description: '네트워크 연결이 불안정하여 생성에 실패했습니다. 다시 시도해 주세요',
    buttons: [
      { children: '재생성하기', variant: 'outline' },
      { children: '메인으로', variant: 'primary' },
    ],
  },
};

export const Limit: Story = {
  args: {
    open: true,
    iconType: 'lock',
    title: '오늘 생성 횟수를 모두 사용했어요',
    description: '내일 다시 이용하거나 모아방 게시글을 작성해 횟수를 생성할 수 있어요',
    buttons: [
      { children: '재생성하기', variant: 'outline' },
      { children: '모아방', variant: 'primary' },
    ],
  },
};
