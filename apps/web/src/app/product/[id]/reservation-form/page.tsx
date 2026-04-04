import { notFound } from 'next/navigation';
import PageClient from './page.client';

type ReservationFormPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ photographerId?: string }>;
};

export default async function Page({ params, searchParams }: ReservationFormPageProps) {
  const { id } = await params;
  const { photographerId: photographerIdParam } = await searchParams;
  const productId = Number(id);
  const photographerId = Number(photographerIdParam);

  if (Number.isNaN(productId)) {
    return notFound();
  }

  if (Number.isNaN(photographerId) || photographerId <= 0) {
    return notFound();
  }

  return <PageClient photographerId={photographerId} />;
}
