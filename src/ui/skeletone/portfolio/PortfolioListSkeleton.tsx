type PortfolioListSkeletonProps = {
  length?: number;
};

export default function PortfolioListSkeleton({ length = 15 }: PortfolioListSkeletonProps) {
  return (
    <div className='grid grid-cols-3 gap-[0.2rem]'>
      {Array.from({ length: length }).map((_, i) => (
        <div key={i} className='bg-black-3 rounded-[0.6rem]' />
      ))}
    </div>
  );
}
