import { cn } from '@/utils/cn';

type PortfolioListSkeletonProps = {
  length?: number;
};

type ProductCardSkeletonProps = {
  className?: string;
};

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('flex w-full gap-[1.2rem]', className)}>
      <div className='bg-black-3 relative h-[10.2rem] w-[10.2rem] shrink-0' />
      <div className='flex flex-col justify-between'>
        <div className='flex w-full flex-col gap-[0.4rem]'>
          <div className='bg-black-3 h-[1.7rem] w-full' />
          <div className='bg-black-3 h-[1.4rem] w-[12.7rem]' />
          <div className='bg-black-3 h-[1.4rem] w-[7.4rem]' />
        </div>
        <div className='bg-black-3 h-[2.2rem] w-[10.1rem]' />
      </div>
    </div>
  );
}

export function PortfolioListSkeleton({ length = 15 }: PortfolioListSkeletonProps) {
  return (
    <div className='grid grid-cols-3 gap-[0.2rem]'>
      {Array.from({ length: length }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
