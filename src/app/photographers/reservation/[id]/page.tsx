import PageClient from './page.client';
import { notFound } from 'next/navigation';
import DetailHeader from '@/components/layout/detail/DetailHeader';

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return (
    <div className='bg-black-3 flex flex-col'>
      <DetailHeader>예약 상세</DetailHeader>
      <PageClient id={id} />
    </div>
  );
}
