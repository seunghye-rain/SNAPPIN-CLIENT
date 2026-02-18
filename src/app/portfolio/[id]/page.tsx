import { cookies } from 'next/headers';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchPortfolioDetail } from './api';
import DetailHeader from '@/components/layout/detail/DetailHeader';
import PortfolioDetailContent from './components/portfolio-detail-content/PortfolioDetailContent';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  
  const queryClient = new QueryClient();
  await prefetchPortfolioDetail(queryClient, Number(id), isLogIn);

  return (
    <main>
      <DetailHeader>포트폴리오 상세</DetailHeader>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PortfolioDetailContent id={id} isLogIn={isLogIn} />
      </HydrationBoundary>
    </main>
  );
}
