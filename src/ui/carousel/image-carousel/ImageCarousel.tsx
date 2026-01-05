import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

type ImageCarouselProps = React.ComponentProps<typeof Image> & {
  //rem 단위로 입력
  imageHeight: string;
  imageWidth: string;
};

export default function ImageCarousel({
  src,
  alt,
  className,
  imageHeight,
  imageWidth,
  ...props
}: ImageCarouselProps) {
  return (
    <div
      style={{ height: imageHeight, width: imageWidth }}
      className={cn('relative overflow-hidden', className)}
    >
      <Image src={src} alt={alt} fill className={cn('object-cover select-none')} {...props} />
      <div
        className='pointer-events-none absolute inset-0 h-full w-full'
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 46.63%, #000 100%)',
        }}
      />
    </div>
  );
}
