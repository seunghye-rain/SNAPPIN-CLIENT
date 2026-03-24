import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PortfolioFrame from './PortfolioFrame';

const meta: Meta<typeof PortfolioFrame> = {
  title: 'UI/Frame/PortfolioFrame',
  component: PortfolioFrame,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    imageUrl: {
      control: 'text',
    },
    isLiked: {
      control: 'boolean',
    },
    likesCount: {
      control: { type: 'number', min: 0 },
    },
  },
  args: {
    imageUrl: '/imgs/default-image.png',
    isLiked: false,
    likesCount: 128,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  args: {
    isLiked: true,
    likesCount: 256,
  },
};
