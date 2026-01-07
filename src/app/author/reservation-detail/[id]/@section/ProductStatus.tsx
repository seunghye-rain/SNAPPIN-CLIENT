import { ProductCard } from '@/ui/product-card';
import { MoodCode } from '@/types/moodCode';

type ProductStatusProps = {
  imageUrl: string;
  title: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: MoodCode[];
};

export default function ProductStatus({
  imageUrl,
  title,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
}: ProductStatusProps) {
  return (
    <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem]'>
      <p className='caption-14-bd'>예약 요청 상품</p>
      <div className='w-full py-[1.2rem]'>
        <ProductCard
          image={{ src: imageUrl, alt: title }}
          name={title}
          rating={rate}
          reviewCount={reviewCount}
          author={photographer}
          price={price}
          tags={moods}
        />
      </div>
    </div>
  );
}
