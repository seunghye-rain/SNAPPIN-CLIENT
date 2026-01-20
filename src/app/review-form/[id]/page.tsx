import { ProductInfoSection, ReviewFormSection } from './_section';
import { ClientHeader } from './components';
import { Divider } from '@/ui';

type ReviewFormPageProps = {
  params: { id: string };
};

export default async function Page({ params }: ReviewFormPageProps) {
  const reservationId = params.id;

  return (
    <>
      <ClientHeader />
      <ProductInfoSection reservationId={reservationId} />
      <Divider thickness='large' color='bg-black-3' />
      <ReviewFormSection reservationId={reservationId} />
    </>
  );
}
