'use client';

import { useMemo, useRef } from 'react';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import ProductList from '@/ui/frame/product/ProductList';
import { useGetLikeProducts } from '../api';

export default function ProductListSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, dataUpdatedAt } =
    useGetLikeProducts();

  const productList =
    data.pages
      .flatMap((page) => page.data?.products ?? [])
      .map((product) => ({
        id: product.id ?? 0,
        photographer: product.photographer ?? '',
        moods: product.moods ?? [],
        rate: product.rate ?? 0,
        reviewCount: product.reviewCount ?? 0,
        price: product.price ?? 0,
        name: product.title ?? '',
        image: {
          src: product.imageUrl ?? '',
          alt: `Product image ${product.id ?? 0}`,
        },
        isLiked: true,
      })) ?? [];
  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => 'like:product:scroll', []);

  useScrollRestoreOnParent(anchorRef, scrollKey, [productList.length, dataUpdatedAt], {
    enabled: !!data,
    resetOnKeyChange: true,
  });

  if (productList.length === 0) return <LikeEmpty tab='PRODUCT' />;

  return (
    <section>
      <div ref={anchorRef} />
      <ProductList products={productList} />
      <div ref={sentinelRef} className='h-[0.1rem]' />
    </section>
  );
}
