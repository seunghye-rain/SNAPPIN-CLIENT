'use client';

import { cn } from '@snappin/design-system/lib';
import ImageWithShadow from '../image-with-shadow/ImageWithShadow';
import { IconHeart, IconHeartFill } from '@snappin/design-system/assets';
import { RemUnit } from '../types/remUnit';
import { IconButton, LikeButton } from '@snappin/design-system';

type PortfolioFrameProps = {
  imageUrl: string;
  alt?: string;
  isLiked: boolean;
  likesCount: number;
  height?: RemUnit;
  width?: RemUnit;
  handleClickLike: () => void;
};
export default function PortfolioFrame({
  imageUrl,
  alt = '포트폴리오 이미지',
  isLiked,
  likesCount,
  width = '18.65rem',
  height = '26.6rem',
  handleClickLike,
}: PortfolioFrameProps) {
  return (
    <div className='relative w-fit overflow-hidden'>
      <ImageWithShadow src={imageUrl} alt={alt} imageHeight={height} imageWidth={width} />
      <div className='absolute right-0 bottom-0 flex items-center gap-[0.5rem] p-[1.2rem]'>
        <LikeButton
          isLiked={isLiked}
          handleClick={handleClickLike}
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          className={cn('h-[1.4rem] w-[1.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
        />
        <span className='caption-11-md text-black-1'>{likesCount}</span>
      </div>
    </div>
  );
}
