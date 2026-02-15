'use client';

import { useMemo } from 'react';
import { useGetReviewDetail } from './api';
import { useSearchParams } from 'next/navigation';
import PhotoReview from '@/components/layout/photo-review/PhotoReview';

type PageClientProps = {
  reviewId: number;
};

export default function PageClient({ reviewId }: PageClientProps) {
  const searchParams = useSearchParams();
  const { data, isPending } = useGetReviewDetail(reviewId);
  const initialIndex = useMemo(() => {
    const imageParam = searchParams.get('image');
    if (!imageParam) return 0;

    const parsed = Number(imageParam);
    if (Number.isInteger(parsed) && parsed >= 0) {
      const maxIndex = Math.max((data?.images?.length ?? 1) - 1, 0);
      return Math.min(parsed, maxIndex);
    }

    const imageIndex = data?.images?.findIndex((image) => image === imageParam) ?? -1;
    return imageIndex >= 0 ? imageIndex : 0;
  }, [data?.images, searchParams]);

  return <PhotoReview isPending={isPending} data={data} initialIndex={initialIndex} />;
}
