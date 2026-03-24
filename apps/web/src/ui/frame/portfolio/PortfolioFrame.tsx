'use client';

import { cn } from '@snappin/design-system/lib';
import ImageWithShadow from '../image-with-shadow/ImageWithShadow';
import { IconHeart, IconHeartFill } from '@snappin/design-system/assets';
import { RemUnit } from '../types/remUnit';
import { IconButton } from '@snappin/design-system';

type PortfolioFrameProps = {
  imageUrl: string;
  alt?: string;
  isLiked: boolean;
  likesCount: number;
  imageHeight?: RemUnit;
  imageWidth?: RemUnit;
  handleClickLike?: () => void;
};
export default function PortfolioFrame({
  imageUrl,
  alt = '포트폴리오 이미지',
  isLiked,
  likesCount,
  imageWidth = '18.65rem',
  imageHeight = '26.6rem',
  handleClickLike,
}: PortfolioFrameProps) {
  const HeartIcon = isLiked ? IconHeartFill : IconHeart;

  return (
    <div className='relative w-fit overflow-hidden'>
      <ImageWithShadow src={imageUrl} alt={alt} imageHeight={imageHeight} imageWidth={imageWidth} />
      <div className='pb-[1.2rem]s absolute right-0 bottom-0 flex items-center gap-[0.4rem] rounded-full p-[1.2rem]'>
        <IconButton onClick={handleClickLike} aria-label={isLiked ? '좋아요 취소' : '좋아요'}>
          <HeartIcon
            className={cn('h-[2.4rem] w-[2.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
          />
        </IconButton>
        <span className='caption-12-md text-black-1'>{likesCount}</span>
      </div>
    </div>
  );
}
