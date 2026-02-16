import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { PortfolioListSkeleton } from '@/ui';
import { useGetPortfolioList } from '@/app/(with-layout)/explore/api';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { pickAllowedParams } from '@/app/(with-layout)/explore/utils/query';

const PortfolioList = dynamic(() => import('@/ui/portfolio-list/PortfolioList'), { ssr: false });
const RENDER_CHUNK = 30;
const getVisibleCountStorageKey = (scrollKey: string) => `${scrollKey}:visible-count`;

export default function PortfolioListSection() {
  const sp = useSearchParams();
  const scrollKey = useMemo(() => {
    const allowed = pickAllowedParams(new URLSearchParams(sp.toString()));
    allowed.set('tab', 'PORTFOLIO'); // 혹시라도
    return `explore:portfolio:scroll?${allowed.toString()}`;
  }, [sp]);
  const visibleCountStorageKey = useMemo(() => getVisibleCountStorageKey(scrollKey), [scrollKey]);
  const query = useGetPortfolioList(new URLSearchParams(sp.toString()));
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return RENDER_CHUNK;

    const raw = sessionStorage.getItem(visibleCountStorageKey);
    const saved = Number(raw);
    if (Number.isNaN(saved) || saved <= 0) return RENDER_CHUNK;
    return saved;
  });

  const portfolios = useMemo(() => {
    return query.data.pages.flatMap((page) => page.data?.portfolios ?? []);
  }, [query.data.pages]);
  const visiblePortfolios = useMemo(
    () => portfolios.slice(0, visibleCount),
    [portfolios, visibleCount],
  );

  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    onLoadMore: query.fetchNextPage,
  });
  const { ref: renderMoreRef } = useInView({
    rootMargin: '600px 0px',
    onChange: (inView) => {
      if (!inView) return;
      setVisibleCount((prev) =>
        prev >= portfolios.length ? prev : Math.min(prev + RENDER_CHUNK, portfolios.length),
      );
    },
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);
  useScrollRestoreOnParent(anchorRef, scrollKey, [portfolios.length, query.dataUpdatedAt], {
    enabled: true,
    resetOnKeyChange: true,
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(visibleCountStorageKey, String(visibleCount));
  }, [visibleCount, visibleCountStorageKey]);

  const isPortfolioListEmpty = portfolios.length === 0;

  if (isPortfolioListEmpty)
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );

  return (
    <section className='px-[1rem] py-[1rem]'>
      <div ref={anchorRef} />
      <PortfolioList portfolioList={visiblePortfolios} />
      {visiblePortfolios.length < portfolios.length && <div ref={renderMoreRef} className='h-[1px]' />}
      {/* 다음 페이지 로딩 트리거 */}
      <div ref={sentinelRef} className='h-[1px]' />

      {/* 다음 페이지 로딩 중 표시(선택) */}
      {query.isFetchingNextPage ? <PortfolioListSkeleton length={3} /> : null}
    </section>
  );
}
