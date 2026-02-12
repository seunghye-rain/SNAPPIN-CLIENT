'use client';

import { useGetReviewDetail } from './api';
import { useSearchParams } from 'next/navigation';
import PhotoReview from '@/components/layout/photo-review/PhotoReview';

type PageClientProps = {
  reviewId: number;
};

export default function PageClient({ reviewId }: PageClientProps) {
  const searchParams = useSearchParams();
  const initialIndex = Number(searchParams.get('image') ?? 0);
  const { data, isPending } = useGetReviewDetail(reviewId);

  return <PhotoReview isPending={isPending} data={data} initialIndex={initialIndex} />;
}
