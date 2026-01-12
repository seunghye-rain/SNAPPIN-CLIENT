import PageClient from './page.client';

type ReservationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function Page({ params }: ReservationDetailPageProps) {
  return <PageClient params={params} />;
}
