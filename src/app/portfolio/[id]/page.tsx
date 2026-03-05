import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query';
import {
  Header,
  PortfolioDetailContent,
  PortfolioDetailSkeleton
} from './components/index';
import { prefetchPortfolioDetail } from './api';

type PageProps = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const portfolioId = Number(id);

  if (Number.isNaN(portfolioId)) {
    return notFound();
  }

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

  prefetchPortfolioDetail(queryClient, portfolioId, isLogIn);

  return (
    <main>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PortfolioDetailSkeleton />}>
          <PortfolioDetailContent id={portfolioId} isLogIn={isLogIn} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}