import NavigationClient from './components/navigation-client/Navigation.client';
import PageClient from './page.client';
import { notFound } from 'next/navigation';
import { useGetReservationDetailPrefetch } from './api';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }
  const queryClient = new QueryClient();

  useGetReservationDetailPrefetch(queryClient, Number(id));

  return (
    <div className='bg-black-3 flex flex-col'>
      <NavigationClient />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageClient id={id} />
      </HydrationBoundary>
    </div>
  );
}
