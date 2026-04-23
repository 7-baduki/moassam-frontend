import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  argTypes: {
    isLoggedIn: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: { isLoggedIn: true },
};

export const LoggedOut: Story = {
  args: { isLoggedIn: false },
};
