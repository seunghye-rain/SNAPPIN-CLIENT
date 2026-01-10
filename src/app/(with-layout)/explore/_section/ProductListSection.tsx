import { ProductCard } from '@/ui';
import { MoodCode } from '@/types/moodCode';

const MOCK_FILTER_CHIP: MoodCode[] = ['청량한', '따스한', 'Y2K'];

export default function ProductListSection() {
  return (
    <section className='bg-black-1 shrink-0'>
      {Array.from({ length: 30 }, (_, i) => (
        <button
          key={i}
          type='button'
          className='border-black-3 w-full border-b-[0.1rem] px-[2rem] py-[1.6rem] text-left'
        >
          <ProductCard
            author='김작가'
            tags={MOCK_FILTER_CHIP}
            rating={4.8}
            reviewCount={30}
            price={80000}
            name='잊지 못 할 졸업 스냅'
            image={{ src: '/product.png', alt: '프리뷰 이미지' }}
          />
        </button>
      ))}
    </section>
  );
}
