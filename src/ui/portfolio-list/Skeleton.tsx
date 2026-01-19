export function PortfolioSkeleton() {
  return <div className='shrink-0 min-w-[11.2rem] min-h-[11.2rem] bg-black-3' />;
}

export function PortfolioListSkeleton() {
  return (
    <div className='grid shrink-0  aspect-square grid-cols-3 gap-[0.2rem] items-center justify-center'>
      {Array.from({ length: 15 }).map((_, i) => (
        <PortfolioSkeleton key={i} />
      ))}
    </div>
  );
}