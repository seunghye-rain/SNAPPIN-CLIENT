'use client';

import Image from 'next/image';
import { TagChip } from '@snappin/design-system';
import { MoodCode } from '@snappin/shared/types';
import { formatPrice } from '@snappin/shared/lib';
import { IconStar } from '@snappin/design-system/assets';
import { useGetProductDetail } from '@/app/product/[id]/api';

type ProductInfoSectionTempProps = { productId: number };

export default function ProductInfoSectionTemp({ productId }: ProductInfoSectionTempProps) {
  const { data } = useGetProductDetail(productId, true);

  return (
    <section className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
      <div className='flex gap-[1rem] w-full'>
        {/* 좌측 상품 이미지 */}
        <div className='relative w-[9rem] h-[9rem] shrink-0 rounded-[0.4rem] overflow-hidden'>
          <Image
            fill
            alt={data.title}
            src={data.images[0] || '/imgs/default-image.png'}
            sizes='9rem'
            className='object-cover'
          />
        </div>
        {/* 우측 상품 정보 */}
        <div className='flex flex-col gap-[0.8rem] min-w-0'>
          {/* 이름, 가격 */}
          <div className='flex flex-col gap-[0.2rem] text-black-10'>
            <span className='caption-12-md truncate'>{data.title}</span>
            <span className='font-16-sb truncate'>{formatPrice(data.price)}원~</span>
          </div>
          {/* 무드, 작가, 별점, 리뷰 */}
          <div className='flex flex-col gap-[0.8rem]'>
            <div className='flex gap-[0.4rem]'>
              {data.productInfo.moods.map((mood: MoodCode) => <TagChip key={mood} variant='gray' label={mood} />)}
            </div>
            <div className='flex gap-[1.2rem] caption-12-rg text-black-7'>
              <span>{data.photographerInfo.name}</span>
              <div className='flex gap-[0.6rem]'>
                <div className='flex gap-[0.2rem]'>
                  <IconStar className='w-[1rem] h-full'/>
                  <span>{data.averageRate}</span>
                </div>
                <span>리뷰 {data.reviewCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
