'use client';

import { ProductCard } from '@/ui/product-card';
import { MoodCode } from '@/types/moodCode';
import { StateCode } from '@/ui/chip/state-chip/types/stateCode';
import StateChip from '@/ui/chip/state-chip/StateChip';
import Button from '@/ui/button/base/Button';
import { IconKeyboardArrowRight } from '@/assets';

type ReservationCardProps = {
  id: number;
  status: StateCode;
  image: { src: string; alt?: string };
  name: string;
  rating: number;
  reviewCount: number;
  author: string;
  price: number;
  tags: MoodCode[];
};

export default function ReservationCard({
  id,
  status,
  image,
  name,
  rating,
  reviewCount,
  author,
  price,
  tags,
}: ReservationCardProps) {
  const handleCancel = () => {
    console.log(`${id} 예약 상세 페이지로 이동`);
  };

  return (
    <div className='flex px-[2rem] py-[1.2rem]'>
      <div className='border-black-5 flex w-full flex-col gap-[1.2rem] rounded-[0.6rem] border border-[0.7px] p-[1.2rem]'>
        <div className='flex w-full items-center justify-between'>
          <StateChip label={status} />
          <Button
            size='small'
            className='text-black-8 flex items-center gap-[0.5rem] bg-white'
            onClick={handleCancel}
          >
            예약상세
            <IconKeyboardArrowRight />
          </Button>
        </div>
        <ProductCard
          image={image}
          name={name}
          rating={rating}
          reviewCount={reviewCount}
          author={author}
          price={price}
          tags={tags}
        />
      </div>
    </div>
  );
}
