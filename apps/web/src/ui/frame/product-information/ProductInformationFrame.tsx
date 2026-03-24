'use client';

import { cn } from '@snappin/design-system/lib';
import ImageWithShadow from '../image-with-shadow/ImageWithShadow';
import { IconHeart, IconHeartFill } from '@snappin/design-system/assets';
import { RemUnit } from '../types/remUnit';
import { IconButton } from '@snappin/design-system';
import { ProductCardProps } from '@snappin/shared/types';

type ProductInformationFrameProps = ProductCardProps & {
  isLiked: boolean;
  imageHeight?: RemUnit;
  imageWidth?: RemUnit;
  handleClickLike?: () => void;
};

export default function ProductInformationFrame({
  image: { src: imageUrl, alt = '제품 이미지' },
  name,
  rate,
  reviewCount,
  photographer,
  price,
  isLiked,
  imageWidth = '18.65rem',
  imageHeight = '26.6rem',
  handleClickLike,
}: ProductInformationFrameProps) {
  const HeartIcon = isLiked ? IconHeartFill : IconHeart;

  return (
    <div className='relative w-fit overflow-hidden'>
      <ImageWithShadow src={imageUrl} alt={alt} imageHeight={imageHeight} imageWidth={imageWidth} />
      <div className='absolute right-0 bottom-0 flex w-full flex-col items-center gap-[0.8rem] p-[1.2rem]'>
        <div className='text-black-1 flex w-full flex-col gap-[0.2rem]'>
          <p className='caption-11-md'>{name}</p>
          <span className='caption-14-bd'>{price}원~</span>
        </div>
        <div className='text-black-4 flex w-full justify-between gap-[0.8rem]'>
          <div className='flex min-w-0 w-full items-center gap-[0.8rem]'>
            <span className='caption-12-md text-black-1 block min-w-0 flex-1 truncate'>
              {photographer}
            </span>
            <div className='flex shrink-0 items-center gap-[0.4rem]'>
              <span className='caption-12-md'>{rate}</span>
              <span className='caption-12-md'>({reviewCount})</span>
            </div>
          </div>
          <IconButton onClick={handleClickLike} aria-label={isLiked ? '좋아요 취소' : '좋아요'}>
            <HeartIcon
              className={cn('h-[2.4rem] w-[2.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
