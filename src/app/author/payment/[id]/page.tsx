import ClientHeader from './components/client-header/ClientHeader';
import ClientFooter from './components/client-footer/ClientFooter';
import { PAYMENT_MOCK } from './mock/payment.mock';
import PaymentDetail from './components/payment-detail/PaymentDetail';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const id = params.id;
  console.log(id);
  const data = PAYMENT_MOCK;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <ClientHeader />
      <div className='bg-black-1 flex flex-col gap-[1.2rem] px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
        <h2 className='caption-14-bd'>결제 요청</h2>
        <PaymentDetail basePrice={data.basePrice} />
      </div>
      <ClientFooter />
    </div>
  );
}
