'use client';

import { useState } from 'react';
import ReviewStar from '@/ui/review-star/ReviewStar';

type ReviewStarSectionProps = {
  initialRating?: number;
  handleChangeRating?: (rating: number) => void;
};

const MAX_RATING = 5;

export default function ReviewStarSection({
  initialRating = 0,
  handleChangeRating,
}: ReviewStarSectionProps) {
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleClickStar = (index: number) => {
    const updatedRating = index + 1;
    setSelectedRating(updatedRating);
    handleChangeRating?.(updatedRating);
  };

  return (
    <section className='bg-black-1 flex flex-col gap-[0.8rem] p-[2.4rem_2rem_2.8rem_2rem]'>
      <span className='caption-14-md text-black-10'>이번 촬영은 어떠셨나요?</span>
      <div className='relative inline-flex' role='group' aria-label='별점 선택'>
        <ReviewStar
          starSize='large'
          rating={selectedRating}
          starFillColor='text-black-10'
          className='pointer-events-none'
        />
        <div className='absolute inset-0 flex items-center gap-[0.5rem]'>
          {Array.from({ length: MAX_RATING }).map((_, starIndex) => (
            <button
              key={starIndex}
              type='button'
              aria-label={`${starIndex + 1}`}
              className='h-full w-[2.4rem] cursor-pointer'
              onClick={() => handleClickStar(starIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
