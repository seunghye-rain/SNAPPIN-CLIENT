import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { notFound } from 'next/navigation';
import type { GetProductDetailData } from '@/swagger-api';
import { ReservationFormSection } from './_form';
import { ClientHeader } from './components';

type ReservationFormPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ photographerId?: string }>;
};

export default async function Page({ params, searchParams }: ReservationFormPageProps) {
  const { id } = await params;
  const { photographerId: photographerIdParam } = await searchParams;
  const productId = Number(id);
  const photographerIdFromQuery = Number(photographerIdParam);

  if (Number.isNaN(productId)) {
    return notFound();
  }

  if (!Number.isNaN(photographerIdFromQuery) && photographerIdFromQuery > 0) {
    return (
      <>
        <ClientHeader />
        <ReservationFormSection photographerId={photographerIdFromQuery} />
      </>
    );
  }

  const response = await fetch(`${SERVER_API_BASE_URL}/api/v1/products/${productId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    return notFound();
  }

  const productDetail = (await response.json()) as GetProductDetailData;
  const photographerId = productDetail.data?.photographerInfo?.id;

  if (!photographerId) {
    return notFound();
  }

  return (
    <>
      <ClientHeader />
      <ReservationFormSection photographerId={photographerId} />
    </>
  );
}
