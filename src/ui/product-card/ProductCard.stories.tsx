import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import type { TagCode } from '../chip/tag-chip/types/tagCode';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/Product/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '상품명',
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '별점',
    },
    reviewCount: {
      control: { type: 'number', min: 0 },
      description: '리뷰 수',
    },
    photographer: {
      control: 'text',
      description: '작가명',
    },
    price: {
      control: { type: 'number', min: 0 },
      description: '가격',
    },
    tags: {
      control: 'check',
      options: [
        'WARM',
        'FRESH',
        'CLEAR',
        'SUNNY',
        'DREAMY',
        'CHIC',
        'CALM',
        'VIVID',
        'DIRECTED',
        'CINEMATIC',
        'NATURAL',
        'SCENERY',
        'ROUGH',
        'SEASONAL',
        'ANALOG',
        'UNIQUE',
      ] satisfies TagCode[],
      description: '무드 태그',
    },
  },
  args: {
    image: {
      src: '/product.png',
      alt: '임시 이미지',
    },
    name: '찰나의 순간을 기억으로 남기는 소중한 촬영',
    rating: 4.8,
    reviewCount: 20,
    photographer: '김작가',
    price: 80000,
    tags: ['WARM', 'ANALOG', 'DIRECTED'],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};