'use client';

import Header from './components/header/Header';
import { useGetReviewDetail } from './api';
import { useSearchParams } from 'next/navigation';
import PhotoReview from '@/components/layout/photo-review/PhotoReview';

type ClientPageProps = {
  reviewId: string;
};

export default function ClientPage({ reviewId }: ClientPageProps) {
  const searchParams = useSearchParams();
  const initialIndex = Math.max(Number(searchParams.get('image') || 0), 0);
  const { data, isPending } = useGetReviewDetail(Number(reviewId));

  return (
    <div className='bg-black-10 flex min-h-dvh flex-col'>
      <Header />
      <PhotoReview isPending={isPending} data={data} initialIndex={initialIndex} />
    </div>
  );
}
