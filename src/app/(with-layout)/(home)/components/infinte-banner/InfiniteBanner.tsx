'use client';

import Image from 'next/image';
import Link from 'next/link';

type Item = {
  id: number;
  href: string;
  imageUrl: string;
  name: string;
};

type InfiniteBannerProps = {
  items: Item[];
  itemWidth?: number;
  itemHeight?: number;
  durationSec?: number;
};

export function InfiniteBanner({
  items,
  itemWidth = 118,
  itemHeight = 118,
  durationSec = 18,
}: InfiniteBannerProps) {
  const loopItems = [...items, ...items];

  return (
    <div
      className='relative w-full overflow-hidden'
      style={{ ['--duration' as any]: `${durationSec}s` }}
    >
      <div className='infinite-track flex w-max gap-[0.4rem]'>
        {loopItems.map((item, idx) => (
          <Link key={`${item.id}-${idx}`} href={item.href} className='shrink-0'>
            <Image
              src={item.imageUrl}
              alt={`${item.name} 이미지`}
              width={itemWidth}
              height={itemHeight}
              className='rounded-md object-cover'
            />
          </Link>
        ))}
      </div>

      <style jsx>{`
        .infinite-track {
          animation: marquee var(--duration) linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .infinite-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
