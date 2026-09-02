import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ScrollToTopButton from './ScrollToTopButton';

const meta: Meta<typeof ScrollToTopButton> = {
  title: 'Common/ScrollToTopButton',
  component: ScrollToTopButton,
};

export default meta;
type Story = StoryObj<typeof ScrollToTopButton>;

export const Default: Story = {};
