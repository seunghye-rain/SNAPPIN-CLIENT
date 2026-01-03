import { Meta, StoryObj } from '@storybook/react';
import Divider from '@/ui/divider/Divider';

const meta: Meta<typeof Divider> = {
  title: 'divider/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    thickness: 0.7,
    color: 'gray-light',
  },
};

export const ThickDarkDivider: Story = {
  args: {
    color: 'gray-dark',
  },
};
