'use client';

import { cn } from '@snappin/design-system/lib';
import ImageWithShadow from '../image-with-shadow/ImageWithShadow';
import { IconHeart, IconHeartFill, IconStar } from '@snappin/design-system/assets';
import { RemUnit } from '../types/remUnit';
import { IconButton, TagChip } from '@snappin/design-system';
import { ProductCardProps } from '@snappin/shared/types';

type ProductFrameProps = ProductCardProps & {
  id: number;
  isLiked: boolean;
  imageHeight?: RemUnit;
  imageWidth?: RemUnit;
  handleClickLike?: () => void;
};

export default function ProductFrame({
  image: { src: imageUrl, alt = '제품 이미지' },
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods = [],
  isLiked,
  imageWidth = '18.6rem',
  imageHeight = '18.4rem',
  handleClickLike,
}: ProductFrameProps) {
  const HeartIcon = isLiked ? IconHeartFill : IconHeart;

  return (
    <div
      className='border-black-10 flex flex-col overflow-hidden border-1'
      style={{ width: imageWidth }}
    >
      <div className='relative overflow-hidden'>
        <ImageWithShadow
          src={imageUrl}
          alt={alt}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
        />
        <div className='absolute right-0 bottom-0 flex items-center p-[1rem]'>
          <IconButton onClick={handleClickLike} aria-label={isLiked ? '좋아요 취소' : '좋아요'}>
            <HeartIcon
              className={cn('h-[2.4rem] w-[2.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
            />
          </IconButton>
        </div>
      </div>
      {/* 제품 정보 */}
      <div className='flex w-full flex-col items-center items-start gap-[0.8em] overflow-hidden p-[1.2rem]'>
        <div className='flex w-full flex-col gap-[0.2rem] overflow-hidden'>
          <p className='caption-11-md truncate'>{name}</p>
          <span className='caption-14-bd'>{price}원~</span>
        </div>
        <div className='flex w-full flex-col items-start gap-[0.7rem] overflow-hidden'>
          <div className='flex w-full items-center gap-[0.2rem] overflow-hidden'>
            {moods.map((mood) => (
              <TagChip key={mood} variant='gray' label={mood} />
            ))}
          </div>
          <div className='text-black-7 flex w-full min-w-0 items-center overflow-hidden'>
            <span className='caption-12-md mr-[0.8rem] block min-w-0 flex-1 truncate'>
              {photographer}
            </span>
            <div className='mr-[0.4rem] flex shrink-0 items-center gap-[0.2rem]'>
              <IconStar className='h-[0.8rem] w-[0.8rem]' />
              <span className='caption-12-md'>{rate}</span>
            </div>
            <div className='flex shrink-0 items-center gap-[0.3rem]'>
              <p className='caption-12-md'>리뷰</p>
              <span className='caption-12-md'>({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
