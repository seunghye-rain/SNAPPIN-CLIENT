import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageCarouselWithSideBtn from './ImageCarouselWithSideBtn';

const defaultImages = [
  { src: '/imgs/image-default.png', alt: '이미지 1' },
  { src: '/imgs/image-default.png', alt: '이미지 2' },
  { src: '/imgs/image-default.png', alt: '이미지 3' },
];

const meta: Meta<typeof ImageCarouselWithSideBtn> = {
  title: 'UI/Carousel/ImageCarouselWithSideBtn',
  component: ImageCarouselWithSideBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '좌우 화살표 버튼이 있는 이미지 캐러셀입니다. initialIndex로 시작 슬라이드를 지정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    images: {
      description: '캐러셀에 표시할 이미지 목록 (src, alt 선택)',
    },
    initialIndex: {
      control: { type: 'number', min: 0 },
      description: '초기 선택 슬라이드 인덱스',
    },
    className: {
      control: 'text',
      description: '컨테이너에 적용할 클래스',
    },
  },
  args: {
    images: defaultImages,
    className: 'w-[60rem]',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: defaultImages,
    className: 'w-[60rem]',
  },
};

export const SingleImage: Story = {
  args: {
    images: [{ src: '/imgs/image-default.png', alt: '단일 이미지' }],
    className: 'w-[60rem]',
  },
};

export const ManyImages: Story = {
  args: {
    images: Array.from({ length: 5 }, (_, i) => ({
      src: '/imgs/image-default.png',
      alt: `이미지 ${i + 1}`,
    })),
    className: 'w-[60rem]',
  },
};
