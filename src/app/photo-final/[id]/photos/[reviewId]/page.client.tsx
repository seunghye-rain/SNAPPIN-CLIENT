'use client';

import { useGetReviewDetail } from '@/app/photo-final/[id]/photos/[reviewId]/api';
import { useSearchParams } from 'next/navigation';
import PhotoReview from '@/components/layout/photo-review/PhotoReview';

type PageClientProps = {
  id: number;
  reviewId: number;
};

export default function PageClient({ reviewId }: PageClientProps) {
  const searchParams = useSearchParams();
  const initialIndex = Number(searchParams.get('image') ?? 0);
  const { data, isPending } = useGetReviewDetail(reviewId);

  return <PhotoReview isPending={isPending} data={data} initialIndex={initialIndex} />;
}
