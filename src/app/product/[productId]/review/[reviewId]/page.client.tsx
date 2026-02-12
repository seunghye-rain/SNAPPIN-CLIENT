'use client';

import Header from './components/header/Header';
import { ImageCarousel, ReviewStar } from '@/ui';
import { formatShortDate } from '@/utils/formatNumberWithComma';
import { useGetReviewDetail } from './api';
import { useSearchParams } from 'next/navigation';

type ClientPageProps = {
  reviewId: string;
};

export default function ClientPage({ reviewId }: ClientPageProps) {
  const searchParams = useSearchParams();
  const initialIndex = Math.max(Number(searchParams.get('image') || 0), 0);
  const { data, isPending } = useGetReviewDetail(Number(reviewId));

  const reviewImages = data?.images?.map((image, idx) => ({
    src: image,
    alt: `리뷰 이미지 ${idx}`,
  }));
  const formattedDate = formatShortDate(data?.createdAt ?? '');

  return (
    <div className='bg-black-10 flex min-h-dvh flex-col'>
      <Header />
      {isPending ? (
        <ReviewDetailSkeleton />
      ) : (
        <>
          <ImageCarousel
            variant='sideButtons'
            images={reviewImages ?? []}
            initialIndex={initialIndex}
          />
          <div className='flex flex-col gap-[1.2rem] px-[2rem] pt-[2rem] pb-[6rem]'>
            <div className='flex flex-col gap-[0.6rem]'>
              <div className='flex justify-between'>
                <ReviewStar
                  rating={data?.rating ?? 0}
                  starSize='small'
                  starFillColor='text-neon-black'
                />
                <span className='caption-12-md text-black-7'>{formattedDate}</span>
              </div>
              <span className='caption-12-md text-black-7'>{data?.reviewer}</span>
            </div>
            <span className='caption-14-md text-black-1'>{data?.content}</span>
          </div>
        </>
      )}
    </div>
  );
}

const ReviewDetailSkeleton = () => {
  return (
    <section>
      <div className='bg-black-9 h-[48rem] w-full' />
      <div className='flex w-full flex-col gap-[1.2rem] px-[2rem] pt-[2rem] pb-[6rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex h-[1.4rem] justify-between'>
            <div className='bg-black-9 w-[9.6rem] rounded-[0.2rem]' />
            <div className='bg-black-9 w-[4.5rem] rounded-[0.2rem]' />
          </div>
          <div className='bg-black-9 h-[1.4rem] w-[3.2rem] rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='bg-black-9 h-[1.7rem] w-[25.1rem] rounded-[0.2rem]' />
          <div className='bg-black-9 h-[1.7rem] w-[19.4rem] rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
};
