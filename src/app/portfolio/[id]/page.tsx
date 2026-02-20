import { Suspense } from 'react';
import { cookies } from 'next/headers';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query';
import { prefetchPortfolioDetail } from './api';
import DetailHeader from '@/components/layout/detail/DetailHeader';
import PortfolioDetailContent from './components/portfolio-detail-content/PortfolioDetailContent';
import PortfolioDetailSkeleton from './components/portfolio-detail-content/PortfolioDetailSkeleton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) => 
          query.state.status === 'pending' ||
          defaultShouldDehydrateQuery(query),
      },
    },
  });
  if (!Number.isNaN(Number(id))) {
    prefetchPortfolioDetail(queryClient, Number(id), isLogIn);
  }

  return (
    <main>
      <DetailHeader>포트폴리오 상세</DetailHeader>
      <Suspense fallback={<PortfolioDetailSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PortfolioDetailContent id={id} isLogIn={isLogIn} />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}
