import { notFound } from 'next/navigation';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import NavigationClient from './components/navigation-client/Navigation.client';
import PageClient from './page.client';
import { prefetchReservationDetail } from './api';

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          query.state.status === 'pending' || defaultShouldDehydrateQuery(query),
      },
    },
  });

  await prefetchReservationDetail(queryClient, Number(id));

  return (
    <div className='bg-black-3 flex flex-col'>
      <NavigationClient />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageClient id={id} />
      </HydrationBoundary>
    </div>
  );
}
