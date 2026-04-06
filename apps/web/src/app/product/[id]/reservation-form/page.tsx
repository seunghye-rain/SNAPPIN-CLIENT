import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { productDetailOptions } from '@/app/product/[id]/api/options';
import { getQueryClient } from '@/utils/getQueryClient';
import PageClient from './page.client';

type ReservationFormPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationFormPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return notFound();
  }

  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  const queryClient = getQueryClient();
  const productDetail = await queryClient.fetchQuery(productDetailOptions(productId, isLogIn));
  const photographerId = productDetail.photographerInfo?.id;

  if (!photographerId) {
    return notFound();
  }

  return <PageClient photographerId={photographerId} />;
}
