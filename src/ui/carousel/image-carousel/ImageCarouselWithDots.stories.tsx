import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageCarouselWithDots from './ImageCarouselWithDots';

const defaultImages = [
  { src: '/imgs/image-default.png', alt: '이미지 1' },
  { src: '/imgs/image-default.png', alt: '이미지 2' },
  { src: '/imgs/image-default.png', alt: '이미지 3' },
];

const meta: Meta<typeof ImageCarouselWithDots> = {
  title: 'UI/Carousel/ImageCarouselWithDots',
  component: ImageCarouselWithDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '하단 도트 인디케이터가 있는 이미지 캐러셀입니다. 도트 클릭으로 슬라이드 이동이 가능합니다.',
      },
    },
  },
  argTypes: {
    images: {
      description: '캐러셀에 표시할 이미지 목록 (src, alt)',
    },
    className: {
      control: 'text',
      description: '컨테이너에 적용할 클래스',
    },
  },
  args: {
    images: defaultImages,
    className: 'w-[32rem]',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: defaultImages,
    className: 'w-[32rem]',
  },
};

export const SingleImage: Story = {
  args: {
    images: [{ src: '/imgs/image-default.png', alt: '단일 이미지' }],
    className: 'w-[32rem]',
  },
};

export const ManyImages: Story = {
  args: {
    images: Array.from({ length: 5 }, (_, i) => ({
      src: '/imgs/image-default.png',
      alt: `이미지 ${i + 1}`,
    })),
    className: 'w-[32rem]',
  },
};
